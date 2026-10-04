import { useEffect, useMemo, useState } from "react";
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, 
  LineChart, Line, XAxis, YAxis, CartesianGrid, AreaChart, Area 
} from "recharts";
import { 
  FiEye, FiEdit, FiTrash2, FiPlus, FiZap, FiMail, 
  FiTrendingUp, FiTarget, FiActivity, FiX, FiSearch, FiChevronRight 
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* --- 2026 ENTERPRISE COLOR PALETTE --- */
const THEME = {
  Open: "#6366f1",      // Indigo
  Contacted: "#f59e0b", // Amber
  Closed: "#10b981",    // Emerald
  Lost: "#ef4444",      // Rose
};

export default function EliteCRMDashboard() {
  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem("nexus_elite_v6");
    return saved ? JSON.parse(saved) : [
      { id: 1, name: "Solaris Tech", email: "corp@solaris.io", status: "Open", source: "Direct", value: 42000, score: 92 },
      { id: 2, name: "Quantum Labs", email: "hr@quantum.ai", status: "Contacted", source: "Referral", value: 18500, score: 45 },
      { id: 3, name: "Vertex AI", email: "ceo@vertex.co", status: "Closed", value: 125000, source: "Google", score: 85 }
    ];
  });

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  useEffect(() => {
    localStorage.setItem("nexus_elite_v6", JSON.stringify(leads));
  }, [leads]);

  /* ------------------ PREDICTIVE ANALYTICS ENGINE ------------------ */
  const analytics = useMemo(() => {
    const totalValue = leads.reduce((s, l) => s + (l.value || 0), 0);
    const avgScore = Math.round(leads.reduce((s, l) => s + (l.score || 0), 0) / (leads.length || 1));
    return {
      totalValue,
      avgScore,
      count: leads.length,
      conversion: ((leads.filter(l => l.status === "Closed").length / (leads.length || 1)) * 100).toFixed(1)
    };
  }, [leads]);

  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const statusOk = filter === "All" || l.status === filter;
      const searchOk = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
      return statusOk && searchOk;
    });
  }, [leads, filter, search]);

  /* ------------------ ACTIONS ------------------ */
  const handleAddLead = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newLead = {
      id: Date.now(),
      name: fd.get('name'),
      email: fd.get('email'),
      value: parseInt(fd.get('value')),
      status: 'Open',
      source: fd.get('source'),
      score: Math.floor(Math.random() * 40) + 60, // AI Scoring simulation
    };
    setLeads([newLead, ...leads]);
    setIsModalOpen(false);
  };

  const deleteLead = id => {
    if (window.confirm("Permanent delete this opportunity?")) {
      setLeads(prev => prev.filter(l => l.id !== id));
      setSelectedLead(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#020617] p-4 lg:p-10 font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-[1800px] mx-auto">
        
        {/* TOP COMMAND BAR */}
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-12 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-indigo-600 rounded-[2rem] text-white shadow-2xl shadow-indigo-500/20">
              <FiZap size={32} fill="currentColor"/>
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter italic">Lead <span className="text-indigo-600 underline">Magement</span></h1>
              <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Revenue Intelligence Cloud v6.0</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
            <div className="relative flex-1 md:w-80 group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
              <input 
                className="w-full pl-12 pr-6 py-4 rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 outline-none focus:ring-4 ring-indigo-500/10 font-bold text-sm"
                placeholder="Search entire pipeline..."
                value={search} onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-8 py-4 rounded-[1.5rem] font-black text-sm shadow-xl shadow-indigo-500/30 active:scale-95 transition-all">
              + DEPLOY OPPORTUNITY
            </button>
          </div>
        </header>

        {/* PREDICTIVE KPI STRIP */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 mb-12">
          <KpiCard title="Committed ARR" value={`$${(analytics.totalValue/1000).toFixed(1)}k`} icon={<FiTrendingUp/>} trend="+14.2%" />
          <KpiCard title="AI Win Score" value={`${analytics.avgScore}%`} icon={<FiZap/>} trend="Optimal" />
          <KpiCard title="Active Deals" value={analytics.count} icon={<FiTarget/>} trend="+2 New" />
          <KpiCard title="Conv. Velocity" value={`${analytics.conversion}%`} icon={<FiActivity/>} trend="High" />
        </section>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
          {/* PIPELINE TABLE */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-10 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <h3 className="text-xl font-black italic tracking-tight">Active Relationship Stream</h3>
              <div className="flex gap-2">
                {['All', 'Open', 'Closed'].map(t => (
                  <button key={t} onClick={() => setFilter(t)} className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === t ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>{t}</button>
                ))}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 dark:bg-slate-800/30">
                  <tr className="text-slate-400 text-[10px] uppercase font-black tracking-widest border-b border-slate-100 dark:border-slate-800">
                    <th className="px-10 py-6">Prospect Entity</th>
                    <th className="px-10 py-6">Deal Value</th>
                    <th className="px-10 py-6 text-center">AI Health</th>
                    <th className="px-10 py-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredLeads.map(l => (
                    <tr key={l.id} onClick={() => setSelectedLead(l)} className="hover:bg-indigo-500/5 cursor-pointer transition-all group">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-5">
                          <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-[1.5rem] flex items-center justify-center font-black text-xl text-indigo-600">{l.name.charAt(0)}</div>
                          <div><p className="font-black text-lg">{l.name}</p><p className="text-xs text-slate-400 font-bold tracking-tight">{l.email}</p></div>
                        </div>
                      </td>
                      <td className="px-10 py-8 text-sm font-black text-slate-500 dark:text-slate-400">${(l.value/1000).toFixed(1)}k</td>
                      <td className="px-10 py-8">
                         <div className="flex flex-col items-center gap-1">
                           <div className="w-20 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                             <div className="h-full bg-indigo-500 transition-all duration-1000" style={{width: `${l.score}%`}} />
                           </div>
                           <span className="text-[10px] font-black text-indigo-600">{l.score}% Win Prob.</span>
                         </div>
                      </td>
                      <td className="px-10 py-8 text-right">
                        <button className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-indigo-600 hover:text-white transition-all"><FiMail size={18}/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ANALYTICS COLUMN */}
          <div className="space-y-10">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
              <h3 className="font-black text-sm uppercase tracking-widest text-slate-400 mb-8">Pipeline Trajectory</h3>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[{n: 'M1', v: 40}, {n: 'M2', v: 70}, {n: 'M3', v: 45}, {n: 'M4', v: 90}]}>
                    <defs>
                      <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                    <Tooltip contentStyle={{borderRadius: '24px', border: 'none', boxShadow: '0 25px 50px rgba(0,0,0,0.1)'}} />
                    <Area type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={5} fill="url(#areaGrad)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI DECISION WIDGET */}
            <div className="bg-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl shadow-indigo-500/40 relative group overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl transition-transform group-hover:scale-150" />
               <h3 className="text-xl font-bold flex items-center gap-2 mb-6"><FiZap fill="white"/> AI Copilot Insights</h3>
               <p className="text-indigo-100 text-sm leading-relaxed italic mb-8">
                 "Based on 14 signals, Solaris Tech has a 92% closure probability. Decision maker just viewed the technical proposal."
               </p>
               <button className="w-full bg-white text-indigo-700 py-4 rounded-2xl font-black text-sm hover:shadow-xl transition-all flex items-center justify-center gap-2">
                 Automate Follow-up <FiChevronRight/>
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* DEPLOYMENT MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xl p-4">
            <motion.form 
              onSubmit={handleAddLead} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[3rem] p-12 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black tracking-tight italic">Provision Opportunity</h2>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-rose-50 rounded-xl transition-colors"><FiX size={28}/></button>
              </div>
              <div className="space-y-8">
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Organization</label><input name="name" required className="w-full bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border-none outline-none font-black text-lg" placeholder="e.g. Acme Corp" /></div>
                <div className="grid grid-cols-2 gap-6">
                   <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Value ($)</label><input name="value" type="number" required className="w-full bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border-none outline-none font-black" /></div>
                   <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Origin</label><select name="source" className="w-full bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border-none outline-none font-black"><option>Direct</option><option>Referral</option><option>Google</option></select></div>
                </div>
                <div><label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 mb-2 block">Executive Email</label><input name="email" type="email" required className="w-full bg-slate-100 dark:bg-slate-800 p-5 rounded-2xl border-none outline-none font-black" /></div>
              </div>
              <button type="submit" className="w-full mt-12 bg-indigo-600 text-white py-6 rounded-[2rem] font-black text-xl shadow-2xl shadow-indigo-500/30 hover:scale-[1.02] transition-all">Launch Account</button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KpiCard({ title, value, icon, trend }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-10 rounded-[3rem] border border-slate-200 dark:border-slate-800 shadow-sm relative group overflow-hidden">
      <div className="p-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800 w-fit mb-6 text-indigo-600 transition-transform group-hover:scale-110 duration-500">{icon}</div>
      <div className="absolute top-10 right-10 flex items-center gap-1 text-[10px] font-black px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-full tracking-widest uppercase">{trend}</div>
      <p className="text-slate-400 text-xs font-black uppercase tracking-[0.2em] mb-1">{title}</p>
      <h2 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">{value}</h2>
    </div>
  );
}
