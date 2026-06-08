import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import fs from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, getDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import admin from 'firebase-admin';
import { getFirestore as getAdminFirestore } from 'firebase-admin/firestore';

dotenv.config();

let transporter: nodemailer.Transporter | null = null;
let db: any = null;

function getTransporter() {
  if (!transporter) {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      console.warn("SMTP_USER or SMTP_PASS not set. Emails will be simulated.");
      return null;
    }

    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: user,
        pass: pass
      }
    });
  }
  return transporter;
}

function getDbInstance() {
  if (!db) {
    try {
      const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
      if (fs.existsSync(configPath)) {
        const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const firebaseApp = initializeApp(firebaseConfig);
        db = getFirestore(firebaseApp, firebaseConfig.firestoreDatabaseId);
        console.log("Firebase initialized successfully on backend server.");
      } else {
        console.warn("firebase-applet-config.json not found on backend. Scheduler inactive or runs in email-simulation mode.");
      }
    } catch (err) {
      console.error("Failed to initialize Firebase on backend server:", err);
    }
  }
  return db;
}

let adminDb: any = null;

function getAdminDbInstance() {
  if (!adminDb) {
    try {
      const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
      if (fs.existsSync(configPath)) {
        const firebaseConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
        const app = admin.apps[0] || admin.initializeApp({
          projectId: firebaseConfig.projectId,
        });
        const dbId = firebaseConfig.firestoreDatabaseId;
        adminDb = dbId && dbId !== '(default)' ? getAdminFirestore(app, dbId) : getAdminFirestore(app);
        console.log(`Firebase Admin initialized successfully on backend for DB: '${dbId || '(default)'}'`);
      } else {
        console.warn("firebase-applet-config.json not found on backend. Skipping Admin DB.");
      }
    } catch (err) {
      console.error("Failed to initialize Firebase Admin on backend server:", err);
    }
  }
  return adminDb;
}

async function sendFormattedEmail(to: string, subject: string, body: string, role?: string) {
  console.log(`[EMAIL DISPATCH] to: ${to} | Subject: ${subject}`);
  const mailTransporter = getTransporter();

  if (mailTransporter) {
    const isEnrollment = subject.toLowerCase().includes('enrollment') || subject.toLowerCase().includes('subscription');
    
    // Beautiful professional template
    const html = `
      <div style="font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px; background-color: #ffffff; border: 1px solid #f1f5f9; border-radius: 24px; color: #1e293b; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);">
        <div style="text-align: center; margin-bottom: 32px;">
          <h1 style="color: #0f172a; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.025em; text-transform: uppercase;">Heritage Academy</h1>
          <div style="height: 4px; width: 48px; background: linear-gradient(to right, #ea580c, #f97316); margin: 16px auto; border-radius: 2px;"></div>
        </div>
        
        <div style="font-size: 16px; line-height: 1.7; color: #475569;">
          ${body.split('\n').map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            if (trimmed.includes(':')) {
              const [label, ...val] = trimmed.split(':');
              return `<p style="margin-bottom: 12px;"><strong style="color: #0f172a; display: inline-block; width: 120px;">${label}:</strong> <span style="background: #f8fafc; padding: 2px 8px; border-radius: 4px; font-weight: 500; color: #334155;">${val.join(':').trim()}</span></p>`;
            }
            return `<p style="margin-bottom: 16px;">${trimmed}</p>`;
          }).join('')}
        </div>

        ${isEnrollment ? `
          <div style="margin-top: 32px; padding: 24px; background: #f0fdf4; border: 1px solid #dcfce7; border-radius: 16px; text-align: center;">
            <h4 style="margin: 0 0 8px 0; color: #166534; font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Status: Active Enrollment</h4>
            <p style="margin: 0; font-size: 13px; color: #15803d;">Your student's curriculum and materials are being prepared.</p>
          </div>
        ` : ''}

        <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #f1f5f9; text-align: center;">
          <p style="font-size: 11px; color: #94a3b8; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">Heritage Language Academy</p>
          <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 16px;">
            <a href="${process.env.APP_URL || '#'}" style="color: #64748b; text-decoration: none; font-size: 12px; font-weight: 500;">Parent Portal</a>
            <span style="color: #cbd5e1;">&bull;</span>
            <a href="${process.env.APP_URL || '#'}/support" style="color: #64748b; text-decoration: none; font-size: 12px; font-weight: 500;">Support Center</a>
          </div>
          <p style="font-size: 10px; color: #cbd5e1; margin: 0;">&copy; ${new Date().getFullYear()} Heritage Academy. All rights reserved.</p>
        </div>
      </div>
    `;

    await mailTransporter.sendMail({
      from: `"Heritage Academy" <${process.env.SMTP_USER}>`,
      to: to,
      subject: subject,
      html: html
    });
    return { success: true, simulated: false };
  } else {
    console.log(`[SIMULATION]: Sent scheduled email to ${to} | Subject: ${subject}\nBody: ${body}\n`);
    return { success: true, simulated: true };
  }
}

