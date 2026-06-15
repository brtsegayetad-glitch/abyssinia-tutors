import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, 
  Search, 
  User, 
  MessageSquare,
  Shield,
  Clock,
  Check,
  AlertCircle
} from 'lucide-react';
import { 
  subscribeToAllStudents, 
  subscribeToLeads, 
  subscribeToMessages, 
  sendMessage 
} from '../../services/dataService';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';

interface ChatThread {
  id: string; // recipient identifier (student id, parent id, or lead id)
  name: string; // student or parent name
  parentName: string;
  email: string;
  type: 'student' | 'lead';
  planStatus?: string;
}

export default function AdminConversations() {
  const { user } = useAuth();
  const [students, setStudents] = useState<any[]>([]);
  const [leads, setLeads] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [activeThread, setActiveThread] = useState<ChatThread | null>(null);
  const [textInput, setTextInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load students, leads & real-time message stream
  useEffect(() => {
    let studentsLoaded = false;
    let leadsLoaded = false;
    let messagesLoaded = false;

    const checkLoading = () => {
      if (studentsLoaded && leadsLoaded && messagesLoaded) {
        setLoading(false);
      }
    };

    const unsubStudents = subscribeToAllStudents((data) => {
      setStudents(data);
      studentsLoaded = true;
      checkLoading();
    }, () => {
      studentsLoaded = true;
      checkLoading();
    });

    const unsubLeads = subscribeToLeads((data) => {
      setLeads(data);
      leadsLoaded = true;
      checkLoading();
    }, () => {
      leadsLoaded = true;
      checkLoading();
    });

    const unsubMessages = subscribeToMessages((data) => {
      setMessages(data);
      messagesLoaded = true;
      checkLoading();
    }, () => {
      messagesLoaded = true;
      checkLoading();
    });

    return () => {
      unsubStudents();
      unsubLeads();
      unsubMessages();
    };
  }, []);

  // Scroll to bottom when active thread or messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread, messages]);

  // Merge students and leads into unified conversation threads
  const threads: ChatThread[] = [];

  students.forEach(st => {
    // Avoid duplicate key structures
    if (!threads.some(t => t.id === st.id)) {
      threads.push({
        id: st.id,
        name: st.name,
        parentName: st.parentName || 'Parent',
        email: st.parentEmail || '',
        type: 'student',
        planStatus: st.plan || 'Heritage Student'
      });
    }
  });

  leads.forEach(ld => {
    // Only add leads that aren't already converted to active students
    const id = ld.id || ld.childName;
    if (!threads.some(t => t.id === id || t.name === ld.childName)) {
      threads.push({
        id: ld.id || ld.childName,
        name: ld.childName || 'Trial Lead',
        parentName: ld.parentName || 'Parent',
        email: ld.email || '',
        type: 'lead',
        planStatus: ld.status === 'scheduled' ? 'Scheduled Trial' : 'Trial Lead'
      });
    }
  });

  // Filter threads based on search
  const filteredThreads = threads.filter(thread => {
    const search = searchTerm.toLowerCase();
    return (
      thread.name?.toLowerCase().includes(search) ||
      thread.parentName?.toLowerCase().includes(search) ||
      thread.email?.toLowerCase().includes(search)
    );
  });

  // Filter messages for currently active thread
  // Match where:
  // - either senderId === activeThread.id OR recipientId === activeThread.id
  const activeThreadMessages = messages.filter(msg => {
    if (!activeThread) return false;
    return msg.senderId === activeThread.id || msg.recipientId === activeThread.id;
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!textInput.trim() || !activeThread) return;

    const messagePayload = {
      senderId: user?.uid || 'admin_user',
      senderName: user?.fullName || 'Heritage Admin',
      senderRole: 'admin',
      recipientId: activeThread.id,
      text: textInput.trim()
    };

    setTextInput('');
    const res = await sendMessage(messagePayload);
    if (!res.success) {
      console.error("Failed to send text response.");
    }
  };

  const getLatestMessage = (threadId: string) => {
    const threadMsgs = messages.filter(m => m.senderId === threadId || m.recipientId === threadId);
    if (threadMsgs.length === 0) return null;
    return threadMsgs[threadMsgs.length - 1];
  };

  const formatMessageTime = (createdAt: any) => {
    if (!createdAt) return 'Just now';
    const date = createdAt.toDate ? createdAt.toDate() : new Date(createdAt);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-[calc(100vh-10rem)] bg-white rounded-2xl border border-slate-150 shadow-xs flex overflow-hidden animate-in fade-in duration-300">
      
      {/* Threads Sidebar (Left panel) */}
      <div className="w-80 border-r border-slate-150 flex flex-col bg-slate-50/30 shrink-0">
        
        {/* Sidebar Header with Contacts Search */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 tracking-tight flex items-center gap-1.5">
              <MessageSquare size={16} className="text-primary" />
              <span>Inbox & Chats</span>
            </h2>
            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full">
              {threads.length} active
            </span>
          </div>

          <div className="flex items-center bg-slate-100/80 border border-slate-200 rounded-lg px-2.5 py-1.5 transition-focus-within focus-within:ring-2 focus-within:ring-primary/5 focus-within:border-primary">
            <Search size={14} className="text-slate-400 mr-2 shrink-0" />
            <input 
              type="text" 
              placeholder="Search chat thread..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none focus:outline-none text-xs w-full text-slate-600" 
            />
          </div>
        </div>

        {/* Thread List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredThreads.map((thread) => {
            const isSelected = activeThread?.id === thread.id;
            const latestMessage = getLatestMessage(thread.id);
            
            return (
              <button
                key={thread.id}
                onClick={() => setActiveThread(thread)}
                className={cn(
                  "w-full text-left p-4 flex items-start gap-3 transition-colors cursor-pointer border-l-4",
                  isSelected 
                    ? "bg-slate-50 border-l-primary" 
                    : "border-l-transparent hover:bg-slate-50/50"
                )}
              >
                {/* Avatar Icon */}
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ring-1",
                  thread.type === 'student' 
                    ? "bg-primary/5 text-primary ring-primary/10" 
                    : "bg-amber-50 text-amber-700 ring-amber-100"
                )}>
                  {thread.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>

                {/* Brief Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1.5 mb-1">
                    <p className="text-xs font-bold text-slate-900 truncate leading-tight">
                      {thread.name}
                    </p>
                    {latestMessage && (
                      <span className="text-[9px] text-slate-400 font-medium shrink-0">
                        {formatMessageTime(latestMessage.createdAt)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[10px] text-slate-400 font-semibold mb-1 uppercase tracking-tight">
                    {thread.parentName} ({thread.type})
                  </p>

                  <p className="text-xs text-slate-500 truncate leading-tight">
                    {latestMessage ? latestMessage.text : "No messages recorded yet."}
                  </p>
                </div>
              </button>
            );
          })}

          {filteredThreads.length === 0 && !loading && (
            <div className="p-8 text-center text-slate-400 text-xs italic">
              No chat threads found matching search criteria.
            </div>
          )}

          {loading && (
            <div className="p-8 flex items-center justify-center text-slate-400 text-xs gap-2">
              <span className="w-4 h-4 rounded-full border border-primary border-t-transparent animate-spin shrink-0"></span>
              <span>Loading threads...</span>
            </div>
          )}
        </div>
      </div>

      {/* Message Pane (Right panel) */}
      <div className="flex-1 flex flex-col bg-slate-50/30">
        {activeThread ? (
          <>
            {/* Thread Header */}
            <div className="p-4 border-b border-slate-100 bg-white flex items-center justify-between text-left">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ring-1",
                  activeThread.type === 'student' 
                    ? "bg-primary/5 text-primary ring-primary/10" 
                    : "bg-amber-50 text-amber-700 ring-amber-100"
                )}>
                  {activeThread.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 leading-tight">
                    Conversation with {activeThread.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5 mt-1 tracking-tight">
                    Billing/Primary Contact: <span className="font-semibold text-slate-600">{activeThread.parentName}</span> ({activeThread.email})
                  </p>
                </div>
              </div>

              <span className={cn(
                "px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider border",
                activeThread.type === 'student' 
                  ? "bg-emerald-50 text-emerald-700 border-emerald-100" 
                  : "bg-amber-50 text-amber-700 border-amber-100"
              )}>
                {activeThread.planStatus}
              </span>
            </div>

            {/* Bubble History Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              
              {/* Initial Banner / Call to Action */}
              <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs max-w-md mx-auto text-center space-y-2 mb-6">
                <Shield size={20} className="text-slate-400 mx-auto" />
                <h4 className="text-xs font-bold text-slate-800">Secure Consultation Line</h4>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Welcome to the communications panel. You are replying on behalf of <span className="font-semibold text-primary">HabKids Operations</span>. Parents see responses immediately in their dashboard.
                </p>
              </div>

              {activeThreadMessages.map((msg) => {
                const isAdmin = msg.senderRole === 'admin';
                return (
                  <div 
                    key={msg.id} 
                    className={cn(
                      "flex flex-col max-w-[70%] space-y-1 text-left",
                      isAdmin ? "ml-auto items-end" : "mr-auto items-start"
                    )}
                  >
                    {/* Timestamp & Name */}
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-medium px-1">
                      <span>{isAdmin ? "You" : msg.senderName}</span>
                      <span>•</span>
                      <span>{formatMessageTime(msg.createdAt)}</span>
                    </div>

                    {/* Message Body */}
                    <div className={cn(
                      "p-3 rounded-2xl text-xs leading-relaxed",
                      isAdmin 
                        ? "bg-primary text-white rounded-tr-none shadow-xs" 
                        : "bg-white text-slate-800 rounded-tl-none border border-slate-150 shadow-xs"
                    )}>
                      {msg.text}
                    </div>
                  </div>
                );
              })}

              {activeThreadMessages.length === 0 && (
                <div className="p-12 text-center text-slate-400 text-xs italic max-w-sm mx-auto">
                  No chat log recorded yet. Send a greeting to start the conversation!
                </div>
              )}

              {/* anchor to keep auto-scroll on bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Bottom Panel */}
            <form onSubmit={handleSend} className="p-4 border-t border-slate-100 bg-white flex gap-3">
              <input 
                type="text" 
                placeholder={`Type your response to ${activeThread.parentName}...`}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary transition-all" 
              />
              <button 
                type="submit" 
                id="send-chat-btn"
                className="bg-primary hover:bg-primary-hover text-white rounded-xl px-4 py-2.5 flex items-center justify-center transition-colors cursor-pointer shrink-0 shadow-sm"
              >
                <Send size={14} className="mr-1.5" />
                <span className="text-xs font-bold">Send Reply</span>
              </button>
            </form>
          </>
        ) : (
          /* Empty/No selected conversation view */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center max-w-sm mx-auto space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
              <MessageSquare size={28} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">No Chat Thread Selected</h3>
              <p className="text-[11px] text-slate-400 leading-relaxed mt-2.5 mt-1">
                Select a student subscriber or pending lead from the left pane to initialize a dynamic, real-time message stream with their primary contact.
              </p>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
