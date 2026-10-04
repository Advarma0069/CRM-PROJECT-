import React, { useState, useMemo, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Bell, Plus, TrendingUp, Target, Zap, Clock, 
  X, ShieldCheck, ChevronRight, Filter, Globe, Trophy, AlertCircle, ArrowUpRight, Mail
} from 'lucide-react';

/* ---------------- 1. ULTIMATE DATA ENGINE ---------------- */
const REVENUE_TIMELINE = [
  { m: 'Jan', actual: 45000, forecast: 48000 },
  { m: 'Feb', actual: 52000, forecast: 55000 },
  { m: 'Mar', actual: 48000, forecast: 62000 },
  { m: 'Apr', actual: 61000, forecast: 68000 },
  { m: 'May', actual: 72000, forecast: 75000 },
];

const INITIAL_ACCOUNTS = [
  { id: 'acc_1', name: "Solaris Tech", val: 42000, score: 92, owner: "Aditya V.", region: "EMEA", status: "Stable" },
  { id: 'acc_2', name: "Quantum Labs", val: 18500, score: 42, owner: "Sarah J.", region: "APAC", status: "At Risk" },
  { id: 'acc_3', name: "Vertex AI", val: 125000, score: 85, owner: "Aditya V.", region: "NA", status: "Stable" },
];

const LEADERBOARD = [
  { name: "Aditya V.", deals: 14, rev: 167000, color: "#6366f1" },
  { name: "Sarah J.", deals: 9, rev: 92000, color: "#8b5cf6" },
  { name: "Varma K.", deals: 6, rev: 45000, color: "#ec4899" },
];

