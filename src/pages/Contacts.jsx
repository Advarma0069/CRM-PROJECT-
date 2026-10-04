import React, { useState, useEffect, useMemo } from "react";
import {
  FaWhatsapp, FaPlus, FaTrash, FaSearch, FaArrowLeft, FaCheckCircle,
  FaWallet, FaFileContract, FaChartLine, FaEnvelope, FaEdit,
  FaFileInvoiceDollar, FaSave, FaChevronLeft, FaChevronRight, FaDatabase, FaShieldAlt
} from "react-icons/fa";

/* -----------------------------------------------------------
   1. MASTER INITIALIZATION (Missing Data Added)
----------------------------------------------------------- */
const BOOT_DATA = [
  { id: "NEX-1001", client: "Rahul Sharma", company: "Nexus Tech", phone: "9876543210", email: "rahul@nexus.com", amount: "85000", status: "Signed", tax: 15300, date: "2026-02-01", industry: "SaaS" },
  { id: "NEX-1002", client: "Amit Kumar", company: "Skyline Corp", phone: "8876511223", email: "amit@skyline.com", amount: "145000", status: "Pending", tax: 26100, date: "2026-02-15", industry: "Real Estate" }
];

/* -----------------------------------------------------------
   2. GLOBAL ERP COMMAND CENTER
----------------------------------------------------------- */
export default function UltimateEnterpriseERP() {
  const [ledger, setLedger] = useState(() => {
    const saved = localStorage.getItem("nexus_v12_final");
    return saved ? JSON.parse(saved) : BOOT_DATA;
  });

  const [view, setView] = useState("dashboard"); // dashboard | form
  const [activeRecord, setActiveRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  useEffect(() => localStorage.setItem("nexus_v12_final", JSON.stringify(ledger)), [ledger]);

  // --- CALCULATIONS FOR KPI BOXES ---
  const stats = useMemo(() => {
    const totalRev = ledger.reduce((s, c) => s + Number(c.amount || 0), 0);
    const totalTax = ledger.reduce((s, c) => s + Number(c.tax || 0), 0);
    return { rev: totalRev, tax: totalTax, count: ledger.length, pending: ledger.filter(c => c.status === "Pending").length };
  }, [ledger]);

  // --- SEARCH & PAGINATION ---
  const filteredData = useMemo(() => {
    setCurrentPage(1);
    return ledger.filter(c =>
      c.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, ledger]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  // --- ACTIONS: CRUD ---
  const handleSave = (formData) => {
    const tax = Number(formData.amount) * 0.18;
    if (activeRecord) {
      setLedger(prev => prev.map(c => c.id === activeRecord.id ? { ...formData, id: c.id, tax } : c));
    } else {
      const newId = `NEX-${Math.floor(1000 + Math.random() * 9000)}`;
      setLedger([{ ...formData, id: newId, tax, date: new Date().toLocaleDateString() }, ...ledger]);
    }
    setView("dashboard");
    setActiveRecord(null);
  };

  const bulkDelete = () => {
    if (window.confirm(`WIPE ${selectedIds.length} RECORDS?`)) {
      setLedger(prev => prev.filter(c => !selectedIds.includes(c.id)));
      setSelectedIds([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-4 md:p-10 font-sans text-slate-900">
      {view === "dashboard" ? (
        <div className="max-w-7xl mx-auto animate-in fade-in duration-500">

          {/* HEADER */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
            <div>
              <h1 className="text-5xl font-black tracking-tighter italic">NEXUS<span className="text-indigo-600 underline decoration-4">ERP</span></h1>
              <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-2">Enterprise Governance Console v12.0</p>
            </div>
            <button onClick={() => { setActiveRecord(null); setView("form"); }} className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black shadow-2xl hover:bg-indigo-700 transition active:scale-95 flex items-center gap-2">
              <FaPlus /> INITIALIZE ASSET
            </button>
          </header>

          {/* KPI BOXES (Missing Box Added) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatBox label="Net Ledger" value={`₹${stats.rev.toLocaleString()}`} icon={<FaWallet />} color="indigo" />
            <StatBox label="GST Liability" value={`₹${stats.tax.toLocaleString()}`} icon={<FaFileInvoiceDollar />} color="rose" />
            <StatBox label="Total Assets" value={stats.count} icon={<FaFileContract />} color="emerald" />
            <StatBox label="Pending Sync" value={stats.pending} icon={<FaChartLine />} color="amber" />
          </div>

          {/* BULK ACTION BAR & SEARCH */}
          <div className="sticky top-4 z-50 bg-white/70 backdrop-blur-xl border border-white shadow-2xl rounded-3xl p-5 mb-8 flex flex-wrap gap-4 items-center justify-between">
            <div className="flex items-center gap-3 bg-slate-100 px-4 py-2 rounded-xl flex-1 max-w-md">
              <FaSearch className="text-slate-400" />
              <input className="bg-transparent border-none outline-none font-bold text-sm w-full" placeholder="Search Database..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>

            {selectedIds.length > 0 && (
              <div className="flex gap-2 animate-in slide-in-from-right duration-300">
                <button onClick={() => alert("Bulk WhatsApp Initiated")} className="bg-emerald-50 text-emerald-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-emerald-100 transition"><FaWhatsapp /> WA</button>
                <button onClick={() => alert("Bulk Email Initiated")} className="bg-blue-50 text-blue-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-blue-100 transition"><FaEnvelope /> Mail</button>
                <button onClick={bulkDelete} className="bg-rose-50 text-rose-600 px-5 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 hover:bg-rose-100 transition"><FaTrash /> Delete</button>
              </div>
            )}
          </div>

          {/* DATA TABLE */}
          <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-100 overflow-hidden mb-8">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-[10px] font-black uppercase text-slate-400 tracking-widest border-b">
                <tr>
                  <th className="p-6 text-center"><input type="checkbox" className="w-4 h-4 accent-indigo-600" onChange={e => setSelectedIds(e.target.checked ? filteredData.map(c => c.id) : [])} checked={selectedIds.length === filteredData.length && filteredData.length > 0} /></th>
                  <th className="p-6">Asset ID / Client</th>
                  <th className="p-6">Financials (Incl. GST)</th>
                  <th className="p-6 text-center">Status</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {paginatedData.map(c => (
                  <tr key={c.id} className={`group hover:bg-slate-50/50 transition-all ${selectedIds.includes(c.id) ? 'bg-indigo-50/30' : ''}`}>
                    <td className="p-6 text-center">
                      <input type="checkbox" className="w-4 h-4 accent-indigo-600" checked={selectedIds.includes(c.id)} onChange={() => setSelectedIds(prev => prev.includes(c.id) ? prev.filter(i => i !== c.id) : [...prev, c.id])} />
                    </td>
                    <td className="p-6">
                      <p className="font-mono text-[10px] font-black text-indigo-600 mb-1">{c.id}</p>
                      <p className="font-black text-slate-900">{c.client}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{c.company}</p>
                    </td>
                    <td className="p-6">
                      <p className="font-black text-slate-900">₹{Number(c.amount).toLocaleString()}</p>
                      <p className="text-[9px] font-bold text-rose-500 uppercase tracking-tighter">Tax: ₹{Number(c.tax).toLocaleString()}</p>
                    </td>
                    <td className="p-6 text-center">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase ring-1 ${c.status === 'Signed' ? 'bg-emerald-50 text-emerald-600 ring-emerald-100' : 'bg-amber-50 text-amber-600 ring-amber-100'}`}>
                        {c.status}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-5 text-slate-300">
                        <button onClick={() => { setActiveRecord(c); setView("form"); }} className="hover:text-indigo-600 transition hover:scale-125"><FaEdit size={18} /></button>
                        <button onClick={() => setLedger(ledger.filter(i => i.id !== c.id))} className="hover:text-rose-500 transition hover:scale-125"><FaTrash size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] shadow-sm">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Page {currentPage} of {totalPages || 1}</span>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-3 bg-slate-50 rounded-xl hover:text-indigo-600 disabled:opacity-30 transition shadow-sm"><FaChevronLeft /></button>
              <button disabled={currentPage === totalPages || totalPages === 0} onClick={() => setCurrentPage(p => p + 1)} className="p-3 bg-slate-50 rounded-xl hover:text-indigo-600 disabled:opacity-30 transition shadow-sm"><FaChevronRight /></button>
            </div>
          </div>
        </div>
      ) : (
        <EnterpriseForm onBack={() => setView("dashboard")} onSave={handleSave} activeRecord={activeRecord} />
      )}
    </div>
  );
}

const EnterpriseForm = ({ onBack, onSave, activeRecord }) => {
  const [form, setForm] = useState(activeRecord || {
    client: "", company: "", phone: "", email: "", amount: "", status: "Draft", industry: "SaaS"
  });
  const isEdit = !!activeRecord;

  return (
    <div className="animate-in slide-in-from-right duration-500 max-w-5xl mx-auto py-4">
      <div className="flex items-center gap-6 mb-10">
        <button onClick={onBack} className="p-4 bg-white rounded-2xl border border-slate-200 hover:text-indigo-600 transition shadow-sm hover:rotate-[-10deg] duration-300"><FaArrowLeft /></button>
        <h2 className="text-4xl font-black tracking-tighter italic">{isEdit ? "Update" : "Initialize"} <span className="text-indigo-600">Protocol</span></h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] shadow-2xl border border-slate-100 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <InputGroup label="Legal Entity Name" value={form.client} onChange={e => setForm({ ...form, client: e.target.value })} />
            <InputGroup label="Transaction Value (₹)" type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })} />
            <InputGroup label="Corporate Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            <InputGroup label="Registered WhatsApp" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <InputGroup label="Firm / Company Name" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">Industry Segment</label>
            <select className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-bold focus:ring-2 focus:ring-indigo-500" value={form.industry} onChange={e => setForm({ ...form, industry: e.target.value })}>
              <option>SaaS</option><option>Real Estate</option><option>Finance</option><option>Logistics</option>
            </select>
          </div>
        </div>
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden flex flex-col justify-between">
          <FaShieldAlt className="text-indigo-500 mb-6 opacity-30" size={50} />
          <div>
            <h3 className="text-xl font-black mb-4 uppercase tracking-tighter">Vault Encryption</h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-10 font-medium italic">
              "Committing this data will trigger a global ledger update and automatically calculate fiscal tax liabilities."
            </p>
          </div>
          <button onClick={() => onSave(form)} className="w-full bg-indigo-600 hover:bg-indigo-700 p-6 rounded-[2rem] text-white font-black uppercase tracking-widest shadow-2xl shadow-indigo-500/20 transition active:scale-95">
            {isEdit ? "Commit Changes" : "Deploy to Cloud"}
          </button>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
    <div className={`w-14 h-14 bg-${color}-50 text-${color}-500 rounded-2xl flex items-center justify-center text-xl`}>{icon}</div>
    <div>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
      <h3 className="text-2xl font-black">{value}</h3>
    </div>
  </div>
);

const InputGroup = ({ label, value, onChange, type = "text" }) => (
  <div className="space-y-1">
    <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-4">{label}</label>
    <input required type={type} className="w-full p-4 bg-slate-50 border-none rounded-2xl outline-none font-bold focus:ring-2 focus:ring-indigo-500" value={value} onChange={onChange} />
  </div>
);
