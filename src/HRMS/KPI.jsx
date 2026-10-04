import React from "react";
import { 
  Users, UserCheck, UserX, Clock, PhoneIncoming, 
  BarChart3, PieChart as PieIcon, MoreVertical, 
  ArrowRight, Filter, Search, ShieldCheck 
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, Cell, PieChart, Pie 
} from "recharts";

/*  MISSING DATA MODELS  */
const campaignData = [
  { name: 'Inbound Tech', calls: 450, sl: 98, color: '#6366f1' },
  { name: 'Outbound Sales', calls: 320, sl: 82, color: '#a855f7' },
  { name: 'Email Support', calls: 890, sl: 95, color: '#ec4899' },
  { name: 'Chat Bot', calls: 1200, sl: 99, color: '#10b981' },
];

const agentRoster = [
  { id: "01", name: "Ankit Sharma", campaign: "Inbound Tech", status: "On Call", time: "04:12", mood: "Good" },
  { id: "02", name: "Priya Das", campaign: "Outbound Sales", status: "Available", time: "00:45", mood: "Neutral" },
  { id: "03", name: "Rahul V.", campaign: "Email Support", status: "Break", time: "12:30", mood: "Tired" },
];

/*  THE MISSING MODULES BODY  */
export default function BPOMissingKPIs() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 pb-20">
      
      {/* 1. CAMPAIGN PERFORMANCE (BAR CHART) - 7 COLS */}
      <div className="lg:col-span-7 bg-white dark:bg-zinc-900/40 rounded-[3rem] border border-slate-200 dark:border-zinc-800 p-8 shadow-xl">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="text-2xl font-black tracking-tight">Campaign Load</h3>
            <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Live Volume per LOB (Line of Business)</p>
          </div>
          <button className="p-3 bg-slate-50 dark:bg-zinc-800 rounded-2xl"><Filter size={18}/></button>
        </div>
        
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData} layout="vertical" margin={{ left: 40 }}>
              <XAxis type="number" hide />
              <YAxis 
                dataKey="name" 
                type="category" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 11, fontWeight: 800, fill: '#71717a'}} 
              />
              <Tooltip cursor={{fill: 'transparent'}} content={<CustomBarTooltip />} />
              <Bar dataKey="calls" radius={[0, 10, 10, 0]} barSize={35}>
                {campaignData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2. QUEUE HEALTH PIE - 5 COLS */}
      <div className="lg:col-span-5 bg-white dark:bg-zinc-900/40 rounded-[3rem] border border-slate-200 dark:border-zinc-800 p-8">
        <h3 className="text-xl font-black mb-8 flex items-center gap-2">
          <PieIcon size={20} className="text-indigo-500" /> Queue Distribution
        </h3>
        <div className="h-64 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={campaignData} innerRadius={70} outerRadius={90} paddingAngle={10} dataKey="calls">
                {campaignData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-black tracking-tighter">2.8k</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase">Total Hits</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
          {campaignData.map(item => (
            <div key={item.name} className="p-3 bg-slate-50 dark:bg-zinc-800/50 rounded-2xl border border-transparent hover:border-indigo-500/20 transition-all">
              <p className="text-[9px] font-black text-slate-400 uppercase">{item.name}</p>
              <p className="text-sm font-black">{item.sl}% SL</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. LIVE AGENT ROSTER - 12 COLS */}
      <div className="lg:col-span-12 bg-white dark:bg-zinc-900/40 rounded-[3rem] border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-2xl">
        <div className="p-8 border-b border-slate-100 dark:border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="text-2xl font-black italic">Active Workforce</h3>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
              <input type="text" placeholder="Find agent..." className="w-full md:w-64 pl-10 pr-4 py-2 bg-slate-100 dark:bg-zinc-800/50 border-none rounded-xl text-xs" />
            </div>
            <button className="bg-indigo-600 text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-colors">
              Shift Roster
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-zinc-800/20 text-[10px] uppercase font-black text-slate-400 tracking-widest">
              <tr>
                <th className="px-8 py-5">Resource</th>
                <th className="px-8 py-5">Assigned LOB</th>
                <th className="px-8 py-5">Current State</th>
                <th className="px-8 py-5">State Duration</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-zinc-800">
              {agentRoster.map(agent => (
                <tr key={agent.id} className="group hover:bg-indigo-50/20 dark:hover:bg-indigo-900/5 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 bg-slate-200 dark:bg-zinc-800 rounded-full border-2 border-white dark:border-zinc-700 flex items-center justify-center font-black">
                        {agent.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-black text-sm">{agent.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">EMP_{agent.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-xs uppercase tracking-tighter text-slate-500">
                    {agent.campaign}
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase ${
                      agent.status === 'On Call' ? 'bg-emerald-500/10 text-emerald-500' : 
                      agent.status === 'Break' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {agent.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 font-mono text-xs font-black">{agent.time}</td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-lg text-slate-400 transition-colors">
                      <MoreVertical size={16}/>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

/* ---------------- HELPER COMPONENTS ---------------- */

const CustomBarTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-900 border border-white/10 p-4 rounded-2xl shadow-2xl">
        <p className="text-[10px] font-black uppercase text-indigo-400 mb-1">{payload[0].payload.name}</p>
        <p className="text-xl font-black text-white">{payload[0].value} <span className="text-xs text-zinc-500 font-normal tracking-normal">Concurrent Calls</span></p>
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-2 text-[9px] font-black text-emerald-400 uppercase">
          <ShieldCheck size={12}/> Target SL Achieved
        </div>
      </div>
    );
  }
  return null;
};
