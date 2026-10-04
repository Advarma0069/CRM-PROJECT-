import { useState, useMemo, useEffect } from "react";
import { 
  FiPlus, FiSearch, FiEdit3, FiTrash2, FiChevronLeft, FiChevronRight,
  FiX, FiActivity, FiUser, FiSmartphone, FiDollarSign, FiGlobe, FiZap, FiCalendar, FiShield
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

/* --- 1. ENHANCED DATA MODEL (In-Depth Columns) --- */
const INITIAL_DEALS = Array.from({ length: 12 }, (_, i) => ({
  id: `DL-${1001 + i}`,
  name: ["Rahul Sharma", "Amit Varma", "Neha Gupta", "Priya Das"][i % 4],
  company: ["Aries Tech", "Vertex AI", "Global Corp", "Zentry Inc"][i % 4],
  phone: `9876543${100 + i}`,
  value: Math.floor(Math.random() * 100000) + 25000,
  status: ["Qualified", "Negotiation", "Closed", "Discovery"][i % 4],
  region: ["North", "South", "East", "West"][i % 4],
  owner: ["Aditya V.", "Sarah J.", "Varma K."][i % 3],
  health: Math.floor(Math.random() * 40) + 60, // AI Score 0-100
  closeDate: "2026-03-24"
}));

const STATUS_OPTIONS = ["Discovery", "Qualified", "Negotiation", "Closed", "Lost"];

export default function NexusDeepERP() {
  const [deals, setDeals] = useState(() => JSON.parse(localStorage.getItem('nx_erp_deep')) || INITIAL_DEALS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  useEffect(() => localStorage.setItem('nx_erp_deep', JSON.stringify(deals)), [deals]);

  /* --- 2. IN-LINE STATUS UPDATE (Pro Feature) --- */
  const updateStatus = (id, newStatus) => {
    setDeals(deals.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleSave = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const dealData = {
      name: fd.get('name'),
      company: fd.get('company'),
      phone: fd.get('phone'),
      value: Number(fd.get('value')),
      region: fd.get('region'),
      owner: fd.get('owner'),
      status: fd.get('status'),
      closeDate: fd.get('closeDate'),
      health: editingId ? deals.find(d => d.id === editingId).health : 85
    };

    if (editingId) {
      setDeals(deals.map(d => d.id === editingId ? { ...d, ...dealData } : d));
    } else {
      setDeals([{ ...dealData, id: `DL-${Date.now().toString().slice(-4)}` }, ...deals]);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  /* --- 3. DATA COMPUTATION --- */
  const filteredData = deals.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-4 lg:p-10 bg-[#F8FAFC] dark:bg-[#020617] min-h-screen font-sans text-slate-900 dark:text-slate-100">
      
      {/* HEADER */}
      <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-10 gap-6">
        <div>
          <h1 className="text-3xl font-black tracking-tighter italic text-indigo-600">Deals <span className="underline text-slate-900 dark:text-white">Management</span></h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Enterprise Deal Flow & AI Insights</p>
        </div>
        <div className="flex flex-wrap items-center gap-4 w-full xl:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600" />
            <input 
              value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              placeholder="Search by client, company or owner..." 
              className="pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 w-full outline-none focus:ring-4 ring-indigo-500/10 font-bold text-sm"
            />
          </div>
          <button onClick={() => setIsModalOpen(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-sm shadow-xl shadow-indigo-500/30 active:scale-95 transition-all">+ NEW OPPORTUNITY</button>
        </div>
      </header>

      {/* TABLE SECTION */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase font-black tracking-widest text-slate-400">
              <tr>
                <th className="px-6 py-5">Prospect / Company</th>
                <th className="px-6 py-5">Geography</th>
                <th className="px-6 py-5">Deal Value</th>
                <th className="px-6 py-5">AI Health</th>
                <th className="px-6 py-5">Owner</th>
                <th className="px-6 py-5">Stage</th>
                <th className="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {currentItems.map((item) => (
                <tr key={item.id} className="hover:bg-indigo-500/[0.02] transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center font-black text-indigo-600">{item.name.charAt(0)}</div>
                      <div>
                        <p className="font-black text-sm tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">{item.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                      <FiGlobe className="text-indigo-400" /> {item.region}
                    </div>
                  </td>
                  <td className="px-6 py-5 font-black text-sm">₹{item.value.toLocaleString()}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.health > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${item.health}%` }} />
                      </div>
                      <span className="text-[10px] font-black text-slate-500">{item.health}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-600 dark:text-slate-400">{item.owner}</td>
                  <td className="px-6 py-5">
                    <select 
                      value={item.status} 
                      onChange={(e) => updateStatus(item.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer border-none shadow-sm ${
                        item.status === 'Closed' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                  </td>
                  <td className="px-6 py-5 text-right space-x-2">
                    <button onClick={() => { setEditingId(item.id); setIsModalOpen(true); }} className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 border border-slate-200 dark:border-slate-700 hover:scale-110 transition-transform"><FiEdit3/></button>
                    <button onClick={() => { if(confirm('Delete?')) setDeals(deals.filter(d=>d.id!==item.id)) }} className="p-2.5 rounded-xl bg-rose-50 text-rose-600 border border-rose-100 hover:scale-110 transition-transform"><FiTrash2/></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center px-4">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Page {currentPage} of {totalPages || 1}</p>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 disabled:opacity-30 transition-all"><FiChevronLeft/></button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-800 disabled:opacity-30 transition-all"><FiChevronRight/></button>
        </div>
      </div>

      {/* IN-DEPTH MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-sm p-4">
            <motion.form 
              onSubmit={handleSave} initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-2xl border border-slate-200 dark:border-slate-800"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic">{editingId ? 'Modify Intelligence' : 'Deploy Account'}</h2>
                <button type="button" onClick={() => { setIsModalOpen(false); setEditingId(null); }}><FiX size={28}/></button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input icon={<FiUser/>} name="name" label="Full Name" def={editingId ? deals.find(d=>d.id===editingId).name : ''} />
                <Input icon={<FiActivity/>} name="company" label="Company" def={editingId ? deals.find(d=>d.id===editingId).company : ''} />
                <Input icon={<FiSmartphone/>} name="phone" label="Contact Number" def={editingId ? deals.find(d=>d.id===editingId).phone : ''} />
                <Input icon={<FiDollarSign/>} name="value" label="Contract Value" type="number" def={editingId ? deals.find(d=>d.id===editingId).value : ''} />
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Geography</label>
                  <select name="region" defaultValue={editingId ? deals.find(d=>d.id===editingId).region : 'North'} className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl outline-none font-bold border-none">
                    <option>North</option><option>South</option><option>East</option><option>West</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Account Owner</label>
                  <select name="owner" defaultValue={editingId ? deals.find(d=>d.id===editingId).owner : 'Aditya V.'} className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl outline-none font-bold border-none">
                    <option>Aditya V.</option><option>Sarah J.</option><option>Varma K.</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Expected Close Date</label>
                  <input name="closeDate" type="date" defaultValue={editingId ? deals.find(d=>d.id===editingId).closeDate : '2026-03-24'} className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl outline-none font-bold border-none" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">Current Stage</label>
                  <select name="status" defaultValue={editingId ? deals.find(d=>d.id===editingId).status : 'Discovery'} className="w-full bg-slate-100 dark:bg-slate-800 p-4 rounded-2xl outline-none font-bold border-none">
                    {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <button type="submit" className="w-full mt-10 bg-indigo-600 text-white py-5 rounded-[2rem] font-black text-lg shadow-xl shadow-indigo-500/30 active:scale-95 transition-all uppercase tracking-widest">Commit Opportunity</button>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Input = ({ label, name, icon, type = "text", def }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest ml-1">{label}</label>
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>
      <input name={name} type={type} defaultValue={def} required className="w-full pl-12 pr-6 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl outline-none font-bold border-none" />
    </div>
  </div>
);
