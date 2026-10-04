import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Users, Briefcase, FolderPlus, FilePlus,
  FileText, ClipboardList, ShoppingCart, Phone, Handshake,
  CheckSquare, BarChart3, Megaphone, LifeBuoy, Bell,
  Settings, LogOut, ChevronDown, Search, ChevronRight, Hash
} from "lucide-react";

import TopHeader from "./TopHeader";

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // 1. ALL DATA: Every item now has a dedicated icon
  const menuGroups = [
    {
      group: "Intelligence",
      items: [
        { name: "Dashboard", path: "/", icon: LayoutDashboard },
        { name: "Analytics", path: "/reports", icon: BarChart3 },
      ]
    },
    {
      group: "Sales & CRM",
      items: [
        { name: "Leads", path: "/leads", icon: Users },
        {
          name: "Entry Section",
          icon: FolderPlus,
          submenu: [
            { name: "Inquiry", path: "/EntrySection/create-inquiry", icon: FilePlus },
            { name: "Quotation", path: "/EntrySection/Create-Quotation", icon: FileText },
            { name: "Contract", path: "/EntrySection/Create-Contract", icon: ClipboardList },
            { name: "Order", path: "/EntrySection/Order", icon: ShoppingCart },
          ],
        },
        { name: "Deals", path: "/deals", icon: Handshake },
      ]
    },
    {
      group: "Operations",
      items: [
        { name: "Contacts", path: "/contacts", icon: Phone },
        { name: "Tasks", path: "/tasks", icon: CheckSquare },
        { name: "HRMS", path: "/HR-section", icon: Briefcase },
        { name: "Marketing", path: "/marketing", icon: Megaphone },
      ]
    },
    {
      group: "Support",
      items: [
        { name: "Support", path: "/support", icon: LifeBuoy },
        { name: "Notifications", path: "/notifications", icon: Bell },
        { name: "Settings", path: "/settings", icon: Settings },
      ]
    }
  ];

  // 2. SEARCH LOGIC: Working Search that filters everything
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return menuGroups;
    const q = searchQuery.toLowerCase();
    return menuGroups.map(group => ({
      ...group,
      items: group.items.filter(item =>
        item.name.toLowerCase().includes(q) ||
        item.submenu?.some(sub => sub.name.toLowerCase().includes(q))
      )
    })).filter(group => group.items.length > 0);
  }, [searchQuery]);

  // 3. BREADCRUMB LOGIC: Shows current location
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className={`${darkMode ? "dark" : ""} flex h-screen bg-[#F8FAFC] dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans antialiased`}>

      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: sidebarOpen ? 280 : 88 }}
        className="relative z-50 flex flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-sm transition-all duration-300"
      >
        {/* Brand Section */}
        <div className="h-20 flex items-center px-6 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/30 shrink-0 text-white font-bold text-xl">C</div>
          {sidebarOpen && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="ml-3">
              <h1 className="font-bold text-slate-800 dark:text-white leading-none">CRM Enterprise</h1>
              <span className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest">Global v4.2</span>
            </motion.div>
          )}
        </div>

        {/* Working Search Bar */}
        <div className="px-4 mb-6">
          <div className="relative group">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text" placeholder={sidebarOpen ? "Search everything..." : ""} value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 py-2.5 pl-10 pr-3 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all ${!sidebarOpen && 'w-10 pl-10 cursor-pointer overflow-hidden'}`}
            />
          </div>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-4 space-y-7 overflow-y-auto scrollbar-hide">
          {filteredGroups.map((group) => (
            <div key={group.group}>
              {sidebarOpen && <p className="px-3 mb-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{group.group}</p>}
              {!sidebarOpen && <div className="h-px bg-slate-100 dark:bg-slate-800 mx-2 mb-4" />}

              <div className="space-y-1">
                {group.items.map((item) => (
                  <div key={item.name}>
                    {item.submenu ? (
                      <>
                        <button
                          onClick={() => sidebarOpen && setOpenSubmenus(p => ({ ...p, [item.name]: !p[item.name] }))}
                          className={`w-full flex items-center justify-between p-3 rounded-xl transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50 ${openSubmenus[item.name] && sidebarOpen ? 'text-indigo-600' : 'text-slate-500'}`}
                        >
                          <div className="flex items-center gap-3">
                            <item.icon size={20} className={openSubmenus[item.name] ? 'text-indigo-600' : ''} />
                            {sidebarOpen && <span className="text-sm font-semibold">{item.name}</span>}
                          </div>
                          {sidebarOpen && <ChevronDown size={14} className={`transition-transform duration-300 ${openSubmenus[item.name] ? 'rotate-180' : ''}`} />}
                        </button>
                        <AnimatePresence>
                          {openSubmenus[item.name] && sidebarOpen && (
                            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden ml-4 pl-4 border-l border-slate-100 dark:border-slate-800 mt-1 space-y-1">
                              {item.submenu.map(sub => (
                                <NavLink key={sub.path} to={sub.path} className={({ isActive }) => `flex items-center gap-2 py-2 text-sm transition-all ${isActive ? 'text-indigo-600 font-bold' : 'text-slate-500 hover:text-slate-900'}`}>
                                  <sub.icon size={14} /> {sub.name}
                                </NavLink>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `flex items-center gap-3 p-3 rounded-xl transition-all relative group ${isActive ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 shadow-sm font-bold" : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 font-medium"}`}
                      >
                        <item.icon size={20} />
                        {sidebarOpen && <span className="text-sm">{item.name}</span>}
                        {location.pathname === item.path && <motion.div layoutId="active" className="absolute left-[-16px] w-1.5 h-6 bg-indigo-600 rounded-r-full" />}
                      </NavLink>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </nav>

        {/* Pro Profile Section */}
        <div className="p-4 mt-auto border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 p-0.5 shadow-md">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center font-bold text-[10px]">AV</div>
            </div>
            {sidebarOpen && (
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-800 dark:text-white truncate">Aditya Varma</p>
                <p className="text-[10px] text-indigo-500 font-bold tracking-tight">Super Admin</p>
              </div>
            )}
            <LogOut size={16} className="text-slate-400 hover:text-red-500 transition-colors" />
          </div>
        </div>
      </motion.aside>

      {/* CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50 dark:bg-[#020617]">
        <TopHeader
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />

        {/* Breadcrumb Section */}
        <div className="px-10 pt-6">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-medium bg-white dark:bg-slate-900 w-fit px-4 py-2 rounded-full shadow-sm border border-slate-100 dark:border-slate-800">
            <Hash size={12} />
            <span>CRM</span>
            {pathnames.map((name, index) => (
              <div key={index} className="flex items-center gap-2 uppercase tracking-widest">
                <ChevronRight size={12} />
                <span className={index === pathnames.length - 1 ? "text-indigo-600 font-bold" : ""}>{name}</span>
              </div>
            ))}
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-10 scroll-smooth">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
