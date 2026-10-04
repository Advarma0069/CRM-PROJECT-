import { useState, useMemo } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell,
  Legend, ComposedChart, Line
} from "recharts";
import { 
  FiPlus, FiTrash2, FiEdit, FiSearch, FiX, FiLayers, FiTrendingUp, FiPieChart 
} from "react-icons/fi";

export default function MarketingERPV3() {
  // --- 1. INITIAL DATA ---
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: "Google Search", type: "Google Ads", revenue: 450000, cost: 50000, leads: 1200, conversions: 150, date: "2026-01" },
    { id: 2, name: "FB Retargeting", type: "Facebook Ads", revenue: 120000, cost: 30000, leads: 5000, conversions: 80, date: "2026-02" },
    { id: 3, name: "Insta Brand", type: "Instagram", revenue: 80000, cost: 25000, leads: 8000, conversions: 40, date: "2026-03" },
    { id: 4, name: "Email Blast", type: "Email", revenue: 300000, cost: 5000, leads: 2000, conversions: 300, date: "2026-04" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", type: "Google Ads", revenue: "", cost: "", leads: "", conversions: "", date: "" });

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

  // --- 2. SEARCH & FILTER ---
  const filteredData = useMemo(() => {
    return campaigns.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [campaigns, searchTerm]);

  // --- 3. CRUD HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    const formattedData = { 
      ...formData, 
      id: editingId || Date.now(), 
      revenue: Number(formData.revenue), 
      cost: Number(formData.cost),
      leads: Number(formData.leads),
      conversions: Number(formData.conversions)
    };
    if (editingId) {
      setCampaigns(campaigns.map(c => c.id === editingId ? formattedData : c));
    } else {
      setCampaigns([...campaigns, formattedData]);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] dark:bg-[#020617] min-h-screen text-left">
      
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg"><FiLayers size={24}/></div>
          <div className="text-left">
            <h1 className="text-xl font-black dark:text-white">Marketing Analytics ERP</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Multi-Channel Performance v3.0</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input placeholder="Global Filter..." className="pl-12 pr-4 py-3 bg-white dark:bg-slate-900 rounded-2xl border-none outline-none shadow-sm text-sm font-bold w-64" onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <button onClick={() => { setEditingId(null); setFormData({ name: "", type: "Google Ads", revenue: "", cost: "", leads: "", conversions: "", date: "" }); setIsModalOpen(true); }} className="px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs shadow-xl hover:bg-indigo-700 transition-all">+ NEW INTAKE</button>
        </div>
      </div>

      {/* GRAPH GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        
        {/* 1. Area Chart: Revenue vs Cost */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-[350px]">
          <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 flex items-center gap-2 tracking-widest"><FiTrendingUp/> Financial Performance (Timeline)</h3>
          <ResponsiveContainer width="100%" height="85%">
            <AreaChart data={filteredData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/><stop offset="95%" stopColor="#6366F1" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.1}/>
              <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false}/>
              <YAxis fontSize={10} axisLine={false} tickLine={false}/>
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#6366F1" fillOpacity={1} fill="url(#colorRev)" strokeWidth={3} />
              <Area type="monotone" dataKey="cost" stroke="#EF4444" fill="transparent" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* 2. Composed Chart: Leads & Conversion Rate */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-[350px]">
          <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 flex items-center gap-2 tracking-widest"><FiSearch/> Funnel Efficiency</h3>
          <ResponsiveContainer width="100%" height="85%">
            <ComposedChart data={filteredData}>
              <XAxis dataKey="name" fontSize={10} axisLine={false} tickLine={false}/>
              <YAxis fontSize={10} axisLine={false} tickLine={false}/>
              <Tooltip />
              <Bar dataKey="leads" fill="#e2e8f0" radius={[10, 10, 0, 0]} barSize={30} />
              <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={3} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* 3. Bar Chart: Cost per Channel */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-[350px]">
          <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 tracking-widest">Ad Spend by Category</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={filteredData} layout="vertical">
              <XAxis type="number" hide />
              <YAxis dataKey="type" type="category" fontSize={10} axisLine={false} tickLine={false} width={80}/>
              <Tooltip cursor={{fill: '#f8fafc'}} />
              <Bar dataKey="cost" fill="#6366F1" radius={[0, 10, 10, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 4. Pie Chart: Revenue Distribution */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 h-[350px]">
          <h3 className="text-[10px] font-black uppercase text-slate-400 mb-6 flex items-center gap-2 tracking-widest"><FiPieChart/> Revenue Share</h3>
          <ResponsiveContainer width="100%" height="85%">
            <PieChart>
              <Pie data={filteredData} innerRadius={60} outerRadius={80} dataKey="revenue" paddingAngle={5}>
                {filteredData.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left border-separate border-spacing-0 text-sm">
          <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase text-slate-400">
            <tr>
              {["Campaign", "Budget", "Revenue", "ROI", "Conversion", "Actions"].map(h => (
                <th key={h} className="p-6 border-b dark:border-slate-800">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800 font-bold">
            {filteredData.map(c => (
              <tr key={c.id} className="group hover:bg-indigo-50/20 transition-all">
                <td className="p-6">
                  <div className="flex flex-col"><span className="dark:text-white">{c.name}</span><span className="text-[10px] text-slate-400 italic font-medium">{c.type}</span></div>
                </td>
                <td className="p-6 dark:text-slate-400">₹{c.cost.toLocaleString()}</td>
                <td className="p-6 text-indigo-600">₹{c.revenue.toLocaleString()}</td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-lg text-[9px] uppercase ${c.revenue > c.cost ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}>
                    {(((c.revenue - c.cost) / c.cost) * 100).toFixed(0)}% ROI
                  </span>
                </td>
                <td className="p-6 dark:text-white">{((c.conversions / c.leads) * 100).toFixed(1)}%</td>
                <td className="p-6">
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button onClick={() => { setEditingId(c.id); setFormData(c); setIsModalOpen(true); }} className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><FiEdit/></button>
                    <button onClick={() => setCampaigns(campaigns.filter(x => x.id !== c.id))} className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><FiTrash2/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-3xl border border-white/10 text-left font-bold">
            <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-4">
              <h2 className="text-xl font-black dark:text-white uppercase tracking-tight">{editingId ? "Update Performance" : "New Intake Entry"}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><FiX size={24}/></button>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2 space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 ml-1">Campaign Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" placeholder="Google Search 2026" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 ml-1">Budget (₹)</label>
                <input required type="number" value={formData.cost} onChange={e => setFormData({...formData, cost: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 ml-1">Revenue (₹)</label>
                <input required type="number" value={formData.revenue} onChange={e => setFormData({...formData, revenue: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 ml-1">Leads Generated</label>
                <input required type="number" value={formData.leads} onChange={e => setFormData({...formData, leads: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 ml-1">Conversions</label>
                <input required type="number" value={formData.conversions} onChange={e => setFormData({...formData, conversions: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" />
              </div>
              <button type="submit" className="col-span-2 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:bg-indigo-700 transition-all mt-4">Save & Sync Charts</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