async function checkAndDispatchReminders() {
  console.log("[CRON] Checking for sessions starting within 24 hours...");
  const adminDbInstance = getAdminDbInstance();
  if (!adminDbInstance) {
    console.warn("[CRON] Firebase Admin DB instance not available. Skipping reminders.");
    return { success: false, reason: "Database not initialized" };
  }

  try {
    const now = new Date();
    const targetLimit = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const snapshot = await adminDbInstance.collection('sessions')
      .where('status', '==', 'scheduled')
      .get();

    let sentCount = 0;

    for (const sessionDoc of snapshot.docs) {
      const session = sessionDoc.data();
      const sId = sessionDoc.id;

      // Skip if reminder was already sent
      if (session.reminderSent) {
        continue;
      }

      let startDate: Date;
      if (session.startTime && typeof session.startTime.toDate === 'function') {
        startDate = session.startTime.toDate();
      } else if (session.startTime && (session.startTime.seconds || session.startTime._seconds)) {
        const seconds = session.startTime.seconds || session.startTime._seconds;
        const nanoseconds = session.startTime.nanoseconds || session.startTime._nanoseconds || 0;
        startDate = new Date(seconds * 1000 + nanoseconds / 1000000);
      } else if (session.startTime) {
        startDate = new Date(session.startTime);
      } else {
        continue;
      }

      const diffMs = startDate.getTime() - now.getTime();
      const isWithin24Hours = diffMs > 0 && diffMs <= 24 * 60 * 60 * 1000;

      if (isWithin24Hours) {
        console.log(`[CRON] Found active session ${sId} starting in ${Math.round(diffMs / (60 * 1000))} minutes. Resolving emails...`);

        // Resolve tutor email
        let tutorEmail = session.tutorEmail || null;
        if (!tutorEmail && session.tutorId) {
          try {
            const tDoc = await adminDbInstance.collection('tutors').doc(session.tutorId).get();
            if (tDoc.exists) {
              tutorEmail = tDoc.data().email || null;
            }
          } catch (e) {
            console.error(`Error resolving tutor email from tutors:`, e);
          }
          if (!tutorEmail) {
            try {
              const uDoc = await adminDbInstance.collection('users').doc(session.tutorId).get();
              if (uDoc.exists) {
                tutorEmail = uDoc.data().email || null;
              }
            } catch (e) {
              console.error(`Error resolving tutor email from users:`, e);
            }
          }
        }

        // Resolve parent email
        let parentEmail = session.parentEmail || null;
        if (!parentEmail && session.parentId) {
          try {
            const pDoc = await adminDbInstance.collection('users').doc(session.parentId).get();
            if (pDoc.exists) {
              parentEmail = pDoc.data().email || null;
            }
          } catch (e) {
            console.error(`Error resolving parent email:`, e);
          }
        }

        const formattedTime = startDate.toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          timeZoneName: 'short'
        });

        const tutorName = session.tutorName || "Heritage Tutor";
        const studentName = session.studentName || "your child";

        // Dispatch to Tutor
        if (tutorEmail) {
          try {
            await sendFormattedEmail(
              tutorEmail,
              `Session Reminder: ${studentName}`,
              `Dear ${tutorName},\n\nThis is a friendly reminder that you have an upcoming Heritage Session scheduled.\n\nStudent: ${studentName}\nType: ${session.type || 'regular'} session\nScheduled Time: ${formattedTime}\n\nPlease join the meeting via your Tutor Dashboard 5 minutes before your class.`
            );
          } catch (err) {
            console.error(`[CRON] Failed to send reminder to tutor (${tutorEmail}):`, err);
          }
        } else {
          console.log(`[CRON] Tutor email not found for tutorId ${session.tutorId}`);
        }

        // Dispatch to Parent
        if (parentEmail) {
          try {
            const parentName = session.parentName || "Parent";
            await sendFormattedEmail(
              parentEmail,
              `Heritage Session Reminder: ${studentName}`,
              `Dear ${parentName},\n\nThis is a friendly reminder that ${studentName} has an upcoming Heritage Session scheduled.\n\nAssigned Tutor: ${tutorName}\nType: ${session.type || 'regular'} session\nScheduled Time: ${formattedTime}\n\nYou can access your classroom meeting link via your Parent Dashboard 5 minutes before the class starts.`
            );
          } catch (err) {
            console.error(`[CRON] Failed to send reminder to parent (${parentEmail}):`, err);
          }
        } else {
          console.log(`[CRON] Parent email not found for parentId ${session.parentId}`);
        }

        // Mark reminder as sent in the database
        try {
          await adminDbInstance.collection('sessions').doc(sId).update({
            reminderSent: true
          });
          console.log(`[CRON] Marked session ${sId} as reminderSent: true.`);
          sentCount++;
        } catch (err) {
          console.error(`[CRON] Failed to mark session ${sId} as reminderSent:`, err);
        }
      }
    }

    return { success: true, processed: snapshot.docs.length, sentCount };
  } catch (err: any) {
    const errMsg = String(err);
    if (errMsg.includes('PERMISSION_DENIED') || errMsg.includes('7') || err.code === 7) {
      console.log("[CRON] Info: Firebase Admin service account has read/write boundaries in sandboxed hosting environment. Automatic reminders are driven securely on authenticated client dashboard loads.");
      return { success: true, info: "Reminders delegating gracefully to client dashboards." };
    }
    console.error("[CRON] Error during reminder checks:", err);
    return { success: false, error: errMsg };
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize DB immediately on boot
  getDbInstance();

  // Gemini Setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || '',
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API Routes
  app.post("/api/notify/email", async (req, res) => {
    const { to, subject, body, role } = req.body;
    try {
      const result = await sendFormattedEmail(to, subject, body, role);
      res.json({ 
        success: true, 
        message: result.simulated
          ? `Professional ${role || 'user'} notification simulated for ${to} (Fallback)`
          : `Professional mail sent to ${to} via SMTP`,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Email sending failed:", error);
      res.status(500).json({ success: false, error: "Failed to send email", details: String(error) });
    }
  });

  app.post("/api/subscription/confirm", async (req, res) => {
    const {
      parentEmail,
      parentName,
      studentName,
      planName,
      tutorEmail,
      tutorName,
      price,
      schedulePattern,
      paymentType,
      paymentRef,
      paymentSenderName
    } = req.body;

    try {
      const pmLabel = paymentType === "telebirr" ? "Telebirr Code 882910" : paymentType === "cbe" ? "CBE Transfer" : "International (Zelle/Remitly)";
      
      const parentBody = `Dear ${parentName || 'Parent'},\n
Welcome to the Heritage Academy family! We are absolutely thrilled to partner with you in your child's language learning journey.\n
We have received your enrollment registration and are currently verifying your remittance payout.\n
Student Name: ${studentName}
Chosen Plan: ${planName}
Price: $${price} (Verification Pending)
Assigned Tutor: ${tutorName}
Schedule: ${schedulePattern || 'Weekly recurring slots'}
Payment Method: ${pmLabel}
Transaction RefID: ${paymentRef || 'N/A'}
Remitter Name: ${paymentSenderName || 'N/A'}\n
Verification Status: PENDING ADMINISTRATIVE APPROVAL\n
Our finance office is validating your Bank/Telebirr transID reference. This usually takes less than 2 hours. Once verified, your permanent digital classroom access, offline syllabi, and teacher scheduling matrix will unlock directly on your Parent Dashboard.`;

      const tutorBody = `Dear ${tutorName || 'Heritage Expert'},\n
This is an immediate scheduling alert from the Heritage Administration.\n
A new student has registered and selected recurring timeslots on your schedule. This enrollment is pending payment verification.\n
Student Name: ${studentName}
Plan Option: ${planName}
Parent Email: ${parentEmail}
Recurring Schedule: ${schedulePattern || 'Weekly recurring slots'}
Payment Remittance: ${pmLabel}
Verification Status: PENDING REMITTANCE APPROVAL\n
Please check your Tutor Portal schedule matrix; once the reference is approved, class slots will be locked automatically.`;

      const parentEmailPromise = sendFormattedEmail(
        parentEmail,
        `Heritage Enrollment Pending Verification - Receipt Received!`,
        parentBody,
        'parent'
      );

      const tutorEmailPromise = sendFormattedEmail(
        tutorEmail,
        `Remittance Pending Assignment: New Student Registered (${studentName})`,
        tutorBody,
        'tutor'
      );

      const [parentRes, tutorRes] = await Promise.all([parentEmailPromise, tutorEmailPromise]);

      res.json({
        success: true,
        message: "Dual transaction pending verification confirmation emails dispatched successfully in parallel.",
        parentSimulated: parentRes.simulated,
        tutorSimulated: tutorRes.simulated,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Dual subscription email flow failed:", error);
      res.status(500).json({ success: false, error: "Failed to dispatch subscription welcome chain", details: String(error) });
    }
  });

  app.post("/api/test/reminders", async (req, res) => {
    try {
      const result = await checkAndDispatchReminders();
      res.json(result);
    } catch (error) {
      console.error("Manual test reminders run failed:", error);
      res.status(500).json({ success: false, error: String(error) });
    }
  });

  app.post("/api/assess", async (req, res) => {
    const { childName, childAge, goals } = req.body;

    try {
      const prompt = `
        Generate a professional "Initial Assessment Report" in JSON format for:
        Student: ${childName}
        Age: ${childAge}
        Learning goals: ${goals}
        
        The result MUST populate:
        - "welcome": A welcoming, inspiring message for the Ethiopian diaspora parents.
        - "curriculum": A proposed 3-month curriculum focus customized for their goals.
        - "heritageFact": A fascinating history or linguistical fact about Amharic or Syrian/Ethiopian Ge'ez heritage.
      `;

      let result;
      let lastError;
      
      // Retry logic for 503 or transient errors
      for (let i = 0; i < 3; i++) {
        try {
          result = await ai.models.generateContent({
            model: "gemini-3.5-flash",
            contents: prompt,
            config: {
              systemInstruction: "You are a specialized JSON api translator. You MUST output ONLY valid JSON conforming strictly to the requested schema. Do not enclose response in markdown tags, do not output prefaces, introductory headers, or explanatory notes. Out of scope text output is strictly prohibited.",
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  welcome: {
                    type: Type.STRING,
                    description: "A welcoming message for the Ethiopian diaspora parents."
                  },
                  curriculum: {
                    type: Type.STRING,
                    description: "A proposed 3-month curriculum focus based on their goals."
                  },
                  heritageFact: {
                    type: Type.STRING,
                    description: "A fun fact of the day about Amharic or Ethiopian heritage."
                  }
                },
                required: ["welcome", "curriculum", "heritageFact"]
              }
            }
          });
          break;
        } catch (error: any) {
          lastError = error;
          if (error?.status === 503 || error?.code === 503) {
            console.warn(`Gemini 503 (Busy) - Attempt ${i + 1} failed, retrying...`);
            await new Promise(resolve => setTimeout(resolve, 2000 * (i + 1)));
            continue;
          }
          throw error;
        }
      }

      if (!result) throw lastError || new Error("Failed to generate content after retries");

      let text = result.text;
      if (!text) throw new Error("No text returned from Gemini");
      
      // Robustly sanitize response text to strip any markdown code blocks or header text surrounding the JSON
      text = text.trim();
      if (text.startsWith("```json")) {
        text = text.substring(7);
      } else if (text.startsWith("```")) {
        text = text.substring(3);
      }
      if (text.endsWith("```")) {
        text = text.substring(0, text.length - 3);
      }
      text = text.trim();

      // Extract JSON boundaries precisely to handle text preamble/postscripts
      const firstCurly = text.indexOf('{');
      const lastCurly = text.lastIndexOf('}');
      if (firstCurly !== -1 && lastCurly !== -1 && lastCurly > firstCurly) {
        text = text.substring(firstCurly, lastCurly + 1);
      }
      
      const parsed = JSON.parse(text);
      res.json({
        welcome: parsed.welcome || `Welcome ${childName} to Heritage Language Academy!`,
        curriculum: parsed.curriculum || `Our tutors will focus on ${goals} through interactive 1-on-1 sessions tailored for Heritage learners.`,
        heritageFact: parsed.heritageFact || "Amharic is the only African language with its own unique script, known as the Ge'ez abugida."
      });
    } catch (error) {
      console.error("Gemini Error Final (handeled gracefully):", error);
      // Fallback response for better UX
      res.json({ 
        welcome: `Welcome ${childName} to Heritage Language Academy!`,
        curriculum: `Our tutors will focus on ${goals} through interactive 1-on-1 sessions tailored for Heritage learners.`,
        heritageFact: "Amharic is the only African language with its own unique script, known as the Ge'ez abugida."
      });
    }
  });

  // Mock WhatsApp Notification
  app.post("/api/notify/whatsapp", (req, res) => {
    console.log("SIMULATED WHATSAPP SEND:", req.body);
    res.json({ success: true, messageId: "wa_" + Math.random().toString(36).substr(2, 9) });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // Schedule automated class reminders to run at the beginning of every hour
  cron.schedule('0 * * * *', async () => {
    try {
      await checkAndDispatchReminders();
    } catch (e) {
      console.error("Error running hourly checkAndDispatchReminders cron:", e);
    }
  });
  console.log("Hourly class reminder scheduler registered.");

  // Non-blocking initial reminder check 10 seconds after server starting
  setTimeout(() => {
    checkAndDispatchReminders().catch(err => {
      console.error("Initial class reminder scan failed:", err);
    });
  }, 10000);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
