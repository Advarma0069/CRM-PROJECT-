import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Plus, Filter, TrendingUp, Target, CheckCircle2, Zap, MessageSquare, Clock } from 'lucide-react';

// --- ROBUST MOCK DATA ---
const FORECAST_DATA = [
  { month: 'Jan', actual: 4000, forecast: 4200 },
  { month: 'Feb', actual: 5200, forecast: 5100 },
  { month: 'Mar', actual: 4800, forecast: 5800 },
  { month: 'Apr', actual: 6100, forecast: 7200 },
];

const LEADS = [
  { id: 1, name: "Solaris Tech", value: "$42,000", status: "Qualified", score: 92, owner: "Aditya" },
  { id: 2, name: "Quantum Labs", value: "$18,500", status: "Negotiation", score: 78, owner: "Sarah" },
  { id: 3, name: "Vertex AI", value: "$120,000", status: "Discovery", score: 85, owner: "Aditya" },
];

const RECENT_FEED = [
  { id: 1, user: "Sarah J.", action: "closed deal", target: "Quantum Labs", time: "2m ago" },
  { id: 2, user: "System", action: "flagged risk", target: "Solaris Tech", time: "1h ago" },
];

export default function NexusCRM() {
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-slate-900 dark:text-slate-100 selection:bg-indigo-100">
      
      {/* 1. ULTRA-MODERN NAV */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-2 font-black text-2xl tracking-tighter text-indigo-600">
            <Zap fill="currentColor" /> 
          </div>
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 rounded-2xl px-4 py-2 w-80 border border-transparent focus-within:border-indigo-500 transition-all">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Search leads, invoices..." className="bg-transparent border-none outline-none text-sm ml-3 w-full" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-2xl text-sm font-bold shadow-xl shadow-indigo-500/20 flex items-center gap-2">
            <Plus size={18} /> New Deal
          </button>

        </div>
      </header>

      <main className="p-8 max-w-[1800px] mx-auto">
        
        {/* 2. KPI SMART CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { label: "Revenue Forecast", val: "$2.4M", trend: "+14%", icon: TrendingUp, color: "text-indigo-600" },
            { label: "Active Pipeline", val: "142", trend: "+8%", icon: Target, color: "text-purple-600" },
            { label: "Close Rate", val: "68%", trend: "-2%", icon: CheckCircle2, color: "text-emerald-600" },
            { label: "Team Velocity", val: "8.4", trend: "Fast", icon: Zap, color: "text-amber-500" }
          ].map((kpi, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white dark:bg-slate-900 p-7 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm">
               <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-3xl bg-slate-50 dark:bg-slate-800 ${kpi.color}`}><kpi.icon size={28} /></div>
                  <span className="text-xs font-black bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">{kpi.trend}</span>
               </div>
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{kpi.label}</p>
               <h2 className="text-4xl font-black tracking-tighter">{kpi.val}</h2>
            </motion.div>
          ))}
        </section>

        {/* 3. CHART & FEED SECTION */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-12">
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-black mb-1">Predictive Performance</h3>
            <p className="text-slate-400 text-sm mb-10">AI-driven revenue targets vs. actual closures</p>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={FORECAST_DATA}>
                  <defs>
                    <linearGradient id="proGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="8 8" opacity={0.4} />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                  <YAxis hide />
                  <Tooltip contentStyle={{borderRadius: '20px', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)'}} />
                  <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={5} fill="url(#proGradient)" />
                  <Area type="monotone" dataKey="forecast" stroke="#94a3b8" strokeWidth={2} strokeDasharray="10 10" fill="transparent" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800">
             <h3 className="text-xl font-black mb-8 flex items-center gap-2"><Clock size={20} className="text-indigo-600" /> Activity Stream</h3>
             <div className="space-y-8">
                {RECENT_FEED.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-1 bg-slate-100 group-hover:bg-indigo-500 transition-colors rounded-full" />
                    <div>
                      <p className="text-sm font-bold"><span className="text-indigo-600">{item.user}</span> {item.action}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.target} • {item.time}</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full mt-12 py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl text-sm font-bold text-slate-400 hover:border-indigo-500 hover:text-indigo-600 transition-all">View All Activity</button>
          </div>
        </div>

        {/* 4. DYNAMIC PIPELINE TABLE */}
        <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 overflow-hidden">
          <div className="p-10 flex justify-between items-center">
            <h3 className="text-2xl font-black tracking-tight">Active Opportunities</h3>
            <div className="flex gap-3">
              <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-indigo-500 transition-all"><Filter size={18} /></button>
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-slate-50/50 dark:bg-slate-800/30">
              <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest">
                <th className="px-10 py-5 text-left">Entity</th>
                <th className="px-10 py-5">Value</th>
                <th className="px-10 py-5">AI Health Score</th>
                <th className="px-10 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {LEADS.map((lead) => (
                <tr key={lead.id} onClick={() => setSelectedLead(lead)} className="hover:bg-indigo-500/5 cursor-pointer transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center font-black text-lg">{lead.name.charAt(0)}</div>
                      <div>
                        <p className="font-black text-base">{lead.name}</p>
                        <p className="text-xs text-slate-400 font-bold">{lead.status}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-sm font-black text-slate-700 dark:text-slate-300">{lead.value}</td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full"><div className="h-full bg-indigo-500" style={{width: `${lead.score}%`}} /></div>
                      <span className="text-sm font-black text-indigo-600">{lead.score}%</span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right"><button className="p-3 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all"><MessageSquare size={18} className="text-slate-400" /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {/* 5. SLIDE-OUT DRAWER */}
      <AnimatePresence>
        {selectedLead && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full max-w-xl bg-white dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 z-50 p-12 shadow-2xl">
            <button onClick={() => setSelectedLead(null)} className="mb-10 text-slate-400 hover:text-indigo-600 font-bold flex items-center gap-2 uppercase text-xs tracking-widest">Close Panel ×</button>
            <div className="w-24 h-24 bg-indigo-600 text-white rounded-[2rem] flex items-center justify-center text-4xl font-black mb-8">{selectedLead.name.charAt(0)}</div>
            <h2 className="text-5xl font-black tracking-tighter mb-4">{selectedLead.name}</h2>
            <div className="flex gap-3 mb-12">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-black">{selectedLead.status}</span>
              <span className="bg-slate-100 dark:bg-slate-800 text-slate-500 px-4 py-1.5 rounded-full text-xs font-black">Score: {selectedLead.score}</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
               <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Deal Size</p>
                  <p className="text-2xl font-black">{selectedLead.value}</p>
               </div>
               <div className="p-8 bg-slate-50 dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] font-black uppercase text-slate-400 mb-2">Assigned To</p>
                  <p className="text-2xl font-black">{selectedLead.owner}</p>
               </div>
            </div>
            <button className="w-full mt-12 bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-lg hover:shadow-2xl hover:shadow-indigo-500/40 transition-all active:scale-95">Open Account Dossier</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
