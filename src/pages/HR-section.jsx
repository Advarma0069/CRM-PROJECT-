import { useState, useRef, useEffect } from "react";
import {
  Users, UserPlus, ClipboardList, FileText, UserCheck,
  CalendarCheck, Clock, FileSpreadsheet, IndianRupee,
  FileSignature, Briefcase, Target, MapPin, Menu, X, ChevronDown,
  Bell, Search, GraduationCap, HeartPulse, ReceiptIndianRupee,
  LogOut, UserMinus, Rocket, Award, ShieldCheck
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const menuRef = useRef(null);

  // ADDON: Strategic HR Modules for 2026
  const menuData = [
    {
      key: "talent",
      title: "Emp Mangement",
      icon: Rocket,
      items: [
        { label: "Digital Onboarding", icon: UserPlus, path: "/HRMS/onboarding" },
        { label: "New Employees", icon: Users, path: "/HRMS/Employees" },
        { label: "Emp leaves", icon: UserMinus, path: "/HRMS/Leaves" },
        { label: "Leave Calender", icon: UserMinus, path: "/HRMS/LeaveCalender" },
        { label: "Attendance", icon: ShieldCheck, path: "/HRMS/Attendance" },
      ],
    },
    {
      key: "finance",
      title: "Finance",
      icon: IndianRupee,
      items: [
        { label: "Payroll Processing", icon: IndianRupee, path: "/HRMS/payroll" },
        { label: "Expense Claims", icon: ReceiptIndianRupee, path: "/HRMS/Expenses" },
        { label: "Statutory Compliance", icon: FileSignature, path: "/HRMS/compliance" },
        { label: "Tax Declarations", icon: FileText, path: "/HRMS/tax" },
      ],
    },
    {
      key: "growth",
      title: "Growth",
      icon: GraduationCap,
      items: [
        { label: "L&D / Training", icon: GraduationCap, path: "/HRMS/learning" },
        { label: "KPI & OKRs", icon: Target, path: "/HRMS/KPI" },
        { label: "Rewards & Recognition", icon: Award, path: "/HRMS/rewards" },
      ],
    },
    {
      key: "wellbeing",
      title: "Wellness",
      icon: HeartPulse,
      items: [
        { label: "Health Tracking", icon: HeartPulse, path: "/HRMS/wellness" },
        { label: "Leave Management", icon: CalendarCheck, path: "/HRMS/leave" },
        { label: "Shift Scheduling", icon: Clock, path: "/HRMS/shifts" },
      ],
    },
  ];

  // Logic to filter menu based on search (Giving it "Working" feel)
  const filteredData = menuData.map(group => ({
    ...group,
    items: group.items.filter(i => i.label.toLowerCase().includes(searchQuery.toLowerCase()))
  })).filter(group => group.items.length > 0);

  return (
    <header className="sticky top-0 z-[1000] bg-white/90 backdrop-blur-xl border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-lg shadow-indigo-200 shadow-lg">
              <Users className="text-white" size={20} />
            </div>
            <span className="text-xl font-black text-slate-800 tracking-tight">HRMS<span className="text-indigo-600">.</span></span>
          </Link>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex items-center bg-slate-100 px-3 py-1.5 rounded-full border border-transparent focus-within:border-indigo-500 focus-within:bg-white transition-all w-64 group">
            <Search size={16} className="text-slate-400 group-focus-within:text-indigo-600" />
            <input 
              type="text" 
              placeholder="Search features..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full ml-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2" ref={menuRef}>
          {filteredData.map((menu) => (
            <div key={menu.key} className="relative">
              <button
                onClick={() => setOpenMenu(openMenu === menu.key ? null : menu.key)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all
                ${openMenu === menu.key ? "bg-indigo-50 text-indigo-600" : "text-slate-600 hover:bg-slate-50"}`}
              >
                <menu.icon size={16} />
                {menu.title}
                <ChevronDown size={14} className={`transition-transform ${openMenu === menu.key ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {openMenu === menu.key && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-0 mt-2 w-60 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2"
                  >
                    {menu.items.map((item, i) => (
                      <Link
                        key={i}
                        to={item.path}
                        onClick={() => setOpenMenu(null)}
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-all"
                      >
                        <item.icon size={16} className="text-slate-400 group-hover:text-indigo-600" />
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
          
          <Link to="/live-tracking" className="flex items-center gap-2 bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-600 transition-transform hover:scale-105">
            <MapPin size={16} />
            Tracking
          </Link>
        </nav>

      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="fixed inset-0 z-[1100] bg-white p-6 lg:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-black text-xl">Menu</span>
              <button onClick={() => setMobileOpen(false)}><X size={28} /></button>
            </div>
            <div className="space-y-8 overflow-y-auto max-h-[80vh]">
              {menuData.map(menu => (
                <div key={menu.key}>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-4 px-2">{menu.title}</h4>
                  <div className="grid grid-cols-1 gap-1">
                    {menu.items.map((item, i) => (
                      <Link key={i} to={item.path} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl font-bold text-sm">
                        <item.icon size={18} className="text-indigo-600" />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
