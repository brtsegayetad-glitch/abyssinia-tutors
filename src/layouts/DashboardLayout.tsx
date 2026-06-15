import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  Calendar, 
  Settings, 
  Menu, 
  X, 
  LogOut, 
  MessageSquare, 
  CreditCard,
  Bell,
  Search,
  User as UserIcon,
  LayoutDashboard
} from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';
import { subscribeToSettings } from '../services/dataService';
import BrandLogo from '../components/BrandLogo';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: 'admin' | 'tutor' | 'parent';
}

const NAV_ITEMS = {
  admin: [
    { name: 'Overview', icon: LayoutDashboard, path: '/admin' },
    { name: 'Leads', icon: Users, path: '/admin/leads' },
    { name: 'Tutors', icon: BookOpen, path: '/admin/tutors' },
    { name: 'Subscriptions', icon: CreditCard, path: '/admin/subscriptions' },
    { name: 'Conversations', icon: MessageSquare, path: '/admin/conversations' },
    { name: 'Reports', icon: BarChart3, path: '/admin/reports' },
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
  ],
  tutor: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/tutor' },
    { name: 'Calendar', icon: Calendar, path: '/tutor/calendar' },
    { name: 'My Students', icon: Users, path: '/tutor/students' },
    { name: 'Settings', icon: Settings, path: '/tutor/settings' },
  ],
  parent: [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/parent' },
    { name: 'Schedule', icon: Calendar, path: '/parent/schedule' },
    { name: 'Billing', icon: CreditCard, path: '/parent/billing' },
    { name: 'Progress', icon: BarChart3, path: '/parent/progress' },
    { name: 'Settings', icon: Settings, path: '/parent/settings' },
  ],
};

