import { useState, useEffect, useRef } from "react";
import {
  User, Settings, LogOut, Bell, Search,
  Moon, Sun, Command, Cpu, Fingerprint,
  LayoutGrid, Activity, Menu, ChevronRight, Sparkles
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NexusApexHeader({ darkMode, setDarkMode, setSidebarOpen, sidebarOpen }) {
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);

  // Scroll Detection for Floating Effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Click Outside logic to close dropdowns
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenProfile(false);
        setOpenNotification(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header ref={menuRef} className={`sticky top-0 z-50 transition-all duration-500 px-6 
      ${isScrolled
        ? "h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-2xl mt-4 mx-6 rounded-[2rem] border border-white/20 dark:border-slate-800"
        : "h-24 bg-transparent border-b border-transparent"}`}>

      <div className="h-full max-w-[1600px] mx-auto flex items-center justify-between">

        {/* LEFT: TOGGLE & BRAND */}
        <div className="flex items-center gap-6">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 transition-all"
          >
            <Menu size={20} className={sidebarOpen ? "text-indigo-600" : "text-slate-500"} />
          </motion.button>

          <div className="hidden md:flex items-center gap-3 group cursor-default">
            <div className="w-10 h-10 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <Cpu className="text-white" size={20} />
            </div>
            <div className="hidden lg:block">
              <h1 className="text-xl font-black tracking-tighter text-slate-900 dark:text-white leading-none uppercase">
                CRM<span className="text-indigo-600 italic">ENT</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Node: AP-South-1</p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER: SEARCH */}
        <div className="hidden xl:flex items-center relative group max-w-md w-full mx-10">
          <Search className="absolute left-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
          <input
            type="text"
            placeholder="Search records or actions..."
            className="w-full pl-12 pr-16 py-3 bg-slate-100/50 dark:bg-slate-800/50 border border-purple-500/30 focus:border-indigo-500/30 focus:bg-white dark:focus:bg-slate-900 rounded-2xl text-xs font-bold outline-none transition-all duration-300"
          />
          <div className="absolute right-3 flex items-center gap-1 bg-white dark:bg-slate-700 px-2 py-1 rounded-lg border dark:border-slate-600 shadow-sm">
            <Command size={10} className="text-slate-400" />
            <span className="text-[9px] font-black text-slate-400 uppercase">A</span>
          </div>
        </div>

        {/* RIGHT: TOOLS & PROFILE */}
        <div className="flex items-center gap-4">

          {/* SYSTEM HEALTH */}
          <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-indigo-50/50 dark:bg-indigo-500/5 rounded-2xl border border-indigo-100/50 dark:border-indigo-500/10">
            <Activity className="text-indigo-600 animate-pulse" size={14} />
            <div className="text-left leading-none">
              <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none">Latency</p>
              <p className="text-[10px] font-black text-indigo-600 mt-1 uppercase leading-none">12ms</p>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex items-center gap-1 p-1.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border dark:border-slate-800 ">
            <HeaderIconButton onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </HeaderIconButton>

            <div className="relative">
              <HeaderIconButton onClick={() => setOpenNotification(!openNotification)} active={openNotification}>
                <Bell size={18} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900"></span>
              </HeaderIconButton>

              <AnimatePresence>
                {openNotification && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-6 w-80 bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-[2.5rem] shadow-2xl p-6"
                  >
                    <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400 mb-6 px-2">System Intel</h4>
                    <div className="space-y-4">
                      <NotifyItem msg="High-value deal closed" time="2m ago" />
                      <NotifyItem msg="Server backup sync" time="1h ago" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* PROFILE */}
          <div className="relative">
            <button
              onClick={() => setOpenProfile(!openProfile)}
              className="flex items-center gap-3 p-1.5 pl-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-2xl hover:shadow-xl transition-all duration-300"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black tracking-tight leading-none">Aditya Varma</p>
                <p className="text-[9px] font-bold text-indigo-400 dark:text-indigo-600 mt-1 uppercase tracking-widest">Master Admin</p>
              </div>
              <div className="relative">
                <img
                  src="https://i.pravatar.cc"
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-indigo-500"
                  alt="Admin"
                />
                <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-900 p-0.5 rounded-md border dark:border-slate-800">
                  <Fingerprint size={10} className="text-indigo-600" />
                </div>
              </div>
            </button>

            <AnimatePresence>
              {openProfile && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-6 w-64 bg-white dark:bg-slate-900 border dark:border-slate-700 rounded-[2.5rem] shadow-2xl p-4"
                >
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl mb-2 border dark:border-slate-800">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tighter">Global Industries Ltd</p>
                    <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">ID: NEX-4482</p>
                  </div>
                  <div className="space-y-1">
                    <ProfileItem icon={<User size={14} />} label="My Identity" />
                    <ProfileItem icon={<Settings size={14} />} label="Cloud Config" />
                    <div className="my-2 border-t dark:border-slate-800 mx-4" />
                    <ProfileItem icon={<LogOut size={14} />} label="Sign Out" variant="danger" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

/* --- SUB-COMPONENTS (Error Free) --- */

const HeaderIconButton = ({ children, onClick, active }) => (
  <button
    onClick={onClick}
    className={`p-2.5 rounded-xl transition-all duration-300 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-500 hover:bg-white dark:hover:bg-slate-700 shadow-sm'}`}
  >
    {children}
  </button>
);

const NotifyItem = ({ msg, time }) => (
  <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
    <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">
      <Sparkles size={16} />
    </div>
    <div className="leading-none">
      <p className="text-xs font-bold text-slate-700 dark:text-slate-200">{msg}</p>
      <p className="text-[9px] font-black text-slate-400 uppercase mt-1.5 tracking-wider">{time}</p>
    </div>
  </div>
);

const ProfileItem = ({ icon, label, variant }) => (
  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-black transition-all
    ${variant === 'danger' ? 'text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
    {icon} <span className="uppercase tracking-tighter">{label}</span>
  </button>
);
