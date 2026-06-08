import React, { useEffect, useState } from "react";
import {
  Calendar,
  CreditCard,
  TrendingUp,
  Clock,
  Settings,
  ShieldCheck,
  ChevronRight,
  MessageCircle,
  Loader2,
  CheckCircle2,
  X,
  CreditCard as CardIcon,
  Check,
  Users,
  BookOpen,
} from "lucide-react";
import { cn } from "../../lib/utils";
import LessonViewer from "../../components/LessonViewer";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import { doc, updateDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../lib/firebase";

const DAYS_ORDER = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

function getSlotTimeString(slot: any): string {
  if (typeof slot === "string") return slot;
  if (slot && typeof slot === "object") {
    if (typeof slot.start === "string") return slot.start;
    if (typeof slot.startTime === "string") return slot.startTime;
    if (typeof slot.slot === "string") return slot.slot;
  }
  return String(slot || "");
}

function utcSlotToLocal(
  dayName: string,
  slotTime: any,
): { day: string; slot: string } {
  const dayIndex = DAYS_ORDER.indexOf(dayName.toLowerCase());
  const str = getSlotTimeString(slotTime);
  if (dayIndex === -1 || !str.includes(":"))
    return { day: dayName, slot: str || "09:00" };

  const now = new Date();
  const currentUTCDay = now.getUTCDay();
  const diff = dayIndex - currentUTCDay;
  const targetDate = new Date(now);
  targetDate.setDate(now.getUTCDate() + diff);

  const [h, m] = str.split(":").map(Number);
  targetDate.setUTCHours(h, m, 0, 0);

  const localDayIndex = targetDate.getDay();
  const localDayName = DAYS_ORDER[localDayIndex];

  const localH = String(targetDate.getHours()).padStart(2, "0");
  const localM = String(targetDate.getMinutes()).padStart(2, "0");

  return { day: localDayName, slot: `${localH}:${localM}` };
}

function getLocalAvailability(utcAvail: any): any {
  if (!utcAvail) return null;

  const localAvail: any = {
    monday: { active: false, slots: [] },
    tuesday: { active: false, slots: [] },
    wednesday: { active: false, slots: [] },
    thursday: { active: false, slots: [] },
    friday: { active: false, slots: [] },
    saturday: { active: false, slots: [] },
    sunday: { active: false, slots: [] },
  };

  Object.entries(utcAvail).forEach(([day, dayData]: [string, any]) => {
    if (!dayData?.slots) return;
    dayData.slots.forEach((slot: string) => {
      const local = utcSlotToLocal(day, slot);
      const target = localAvail[local.day];
      if (target && !target.slots.includes(local.slot)) {
        target.slots.push(local.slot);
      }
    });
  });

  // Sort slots chronologically and mark active if slots present
  Object.keys(localAvail).forEach((day) => {
    localAvail[day].slots.sort();
    localAvail[day].active = localAvail[day].slots.length > 0;
  });

  return localAvail;
}

import {
  subscribeToSessions,
  subscribeToParentData,
  subscribeToMyLeads,
  subscribeToTutors,
  createSubscription,
  renewSubscription,
  scheduleRecurringSessions,
  updateLeadStatus,
  subscribeToSettings,
  updateStudentSchedule,
} from "../../services/dataService";

/**
 * Robust helper to format Firestore timestamps, JS Dates, or schedule objects {start, end}
 */
const formatSafeDate = (
  val: any,
  options: Intl.DateTimeFormatOptions = {},
): string => {
  if (!val) return "";

  let date: Date;

  // 1. Handle Firestore Timestamp
  if (val && typeof val.toDate === "function") {
    date = val.toDate();
  }
  // 2. Handle { start, end } object (common in some schedule schemas)
  else if (
    val &&
    typeof val === "object" &&
    ("start" in val || "startTime" in val)
  ) {
    const startVal = val.start || val.startTime;
    if (startVal && typeof startVal.toDate === "function") {
      date = startVal.toDate();
    } else if (typeof startVal === "string" || typeof startVal === "number") {
      const parsed = new Date(startVal);
      date = isNaN(parsed.getTime()) ? new Date() : parsed;
    } else if (startVal instanceof Date) {
      date = startVal;
    } else {
      // If it's still an object or something else, try to stringify
      return typeof startVal === "string" ? startVal : JSON.stringify(startVal);
    }
  }
  // 3. Handle Date object
  else if (val instanceof Date) {
    date = val;
  }
  // 4. Handle string/number
  else if (typeof val === "string" || typeof val === "number") {
    const parsed = new Date(val);
    if (!isNaN(parsed.getTime())) {
      date = parsed;
    } else {
      return String(val);
    }
  }
  // 5. Fallback for other objects
  else if (typeof val === "object") {
    return val.start || val.time || JSON.stringify(val);
  } else {
    return String(val);
  }

  if (isNaN(date.getTime())) return String(val);

  return date.toLocaleString("en-US", options);
};

/**
 * Specifically for rendering slot times which might be objects or strings
 */
const renderSlotTime = (time: any) => {
  if (typeof time === "string") return time;
  if (time && typeof time === "object") {
    if (time.start && typeof time.start === "string") return time.start;
    if (time.startTime && typeof time.startTime === "string")
      return time.startTime;
    return formatSafeDate(time.start || time.startTime || time, {
      hour: "2-digit",
      minute: "2-digit",
    });
  }
  return String(time || "");
};

export default function ParentDashboard() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);
  const [parentData, setParentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Subscription Modal State
  const [showEnroller, setShowEnroller] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);

  // Custom Class Credit bundles states
  const [customCreditQuantity, setCustomCreditQuantity] = useState<number>(4);
  const [customRenewCreditQuantity, setCustomRenewCreditQuantity] =
    useState<number>(4);
  const [useCustomCreditsNew, setUseCustomCreditsNew] =
    useState<boolean>(false);
  const [useCustomCreditsRenew, setUseCustomCreditsRenew] =
    useState<boolean>(false);

  const getCreditPriceNew = () => {
    if (useCustomCreditsNew) {
      return customCreditQuantity * 40;
    }
    return selectedPlan?.price || 0;
  };

  const getCreditPriceRenew = () => {
    if (useCustomCreditsRenew) {
      return customRenewCreditQuantity * 40;
    }
    return selectedRenewalPlan?.price || 0;
  };

  // Subscription Renewal & Checkout State
  const [selectedRenewalPlan, setSelectedRenewalPlan] = useState<any>(null);
  const [isRenewing, setIsRenewing] = useState(false);
  const [selectedTutorId, setSelectedTutorId] = useState("");
  const [recurringTimes, setRecurringTimes] = useState<string[]>([]);
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [completingTrialId, setCompletingTrialId] = useState<string | null>(null);

  // Premium Permanent Slot Booking State
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
  const [savingSchedule, setSavingSchedule] = useState(false);
  const [saveScheduleStatus, setSaveScheduleStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  // Payment Verification Layer (used on both renewal checkout and enrollment setup)
  const [paymentType, setPaymentType] = useState<
    "telebirr" | "cbe" | "international"
  >("international");
  const [transactionRef, setTransactionRef] = useState("");
  const [receiptScreenshotName, setReceiptScreenshotName] = useState("");
  const [paymentSenderName, setPaymentSenderName] = useState("");

  // Unified children profiles listing: combining registered students and active (unconverted) trial leads
  const registeredStudents = parentData?.students || [];
  
  // Get active unconverted leads, or synthesize one for fallback preview accounts
  let activeLeads = (leads || []).filter((l: any) => l.status !== "converted");
  
  if (
    activeLeads.length === 0 &&
    registeredStudents.length === 0 &&
    (user?.email?.toLowerCase() === "biruktt11@gmail.com" ||
      (user?.uid && user.uid.startsWith("virtual_")))
  ) {
    activeLeads = [
      {
        id: "preview-lead-id",
        childName: "Biruk Junior",
        email: user?.email || "biruktt11@gmail.com",
        status: "trial_completed",
        subject: "Geez/Ethiopic Heritage",
        learningGoal: "Expose child to heritage language, conversation, and reading.",
        parentName: user?.fullName || "Biruk",
        whatsapp: "+251912345678",
        createdAt: new Date(),
        tutorId: "preview-tutor-id"
      }
    ];
  }

  const allProfiles = [
    ...registeredStudents.map((s: any) => ({
      id: s.id,
      key: `student-${s.id}`,
      type: "student" as const,
      name: s.name,
      status: s.status,
      subjects: s.subjects || [],
      data: s,
    })),
    ...activeLeads.map((l: any) => ({
      id: l.id,
      key: `lead-${l.id}`,
      type: "lead" as const,
      name: l.childName || "Trial Booking",
      status: l.status,
      subjects: l.subject ? [l.subject] : ["Amharic"],
      data: l,
    })),
  ];

  const [activeProfileIndex, setActiveProfileIndex] = useState(0);
  const safeProfileIndex = activeProfileIndex < allProfiles.length ? activeProfileIndex : 0;
  const activeProfile = allProfiles[safeProfileIndex] || null;

  const activeStudent =
    activeProfile && activeProfile.type === "student" ? activeProfile.data : null;

  const completedTrialLead =
    activeProfile && activeProfile.type === "lead" && ["trial_completed", "registration_completed"].includes(activeProfile.status || "")
      ? activeProfile.data
      : null;

  const scheduledTrialLead =
    activeProfile && activeProfile.type === "lead" && activeProfile.status === "scheduled"
      ? activeProfile.data
      : null;

  const dbTrialSession = sessions.find(
    (s: any) => s.type === "trial" && s.status === "completed" && (
      activeProfile?.type === 'lead' 
        ? s.parentEmail?.toLowerCase() === activeProfile.data.email?.toLowerCase() && s.studentName === activeProfile.data.childName
        : s.studentId === activeProfile?.id
    )
  ) || sessions.find(
    (s: any) => s.type === "trial" && s.status === "completed" && (
      activeProfile?.type === 'lead'
        ? s.studentName === activeProfile.data.childName
        : false
    )
  ) || sessions.find(
    (s: any) => s.type === "trial" && s.status === "completed" && (
      s.parentEmail?.toLowerCase() === user?.email?.toLowerCase()
    )
  ) || sessions.find(
    (s: any) => s.type === "trial" && s.status === "completed"
  );

  const trialSession = dbTrialSession || (
    // If they are in preview/fallback mode or email matches biruktt11@gmail.com
    (user?.email?.toLowerCase() === 'biruktt11@gmail.com' || (user?.uid && user.uid.startsWith('virtual_')))
      ? {
          id: "preview-trial-session",
          type: "trial",
          status: "completed",
          evaluation: "Completed successfully. High interest in heritage language exploration. Responsive, polite, and eager to learn. Recommended regular weekly instruction to build conversational fluency.",
          recommendedLevel: "2",
          childName: completedTrialLead?.childName || "Biruk Junior",
          studentName: completedTrialLead?.childName || "Biruk Junior",
          tutorName: "Selamawit Kebede",
          startTime: { toDate: () => new Date() },
          endTime: { toDate: () => new Date() }
        }
      : null
  );

  const [settings, setSettings] = useState<any>({
    standardPrice: 160,
    proPrice: 240,
    masteryPrice: 320,
  });

  const DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const activeTab = currentPath.includes("/schedule")
    ? "schedule"
    : currentPath.includes("/billing")
      ? "billing"
      : currentPath.includes("/progress")
        ? "progress"
        : currentPath.includes("/settings")
          ? "settings"
          : "dashboard";

  // Parent profile settings local states
  const [profileName, setProfileName] = useState("");
  const [profileWhatsApp, setProfileWhatsApp] = useState("");
  const [childNameVal, setChildNameVal] = useState("");
  const [savingSettings, setSavingSettings] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle",
  );

  // Active student state mapped above from unified allProfiles state

  useEffect(() => {
    if (user) {
      setProfileName(user.fullName || user.displayName || "");
      setProfileWhatsApp((user as any).whatsapp || "");
    }
  }, [user]);

  useEffect(() => {
    const student = activeStudent || parentData?.students?.[0];
    if (student) {
      setChildNameVal(student.name || "");
    } else if (completedTrialLead || scheduledTrialLead) {
      setChildNameVal(
        (completedTrialLead || scheduledTrialLead).childName || "",
      );
    }
  }, [parentData, completedTrialLead, scheduledTrialLead, activeStudent]);

  useEffect(() => {
    const student = activeStudent || parentData?.students?.[0];
    if (student?.recurringTimes) {
      setSelectedSlots(student.recurringTimes);
    }
  }, [parentData, activeStudent]);

  useEffect(() => {
    const unsub = subscribeToSettings((data) => {
      if (data) {
        setSettings(data);
      }
    });
    return () => unsub();
  }, []);

  const plans = [
    {
      id: "standard",
      name: "Heritage Standard",
      sessions: 4,
      price: settings.standardPrice,
      description: "1 Session per week",
    },
    {
      id: "pro",
      name: "Heritage Pro",
      sessions: 8,
      price: settings.proPrice,
      description: "2 Sessions per week",
    },
    {
      id: "mastery",
      name: "Heritage Mastery",
      sessions: 12,
      price: settings.masteryPrice,
      description: "3 Sessions per week",
    },
  ];

  // Pre-fill enrollment data when trial completes
  useEffect(() => {
    if (completedTrialLead && !selectedPlan) {
      setSelectedPlan(plans[1]); // Default to Heritage Pro
      if (completedTrialLead.tutorId) {
        setSelectedTutorId(completedTrialLead.tutorId);
      }
    }
  }, [completedTrialLead, plans]);

  useEffect(() => {
    if (!user) return;

    let sessionsLoaded = false;
    let parentLoaded = false;

    const checkLoading = () => {
      if (sessionsLoaded && parentLoaded) {
        setLoading(false);
      }
    };

    const unsubscribeSessions = subscribeToSessions(
      "parent",
      user.uid,
      (data) => {
        setSessions(data);
        sessionsLoaded = true;
        checkLoading();
      },
      () => {
        sessionsLoaded = true;
        checkLoading();
      },
      user.email || ""
    );

    const unsubscribeParent = subscribeToParentData(
      user.uid,
      (data) => {
        setParentData(data);
        parentLoaded = true;
        checkLoading();
      },
      () => {
        parentLoaded = true;
        checkLoading();
      },
      user.email || ""
    );

    const unsubscribeLeads = user.email
      ? subscribeToMyLeads(user.email, (data) => setLeads(data))
      : () => {};

    const unsubscribeTutors = subscribeToTutors((data) => {
      let list = [...data];
      const hasPreviewTutor = list.some(t => t.id === 'preview-tutor-id' || t.id === 'selamawit_kebede' || t.email === 'selamawit@heritage.academy');
      if (!hasPreviewTutor && (user?.email?.toLowerCase() === 'biruktt11@gmail.com' || (user?.uid && user.uid.startsWith('virtual_')))) {
        list.push({
          id: "preview-tutor-id",
          displayName: "Selamawit Kebede",
          name: "Selamawit Kebede",
          email: "selamawit@heritage.academy",
          specializedSyllabus: "Geez/Ethiopic Heritage, Amharic Conversational",
          availability: {
            monday: { active: true, slots: ["09:00", "14:00", "16:00"] },
            tuesday: { active: true, slots: ["10:00", "15:00", "18:00"] },
            wednesday: { active: true, slots: ["11:00", "14:00", "16:00"] },
            thursday: { active: true, slots: ["09:00", "15:00", "17:05"] },
            friday: { active: true, slots: ["10:00", "16:00", "19:00"] },
            saturday: { active: true, slots: ["09:00", "11:00", "14:00"] },
            sunday: { active: true, slots: ["13:00", "15:00", "17:00"] },
          }
        });
      }
      setTutors(list);
    });

    return () => {
      unsubscribeSessions();
      unsubscribeParent();
      unsubscribeLeads();
      unsubscribeTutors();
    };
  }, [user]);

  const handleEnrollment = async (e: React.FormEvent) => {
    e.preventDefault();
    const lead = completedTrialLead || scheduledTrialLead;
    if (
      !user ||
      !lead ||
      (!selectedPlan && !useCustomCreditsNew) ||
      !selectedTutorId ||
      recurringTimes.length === 0
    ) {
      console.warn("Enrollment aborted: missing data", {
        user: !!user,
        lead: !!lead,
        plan: !!selectedPlan || useCustomCreditsNew,
        tutor: !!selectedTutorId,
        times: recurringTimes.length,
      });
      return;
    }

    setIsSubscribing(true);
    try {
      const tutor = tutors.find((t) => t.id === selectedTutorId);
      if (!tutor) {
        alert("Selected tutor no longer available. Please select another.");
        setIsSubscribing(false);
        return;
      }

      const schedulePattern = recurringTimes.map((time) => {
        const d = new Date(time);
        return `${d.toLocaleDateString("en-US", { weekday: "long" })} @ ${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
      });

      // Handle multi-children enrollment from lead.children
      const childrenToEnroll = Array.isArray(lead.children) && lead.children.length > 0
        ? lead.children
        : [{ name: lead.childName, age: lead.childAge, subjects: ['Amharic'] }];

      let enrolledSome = false;

      for (const child of childrenToEnroll) {
        const subResult = await createSubscription(
          user.uid,
          useCustomCreditsNew ? "custom" : selectedPlan?.id || "standard",
          child.name,
          selectedTutorId,
          recurringTimes,
          schedulePattern,
          user.email || "",
          getCreditPriceNew(),
          useCustomCreditsNew
            ? customCreditQuantity
            : selectedPlan?.sessions || 4,
        );

        if (subResult.success && subResult.studentId) {
          enrolledSome = true;

          // Schedule recurring sessions for each selected slot
          const schedulePromises = recurringTimes.map((time) =>
            scheduleRecurringSessions(
              { id: subResult.studentId, name: child.name },
              { id: tutor.id, name: tutor.displayName || tutor.email },
              new Date(time),
              user.uid,
            ),
          );
          await Promise.all(schedulePromises);

          // Update student record with their subjects & age details and mark status as pending verification
          try {
            const studentRef = doc(db, "students", subResult.studentId);
            await updateDoc(studentRef, {
              subjects: child.subjects || ['Amharic'],
              age: Number(child.age) || 0,
              status: "pending_verification"
            });
          } catch (stdErr) {
            console.error("Failed to append child subjects to student document:", stdErr);
          }

          // Send confirmation emails for this student
          try {
            await fetch("/api/subscription/confirm", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                parentEmail: user.email,
                parentName: user.displayName || user.fullName || "Parent",
                studentName: child.name,
                planName: useCustomCreditsNew ? "Custom Class Package" : (selectedPlan?.name || "Standard Plan"),
                tutorEmail: tutor.email || "",
                tutorName: tutor.displayName || tutor.name || "Assigned Tutor",
                price: useCustomCreditsNew ? (getCreditPriceNew() * customCreditQuantity) : (selectedPlan?.price || 0),
                schedulePattern: schedulePattern.join(", "),
                paymentType: paymentType,
                paymentRef: transactionRef || "N/A",
                paymentSenderName: paymentSenderName || "N/A"
              }),
            });
          } catch (mailErr) {
            console.error("Failing silently to send verification subscription emails:", mailErr);
          }
        }
      }

      if (enrolledSome) {
        setShowEnroller(false);
        // Do NOT convert - instead set status to registration_completed and append all payment metadata
        try {
          const leadRef = doc(db, "leads", lead.id);
          await updateDoc(leadRef, {
            status: "registration_completed",
            chosenPlan: useCustomCreditsNew ? "Custom Class Package" : (selectedPlan?.name || "Standard Plan"),
            chosenTutor: tutor.displayName || tutor.name || "Selamawit Kebede",
            chosenSchedule: schedulePattern.join(", "),
            paymentType: paymentType,
            paymentRef: transactionRef || "N/A",
            paymentSenderName: paymentSenderName || "N/A",
            paymentScreenshotName: receiptScreenshotName || "receipt.png",
            paymentDate: new Date().toISOString()
          });
        } catch (leadUpdErr) {
          console.error("Failed to update lead with registration fields:", leadUpdErr);
          // Fallback state update in case local preview uses simulated list
          lead.status = "registration_completed";
          lead.chosenPlan = useCustomCreditsNew ? "Custom Class Package" : (selectedPlan?.name || "Standard Plan");
          lead.chosenTutor = tutor.displayName || tutor.name || "Selamawit Kebede";
          lead.chosenSchedule = schedulePattern.join(", ");
          lead.paymentType = paymentType;
          lead.paymentRef = transactionRef || "N/A";
          lead.paymentSenderName = paymentSenderName || "N/A";
          lead.paymentScreenshotName = receiptScreenshotName || "receipt.png";
          lead.paymentDate = new Date().toISOString();
        }
      }
    } catch (err) {
      console.error("Enrollment error:", err);
    }
    setIsSubscribing(false);
  };

  const handleRenewal = async (expiredStudent: any) => {
    if (
      !user ||
      (!selectedRenewalPlan && !useCustomCreditsRenew) ||
      !expiredStudent
    )
      return;
    setIsRenewing(true);
    try {
      const activeTutorId = expiredStudent.tutorId || "";
      const result = await renewSubscription(
        expiredStudent.id,
        user.uid,
        user.email || "",
        useCustomCreditsRenew ? "custom" : selectedRenewalPlan.id,
        getCreditPriceRenew(),
        activeTutorId,
        expiredStudent.schedule || [],
        useCustomCreditsRenew
          ? customRenewCreditQuantity
          : selectedRenewalPlan?.sessions || 4,
      );

      if (result.success) {
        const tutor = tutors.find((t) => t.id === activeTutorId);
        // Send dual notification/email
        await fetch("/api/subscription/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            parentEmail: user.email,
            parentName: user.displayName || user.fullName || "Parent",
            studentName: expiredStudent.name,
            planName: useCustomCreditsRenew
              ? `Renewal - Custom (${customRenewCreditQuantity} Credits)`
              : `Renewal - ${selectedRenewalPlan.name}`,
            tutorEmail: tutor?.email || "",
            tutorName: tutor?.displayName || tutor?.name || "Assigned Tutor",
            price: getCreditPriceRenew(),
            schedulePattern: (expiredStudent.schedule || []).join(", "),
          }),
        });
      } else {
        alert(
          "Renewal checkout encountered a transient issue. Please try again.",
        );
      }
    } catch (err) {
      console.error(err);
    }
    setIsRenewing(false);
  };

  if (loading) {
    console.log("ParentDashboard: Loading state active");
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center text-slate-400 gap-3">
        <Loader2 className="animate-spin text-secondary" size={32} />
        <p className="text-sm font-medium">Syncing family portal...</p>
      </div>
    );
  }

  const expiredStudent = parentData?.students?.find(
    (s: any) => s.status === "expired",
  );
  const hasExpiredStudent = !!expiredStudent;

  if (hasExpiredStudent && activeTab === "dashboard") {
    if (!selectedRenewalPlan) {
      setSelectedRenewalPlan(plans[1]); // default to Heritage Pro
    }

    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
        <div className="bg-red-50 border border-red-100 p-8 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-200 shrink-0">
              <X size={32} />
            </div>
            <div className="text-left">
              <h3 className="text-xl font-extrabold text-slate-950 font-sans tracking-tight leading-none mb-1.5">
                {expiredStudent?.expireReason === "credits_exhausted"
                  ? "Class Credits Exhausted"
                  : "Family Account Suspended"}
              </h3>
              <p className="text-slate-500 text-xs font-sans">
                {expiredStudent?.expireReason === "credits_exhausted" ? (
                  <span>
                    You have used all available class credits for{" "}
                    <strong className="text-slate-700 font-bold">
                      {expiredStudent?.name}
                    </strong>
                    . Access belongs locked. Please buy a new credit bundle
                    below to resume learning.
                  </span>
                ) : (
                  <span>
                    Your billing cycle has ended for{" "}
                    <strong className="text-slate-705 font-bold">
                      {expiredStudent?.name}
                    </strong>
                    . Access is frozen in compliance with classroom seat ledger
                    records.
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest bg-white px-4 py-2 rounded-xl border border-red-100">
            Payment Required
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-150 shadow-sm p-8 md:p-12 space-y-8">
          <div className="max-w-2xl text-left">
            <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans tracking-tight">
              Purchase Class Session Credits
            </h2>
            <p className="text-slate-500 text-sm">
              Please select a credit package or customize your purchase below to
              authorize renewal, restore access to tutor calendar, and resume
              standard sessions seamlessly.
            </p>
          </div>

          <div className="flex gap-4 p-1.5 bg-slate-100 rounded-2xl w-fit">
            <button
              type="button"
              onClick={() => {
                setUseCustomCreditsRenew(false);
                setSelectedRenewalPlan(plans[1]); // Default to Pro
              }}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                !useCustomCreditsRenew
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              Subscription Tiers
            </button>
            <button
              type="button"
              onClick={() => {
                setUseCustomCreditsRenew(true);
                setSelectedRenewalPlan(null);
              }}
              className={cn(
                "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                useCustomCreditsRenew
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              Custom Credit Package
            </button>
          </div>

          {!useCustomCreditsRenew ? (
            <div className="grid md:grid-cols-3 gap-4 animate-in fade-in duration-200">
              {plans.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setSelectedRenewalPlan(p)}
                  className={cn(
                    "p-6 rounded-2xl border-2 text-left transition-all relative overflow-hidden cursor-pointer",
                    selectedRenewalPlan?.id === p.id
                      ? "bg-slate-900 border-slate-900 text-white shadow-xl scale-[1.01]"
                      : "bg-white text-slate-900 border-slate-150 hover:border-slate-300",
                  )}
                >
                  <h4
                    className={cn(
                      "font-bold truncate",
                      selectedRenewalPlan?.id === p.id
                        ? "text-white"
                        : "text-slate-905",
                    )}
                  >
                    {p.name}
                  </h4>
                  <p
                    className={cn(
                      "text-[10px] mt-1 font-medium",
                      selectedRenewalPlan?.id === p.id
                        ? "text-slate-300"
                        : "text-slate-400",
                    )}
                  >
                    {p.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-2.5xl font-extrabold font-mono">
                      ${p.price}
                    </span>
                    <span className="text-[10px] font-medium opacity-60">
                      / 4-week cycle
                    </span>
                  </div>
                  {selectedRenewalPlan?.id === p.id && (
                    <div className="absolute top-3 right-3 text-white/20">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-150 space-y-6 animate-in fade-in duration-200 text-left">
              <div>
                <h4 className="font-extrabold text-sm text-slate-900">
                  Configure Custom Credit Package
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  Purchase multi-month blocks or custom class counts at a
                  flexible rate of $40 per session.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setCustomRenewCreditQuantity((q) => Math.max(4, q - 1))
                    }
                    className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min={4}
                    max={48}
                    value={customRenewCreditQuantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 4;
                      setCustomRenewCreditQuantity(
                        Math.min(48, Math.max(4, val)),
                      );
                    }}
                    className="w-20 h-12 text-center bg-white border border-slate-200 rounded-xl font-bold text-base focus:outline-none focus:border-slate-400 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setCustomRenewCreditQuantity((q) => Math.min(48, q + 1))
                    }
                    className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <div className="flex-1 bg-white px-6 py-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                      Total Cost
                    </span>
                    <span className="text-xl font-black text-slate-900 font-mono">
                      ${customRenewCreditQuantity * 40}.00
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block text-right">
                      Included Classes
                    </span>
                    <span className="text-xs font-bold text-indigo-600 block text-right">
                      {customRenewCreditQuantity} Tutoring Sessions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Checkout Card Form Fields with CBE, Telebirr, and Zelle/International Options */}
          <div className="bg-slate-50 rounded-[28px] p-6 md:p-8 border border-slate-150 space-y-6">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <CreditCard size={16} className="text-indigo-600" />
              <span>Checkout Payment & Receipt Submission</span>
            </h3>

            {/* Payment Options Selection Block */}
            <div className="space-y-4">
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                Select Payment Method
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentType("telebirr")}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer",
                    paymentType === "telebirr"
                      ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0",
                        paymentType === "telebirr"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-slate-300",
                      )}
                    >
                      {paymentType === "telebirr" && (
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                      )}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Telebirr (Local Ethiopia)
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Mobile Transfer
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType("cbe")}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer",
                    paymentType === "cbe"
                      ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0",
                        paymentType === "cbe"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-slate-300",
                      )}
                    >
                      {paymentType === "cbe" && (
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                      )}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      CBE Birr / Transfer
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Bank Gateway
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentType("international")}
                  className={cn(
                    "p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2.5 cursor-pointer",
                    paymentType === "international"
                      ? "border-indigo-600 bg-indigo-50/20 shadow-sm"
                      : "border-slate-200 bg-white hover:border-slate-300",
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0",
                        paymentType === "international"
                          ? "border-indigo-600 text-indigo-600"
                          : "border-slate-300",
                      )}
                    >
                      {paymentType === "international" && (
                        <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full"></span>
                      )}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      International / Diaspora
                    </span>
                  </div>
                  <span className="text-[9px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                    Zelle, Remitly, WorldRemit
                  </span>
                </button>
              </div>
            </div>

            {/* Instruction Panels */}
            {paymentType === "telebirr" && (
              <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-2 text-xs text-slate-600 animate-in fade-in duration-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block">
                  Telebirr Account Instructions:
                </span>
                <p className="leading-relaxed">
                  Please issue the tuition total directly to our verified
                  merchant code{" "}
                  <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-2 py-0.5 rounded">
                    882910
                  </strong>{" "}
                  or transfer to Telebirr mobile deposit account{" "}
                  <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-2 py-0.5 rounded">
                    +251 912 345 678
                  </strong>{" "}
                  (under name: <strong>Abyssinia Tutors Language Center</strong>).
                </p>
              </div>
            )}

            {paymentType === "cbe" && (
              <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-2 text-xs text-slate-600 animate-in fade-in duration-200 shadow-sm">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block">
                  CBE Bank Transfer Instructions:
                </span>
                <p className="leading-relaxed">
                  Kindly send your payment to our Commercial Bank of Ethiopia
                  (CBE) corporate savings account under name{" "}
                  <strong>Abyssinia Tutors Language School</strong>:<br />
                  <strong className="font-extrabold text-slate-900 font-mono text-sm bg-slate-50 px-2.5 py-1 rounded block mt-1.5 w-fit">
                    Acc: 1000492811726
                  </strong>
                </p>
              </div>
            )}

            {paymentType === "international" && (
              <div className="p-5 bg-white border border-slate-100 rounded-2xl space-y-3.5 text-xs text-slate-650 animate-in fade-in duration-200 leading-relaxed shadow-sm">
                <span className="text-[10px] uppercase font-bold text-indigo-600 tracking-wider block">
                  International / Diaspora Instructions:
                </span>
                <div className="space-y-3">
                  <div className="p-3 bg-slate-50/50 rounded-xl space-y-1 border border-slate-100/50">
                    <p className="text-slate-900 font-bold flex items-center gap-1.5">
                      <span>🇺🇸</span>
                      <span>US Parents (Zelle Transfer):</span>
                    </p>
                    <p className="text-slate-500 pl-5">
                      Send your monthly tuition directly via Zelle to our
                      phone/email hotline endpoint:
                      <strong className="block font-bold text-slate-800 font-mono mt-0.5">
                        payment@heritageacademy.com
                      </strong>
                    </p>
                  </div>
                  <div className="p-3 bg-slate-50/50 rounded-xl space-y-1 border border-slate-100/50">
                    <p className="text-slate-900 font-bold flex items-center gap-1.5">
                      <span>🌍</span>
                      <span>Canada, UK, Europe, & Australia Parents:</span>
                    </p>
                    <p className="text-slate-500 pl-5">
                      Utilize prominent digital cross-border platforms like{" "}
                      <strong className="text-slate-800">Remitly</strong>,{" "}
                      <strong className="text-slate-805">WorldRemit</strong>, or{" "}
                      <strong className="text-slate-805">Sendwave</strong> to
                      transmit funds directly as a Zelle payment to{" "}
                      <strong className="font-bold text-slate-800 font-mono">
                        payment@heritageacademy.com
                      </strong>{" "}
                      or as an instant mobile wallet deposit to our corporate
                      Telebirr number{" "}
                      <strong className="font-bold text-slate-800 font-mono">
                        +251 912 345 678
                      </strong>
                      .
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Secure Verification Layer */}
            <div className="border-t border-slate-150 pt-5 space-y-4">
              <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">
                Secure Payment Verification Receipt
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Transaction Reference ID{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CBE-TXN928102 / Zelle Conf: 8172"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-700 font-mono outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all font-bold shadow-sm"
                  />
                  <p className="text-[8px] text-slate-400">
                    Provide the precise transaction payload identifier shown in
                    your banking snapshot.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider block">
                    Upload Screenshot Receipt{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <div className="relative border border-dashed border-slate-200 bg-white rounded-xl hover:bg-slate-50/50 transition-colors cursor-pointer flex items-center justify-between p-2.5 shadow-sm">
                    <input
                      type="file"
                      id="renewal-receipt-upload"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          setReceiptScreenshotName(file.name);
                        }
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                    />
                    <div className="flex items-center gap-2 max-w-[210px] truncate">
                      <span className="text-sm">📎</span>
                      <span className="text-[11px] font-bold text-slate-600 truncate">
                        {receiptScreenshotName ||
                          "Attach receipt screenshot..."}
                      </span>
                    </div>
                    <span className="text-[9px] font-extrabold uppercase bg-slate-50 hover:bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 text-slate-600 tracking-wider">
                      Browse File
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-400">
                    Accept JPEG, PNG screenshot pictures or PDF documentation.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Checkout Renewal */}
          <div className="flex justify-end items-center gap-6 pt-6 border-t border-slate-100">
            <button
              onClick={() => {
                if (!transactionRef || !receiptScreenshotName) {
                  alert(
                    "Please supply a valid Transaction Reference ID and upload a valid Screenshot Receipt before completing renewal.",
                  );
                  return;
                }
                handleRenewal(expiredStudent);
              }}
              disabled={isRenewing || !transactionRef || !receiptScreenshotName}
              className="btn-primary flex items-center justify-center gap-2 px-12 py-4 shadow-xl shadow-slate-950/10 hover:scale-[1.01] transition-all cursor-pointer font-bold text-xs uppercase tracking-widest bg-slate-900 text-white disabled:opacity-40"
            >
              {isRenewing ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  <span>Processing Renewal...</span>
                </>
              ) : (
                <>
                  <Check size={16} />
                  <span>Renew & Restore Access</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    setSaveStatus("idle");
    try {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          fullName: profileName,
          whatsapp: profileWhatsApp,
          displayName: profileName,
        });
      }
      if (activeStudent?.id) {
        const studentRef = doc(db, "students", activeStudent.id);
        await updateDoc(studentRef, {
          name: childNameVal,
        });
      }
      setSaveStatus("success");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } catch (err) {
      console.error("Error saving settings:", err);
      setSaveStatus("error");
    }
    setSavingSettings(false);
  };

  const handleTestCompleteTrial = async (lead: any) => {
    if (!lead || !lead.id) return;
    setCompletingTrialId(lead.id);
    try {
      // 1. Update lead status to trial_completed
      await updateLeadStatus(lead.id, "trial_completed");

      // 2. Prepare mock evaluation text and level
      const evaluationText = "Completed successfully via Developer Trial Completion Tool. Highly engaged child with excellent comprehension. Recommended Heritage Pro Plan to build fluency.";
      
      // 3. Look for existing trial sessions, or create a new one
      const existingSession = sessions.find(
        (s: any) => s.type === "trial" && (
          s.studentName === lead.childName || 
          s.parentEmail?.toLowerCase() === lead.email?.toLowerCase()
        )
      );

      const sessionData = {
        type: "trial",
        status: "completed",
        evaluation: evaluationText,
        recommendedLevel: "2",
        completedAt: new Date(),
        updatedAt: serverTimestamp(),
        parentEmail: lead.email || user?.email || "",
        parentName: lead.parentName || user?.displayName || "Parent",
        studentName: lead.childName || "Student",
        tutorId: lead.tutorId || "system-test",
        tutorName: lead.tutorName || "Heritage Senior Tutor",
        scheduledAt: serverTimestamp()
      };

      if (existingSession?.id) {
        await updateDoc(doc(db, 'sessions', existingSession.id), {
          status: "completed",
          evaluation: evaluationText,
          recommendedLevel: "2",
          completedAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'sessions'), sessionData);
      }
      console.log("Successfully completed lead & created session evaluation");
    } catch (err) {
      console.error("Test trial completion error:", err);
    } finally {
      setCompletingTrialId(null);
    }
  };

  const primaryStudent =
    activeStudent ||
    (completedTrialLead || scheduledTrialLead
      ? {
          name: (completedTrialLead || scheduledTrialLead).childName,
          status: (completedTrialLead || scheduledTrialLead).status,
          learningGoal: (completedTrialLead || scheduledTrialLead).learningGoal,
          evaluation: trialSession?.evaluation,
          recommendedLevel: trialSession?.recommendedLevel,
        }
      : null);

  const isTrialPhase =
    !primaryStudent ||
    [
      "trial_pending",
      "trial_scheduled",
      "scheduled",
      "new_lead",
      "contacted",
    ].includes(primaryStudent.status || "");

  const isTrialCompleted =
    !!primaryStudent &&
    ["completed", "trial_completed", "registration_completed", "active", "converted"].includes(
      primaryStudent.status || "",
    );

  const isPremiumActive = !!activeStudent?.plan;

  return (
    <div className="space-y-8 relative">
      {/* Trial Scheduled Banner */}
      {scheduledTrialLead && (
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm animate-in slide-in-from-top duration-500">
          <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-200">
              <Calendar size={24} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">
                Trial Session Scheduled!
              </h3>
              <p className="text-slate-500 text-xs mt-1">
                Your trial for {scheduledTrialLead.childName} is set for{" "}
                {formatSafeDate(scheduledTrialLead.scheduledAt) || "soon"}.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleTestCompleteTrial(scheduledTrialLead)}
              disabled={completingTrialId === scheduledTrialLead.id}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              {completingTrialId === scheduledTrialLead.id ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Completing...
                </>
              ) : (
                "🧪 Test: Complete Trial Now"
              )}
            </button>
            <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest bg-white px-4 py-2 rounded-lg border border-blue-100">
              Waiting for Session
            </div>
          </div>
        </div>
      )}

      {/* Registration Completed Review Banner */}
      {completedTrialLead && completedTrialLead.status === "registration_completed" && (
        <div className="bg-amber-50/60 border border-amber-100 p-6 md:p-8 rounded-[24px] space-y-6 shadow-sm animate-in slide-in-from-top duration-550 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-amber-100">
            <div className="flex gap-3.5 items-center">
              <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center shadow-md shadow-amber-200 shrink-0">
                <Clock size={22} className="text-white" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-amber-800 tracking-wider bg-amber-100 px-2.5 py-1 rounded-md">
                  Verification Pending
                </span>
                <h3 className="font-bold text-slate-900 mt-1.5 text-lg leading-tight">
                  Registration Successfully Submitted!
                </h3>
              </div>
            </div>
            <div className="bg-white border border-amber-200 px-4 py-2.5 rounded-xl text-center self-start md:self-auto shadow-sm">
              <p className="text-[9px] uppercase font-bold text-slate-400">Remittance Receipt</p>
              <p className="text-xs font-mono font-black text-slate-700 mt-0.5">Capturing ID: {completedTrialLead.paymentRef || "N/A"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">01. Selected Plan</span>
              <p className="text-sm font-extrabold text-slate-905">{completedTrialLead.chosenPlan || "Heritage Pro Plan"}</p>
              <p className="text-[11px] text-slate-400 leading-normal">
                Class credits are allocated provisionally awaiting transfer validation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">02. Assigned Tutor &amp; Schedule</span>
              <p className="text-sm font-extrabold text-slate-905">{completedTrialLead.chosenTutor || "Selamawit Kebede"}</p>
              <p className="text-[11px] text-slate-500 font-medium leading-tight font-mono">
                {completedTrialLead.chosenSchedule || "Weekly recurring timeslots"}
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-2">
              <span className="text-[9px] font-black uppercase text-slate-400 tracking-widest block">03. Electronic Remittance</span>
              <p className="text-sm font-extrabold text-slate-905 capitalize">
                {completedTrialLead.paymentType === "telebirr" ? "Telebirr (merchant code 882910)" : completedTrialLead.paymentType === "cbe" ? "CBE Bank Transfer" : "International (Zelle/Remitly)"}
              </p>
              <p className="text-[11px] text-slate-500 font-medium font-sans">
                Depositor: <strong className="text-slate-800">{completedTrialLead.paymentSenderName || user?.displayName || "Parent"}</strong>
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl flex gap-3.5 items-start">
            <span className="text-emerald-600 font-bold text-lg leading-none mt-0.5">✓</span>
            <div className="space-y-1">
              <p className="text-[11px] font-bold text-emerald-950 leading-tight">
                Professional Confirmation Email Dispatched
              </p>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                A formal email receipt containing your chosen plans, tutor agenda parameters, and payment confirmation statement has been simulated and dispatched to <strong className="font-bold underline text-emerald-950">{user?.email || "parent email"}</strong>.
              </p>
            </div>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl border border-dashed border-slate-200">
            <p className="text-[11px] text-slate-550 leading-relaxed">
              💡 <strong>Next Steps:</strong> Our administrative board handles validation of international remittances and CBE/Telebirr corporate accounts in under 2 hours. Once checked, your child's permanent virtual classroom links, visual progression matrices, and interactive curriculum will activate immediately.
            </p>
          </div>
        </div>
      )}

      {/* Trial Completed Call-to-Action */}
      {completedTrialLead && completedTrialLead.status === "trial_completed" && (
        <div className="bg-orange-50 border border-orange-100 p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm animate-in slide-in-from-top duration-500">
          <div className="flex gap-4 items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-200 shrink-0">
              <CheckCircle2 size={24} />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 leading-tight text-lg">
                    Trial Session Report: {completedTrialLead.childName}
                  </h3>
                  <p className="text-slate-500 text-xs mt-1">
                    Our tutor has finalized the evaluation. Review the results
                    below to unlock enrollment.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white px-3 py-2 rounded-xl border border-orange-100 flex flex-col items-center">
                    <span className="text-[9px] font-bold text-slate-400 uppercase">
                      Assessment
                    </span>
                    <span className="text-sm font-bold text-orange-600">
                      Level {trialSession?.recommendedLevel || "1"}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowEnroller(true)}
                    className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10"
                  >
                    Apply to Heritage Plan
                  </button>
                </div>
              </div>

              {trialSession?.evaluation && (
                <div className="mt-4 bg-white/80 p-5 rounded-2xl border border-orange-200/50 relative group">
                  <div className="text-[11px] text-slate-600 italic leading-relaxed">
                    "{trialSession.evaluation}"
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Users size={12} />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
                        Tutor Evaluation Report
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-medium">
                      Verified by Heritage Academic Team
                    </p>
                  </div>
                  <div className="absolute top-4 right-4 text-orange-200 group-hover:text-orange-300 transition-colors">
                    <BookOpen size={16} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === "dashboard" && (
        <>
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight">
                Parent Dashboard
              </h1>
              <p className="text-slate-500 text-sm">
                Welcome back, {user?.displayName || "Parent"}. Our next session
                is ready.
              </p>
            </div>
            <div className="flex gap-3">
              <button className="btn-secondary text-xs px-4 py-2 bg-white">
                <MessageCircle size={14} />
                Message Tutor
              </button>
              <button className="btn-primary text-xs px-4 py-2 shadow-none">
                Manage Billing
              </button>
            </div>
          </header>

          {/* Multi-student child selector tabs */}
          {allProfiles.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 p-3 bg-white border border-slate-100 rounded-2xl shadow-sm mt-4 animate-in fade-in duration-300">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-2">Active Profile:</span>
              <div className="flex flex-wrap gap-1.5 border-l border-slate-200 pl-3">
                {allProfiles.map((std: any, idx: number) => {
                  const selected = activeProfileIndex === idx;
                  const subjects = Array.isArray(std.subjects) ? std.subjects : ['Amharic'];
                  const isLead = std.type === 'lead';
                  return (
                    <button
                      key={std.key}
                      type="button"
                      onClick={() => setActiveProfileIndex(idx)}
                      className={cn(
                        "px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5",
                        selected
                          ? "bg-primary text-white shadow-md shadow-primary/10"
                          : "bg-slate-50 text-slate-650 hover:bg-slate-100 border border-slate-105"
                      )}
                    >
                      <span>{isLead ? "⌛" : "👦"} {std.name}</span>
                      <span className={cn(
                        "text-[9px] px-1.5 py-0.5 rounded font-extrabold uppercase",
                        selected
                          ? "bg-white/20 text-white"
                          : isLead
                            ? "bg-amber-100 text-amber-800 border border-amber-205"
                            : "bg-primary/5 text-primary"
                      )}>
                        {isLead ? "Trial Phase" : subjects.join(' & ')}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Kid Profile & Next Session */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-10 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-10 items-center">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-slate-100 rounded-2xl overflow-hidden ring-4 ring-slate-50 flex items-center justify-center text-slate-300 transition-all group-hover:scale-105">
                    {primaryStudent?.photoUrl ? (
                      <img
                        src={primaryStudent.photoUrl}
                        className="w-full h-full object-cover grayscale-[20%]"
                        alt="child"
                      />
                    ) : (
                      <TrendingUp size={48} />
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-secondary text-white px-2 py-1 rounded-md text-[10px] font-bold shadow-lg ring-2 ring-white uppercase">
                    {primaryStudent?.level
                      ? `Level ${primaryStudent.level}`
                      : "Assessment Pending"}
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="flex flex-col md:flex-row md:items-center gap-3 mb-3">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {primaryStudent?.name || "Your Child"}
                    </h2>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest border",
                        parentData
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : "bg-orange-50 text-orange-600 border-orange-100",
                      )}
                    >
                      {parentData
                        ? "Verified Enrollment"
                        : completedTrialLead
                          ? "Trial Completed"
                          : "Lead Status"}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-6 max-w-md leading-relaxed">
                    {primaryStudent?.learningGoal ||
                      "Waiting for enrollment to focus on heritage language fluency and Amharic sentence structure."}
                  </p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-8">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-primary">
                        <TrendingUp size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Attendance
                        </p>
                        <p className="font-bold text-sm text-slate-900">
                          {primaryStudent?.attendance || "0%"} Weekly
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-primary">
                        <Clock size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          Completed
                        </p>
                        <p className="font-bold text-sm text-slate-900">
                          {primaryStudent?.sessionsCompleted || 0} Sessions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm flex flex-col">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-bold text-slate-900">
                    Upcoming Sessions
                  </h3>
                  <button className="text-[10px] font-bold text-secondary flex items-center gap-1 hover:underline uppercase tracking-widest">
                    Full Calendar
                    <ChevronRight size={14} />
                  </button>
                </div>

                <div className="grid gap-4">
                  {sessions.map((s, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-5 bg-slate-50 rounded-xl border border-transparent hover:border-slate-200 transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white border border-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-900 shadow-sm text-sm">
                          {formatSafeDate(s.startTime, { weekday: "short" }) ||
                            "Day"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 leading-tight">
                            {formatSafeDate(s.startTime, { weekday: "long" }) ||
                              "Scheduled"}
                          </p>
                          <p className="text-[11px] text-slate-400 font-medium">
                            {formatSafeDate(s.startTime, {
                              hour: "2-digit",
                              minute: "2-digit",
                            }) || "00:00"}{" "}
                            • with {s.tutorName || "Teacher"}
                          </p>
                        </div>
                      </div>
                      {s.status === "scheduled" && (
                        (() => {
                          const studentDoc = parentData?.students?.find((item: any) => item.id === s.studentId);
                          const isExpired = studentDoc?.status === "expired" || (studentDoc && studentDoc.remainingClassCredits !== undefined && studentDoc.remainingClassCredits <= 0);
                          
                          if (isExpired) {
                            return (
                              <span className="text-[9px] font-black uppercase text-red-650 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg tracking-wider flex items-center gap-1">
                                🔐 Expired / Locked
                              </span>
                            );
                          }
                          const assocTutor = tutors && s.tutorId ? tutors.find((t) => t.id === s.tutorId) : null;
                          const meetUrl = assocTutor?.classroomLink || "https://meet.google.com";
                          return (
                            <a 
                              href={meetUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary text-[10px] py-1.5 px-4 md:opacity-0 md:group-hover:opacity-100 transition-all uppercase tracking-widest shadow-none cursor-pointer text-center inline-block"
                            >
                              Enter Session
                            </a>
                          );
                        })()
                      )}
                    </div>
                  ))}
                  {sessions.length === 0 && (
                    <div className="py-12 text-center text-slate-400 text-xs italic font-medium bg-slate-50 rounded-xl border border-dashed border-slate-200">
                      No upcoming sessions found.
                    </div>
                  )}
                </div>
              </div>

              {/* Scheduler Component Gate for premium families */}
              {isTrialCompleted &&
                isPremiumActive &&
                (() => {
                  const student = activeStudent;
                  if (!student) return null;
                  const tutorId = student.tutorId;
                  const tutor = tutors.find((t) => t.id === tutorId);
                  const currentPlan = plans.find((p) => p.id === student.plan);
                  const requiredSlotsCount = currentPlan
                    ? currentPlan.sessions / 4
                    : 1;

                  const avail = getLocalAvailability(tutor?.availability);
                  if (!avail) {
                    return (
                      <div
                        id="scheduler-calendar-card"
                        className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-4"
                      >
                        <h3 className="font-bold text-slate-900 flex items-center gap-2">
                          <Calendar size={18} className="text-indigo-600" />
                          <span>Permanent Slot Scheduler</span>
                        </h3>
                        <p className="text-slate-500 text-xs italic">
                          Tutor's weekly accessibility configuration is
                          currently empty. Please coordinate with
                          Administration.
                        </p>
                      </div>
                    );
                  }

                  const activeDays = DAYS.filter(
                    (day) =>
                      avail[day]?.active && avail[day]?.slots?.length > 0,
                  );

                  const handleSaveSchedule = async () => {
                    setSavingSchedule(true);
                    setSaveScheduleStatus("idle");
                    const schedulePattern = selectedSlots.map((time) => {
                      const d = new Date(time);
                      return `${d.toLocaleDateString("en-US", { weekday: "long" })} @ ${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
                    });

                    const res = await updateStudentSchedule(
                      student.id,
                      selectedSlots,
                      schedulePattern,
                    );
                    if (res.success) {
                      setSaveScheduleStatus("success");
                      setTimeout(() => setSaveScheduleStatus("idle"), 3000);
                    } else {
                      setSaveScheduleStatus("error");
                    }
                    setSavingSchedule(false);
                  };

                  return (
                    <div
                      id="scheduler-calendar-card"
                      className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 animate-in slide-in-from-bottom duration-300"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div>
                          <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base">
                            <Calendar size={18} className="text-indigo-600" />
                            <span>Permanent Weekly Class Scheduler</span>
                          </h3>
                          <p className="text-slate-400 text-[11px] mt-1">
                            Book recurring weekly slots matching your assigned
                            tutor's setup.
                          </p>
                        </div>
                        <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] uppercase font-bold tracking-wider self-start">
                          {selectedSlots.length} / {requiredSlotsCount} Slots
                          Chosen
                        </div>
                      </div>

                      {/* Local Time Zone Context Indicator */}
                      <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-2">
                          <span className="text-sm">🌐</span>
                          <span>
                            All class hours are shown in:{" "}
                            <strong className="text-slate-800 font-bold">
                              {Intl.DateTimeFormat().resolvedOptions().timeZone}
                            </strong>
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-650 bg-indigo-50 font-bold px-2 py-0.5 rounded-md uppercase tracking-wide">
                          Local Context
                        </span>
                      </div>

                      <div className="space-y-6">
                        {activeDays.length === 0 ? (
                          <p className="text-xs text-slate-400 italic">
                            This tutor has not configured checked hours in their
                            availability grid yet.
                          </p>
                        ) : (
                          activeDays.map((day) => (
                            <div key={day} className="space-y-2">
                              <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest block capitalize">
                                {day}s
                              </span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {avail[day].slots.map(
                                  (sVal: any, idx: number) => {
                                    const slotTime = getSlotTimeString(sVal);
                                    const isSelected = selectedSlots.some(
                                      (rt) => {
                                        const d = new Date(rt);
                                        const t = d.toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: false,
                                        });
                                        const dStr = d
                                          .toLocaleDateString([], {
                                            weekday: "long",
                                          })
                                          .toLowerCase();
                                        return t === slotTime && dStr === day;
                                      },
                                    );

                                    return (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                          const now = new Date();
                                          const daysMap: any = {
                                            sunday: 0,
                                            monday: 1,
                                            tuesday: 2,
                                            wednesday: 3,
                                            thursday: 4,
                                            friday: 5,
                                            saturday: 6,
                                          };
                                          const targetDay = daysMap[day];
                                          const today = now.getDay();
                                          const daysUntil =
                                            (targetDay + 7 - today) % 7 || 7;
                                          const date = new Date(now);
                                          date.setDate(
                                            now.getDate() + daysUntil,
                                          );
                                          const [h, m] = slotTime
                                            .split(":")
                                            .map(Number);
                                          date.setHours(h, m, 0, 0);
                                          const iso = date.toISOString();

                                          if (isSelected) {
                                            setSelectedSlots(
                                              selectedSlots.filter((rt) => {
                                                const d = new Date(rt);
                                                const t = d.toLocaleTimeString(
                                                  [],
                                                  {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: false,
                                                  },
                                                );
                                                const ds = d
                                                  .toLocaleDateString([], {
                                                    weekday: "long",
                                                  })
                                                  .toLowerCase();
                                                return !(
                                                  t === slotTime && ds === day
                                                );
                                              }),
                                            );
                                          } else {
                                            if (
                                              selectedSlots.length <
                                              requiredSlotsCount
                                            ) {
                                              setSelectedSlots([
                                                ...selectedSlots,
                                                iso,
                                              ]);
                                            } else if (
                                              requiredSlotsCount === 1
                                            ) {
                                              setSelectedSlots([iso]);
                                            }
                                          }
                                        }}
                                        className={cn(
                                          "px-3 py-2 rounded-xl text-xs font-bold transition-all border text-center flex flex-col justify-center items-center gap-0.5",
                                          isSelected
                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10 scale-102"
                                            : "bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50",
                                        )}
                                      >
                                        <span className="text-[8px] uppercase tracking-wider opacity-60">
                                          {isSelected
                                            ? "Selected"
                                            : "Click to Book"}
                                        </span>
                                        {parseInt(
                                          slotTime.split(":")[0] || "9",
                                        ) >= 12
                                          ? `${parseInt(slotTime.split(":")[0] || "12") === 12 ? 12 : parseInt(slotTime.split(":")[0] || "12") - 12}:00 PM`
                                          : `${parseInt(slotTime.split(":")[0] || "9")}:00 AM`}
                                      </button>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <p className="text-[9px] text-slate-400 max-w-sm">
                          Select exactly {requiredSlotsCount} permanent{" "}
                          {requiredSlotsCount === 1 ? "slot" : "slots"} matching
                          your current <strong>{currentPlan?.name}</strong>{" "}
                          plan.
                        </p>
                        <button
                          type="button"
                          disabled={
                            savingSchedule ||
                            selectedSlots.length !== requiredSlotsCount
                          }
                          onClick={handleSaveSchedule}
                          className="btn-primary self-end flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs disabled:opacity-50 font-bold shadow-md"
                        >
                          {savingSchedule ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          <span>Save Permanent Slots</span>
                        </button>
                      </div>

                      {saveScheduleStatus === "success" && (
                        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-emerald-800 text-[11px] font-semibold animate-in slide-in-from-top duration-300">
                          <span>✅</span>
                          <span>
                            Permanent schedule updated successfully. Invitation
                            alerts dispatched inside live ledger databases.
                          </span>
                        </div>
                      )}
                      {saveScheduleStatus === "error" && (
                        <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2 text-red-800 text-[11px] font-semibold">
                          <span>⚠️</span>
                          <span>
                            Failed to synchronize permanent calendar bookings.
                            Please contact admin.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()}
            </div>

            {/* Subscription Sidebar */}
            <div className="space-y-6">
              <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden shadow-xl">
                <div className="relative z-10">
                  <ShieldCheck className="text-secondary mb-8" size={32} />
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold tracking-tight">
                      {activeStudent?.plan
                        ? `Plan: ${plans.find((p) => p.id === activeStudent.plan)?.name || activeStudent.plan}`
                        : "Heritage Enrollment"}
                    </h3>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded-md uppercase border",
                        activeStudent
                          ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                          : "bg-orange-500/20 text-orange-400 border-orange-500/30",
                      )}
                    >
                      {activeStudent
                        ? "Active"
                        : completedTrialLead
                          ? "Ready"
                          : "Inactive"}
                    </span>
                  </div>
                  <p className="text-slate-400 mb-8 text-xs">
                    {activeStudent
                      ? `Active enrollment for ${activeStudent.name}. View full billing details in portal.`
                      : completedTrialLead
                        ? "Trial complete! Unlock full features by subscribing to a plan."
                        : "Please complete your evaluation to start regular sessions."}
                  </p>

                  {activeStudent?.plan && (
                    <div className="space-y-3 mb-8">
                      <div className="flex justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-400 font-medium">
                          Frequency
                        </span>
                        <span className="font-bold">Weekly Sessions</span>
                      </div>
                      <div className="flex justify-between text-xs py-2 border-b border-white/5">
                        <span className="text-slate-400 font-medium">
                          Billed On
                        </span>
                        <span className="font-bold">Next cycle: June 18</span>
                      </div>
                    </div>
                  )}

                  {!activeStudent && !isTrialPhase && (
                    <button
                      onClick={() => setShowEnroller(true)}
                      className="btn-secondary w-full text-xs font-bold uppercase tracking-widest text-slate-900 border-none animate-bounce shadow-lg shadow-secondary/20"
                    >
                      Complete Enrollment
                    </button>
                  )}
                </div>
                <div className="absolute top-0 right-0 p-8 transform rotate-12 opacity-[0.03]">
                  <CreditCard size={120} />
                </div>
              </div>

              {/* Learning library card */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 rounded-2xl border border-primary/20 relative overflow-hidden shadow-sm">
                <div className="relative z-10 flex flex-col items-start text-left">
                  <div className="p-2 bg-primary/20 text-primary-950 rounded-xl mb-3">
                    <BookOpen size={18} />
                  </div>
                  <h4 className="font-extrabold text-slate-900 text-sm mb-1.5 font-sans">
                    Amharic Global Library
                  </h4>
                  <p className="text-[11px] text-slate-550 mb-4 leading-relaxed">
                    Interactive kid-friendly slides, fidel spelling cards, and visual Ge'ez vocabulary matrices.
                  </p>
                  <button
                    onClick={() => setLibraryOpen(true)}
                    className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary/95 text-white text-[10px] font-bold uppercase tracking-widest transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen size={13} />
                    <span>Open Global Library</span>
                  </button>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">
                  Need to reschedule?
                </h4>
                <p className="text-[11px] text-slate-400 mb-6 leading-relaxed">
                  Can't make it to a session? Request a make-up session 12h in
                  advance via private parent WhatsApp.
                </p>
                <button className="w-full py-2.5 rounded-lg border border-dashed border-slate-200 text-[10px] font-bold text-slate-400 hover:text-slate-900 hover:border-slate-400 transition-all uppercase tracking-widest">
                  Contact WhatsApp Support
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* VIEW B: SCHEDULE / CALENDAR SLOT BOOKING VIEW */}
      {activeTab === "schedule" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-left font-sans">
              <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight">
                Class Scheduler
              </h1>
              <p className="text-slate-500 text-sm">
                Reserve and modify your localized recurring weekly calendar
                slots.
              </p>
            </div>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {isTrialCompleted && isPremiumActive ? (
                (() => {
                  const student = activeStudent;
                  if (!student) return null;
                  const tutorId = student.tutorId;
                  const tutor = tutors.find((t) => t.id === tutorId);
                  const currentPlan = plans.find((p) => p.id === student.plan);
                  const requiredSlotsCount = currentPlan
                    ? currentPlan.sessions / 4
                    : 1;

                  const avail = getLocalAvailability(tutor?.availability);
                  if (!avail) {
                    return (
                      <div className="bg-white p-8 rounded-2xl border border-slate-105 shadow-sm space-y-4 text-center py-12">
                        <Calendar
                          size={32}
                          className="text-slate-350 mx-auto"
                        />
                        <p className="text-slate-500 text-xs italic font-sans text-center">
                          Tutor's weekly accessibility configuration is
                          currently empty. Please coordinate with
                          Administration.
                        </p>
                      </div>
                    );
                  }

                  const activeDays = DAYS.filter(
                    (day) =>
                      avail[day]?.active && avail[day]?.slots?.length > 0,
                  );

                  const handleSaveScheduleCombined = async () => {
                    setSavingSchedule(true);
                    setSaveScheduleStatus("idle");
                    const schedulePattern = selectedSlots.map((time) => {
                      const d = new Date(time);
                      return `${d.toLocaleDateString("en-US", { weekday: "long" })} @ ${d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`;
                    });

                    const res = await updateStudentSchedule(
                      student.id,
                      selectedSlots,
                      schedulePattern,
                    );
                    if (res.success) {
                      setSaveScheduleStatus("success");
                      setTimeout(() => setSaveScheduleStatus("idle"), 3000);
                    } else {
                      setSaveScheduleStatus("error");
                    }
                    setSavingSchedule(false);
                  };

                  return (
                    <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
                        <div className="text-left">
                          <h3 className="font-bold text-slate-900 flex items-center gap-2 text-base font-sans">
                            <Calendar size={18} className="text-indigo-600" />
                            <span>Permanent Weekly Class Scheduler</span>
                          </h3>
                          <p className="text-slate-400 text-[11px] mt-1 font-sans">
                            Book recurring weekly slots matching your assigned
                            tutor's setup.
                          </p>
                        </div>
                        <div className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-xl text-[10px] uppercase font-bold tracking-wider self-start font-sans">
                          {selectedSlots.length} / {requiredSlotsCount} Slots
                          Chosen
                        </div>
                      </div>

                      {/* Local Time Zone Context Indicator */}
                      <div className="bg-slate-50 border border-slate-150 p-3.5 rounded-2xl flex items-center justify-between text-[11px] text-slate-500 font-medium">
                        <div className="flex items-center gap-2 font-sans text-left">
                          <span className="text-sm">🌐</span>
                          <span>
                            All class hours are shown in:{" "}
                            <strong className="text-slate-800 font-bold">
                              {Intl.DateTimeFormat().resolvedOptions().timeZone}
                            </strong>
                          </span>
                        </div>
                        <span className="text-[10px] text-indigo-650 bg-indigo-50 font-bold px-2 py-0.5 rounded-md uppercase tracking-wide font-mono">
                          Local Context
                        </span>
                      </div>

                      <div className="space-y-6">
                        {activeDays.length === 0 ? (
                          <p className="text-xs text-slate-400 italic font-sans text-left">
                            This tutor has not configured checked hours in their
                            availability grid yet.
                          </p>
                        ) : (
                          activeDays.map((day) => (
                            <div key={day} className="space-y-2 text-left">
                              <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-widest block capitalize font-sans">
                                {day}s
                              </span>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                {avail[day].slots.map(
                                  (sVal: any, idx: number) => {
                                    const slotTime =
                                      typeof sVal === "string"
                                        ? sVal
                                        : sVal?.time || "09:00";
                                    const isSelected = selectedSlots.some(
                                      (rt) => {
                                        const d = new Date(rt);
                                        const t = d.toLocaleTimeString([], {
                                          hour: "2-digit",
                                          minute: "2-digit",
                                          hour12: false,
                                        });
                                        const dStr = d
                                          .toLocaleDateString([], {
                                            weekday: "long",
                                          })
                                          .toLowerCase();
                                        return t === slotTime && dStr === day;
                                      },
                                    );

                                    return (
                                      <button
                                        key={idx}
                                        type="button"
                                        onClick={() => {
                                          const now = new Date();
                                          const daysMap: any = {
                                            sunday: 0,
                                            monday: 1,
                                            tuesday: 2,
                                            wednesday: 3,
                                            thursday: 4,
                                            friday: 5,
                                            saturday: 6,
                                          };
                                          const targetDay = daysMap[day];
                                          const today = now.getDay();
                                          const daysUntil =
                                            (targetDay + 7 - today) % 7 || 7;
                                          const date = new Date(now);
                                          date.setDate(
                                            now.getDate() + daysUntil,
                                          );
                                          const [h, m] = slotTime
                                            .split(":")
                                            .map(Number);
                                          date.setHours(h, m, 0, 0);
                                          const iso = date.toISOString();

                                          if (isSelected) {
                                            setSelectedSlots(
                                              selectedSlots.filter((rt) => {
                                                const d = new Date(rt);
                                                const t = d.toLocaleTimeString(
                                                  [],
                                                  {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                    hour12: false,
                                                  },
                                                );
                                                const ds = d
                                                  .toLocaleDateString([], {
                                                    weekday: "long",
                                                  })
                                                  .toLowerCase();
                                                return !(
                                                  t === slotTime && ds === day
                                                );
                                              }),
                                            );
                                          } else {
                                            if (
                                              selectedSlots.length <
                                              requiredSlotsCount
                                            ) {
                                              setSelectedSlots([
                                                ...selectedSlots,
                                                iso,
                                              ]);
                                            } else if (
                                              requiredSlotsCount === 1
                                            ) {
                                              setSelectedSlots([iso]);
                                            }
                                          }
                                        }}
                                        className={cn(
                                          "px-3 py-2.5 rounded-xl text-xs font-bold transition-all border text-center flex flex-col justify-center items-center gap-0.5 font-sans cursor-pointer",
                                          isSelected
                                            ? "bg-indigo-600 border-indigo-600 text-white shadow-md shadow-indigo-600/10 scale-102"
                                            : "bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-100/50",
                                        )}
                                      >
                                        <span className="text-[8px] uppercase tracking-wider opacity-60">
                                          {isSelected
                                            ? "Selected"
                                            : "Click to Book"}
                                        </span>
                                        {parseInt(
                                          slotTime.split(":")[0] || "9",
                                        ) >= 12
                                          ? `${parseInt(slotTime.split(":")[0] || "12") === 12 ? 12 : parseInt(slotTime.split(":")[0] || "12") - 12}:00 PM`
                                          : `${parseInt(slotTime.split(":")[0] || "9")}:00 AM`}
                                      </button>
                                    );
                                  },
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <p className="text-[9px] text-slate-400 max-w-sm text-left font-sans">
                          Select exactly {requiredSlotsCount} permanent{" "}
                          {requiredSlotsCount === 1 ? "slot" : "slots"} matching
                          your current <strong>{currentPlan?.name}</strong>{" "}
                          plan.
                        </p>
                        <button
                          type="button"
                          disabled={
                            savingSchedule ||
                            selectedSlots.length !== requiredSlotsCount
                          }
                          onClick={handleSaveScheduleCombined}
                          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs disabled:opacity-50 font-bold shadow-md font-sans cursor-pointer"
                        >
                          {savingSchedule ? (
                            <Loader2 className="animate-spin" size={14} />
                          ) : (
                            <CheckCircle2 size={14} />
                          )}
                          <span>Save Permanent Slots</span>
                        </button>
                      </div>

                      {saveScheduleStatus === "success" && (
                        <div className="bg-emerald-50 border border-emerald-100 p-3 rounded-xl flex items-center gap-2 text-emerald-800 text-[11px] font-semibold animate-in slide-in-from-top duration-300 font-sans text-left">
                          <span>✅</span>
                          <span>
                            Permanent schedule updated successfully. Invitation
                            alerts dispatched inside live ledger databases.
                          </span>
                        </div>
                      )}
                      {saveScheduleStatus === "error" && (
                        <div className="bg-red-50 border border-red-100 p-3 rounded-xl flex items-center gap-2 text-red-800 text-[11px] font-semibold font-sans text-left">
                          <span>⚠️</span>
                          <span>
                            Failed to synchronize permanent calendar bookings.
                            Please contact admin.
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })()
              ) : (
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm text-center py-16 space-y-6">
                  <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto shadow-md">
                    <Calendar size={32} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-900 tracking-tight font-sans text-center">
                      Scheduler Deactivated
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed max-w-sm mx-auto font-sans text-center">
                      Once you completed your trial and subscribed to an active
                      plan (Heritage Pro/Standard/Mastery), your
                      timezone-sensitive recurring slot matrix will unlock here.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setShowEnroller(true)}
                      className="bg-slate-900 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg font-sans cursor-pointer"
                    >
                      Complete Academy Enrollment
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <h4 className="font-extrabold text-slate-900 text-sm text-left font-sans">
                  Upcoming Calendar Items
                </h4>
                <div className="space-y-3">
                  {sessions.slice(0, 3).map((s, i) => (
                    <div
                      key={i}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-101 text-xs flex justify-between items-center font-sans text-left"
                    >
                      <div>
                        <p className="font-bold text-slate-805">
                          {formatSafeDate(s.startTime, { weekday: "long" })}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                          {formatSafeDate(s.startTime, {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      <span className="text-[9px] bg-indigo-50 text-indigo-600 font-bold px-2 py-0.5 rounded uppercase font-mono">
                        Regular
                      </span>
                    </div>
                  ))}
                  {sessions.length === 0 && (
                    <p className="text-slate-400 text-xs italic font-sans text-left">
                      No items scheduled.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW C: BILLING / TUITION FEES PORTAL */}
      {activeTab === "billing" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="text-left font-sans">
              <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight">
                Tuition & Billing
              </h1>
              <p className="text-slate-500 text-sm">
                Submit monthly remittance receipts and manage your active
                subscriptions.
              </p>
            </div>
          </header>

          <div className="bg-white rounded-3xl border border-slate-150 shadow-sm p-8 space-y-8">
            <div className="max-w-2xl text-left">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 font-sans tracking-tight">
                Manual Payment Verification Center
              </h2>
              <p className="text-slate-500 text-xs font-sans">
                Please pay your tuition using one of our verified local or
                international options below, then provide your secure
                transaction reference receipt.
              </p>
            </div>

            <div className="p-6 bg-slate-900 text-white rounded-2xl relative overflow-hidden flex flex-col md:flex-row justify-between gap-6 text-left animate-in slide-in-from-top duration-300">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-sans">
                  Current Plan Status
                </span>
                <h4 className="text-lg font-bold mt-2 font-sans text-white">
                  {activeStudent?.plan
                    ? `Heritage ${activeStudent.plan.toUpperCase()} Tier`
                    : "Unsubscribed"}
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Heritage Private Studio sessions with native Amharic speakers
                </p>
              </div>
              <div className="flex items-baseline gap-1 md:self-end font-mono text-white">
                <span className="text-2xl font-black">
                  $
                  {activeStudent?.plan
                    ? plans.find((p) => p.id === activeStudent.plan)
                        ?.price || "160"
                    : "0"}
                </span>
                <span className="text-xs opacity-60 font-sans">/ month</span>
              </div>
            </div>

            {/* CBE, Telebirr, and Diaspora Receipt Form */}
            <div className="bg-slate-50 rounded-[28px] p-6 border border-slate-150 space-y-6 text-left border-dashed">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2 font-sans">
                <CreditCard size={16} className="text-primary" />
                <span>Submit Monthly Payment Screenshot</span>
              </h3>

              {/* Payment Type Buttons */}
              <div className="space-y-3">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block text-left font-sans">
                  Select Remit Channel
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentType("telebirr")}
                    className={cn(
                      "p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer bg-white font-sans",
                      paymentType === "telebirr"
                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/10"
                        : "border-slate-150 hover:border-slate-300",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "w-3 h-3 rounded-full border flex items-center justify-center shrink-0",
                          paymentType === "telebirr"
                            ? "border-primary text-primary"
                            : "border-slate-300",
                        )}
                      >
                        {paymentType === "telebirr" && (
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        )}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800">
                        Telebirr (Ethiopia)
                      </span>
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                      Mobile wallet
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("cbe")}
                    className={cn(
                      "p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer bg-white font-sans",
                      paymentType === "cbe"
                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/10"
                        : "border-slate-150 hover:border-slate-300",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "w-3 h-3 rounded-full border flex items-center justify-center shrink-0",
                          paymentType === "cbe"
                            ? "border-primary text-primary"
                            : "border-slate-300",
                        )}
                      >
                        {paymentType === "cbe" && (
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        )}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800">
                        CBE Birr / Bank
                      </span>
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                      Bank Transfer
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentType("international")}
                    className={cn(
                      "p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer bg-white font-sans",
                      paymentType === "international"
                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/10"
                        : "border-slate-150 hover:border-slate-300",
                    )}
                  >
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "w-3 h-3 rounded-full border flex items-center justify-center shrink-0",
                          paymentType === "international"
                            ? "border-primary text-primary"
                            : "border-slate-300",
                        )}
                      >
                        {paymentType === "international" && (
                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                        )}
                      </span>
                      <span className="text-[11px] font-bold text-slate-800">
                        International
                      </span>
                    </div>
                    <span className="text-[8px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                      Zelle, Remitly, etc.
                    </span>
                  </button>
                </div>
              </div>

              {/* Instructions text */}
              {paymentType === "telebirr" && (
                <div className="p-4 bg-white border border-slate-150 rounded-xl space-y-1.5 text-xs text-slate-600 animate-in fade-in duration-205 text-left font-sans">
                  <span className="text-[9px] uppercase font-bold text-primary tracking-wider block">
                    Telebirr Account Instructions:
                  </span>
                  <p className="leading-relaxed text-[11px]">
                    Send the subscription fee of{" "}
                    <strong className="text-slate-900 font-extrabold font-mono">
                      $
                      {activeStudent?.plan
                        ? plans.find(
                            (p) => p.id === activeStudent.plan,
                          )?.price || "240"
                        : "240"}
                    </strong>{" "}
                    directly to our verified merchant code:{" "}
                    <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-1.5 py-0.5 rounded">
                      882910
                    </strong>{" "}
                    or transfer to Telebirr mobile number{" "}
                    <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-1.5 py-0.5 rounded">
                      +251 912 345 678
                    </strong>{" "}
                    (under company name: <strong>Abyssinia Academy</strong>).
                  </p>
                </div>
              )}

              {paymentType === "cbe" && (
                <div className="p-4 bg-white border border-slate-150 rounded-xl space-y-1.5 text-xs text-slate-600 animate-in fade-in duration-205 text-left font-sans">
                  <span className="text-[9px] uppercase font-bold text-primary tracking-wider block font-sans">
                    CBE Account Bank Instructions:
                  </span>
                  <p className="leading-relaxed text-[11px]">
                    Deposit or wire transfer your tuition fee directly to CBE
                    corporate account name{" "}
                    <strong>Abyssinia Tutors Language School</strong>:<br />
                    <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-2.5 py-0.5 rounded mt-1 inline-block">
                      ID: 1000492811726
                    </strong>
                  </p>
                </div>
              )}

              {paymentType === "international" && (
                <div className="p-4 bg-white border border-slate-150 rounded-xl space-y-3 text-xs text-slate-600 animate-in fade-in duration-205 text-left font-sans">
                  <span className="text-[9px] uppercase font-bold text-primary tracking-wider block font-sans font-black">
                    International Instruction Guidelines:
                  </span>
                  <div className="space-y-2.5 leading-relaxed text-[11px]">
                    <div>
                      <p className="font-bold text-slate-900">🔹 US Parents:</p>
                      <p className="text-slate-500 pl-4">
                        Zelle payments can be dispatched directly to our secure
                        US payment endpoint:{" "}
                        <strong className="font-bold text-slate-800 font-mono">
                          payment@heritageacademy.com
                        </strong>
                        .
                      </p>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">
                        🔹 Canada, UK, Europe, & Australia Parents:
                      </p>
                      <p className="text-slate-500 pl-4">
                        Submit via reliable global transaction systems such as{" "}
                        <strong className="text-slate-850 font-bold">
                          Remitly
                        </strong>{" "}
                        or{" "}
                        <strong className="text-slate-850 font-bold">
                          Sendwave
                        </strong>{" "}
                        directly to our US Zelle address (
                        <strong className="text-slate-800 font-mono">
                          payment@heritageacademy.com
                        </strong>
                        ) or as a mobile envelope deposit to corporate Telebirr
                        number (
                        <strong className="text-slate-800 font-mono">
                          +251 912 345 678
                        </strong>
                        ).
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Secure Inputs */}
              <div className="border-t border-slate-150 pt-4 space-y-3">
                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block text-left font-sans">
                  Secure Payment Verification Details
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-left">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block text-left font-sans">
                      Transaction Reference ID{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CBE-TXN-9817 / Zelle ID 182"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      className="w-full bg-white border border-slate-205 rounded-lg px-3 py-2 text-xs text-slate-850 font-mono outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block text-left font-sans">
                      Uploader Screenshot{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <div className="relative border border-dashed border-slate-205 bg-white rounded-lg hover:bg-slate-50/50 transition-colors cursor-pointer flex items-center justify-between p-2">
                      <input
                        type="file"
                        id="billing-receipt-upload"
                        accept="image/*,application/pdf"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setReceiptScreenshotName(file.name);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                      />
                      <div className="flex items-center gap-1.5 max-w-[170px] truncate">
                        <span className="text-xs">📎</span>
                        <span className="text-[10px] font-bold text-slate-500 truncate font-sans">
                          {receiptScreenshotName || "Attach snapshot..."}
                        </span>
                      </div>
                      <span className="text-[8px] font-bold uppercase bg-slate-50 hover:bg-slate-100 px-2 py-1.5 rounded-md border text-slate-700 tracking-wider font-sans">
                        Browse
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Monthly receipt */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => {
                  if (!transactionRef || !receiptScreenshotName) {
                    alert(
                      "Please fill in the Transaction Reference ID and attach a valid Screenshot Receipt.",
                    );
                    return;
                  }
                  if (activeStudent) {
                    handleRenewal(activeStudent);
                  } else {
                    alert(
                      "No enrolled student found to credit payment to. Contact support.",
                    );
                  }
                }}
                disabled={
                  isRenewing || !transactionRef || !receiptScreenshotName
                }
                className="bg-primary text-white font-bold px-10 py-3.5 rounded-2xl text-xs uppercase tracking-widest hover:bg-primary/95 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg font-sans cursor-pointer"
              >
                {isRenewing ? (
                  <Loader2 className="animate-spin" size={16} />
                ) : (
                  <CheckCircle2 size={16} />
                )}
                <span>Transmit Monthly Remittance</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* VIEW D: ACADEMIC PROGRESS */}
      {activeTab === "progress" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 font-sans">
            <div className="text-left">
              <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight">
                Academic Progress
              </h1>
              <p className="text-slate-500 text-sm">
                Review vocabulary milestones and teacher session comments.
              </p>
            </div>
          </header>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-2xl border border-slate-100 shadow-sm space-y-6 text-left">
                <h3 className="font-bold text-slate-900 text-base font-sans">
                  Tutor Classroom Remarks
                </h3>

                {/* Official trial session remarks from Firestore document */}
                {trialSession?.evaluation ? (
                  <div className="bg-orange-50/50 border border-orange-100 p-5 rounded-xl space-y-3 text-left">
                    <p className="text-[10px] uppercase font-black text-orange-600 tracking-wider font-sans">
                      Trial Session Assessment
                    </p>
                    <p className="text-slate-700 italic text-xs leading-relaxed font-sans">
                      "{trialSession.evaluation}"
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400 font-sans">
                      <span>
                        👤 Tutor: {trialSession.tutorName || "Assigned Tutor"}
                      </span>
                      <span>
                        • Recommendation: Level{" "}
                        {trialSession.recommendedLevel || "1"}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="p-4 bg-slate-50 rounded-xl text-center text-slate-400 italic text-xs font-sans">
                    No standardized evaluation posted for this active profile.
                  </div>
                )}

                {/* Class Lesson logs placeholder feedback queue */}
                <div className="space-y-4">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block font-sans">
                    Class Remarks History
                  </span>
                  <div className="border border-slate-100 rounded-xl divide-y divide-slate-100 overflow-hidden bg-slate-50/20">
                    <div className="p-5 space-y-2 text-left">
                      <div className="flex justify-between items-start font-sans">
                        <p className="font-bold text-slate-905 text-xs text-indigo-700">
                          Ge'ez Alphabets & Vowel Reading
                        </p>
                        <span className="text-[8px] font-bold font-mono text-slate-400">
                          MAY 18, 2026
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        "Your child performed exceptionally today! Correctly
                        pronounced all vowel sounds and identified 10 baseline
                        Amharic consonants. We practiced greeting structures
                        with excellent engagement. Recommendation: Please review
                        Consonant flashcards."
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold font-sans">
                        • Logged by{" "}
                        {sessions[0]?.tutorName || "Heritage Native Speaker"}
                      </p>
                    </div>

                    <div className="p-5 space-y-2 text-left">
                      <div className="flex justify-between items-start font-sans">
                        <p className="font-bold text-slate-905 text-xs">
                          Sentence Structures & Possessive Pronouns
                        </p>
                        <span className="text-[8px] font-bold font-mono text-slate-400">
                          MAY 11, 2026
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 leading-relaxed font-sans">
                        "Great lesson focus on personal pronouns (I, You, He,
                        She) and possessive terminology. Excellent pronunciation
                        clarity displayed during oral quizzes. Participation and
                        focus metrics remain at 100%!"
                      </p>
                      <p className="text-[10px] text-slate-400 font-semibold font-sans">
                        • Logged by{" "}
                        {sessions[0]?.tutorName || "Heritage Native Speaker"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4 text-left">
                <h4 className="font-extrabold text-slate-900 text-sm font-sans font-black">
                  Roster Summary
                </h4>
                <div className="space-y-3.5 font-sans">
                  <div className="flex justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-400">Assigned Level</span>
                    <span className="font-bold text-slate-800">
                      Level{" "}
                      {primaryStudent?.level ||
                        trialSession?.recommendedLevel ||
                        "1"}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1 border-b border-slate-50">
                    <span className="text-slate-400">Total Completed</span>
                    <span className="font-bold text-slate-800">
                      {primaryStudent?.sessionsCompleted || 0} Lessons
                    </span>
                  </div>
                  <div className="flex justify-between text-xs py-1">
                    <span className="text-slate-400">Attendance Index</span>
                    <span className="font-bold text-slate-800">
                      {primaryStudent?.attendance || "100%"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW E: PRIVATE SETTINGS / PARENT PROFILE MANAGEMENT */}
      {activeTab === "settings" && (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
          <header className="mb-2 text-left font-sans">
            <h1 className="text-3xl font-bold text-primary mb-1 tracking-tight text-left font-sans">
              Parent Settings
            </h1>
            <p className="text-slate-505 text-sm text-left">
              Review your local contact information, child registration, and
              class tier.
            </p>
          </header>

          <form
            id="parent-profile-settings-form"
            onSubmit={handleSaveSettings}
            className="bg-white rounded-3xl border border-slate-150 shadow-sm p-8 space-y-8 font-sans"
          >
            <h3 className="font-semibold text-slate-900 text-sm border-b border-slate-100 pb-3 flex items-center gap-2 text-left font-sans">
              <Settings size={16} className="text-primary animate-spin-slow" />
              <span>Parent Profile Management</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block font-sans">
                  Parent Contact Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Almaz Bekele"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-primary focus:bg-white focus:border-primary transition-all font-bold shadow-none"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block font-sans">
                  WhatsApp Phone Number
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +251 911 223 344"
                  value={profileWhatsApp}
                  onChange={(e) => setProfileWhatsApp(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-primary focus:bg-white focus:border-primary transition-all font-bold shadow-none"
                />
                <p className="text-[9px] text-slate-400 mt-1 pl-1">
                  Crucial for receiving lesson rescheduling agreements and
                  classroom alerts.
                </p>
              </div>

              <div className="space-y-1.5 text-left font-sans">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block font-sans">
                  Child / Student's Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Martha Bekele"
                  value={childNameVal}
                  onChange={(e) => setChildNameVal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 outline-none focus:ring-1 focus:ring-primary focus:bg-white focus:border-primary transition-all font-bold shadow-none"
                />
              </div>

              <div className="space-y-1.5 text-left font-sans">
                <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest block">
                  Academy Subscription Level
                </label>
                <div className="px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl text-xs font-bold text-indigo-700 flex items-center justify-between shadow-none">
                  <span>
                    {activeStudent?.plan
                      ? `Heritage ${activeStudent.plan.toUpperCase()} Plan`
                      : "Unenrolled Roster"}
                  </span>
                  <span className="text-[9px] bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-md uppercase tracking-wider">
                    Read-Only Tier
                  </span>
                </div>
              </div>
            </div>

            {/* Error/success banners inside Settings */}
            {saveStatus === "success" && (
              <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl flex items-center gap-2 text-emerald-850 text-xs font-bold animate-in slide-in-from-top duration-200 text-left font-sans">
                <span>✅</span>
                <span>
                  Parent Account Details and child registrations updated
                  successfully. Database synchronized in real time.
                </span>
              </div>
            )}
            {saveStatus === "error" && (
              <div className="bg-red-50 border border-red-100 p-3.5 rounded-xl flex items-center gap-2 text-red-00 text-xs font-bold animate-in slide-in-from-top duration-200 text-left font-sans">
                <span>⚠️</span>
                <span>
                  Encountered an issue synchronizing user properties. Please try
                  again.
                </span>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={savingSettings}
                className="bg-primary text-white font-semibold px-8 py-3 rounded-xl text-xs uppercase tracking-widest hover:bg-primary/95 disabled:opacity-50 transition-all flex items-center gap-2 shadow-lg cursor-pointer font-sans"
              >
                {savingSettings ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  <Check size={14} />
                )}
                <span>Save Profile Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Enrollment & Subscription Modal */}
      {showEnroller && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-start justify-center p-4 md:p-10 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row my-auto">
            {/* Sidebar Info */}
            <div className="md:w-72 bg-slate-50 p-8 border-r border-slate-100 shrink-0">
              <div className="mb-8">
                <div className="w-12 h-12 bg-primary text-white rounded-xl flex items-center justify-center mb-4">
                  <CardIcon size={24} />
                </div>
                <h3 className="font-bold text-xl text-slate-900 tracking-tight">
                  Family Enrollment
                </h3>
                <p className="text-slate-500 text-xs mt-2 leading-relaxed">
                  Finalize your child's subscription and lock in your preferred
                  weekly session time.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Professional Heritage Curriculum
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    1-on-1 Dedicated Native Tutor
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <Check size={14} />
                  </div>
                  <p className="text-[11px] text-slate-600 font-medium">
                    Progress Reports & Evaluations
                  </p>
                </div>
              </div>
            </div>{" "}
            {/* Form Content */}
            <div className="flex-1 p-8 md:p-12 relative">
              <button
                onClick={() => setShowEnroller(false)}
                className="absolute top-8 right-8 p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>

              {loading ? (
                <div className="h-full flex flex-col items-center justify-center gap-4">
                  <Loader2 className="animate-spin text-secondary" size={32} />
                  <p className="text-sm text-slate-400 font-medium">
                    Syncing schedules...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnrollment} className="space-y-10">
                  {/* Step 1: Select Plan */}
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block text-left">
                      Step 1: Choose Subscription Plan or Credits Package
                    </label>
                    <div className="flex gap-4 p-1.5 bg-slate-100 rounded-2xl w-fit">
                      <button 
                        type="button"
                        onClick={() => {
                          setUseCustomCreditsNew(false);
                          setSelectedPlan(plans[1]); // Default to Pro
                        }}
                        className={cn(
                          "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                          !useCustomCreditsNew ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        Subscription Tiers
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setUseCustomCreditsNew(true);
                          setSelectedPlan(null);
                        }}
                        className={cn(
                          "px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                          useCustomCreditsNew ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
                        )}
                      >
                        Custom Credit Package
                      </button>
                    </div>

                    {!useCustomCreditsNew ? (
                      <div className="grid md:grid-cols-3 gap-4 animate-in fade-in duration-200">
                        {plans.map((plan) => (
                          <button
                            key={plan.id}
                            type="button"
                            onClick={() => setSelectedPlan(plan)}
                            className={cn(
                              "p-4 rounded-2xl border-2 text-left transition-all relative overflow-hidden cursor-pointer",
                              selectedPlan?.id === plan.id
                                ? "bg-primary text-white border-primary shadow-xl shadow-primary/20 scale-[1.02]"
                                : "bg-white text-slate-900 border-slate-100 hover:border-slate-200"
                            )}
                          >
                            <h4 className="font-bold text-sm truncate">
                              {plan.name}
                            </h4>
                            <p
                              className={cn(
                                "text-[10px] mt-1 font-medium",
                                selectedPlan?.id === plan.id
                                  ? "text-white/60"
                                  : "text-slate-400"
                              )}
                            >
                              {plan.description}
                            </p>
                            <div className="mt-4 flex items-baseline gap-1">
                              <span className="text-lg font-bold">
                                ${plan.price}
                              </span>
                              <span
                                className={cn(
                                  "text-[9px] font-medium opacity-60"
                                )}
                              >
                                /mo
                              </span>
                            </div>
                            {selectedPlan?.id === plan.id && (
                              <div className="absolute top-2 right-2 text-white/20">
                                <CheckCircle2 size={16} />
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="bg-slate-50 p-6 md:p-8 rounded-3xl border border-slate-150 space-y-6 animate-in fade-in duration-200 text-left">
                        <div>
                          <h4 className="font-extrabold text-sm text-slate-900">Configure Custom Credit Package</h4>
                          <p className="text-xs text-slate-400 mt-1">Purchase multi-month blocks or custom class counts at a flexible rate of $40 per session.</p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                          <div className="flex items-center gap-3">
                            <button 
                              type="button"
                              onClick={() => setCustomCreditQuantity(q => Math.max(4, q - 1))}
                              className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              -
                            </button>
                            <input 
                              type="number"
                              min={4}
                              max={48}
                              value={customCreditQuantity}
                              onChange={(e) => {
                                const val = parseInt(e.target.value) || 4;
                                setCustomCreditQuantity(Math.min(48, Math.max(4, val)));
                              }}
                              className="w-20 h-12 text-center bg-white border border-slate-200 rounded-xl font-bold text-base focus:outline-none focus:border-slate-400 font-mono"
                            />
                            <button 
                              type="button"
                              onClick={() => setCustomCreditQuantity(q => Math.min(48, q + 1))}
                              className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center font-bold text-lg text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                            >
                              +
                            </button>
                          </div>

                          <div className="flex-1 bg-white px-6 py-4 rounded-2xl border border-slate-100 flex items-center justify-between font-sans">
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block font-sans">Total Cost</span>
                              <span className="text-xl font-black text-slate-900 font-mono">${customCreditQuantity * 40}.00</span>
                            </div>
                            <div>
                              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block text-right font-sans">Included Classes</span>
                              <span className="text-xs font-bold text-indigo-600 block text-right font-sans">{customCreditQuantity} Tutoring Sessions</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Step 2: Schedule & Tutor */}
                  <div className="grid md:grid-cols-1 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Step 2: Choose Your Primary Tutor
                      </label>
                      {tutors.length === 0 ? (
                        <div className="p-8 border-2 border-dashed border-slate-100 rounded-2xl text-center">
                          <p className="text-xs text-slate-400 font-medium">
                            No tutors available at the moment. Please contact
                            support.
                          </p>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          {tutors.map((t) => (
                            <button
                              key={t.id}
                              type="button"
                              onClick={() => setSelectedTutorId(t.id)}
                              className={cn(
                                "p-4 rounded-2xl border text-left transition-all",
                                selectedTutorId === t.id
                                  ? "border-primary bg-primary/5 shadow-md ring-2 ring-primary/20"
                                  : "border-slate-100 bg-white hover:border-slate-300",
                              )}
                            >
                              <p className="font-bold text-sm text-slate-900">
                                {t.displayName || t.email}
                              </p>
                              <p className="text-[10px] text-slate-400 font-medium">
                                Native Heritage Speaker
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>{" "}
                    {selectedTutorId ? (
                      <>
                        <div className="space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                          <div className="flex items-center justify-between">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                Step 3: Select Weekly Schedule
                              </label>
                              <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                                Choose{" "}
                                {selectedPlan ? selectedPlan.sessions / 4 : 1}{" "}
                                regular times each week.
                              </p>
                            </div>
                            <div className="bg-secondary/10 text-secondary px-3 py-1.5 rounded-xl text-[10px] font-bold flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse"></div>
                              {recurringTimes.length} /{" "}
                              {selectedPlan ? selectedPlan.sessions / 4 : 1}{" "}
                              Selected
                            </div>
                          </div>
                          <div className="space-y-6">
                            {(() => {
                              const tutor = tutors.find(
                                (t) => t.id === selectedTutorId,
                              );
                              const localAvail = getLocalAvailability(
                                tutor?.availability,
                              );
                              if (!localAvail)
                                return (
                                  <div className="p-8 border-2 border-dashed border-slate-100 rounded-[32px] text-center text-slate-400 italic text-xs">
                                    No automated slots available. Please contact
                                    admin.
                                  </div>
                                );

                              const daysOrder = [
                                "monday",
                                "tuesday",
                                "wednesday",
                                "thursday",
                                "friday",
                                "saturday",
                                "sunday",
                              ];
                              const activeDays = daysOrder.filter(
                                (day) =>
                                  localAvail[day]?.active &&
                                  localAvail[day]?.slots?.length > 0,
                              );

                              if (activeDays.length === 0)
                                return (
                                  <div className="p-8 border-2 border-dashed border-slate-100 rounded-[32px] text-center text-slate-400 italic text-xs">
                                    This tutor has not published their weekly
                                    availability yet.
                                  </div>
                                );

                              return activeDays.map((day) => (
                                <div key={day} className="space-y-3">
                                  <h5 className="text-[11px] font-bold text-slate-900 capitalize flex items-center gap-2">
                                    <span className="w-2 h-2 bg-secondary rounded-full"></span>
                                    {day}s
                                  </h5>
                                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {localAvail[day].slots.map(
                                      (sVal: any, idx: number) => {
                                        const slotTime =
                                          getSlotTimeString(sVal);
                                        const isSelected = recurringTimes.some(
                                          (rt) => {
                                            const d = new Date(rt);
                                            const t = d.toLocaleTimeString([], {
                                              hour: "2-digit",
                                              minute: "2-digit",
                                              hour12: false,
                                            });
                                            const dayStr = d
                                              .toLocaleDateString([], {
                                                weekday: "long",
                                              })
                                              .toLowerCase();
                                            return (
                                              t === slotTime && dayStr === day
                                            );
                                          },
                                        );

                                        return (
                                          <button
                                            key={idx}
                                            type="button"
                                            onClick={() => {
                                              const now = new Date();
                                              const daysMap: any = {
                                                sunday: 0,
                                                monday: 1,
                                                tuesday: 2,
                                                wednesday: 3,
                                                thursday: 4,
                                                friday: 5,
                                                saturday: 6,
                                              };
                                              const targetDay = daysMap[day];
                                              const today = now.getDay();
                                              const daysUntil =
                                                (targetDay + 7 - today) % 7 ||
                                                7;
                                              const date = new Date(now);
                                              date.setDate(
                                                now.getDate() + daysUntil,
                                              );
                                              const [h, m] = slotTime
                                                .split(":")
                                                .map(Number);
                                              date.setHours(h, m, 0, 0);
                                              const iso = date.toISOString();
                                              const requiredSlots = selectedPlan
                                                ? selectedPlan.sessions / 4
                                                : 1;

                                              if (isSelected) {
                                                setRecurringTimes(
                                                  recurringTimes.filter(
                                                    (rt) => {
                                                      const d = new Date(rt);
                                                      const t =
                                                        d.toLocaleTimeString(
                                                          [],
                                                          {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            hour12: false,
                                                          },
                                                        );
                                                      const ds = d
                                                        .toLocaleDateString(
                                                          [],
                                                          { weekday: "long" },
                                                        )
                                                        .toLowerCase();
                                                      return !(
                                                        t === slotTime &&
                                                        ds === day
                                                      );
                                                    },
                                                  ),
                                                );
                                              } else {
                                                if (
                                                  recurringTimes.length <
                                                  requiredSlots
                                                ) {
                                                  setRecurringTimes([
                                                    ...recurringTimes,
                                                    iso,
                                                  ]);
                                                } else if (
                                                  requiredSlots === 1
                                                ) {
                                                  setRecurringTimes([iso]);
                                                }
                                              }
                                            }}
                                            className={cn(
                                              "px-3 py-2.5 rounded-xl border text-[11px] font-bold transition-all flex flex-col items-center justify-center gap-0.5",
                                              isSelected
                                                ? "bg-secondary text-white border-secondary shadow-lg shadow-secondary/20 scale-[1.05]"
                                                : "bg-white text-slate-600 border-slate-100 hover:border-primary/30 hover:bg-slate-50",
                                            )}
                                          >
                                            <span
                                              className={cn(
                                                "opacity-60 text-[8px] uppercase",
                                                isSelected
                                                  ? "text-white"
                                                  : "text-slate-400",
                                              )}
                                            >
                                              {isSelected
                                                ? "Selected"
                                                : "Book Slot"}
                                            </span>
                                            {renderSlotTime(slotTime)}
                                          </button>
                                        );
                                      },
                                    )}
                                  </div>
                                </div>
                              ));
                            })()}
                          </div>

                          {recurringTimes.length > 0 && (
                            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl animate-in zoom-in-95 duration-200">
                              <p className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                                <CheckCircle2 size={14} />
                                Confirmed Weekly Schedule
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {recurringTimes.map((rt, i) => (
                                  <div
                                    key={i}
                                    className="bg-white border border-emerald-100 px-3 py-1.5 rounded-lg text-[10px] font-bold text-emerald-600 shadow-sm"
                                  >
                                    {new Date(rt).toLocaleDateString([], {
                                      weekday: "long",
                                    })}
                                    s @{" "}
                                    {new Date(rt).toLocaleTimeString([], {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    })}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                        <p className="text-[9px] text-slate-400 font-medium mt-4">
                          Please select{" "}
                          {selectedPlan ? selectedPlan.sessions / 4 : 1} slots
                          to match your {selectedPlan?.name || "plan"}.
                        </p>

                        {/* Step 4: Secure Checkout Payment & Receipt Submission */}
                        {recurringTimes.length ===
                          (selectedPlan ? selectedPlan.sessions / 4 : 1) && (
                          <div className="space-y-6 pt-6 border-t border-slate-100 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                                Step 4: Secure Checkout Payment
                              </label>
                              <p className="text-[10px] text-slate-400 font-medium">
                                To activate your enrollment, remit your first
                                month's payment and supply your receipt info
                                below.
                              </p>
                            </div>

                            {/* Checkout Card Form Fields with CBE, Telebirr, and Zelle/International Options */}
                            <div className="bg-slate-50 rounded-2xl p-5 md:p-6 border border-slate-150 space-y-6 text-left">
                              {/* Payment Options Selection Block */}
                              <div className="space-y-3">
                                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block text-left">
                                  Select Payment Method
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                  <button
                                    type="button"
                                    onClick={() => setPaymentType("telebirr")}
                                    className={cn(
                                      "p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer bg-white",
                                      paymentType === "telebirr"
                                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/10"
                                        : "border-slate-150 hover:border-slate-300",
                                    )}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={cn(
                                          "w-3 h-3 rounded-full border flex items-center justify-center shrink-0",
                                          paymentType === "telebirr"
                                            ? "border-primary text-primary"
                                            : "border-slate-300",
                                        )}
                                      >
                                        {paymentType === "telebirr" && (
                                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                        )}
                                      </span>
                                      <span className="text-[11px] font-bold text-slate-850">
                                        Telebirr (Ethiopia)
                                      </span>
                                    </div>
                                    <span className="text-[8px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                                      Mobile wallet
                                    </span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() => setPaymentType("cbe")}
                                    className={cn(
                                      "p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer bg-white",
                                      paymentType === "cbe"
                                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/10"
                                        : "border-slate-150 hover:border-slate-300",
                                    )}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={cn(
                                          "w-3 h-3 rounded-full border flex items-center justify-center shrink-0",
                                          paymentType === "cbe"
                                            ? "border-primary text-primary"
                                            : "border-slate-300",
                                        )}
                                      >
                                        {paymentType === "cbe" && (
                                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                        )}
                                      </span>
                                      <span className="text-[11px] font-bold text-slate-855">
                                        CBE Birr / Bank
                                      </span>
                                    </div>
                                    <span className="text-[8px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                                      Bank Transfer
                                    </span>
                                  </button>

                                  <button
                                    type="button"
                                    onClick={() =>
                                      setPaymentType("international")
                                    }
                                    className={cn(
                                      "p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 cursor-pointer bg-white",
                                      paymentType === "international"
                                        ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/10"
                                        : "border-slate-150 hover:border-slate-300",
                                    )}
                                  >
                                    <div className="flex items-center gap-1.5">
                                      <span
                                        className={cn(
                                          "w-3 h-3 rounded-full border flex items-center justify-center shrink-0",
                                          paymentType === "international"
                                            ? "border-primary text-primary"
                                            : "border-slate-300",
                                        )}
                                      >
                                        {paymentType === "international" && (
                                          <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                        )}
                                      </span>
                                      <span className="text-[11px] font-bold text-slate-855">
                                        International
                                      </span>
                                    </div>
                                    <span className="text-[8px] text-slate-400 font-bold font-mono uppercase tracking-wider">
                                      Zelle, Remitly, etc.
                                    </span>
                                  </button>
                                </div>
                              </div>

                              {/* Instruction Panels */}
                              {paymentType === "telebirr" && (
                                <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-1.5 text-xs text-slate-600 animate-in fade-in duration-200 text-left">
                                  <span className="text-[9px] uppercase font-bold text-primary tracking-wider block">
                                    Telebirr Account Instructions:
                                  </span>
                                  <p className="leading-relaxed text-[11px]">
                                    Send the subscription fee of{" "}
                                    <strong className="text-slate-900 font-extrabold font-mono">
                                      ${selectedPlan?.price}
                                    </strong>{" "}
                                    to our verified merchant code:{" "}
                                    <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-1.5 py-0.5 rounded">
                                      882910
                                    </strong>{" "}
                                    or transfer to mobile number{" "}
                                    <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-1.5 py-0.5 rounded">
                                      +251 912 345 678
                                    </strong>{" "}
                                    (Company Name:{" "}
                                    <strong>Abyssinia Academy</strong>).
                                  </p>
                                </div>
                              )}

                              {paymentType === "cbe" && (
                                <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-1.5 text-xs text-slate-600 animate-in fade-in duration-200 text-left">
                                  <span className="text-[9px] uppercase font-bold text-primary tracking-wider block">
                                    CBE Account Bank Instructions:
                                  </span>
                                  <p className="leading-relaxed text-[11px]">
                                    Deposit or wire transfer your subscription
                                    fee directly to CBE corporate account name{" "}
                                    <strong>Abyssinia Tutors Language School</strong>:
                                    <br />
                                    <strong className="font-extrabold text-slate-900 font-mono bg-slate-50 px-2.5 py-0.5 rounded mt-1 inline-block">
                                      ID: 1000492811726
                                    </strong>
                                  </p>
                                </div>
                              )}

                              {paymentType === "international" && (
                                <div className="p-4 bg-white border border-slate-100 rounded-xl space-y-3 text-xs text-slate-600 animate-in fade-in duration-200 text-left">
                                  <span className="text-[9px] uppercase font-bold text-primary tracking-wider block font-sans">
                                    International Instruction Guidelines:
                                  </span>
                                  <div className="space-y-2.5 leading-relaxed text-[11px]">
                                    <div>
                                      <p className="font-bold text-slate-900">
                                        🔹 US Parents:
                                      </p>
                                      <p className="text-slate-500 pl-4">
                                        Zelle payments can be dispatched
                                        directly to our secure US payment
                                        endpoint:{" "}
                                        <strong className="font-bold text-slate-800 font-mono">
                                          payment@heritageacademy.com
                                        </strong>{" "}
                                        or helpline{" "}
                                        <strong className="font-bold text-slate-800 font-mono">
                                          +1 (202) 555-0199
                                        </strong>
                                        .
                                      </p>
                                    </div>
                                    <div>
                                      <p className="font-bold text-slate-900">
                                        🔹 Canada, UK, Europe, & Australia
                                        Parents:
                                      </p>
                                      <p className="text-slate-500 pl-4">
                                        Submit via reliable global transaction
                                        systems such as{" "}
                                        <strong className="text-slate-805">
                                          Remitly
                                        </strong>
                                        ,{" "}
                                        <strong className="text-slate-805">
                                          WorldRemit
                                        </strong>
                                        , or{" "}
                                        <strong className="text-slate-805">
                                          Sendwave
                                        </strong>{" "}
                                        directly to our US Zelle address (
                                        <strong className="text-slate-800 font-mono">
                                          payment@heritageacademy.com
                                        </strong>
                                        ) or as a mobile deposit payout to
                                        Telebirr mobile number (
                                        <strong className="text-slate-808 font-mono">
                                          +251 912 345 678
                                        </strong>
                                        ).
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Secure Verification Layer */}
                              <div className="border-t border-slate-100 pt-4 space-y-3">
                                <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block text-left">
                                  Secure Payment Verification Details
                                </span>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 text-left">
                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block text-left">
                                      Transaction ID / Ref <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      placeholder="e.g. CBE-TXN-9817 / Zelle ID 182"
                                      value={transactionRef}
                                      onChange={(e) =>
                                        setTransactionRef(e.target.value)
                                      }
                                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 font-mono outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-bold"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block text-left">
                                      Depositor / Sender Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                      type="text"
                                      required
                                      placeholder="e.g. Biruk Tsegaye"
                                      value={paymentSenderName}
                                      onChange={(e) =>
                                        setPaymentSenderName(e.target.value)
                                      }
                                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-700 outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all font-bold"
                                    />
                                  </div>

                                  <div className="space-y-1">
                                    <label className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block text-left">
                                      Uploader Screenshot <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative border border-dashed border-slate-200 bg-white rounded-lg hover:bg-slate-50/50 transition-colors cursor-pointer flex items-center justify-between p-1.5 px-2">
                                      <input
                                        type="file"
                                        id="enrollment-receipt-upload"
                                        accept="image/*,application/pdf"
                                        onChange={(e) => {
                                          const file = e.target.files?.[0];
                                          if (file) {
                                            setReceiptScreenshotName(file.name);
                                          }
                                        }}
                                        className="absolute inset-0 opacity-0 cursor-pointer h-full w-full"
                                      />
                                      <div className="flex items-center gap-1.5 max-w-[170px] truncate">
                                        <span className="text-xs">📎</span>
                                        <span className="text-[10px] font-bold text-slate-500 truncate">
                                          {receiptScreenshotName || "Attach snapshot..."}
                                        </span>
                                      </div>
                                      <span className="text-[8px] font-bold uppercase bg-slate-50 hover:bg-slate-100 px-2 py-1 rounded border text-slate-500 tracking-wider shrink-0">
                                        Browse
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="p-8 border-2 border-dashed border-slate-100 rounded-[32px] flex flex-col items-center justify-center text-slate-300">
                        <Users size={32} strokeWidth={1} />
                        <p className="text-xs mt-3 font-medium">
                          Select a tutor to view available session times
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-8">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                        Total Subscription
                      </p>
                      <p className="text-xl font-bold text-slate-900">
                        ${useCustomCreditsNew ? (customCreditQuantity * 40) : (selectedPlan?.price || 0)}.00{" "}
                        <span className="text-xs text-slate-400 font-medium font-mono uppercase tracking-wider">
                          {useCustomCreditsNew ? "/ pack" : "/ month"}
                        </span>
                      </p>
                    </div>
                    <button
                      disabled={
                        isSubscribing ||
                        (!selectedPlan && !useCustomCreditsNew) ||
                        !selectedTutorId ||
                        recurringTimes.length < (useCustomCreditsNew ? 1 : (selectedPlan ? selectedPlan.sessions / 4 : 1)) ||
                        !transactionRef ||
                        !receiptScreenshotName ||
                        !paymentSenderName
                      }
                      type="submit"
                      className="bg-primary text-white font-bold px-10 py-4 rounded-2xl text-xs uppercase tracking-widest hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-primary/20 flex items-center gap-3"
                    >
                      {isSubscribing ? (
                        <Loader2 className="animate-spin" size={18} />
                      ) : (
                        <>
                          <CardIcon size={18} />
                          Enroll Student
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LessonViewer container modal */}
      <LessonViewer isOpen={libraryOpen} onClose={() => setLibraryOpen(false)} />
    </div>
  );
}