export default function DashboardLayout({ children, role }: DashboardLayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { user, signOut, updateRole } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [brandSettings, setBrandSettings] = useState<any>({ activeLogoUrl: '', academyName: 'HabKids' });

  useEffect(() => {
    const unsubscribe = subscribeToSettings((data) => {
      if (data) {
        setBrandSettings({
          activeLogoUrl: data.activeLogoUrl || '',
          academyName: data.academyName || 'HabKids'
        });
      }
    });
    return () => unsubscribe();
  }, []);

  // Load items based on authentication state's verified role directly from context
  const effectiveRole = user?.role || role;
  const items = NAV_ITEMS[effectiveRole === 'tutor' ? 'tutor' : effectiveRole === 'parent' ? 'parent' : 'admin'];

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleRoleSwitch = (newRole: 'parent' | 'tutor' | 'admin') => {
    console.log(`Switching role to: ${newRole}`);
    updateRole(newRole);
    navigate(`/${newRole}`);
  };

  // Determine if sandbox controls (role switcher) should be visible:
  // 1. In local development
  // 2. Active demo sandbox user logged in (email ending with -demo@selam.io)
  // 3. Explicit sandbox/debug flag set in URL or localStorage
  const isDemoEmail = !!(user?.email?.includes('-demo@selam.io') || user?.email?.includes('demo'));
  const hasSandboxFlag = localStorage.getItem('show_sandbox_controls') === 'true' || 
                         window.location.search.includes('sandbox=true') || 
                         window.location.search.includes('debug=true');
  const isLocalDev = !(import.meta as any).env?.PROD && (import.meta as any).env?.DEV;
  const showSandbox = !!(user && (isLocalDev || isDemoEmail || hasSandboxFlag));


  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col bg-slate-900 text-white sticky top-0 h-screen">
        <div className="p-5 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0">
              <BrandLogo 
                logoUrl={brandSettings.activeLogoUrl || '/logo_option_one.png'} 
                className="w-full h-full"
              />
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-100 truncate">
              {brandSettings.academyName}
            </span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1 mt-6">
          {items.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group",
                location.pathname === item.path 
                  ? "bg-slate-800 text-slate-100" 
                  : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
              )}
            >
              <item.icon size={18} className={cn("transition-colors", location.pathname === item.path ? "text-secondary" : "group-hover:text-slate-100")} />
              {item.name}
              {item.name === 'Leads' && (
                <span className="ml-auto bg-secondary text-white text-[10px] px-1.5 py-0.5 rounded-full">4</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Developer Role Switcher (Visible in Sandbox/Demo sessions only) */}
        {showSandbox && (
          <div className="px-4 py-3 mx-3 mb-4 mt-auto bg-slate-800/40 rounded-xl border border-slate-700/50">
            <div className="text-[10px] font-extrabold text-secondary uppercase tracking-widest mb-2 w-full text-left flex items-center justify-between">
              <span>Developer Sandbox Controls</span>
              <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
            </div>
            <div className="grid grid-cols-3 gap-1.5 mt-2 shadow-sm">
              {(['parent', 'tutor', 'admin'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRoleSwitch(r);
                  }}
                  className={cn(
                    "text-[9px] font-bold uppercase py-1.5 rounded-lg transition-all cursor-pointer border shadow-sm text-center",
                    role === r 
                      ? "bg-secondary text-white border-secondary" 
                      : "bg-slate-700/30 text-slate-300 hover:text-white hover:bg-slate-700 border-slate-650"
                  )}
                >
                  {r.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold ring-2 ring-slate-800">
              {(user?.fullName || 'User').split(' ').filter(Boolean).map(n => n[0]).join('') || 'U'}
            </div>
            <div>
              <p className="text-sm font-semibold truncate max-w-[120px]">{user?.fullName || 'User'}</p>
              <p className="text-xs text-slate-400 capitalize">{effectiveRole} Portal</p>
            </div>
          </div>
          <button 
            onClick={handleSignOut}
            className="flex items-center gap-3 px-3 py-2 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all text-sm font-medium"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-600" 
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div className="hidden md:flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 w-64 transition-focus-within focus-within:ring-2 focus-within:ring-primary/5 focus-within:border-primary">
              <Search size={16} className="text-slate-400 mr-2" />
              <input type="text" placeholder="Search..." className="bg-transparent border-none focus:outline-none text-xs w-full text-slate-600" />
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <button 
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary rounded-full border-2 border-white"></span>
            </button>

            {notificationsOpen && (
              <div 
                className="absolute right-0 top-12 mt-2 bg-white border border-slate-250 rounded-2xl shadow-2xl py-3 w-80 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                onMouseLeave={() => setNotificationsOpen(false)}
              >
                <div className="px-4 pb-2 mb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Notifications</span>
                  <span className="text-[9px] font-bold text-secondary uppercase bg-secondary/5 px-1.5 py-0.5 rounded">System alerts</span>
                </div>
                <div className="max-h-64 overflow-y-auto px-2 space-y-1">
                  {effectiveRole === 'tutor' ? (
                    <>
                      <div className="p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left space-y-1">
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0"></span>
                          <span>Assigned Trial Session Mapped</span>
                        </p>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          A 1-on-1 Amharic trial booking has been successfully matched & scheduled. Tap 'Daily Agenda' on your dashboard to see details or join the video classroom!
                        </p>
                        <p className="text-[8px] text-slate-400 font-bold font-mono">JUST NOW</p>
                      </div>
                      <div className="p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left space-y-1">
                        <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0"></span>
                          <span>Account Link Successful</span>
                        </p>
                        <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                          Your virtual tutor profile is fully connected. Availability hours can now be saved securely across both parent and operator pipelines.
                        </p>
                        <p className="text-[8px] text-slate-400 font-bold font-mono">1 HOUR AGO</p>
                      </div>
                    </>
                  ) : effectiveRole === 'parent' ? (
                    <div className="p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left space-y-1">
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0"></span>
                        <span>Trial Class Confirmed!</span>
                      </p>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                        We have paired your child with a matching native tutor. View schedule on your dashboard.
                      </p>
                      <p className="text-[8px] text-slate-400 font-bold font-mono">15 MINS AGO</p>
                    </div>
                  ) : (
                    <div className="p-2.5 rounded-lg hover:bg-slate-50 transition-colors text-left space-y-1">
                      <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0"></span>
                        <span>Operator Log Online</span>
                      </p>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                        All sync operations and lead status schedules are online and healthy.
                      </p>
                      <p className="text-[8px] text-slate-400 font-bold font-mono">TODAY</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {effectiveRole === 'admin' ? 'Admin Operations' : effectiveRole === 'tutor' ? 'Tutor Portal' : 'Parent Portal'}
                </p>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold font-sans">Priority Support</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Dashboard Page */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <>
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 lg:hidden"
          />
          <aside 
            className="fixed top-0 left-0 bottom-0 w-72 bg-slate-900 text-white z-[60] flex flex-col lg:hidden"
          >
            <div className="p-5 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0">
                  <BrandLogo 
                    logoUrl={brandSettings.activeLogoUrl || '/logo_option_one.png'} 
                    className="w-full h-full"
                  />
                </div>
                <span className="text-lg font-bold tracking-tight text-slate-100 truncate">
                  {brandSettings.academyName}
                </span>
              </div>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {items.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
                    location.pathname === item.path 
                      ? "bg-slate-800 text-slate-100" 
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                  )}
                >
                  <item.icon size={18} className={location.pathname === item.path ? "text-secondary" : ""} />
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Role Switcher (Visible in Sandbox/Demo sessions only) */}
            {showSandbox && (
              <div className="relative z-50 px-6 py-4 mx-4 mb-4 bg-slate-800/80 rounded-xl border border-slate-700 shadow-xl">
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">Switch View</p>
                <div className="grid grid-cols-3 gap-2">
                  {(['parent', 'tutor', 'admin'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleRoleSwitch(r);
                        setIsSidebarOpen(false);
                      }}
                      className={cn(
                        "text-[10px] font-bold uppercase py-2 rounded transition-all text-center cursor-pointer border border-transparent shadow-sm",
                        role === r 
                          ? "bg-secondary text-white border-secondary/50" 
                          : "bg-slate-700/50 text-slate-400 hover:text-slate-200 hover:bg-slate-700"
                      )}
                    >
                      {r.slice(0, 3)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="p-6 border-t border-slate-800">
              <button 
                onClick={handleSignOut}
                className="flex items-center gap-3 px-3 py-2 w-full text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all text-sm font-medium"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}
