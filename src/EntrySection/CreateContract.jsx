import { useState, useMemo } from "react";
import { 
  FaChevronLeft, FaChevronRight, FaSearch, FaPlus, FaEdit, FaTrash, 
  FaTimes, FaShieldAlt, FaUserTie, FaMapMarkerAlt, FaExclamationTriangle, FaFileSignature 
} from "react-icons/fa";

export default function ProfessionalERP() {
  // --- 1. ENHANCED DATA REPOSITORY ---
  const [data, setData] = useState([
    { 
      id: 1, contractNo: "ERP-2024-001", name: "Reliance Industries", 
      partyA: "Legal - HQ", type: "Managed Services", 
      totalValue: 1500000, invoiced: 900000, region: "Mumbai, MH",
      status: "Active", priority: "High", signingDate: "2023-12-20",
      startDate: "2024-01-01", endDate: "2024-12-31", progress: 60,
      risk: "Low", terms: "Net-30"
    },
    { 
      id: 2, contractNo: "ERP-2024-002", name: "Tata Motors", 
      partyA: "Procurement", type: "Software License", 
      totalValue: 500000, invoiced: 500000, region: "Pune, MH",
      status: "Closed", priority: "Medium", signingDate: "2023-11-01",
      startDate: "2023-11-15", endDate: "2024-05-15", progress: 100,
      risk: "None", terms: "Advance"
    }
  ]);

  // --- 2. GLOBAL UI STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({ 
    name: "", partyA: "Legal - HQ", type: "Service", totalValue: "", 
    invoiced: "0", priority: "Medium", status: "Active",
    startDate: "", endDate: "", signingDate: "", region: "", risk: "Low", terms: "Net-30"
  });

  // --- 3. OPTIMIZED SEARCH & PAGINATION ENGINE ---
  const filteredData = useMemo(() => {
    return data.filter(item => 
      Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm, data]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- 4. CRUD OPERATIONS (LOGICALLY COMPLETE) ---
  const handleOpenModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({ name: "", partyA: "Legal - HQ", type: "Service", totalValue: "", invoiced: "0", priority: "Medium", status: "Active", startDate: "", endDate: "", signingDate: "", region: "", risk: "Low", terms: "Net-30" });
    }
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const processedData = { 
      ...formData, 
      totalValue: Number(formData.totalValue), 
      invoiced: Number(formData.invoiced) 
    };
    
    if (editingId) {
      // Operation: Update existing record
      setData(data.map(item => item.id === editingId ? { ...processedData, id: editingId } : item));
    } else {
      // Operation: Create new record
      const newEntry = { 
        ...processedData, 
        id: Date.now(), 
        contractNo: `ERP-${new Date().getFullYear()}-${Math.floor(100+Math.random()*900)}`, 
        progress: 0 
      };
      setData([newEntry, ...data]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Confirm deletion from ERP registry?")) {
      setData(data.filter(d => d.id !== id));
    }
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] dark:bg-[#020617] min-h-screen font-sans">
      
      {/* ENTERPRISE ACTION BAR */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-4 text-left">
          <div className="p-3 bg-indigo-600 rounded-2xl text-white shadow-lg"><FaShieldAlt size={22}/></div>
          <div>
            <h1 className="text-xl font-black dark:text-white">Contract Master</h1>
            <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em]">Lifecycle Management Console</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search Database..." onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} className="pl-12 pr-4 py-3 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-2 ring-indigo-500 text-sm font-bold w-48 md:w-64" />
          </div>
          <button onClick={() => handleOpenModal()} className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs transition-all flex items-center gap-2 shadow-lg"><FaPlus/> NEW INTAKE</button>
        </div>
      </div>

      {/* COMPREHENSIVE DATA GRID */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase text-slate-400">
              <tr>
                {["Contract & Party-B", "Key Dates", "Terms & Region", "Financials", "Status/Risk", "Actions"].map(h => (
                  <th key={h} className="p-6 border-b dark:border-slate-800">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800 text-[13px] font-bold">
              {currentItems.map((row) => (
                <tr key={row.id} className="group hover:bg-indigo-50/20 transition-all">
                  <td className="p-6 text-left">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-indigo-600 text-[9px] font-black">ID: {row.contractNo}</span>
                      <span className="text-slate-900 dark:text-white flex items-center gap-2"><FaUserTie size={12} className="text-slate-400"/> {row.name}</span>
                      <span className="text-slate-400 text-[10px] uppercase">Dept: {row.partyA}</span>
                    </div>
                  </td>
                  <td className="p-6 text-[11px] text-slate-500 text-left">
                    <p><span className="text-slate-400 text-[8px] block uppercase font-black">Signing</span> {row.signingDate}</p>
                    <p><span className="text-slate-400 text-[8px] block uppercase font-black">Active</span> {row.startDate} ~ {row.endDate}</p>
                  </td>
                  <td className="p-6 text-left">
                    <p className="flex items-center gap-1.5 text-slate-500 font-medium italic mb-1"><FaMapMarkerAlt size={10} className="text-indigo-400"/> {row.region}</p>
                    <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-500 uppercase">{row.terms}</span>
                  </td>
                  <td className="p-6 text-left">
                    <span className="dark:text-white block">₹{row.totalValue.toLocaleString()}</span>
                    <span className="text-[8px] text-emerald-600 uppercase font-black">Outstanding: ₹{(row.totalValue - row.invoiced).toLocaleString()}</span>
                  </td>
                  <td className="p-6 text-left">
                    <div className="flex flex-col gap-2">
                      <span className={`w-fit px-3 py-1 rounded-lg text-[9px] uppercase ${row.status === 'Active' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>{row.status}</span>
                      {row.risk !== "None" && <span className="text-[9px] text-rose-500 flex items-center gap-1 font-black uppercase"><FaExclamationTriangle size={10}/> {row.risk} Risk</span>}
                    </div>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => handleOpenModal(row)} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white"><FaEdit/></button>
                      <button onClick={() => handleDelete(row.id)} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white"><FaTrash/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION ENGINE */}
      <div className="mt-8 flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-3xl border dark:border-slate-800 shadow-sm">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying {currentItems.length} of {filteredData.length} Records</span>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl disabled:opacity-20"><FaChevronLeft size={10}/></button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl disabled:opacity-20"><FaChevronRight size={10}/></button>
        </div>
      </div>

      {/* INTEGRATED CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] p-10 shadow-3xl border border-white/20 font-bold text-sm">
            <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-4">
              <h2 className="text-xl font-black dark:text-white uppercase tracking-tight flex items-center gap-2"><FaFileSignature className="text-indigo-600"/> {editingId ? "Modify Entry" : "New ERP Intake"}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><FaTimes size={20}/></button>
            </div>
            <div className="grid grid-cols-2 gap-6 text-left">
              <div className="col-span-2 space-y-1">
                <label className="text-[10px] uppercase text-slate-400 font-black">Counterparty Legal Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 font-black">Internal Department (Party-A)</label>
                <select value={formData.partyA} onChange={e => setFormData({...formData, partyA: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white">
                  <option>Legal - HQ</option><option>Procurement</option><option>Human Resources</option><option>IT Sales</option>
                </select>
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 font-black">Signing Date</label>
                <input type="date" required value={formData.signingDate} onChange={e => setFormData({...formData, signingDate: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 font-black">Total Budget Value (₹)</label>
                <input required type="number" value={formData.totalValue} onChange={e => setFormData({...formData, totalValue: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" />
              </div>
              <div className="space-y-1 text-left">
                <label className="text-[10px] uppercase text-slate-400 font-black">Risk Assessment</label>
                <select value={formData.risk} onChange={e => setFormData({...formData, risk: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white">
                  <option>None</option><option>Low</option><option>Medium</option><option>High</option>
                </select>
              </div>
              <button type="submit" className="col-span-2 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:bg-indigo-700 transition-all">Authorize & Save to Registry</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