export default function NexusEliteCRM() {
  const [accounts, setAccounts] = useState(() => JSON.parse(localStorage.getItem('nx_elite_v5')) || INITIAL_ACCOUNTS);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => localStorage.setItem('nx_elite_v5', JSON.stringify(accounts)), [accounts]);

  // HISAB-KITAB LOGIC (Weighted Forecasting)
  const metrics = useMemo(() => {
    const total = accounts.reduce((s, a) => s + a.val, 0);
    const weighted = accounts.reduce((s, a) => s + (a.val * (a.score/100)), 0);
    return { total, weighted, count: accounts.length };
  }, [accounts]);

  const activeAcc = useMemo(() => accounts.find(a => a.id === selectedId), [selectedId, accounts]);

  const handleAddAccount = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newAcc = {
      id: `acc_${Date.now()}`,
      name: fd.get('name'),
      val: Number(fd.get('value')),
      score: Math.floor(Math.random() * 50) + 50,
      owner: "Aditya V.",
      region: fd.get('region'),
      status: "Stable"
    };
    setAccounts([newAcc, ...accounts]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] text-slate-900 dark:text-slate-100 font-sans p-6 lg:p-12">
      
      {/* 2. COMMAND HEADER */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 mb-12">
        <div className="flex items-center gap-6">
          <div className="p-4 bg-indigo-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-500/40 animate-pulse-slow">
            <Zap size={32} fill="currentColor"/>
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter italic">Analysis <span className="text-indigo-600">Report</span></h1>
            <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Autonomous Revenue Cloud v6.0</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="⌘K Search Pipeline..." 
              className="pl-12 pr-6 py-4 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full outline-none focus:ring-4 ring-indigo-500/10 transition-all font-bold text-sm" 
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-sm shadow-xl shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all">
            + PROVISION LEAD
          </button>
        </div>
      </header>

      {/* 3. DYNAMIC KPI BLOCKS (BIGGER & BETTER) */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
        <KpiCard label="Pipeline ARR" val={`$${(metrics.total/1000).toFixed(1)}k`} icon={TrendingUp} trend="+18.4%" color="text-emerald-500" />
        <KpiCard label="Weighted Forecast" val={`$${(metrics.weighted/1000).toFixed(1)}k`} icon={Zap} trend="Realistic" color="text-indigo-500" />
        <KpiCard label="Win Probability" val="74.2%" icon={Target} trend="Optimal" color="text-amber-500" />
        <KpiCard label="Active Accounts" val={metrics.count} icon={Globe} trend="+2 New" color="text-violet-500" />
      </section>

      {/* 4. ANALYTICS HUB */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        
        {/* REVENUE FORECAST GRAPH */}
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h3 className="text-2xl font-black">Growth Intelligence</h3>
              <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">AI Predictive ARR Model</p>
            </div>
            <div className="flex gap-4">
              <span className="flex items-center gap-2 text-[10px] font-black text-indigo-600"><div className="w-2 h-2 bg-indigo-600 rounded-full"/> ACTUAL</span>
              <span className="flex items-center gap-2 text-[10px] font-black text-slate-300"><div className="w-2 h-2 bg-slate-300 rounded-full"/> FORECAST</span>
            </div>
          </div>
          <div className="h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_TIMELINE}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <YAxis hide />
                <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="actual" stroke="#6366f1" strokeWidth={6} fillOpacity={1} fill="url(#colorActual)" />
                <Area type="monotone" dataKey="forecast" stroke="#94a3b8" strokeWidth={2} strokeDasharray="10 10" fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TEAM LEADERBOARD BOX */}
        <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 flex flex-col shadow-sm">
          <h3 className="text-xl font-black mb-8 flex items-center gap-3"><Trophy className="text-amber-500" size={24}/> Top Closers</h3>
          <div className="space-y-8 flex-1">
            {LEADERBOARD.map((user, i) => (
              <div key={i} className="flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black group-hover:scale-110 transition-transform">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-black text-sm">{user.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase">{user.deals} Deals Won</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-indigo-600">${(user.rev/1000).toFixed(0)}k</p>
                  <div className="h-1 w-16 bg-slate-100 dark:bg-slate-800 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-indigo-500" style={{width: `${(user.rev/167000)*100}%`}} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-10 py-5 bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 rounded-3xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all">Full Performance Audit</button>
        </div>
      </div>

      {/* 5. OPPORTUNITY TABLE */}
      <div className="mt-10 bg-white dark:bg-slate-900 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h3 className="text-2xl font-black italic">Active Pipeline</h3>
          <Filter size={24} className="text-slate-300 cursor-pointer hover:text-indigo-600 transition-colors" />
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr className="text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
              <th className="px-10 py-6">Company / Region</th>
              <th className="px-10 py-6">Deal Value</th>
              <th className="px-10 py-6">AI Health</th>
              <th className="px-10 py-6 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {accounts.filter(a => a.name.toLowerCase().includes(search.toLowerCase())).map(acc => (
              <tr key={acc.id} onClick={() => setSelectedId(acc.id)} className="hover:bg-indigo-500/5 cursor-pointer transition-all group">
                <td className="px-10 py-8">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-[1.5rem] flex items-center justify-center font-black text-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all">{acc.name.charAt(0)}</div>
                    <div>
                      <p className="font-black text-lg tracking-tight">{acc.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{acc.region} • {acc.owner}</p>
                    </div>
                  </div>
                </td>
                <td className="px-10 py-8 font-black text-base text-slate-600 dark:text-slate-300">${acc.val.toLocaleString()}</td>
                <td className="px-10 py-8">
                  <div className={`flex items-center gap-2 font-black text-sm ${acc.status === 'At Risk' ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {acc.status === 'At Risk' ? <AlertCircle size={16}/> : <ShieldCheck size={16}/>} {acc.score}%
                  </div>
                </td>
                <td className="px-10 py-8 text-right"><button className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-all"><Mail size={20} className="text-slate-400"/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 6. MODAL SYSTEM */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl p-4">
            <motion.form 
              onSubmit={handleAddAccount} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3.5rem] p-12 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-10"><h2 className="text-3xl font-black italic">Provision Lead</h2><button type="button" onClick={() => setIsModalOpen(false)}><X size={28}/></button></div>
              <div className="space-y-8">
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Organization</label><input name="name" required className="w-full bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border-none outline-none font-black text-lg" placeholder="e.g. Acme Corp" /></div>
                <div className="grid grid-cols-2 gap-6">
                   <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Value ($)</label><input name="value" type="number" required className="w-full bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border-none outline-none font-black" /></div>
                   <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Region</label><select name="region" className="w-full bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border-none outline-none font-black"><option>NA</option><option>EMEA</option><option>APAC</option></select></div>
                </div>
              </div>
              <button type="submit" className="w-full mt-12 bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] transition-all">Activate Pipeline</button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const KpiCard = ({ label, val, icon: Icon, trend, color }) => (
  <div className="bg-white dark:bg-slate-900 p-10 rounded-[3.5rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
    <div className={`p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 w-fit mb-8 ${color} group-hover:scale-110 transition-transform`}><Icon size={32} /></div>
    <div className="absolute top-10 right-10 flex items-center gap-1 text-[10px] font-black px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full tracking-widest uppercase">
      {trend} {trend.includes('+') ? <ArrowUpRight size={12}/> : ''}
    </div>
    <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{label}</p>
    <h2 className="text-4xl font-black tracking-tighter italic">{val}</h2>
  </div>
);
