import React, { useState, useMemo } from "react";
import { 
  FaPlus, FaEye, FaPhone, FaWhatsapp, FaEnvelope, FaTrash, FaSms,
  FaEdit, FaTimes, FaDownload, FaUpload, FaFilter, FaPrint, 
  FaChevronLeft, FaChevronRight, FaSearch, FaBuilding, FaUserTie, FaGlobe
} from "react-icons/fa";

const InquiryPage = () => {
  // 1. COMPLETE MASTER SCHEMA (All 32 Fields)
  const masterSchema = {
    id: "", date: "", time: "", nfDate: "", nfTime: "", salesperson: "", 
    phone: "", name: "", company: "", email: "", leadType: "", source: "", 
    status: "", followUpDate: "", followUpTime: "", assignedTo: "", 
    city: "", state: "", country: "", pincode: "", industry: "", 
    numEmployees: "", annualRevenue: "", website: "", description: "", 
    tags: "", createdBy: "", createdAt: "", updatedBy: "", updatedAt: ""
  };

  const [data, setData] = useState([
    { 
      id: 1, date: "2024-05-15", time: "10:30 AM", nfDate: "2024-05-20", nfTime: "11:00 AM", 
      salesperson: "Rahul Sharma", phone: "9876543210", name: "Amit Kumar", company: "Amit Enterprises", 
      email: "amit@example.com", leadType: "Hot", source: "Google", status: "New", 
      followUpDate: "2024-05-20", followUpTime: "04:00 PM", assignedTo: "Admin", 
      city: "Mumbai", state: "MH", country: "India", pincode: "400001", industry: "IT", 
      numEmployees: "50", annualRevenue: "1 Cr", website: "www.amit.com", 
      description: "Needs urgent CRM setup", tags: "High Priority", createdBy: "Admin", 
      createdAt: "2024-05-15", updatedBy: "Admin", updatedAt: "2024-05-15" 
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalMode, setModalMode] = useState(null); // 'create', 'edit', 'view'
  const [formData, setFormData] = useState(masterSchema);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // --- LOGIC: Bulk Actions ---
  const bulkWhatsApp = () => {
    const numbers = data.filter(r => selectedRows.includes(r.id)).map(r => r.phone).join(',');
    window.open(`https://wa.me{numbers}?text=Hello, Greetings from our team!`, "_blank");
  };

  const bulkEmail = () => {
    const emails = data.filter(r => selectedRows.includes(r.id)).map(r => r.email).join(',');
    window.location.href = `mailto:${emails}?subject=Update Regarding Inquiry`;
  };

  const bulkSMS = () => {
    const numbers = data.filter(r => selectedRows.includes(r.id)).map(r => r.phone).join(',');
    window.location.href = `sms:${numbers}?body=Hi, we tried reaching you regarding your inquiry.`;
  };

  // --- LOGIC: CRUD ---
  const openModal = (mode, row = null) => {
    setModalMode(mode);
    setFormData(row || { ...masterSchema, id: Date.now(), date: new Date().toISOString().split('T')[0], status: "New" });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (modalMode === 'edit') {
      setData(data.map(r => r.id === formData.id ? { ...formData, updatedAt: new Date().toLocaleString() } : r));
    } else {
      setData([...data, { ...formData, id: Date.now(), createdAt: new Date().toLocaleString() }]);
    }
    setModalMode(null);
  };

  const filteredData = useMemo(() => {
    return data.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, data]);

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] dark:bg-slate-950 min-h-screen font-sans text-slate-900">
      
      {/* 1. TOP HEADER & CREATE BUTTON */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tighter text-indigo-700 uppercase italic">Inquiry <span className="text-slate-900 dark:text-white">Master</span></h1>
          <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Real-time Lead Management System</p>
        </div>
        <button onClick={() => openModal('create')} className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition active:scale-95 flex items-center gap-3">
          <FaPlus /> CREATE NEW ENTRY
        </button>
      </div>

      {/* 2. SEARCH & BULK ACTIONS BAR */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-[2rem] shadow-xl border border-slate-100 dark:border-slate-800 mb-8 flex flex-wrap gap-5 items-center justify-between">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-5 top-5 text-slate-400" />
          <input 
            type="text" placeholder="Search anything (Name, Co, Status)..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-4 ring-indigo-50 font-bold"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {selectedRows.length > 0 ? (
            <div className="flex gap-2 p-2 bg-indigo-50 dark:bg-slate-800 rounded-2xl border-2 border-indigo-200 border-dashed animate-pulse">
              <button onClick={bulkWhatsApp} className="p-4 bg-green-500 text-white rounded-xl hover:shadow-lg transition" title="Bulk WhatsApp"><FaWhatsapp size={20}/></button>
              <button onClick={bulkEmail} className="p-4 bg-blue-500 text-white rounded-xl hover:shadow-lg transition" title="Bulk Email"><FaEnvelope size={20}/></button>
              <button onClick={bulkSMS} className="p-4 bg-purple-500 text-white rounded-xl hover:shadow-lg transition" title="Bulk SMS"><FaSms size={20}/></button>
              <button onClick={() => {setData(data.filter(r => !selectedRows.includes(r.id))); setSelectedRows([]);}} className="p-4 bg-rose-500 text-white rounded-xl hover:shadow-lg transition" title="Bulk Delete"><FaTrash size={20}/></button>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <button className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-400 uppercase text-[10px] tracking-widest hover:border-indigo-400 hover:text-indigo-600 transition"><FaDownload className="inline mr-2"/> Export Data</button>
              <button className="px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-slate-400 uppercase text-[10px] tracking-widest hover:border-emerald-400 hover:text-emerald-600 transition"><FaUpload className="inline mr-2"/> Import CSV</button>
            </div>
          )}
        </div>
      </div>

      {/* 3. MAIN TABLE (32 COLUMNS) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden">
        <div className="overflow-auto max-h-[60vh] scrollbar-thin scrollbar-thumb-indigo-200">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="bg-gray-200 text-black sticky top-0 z-40">
              <tr className="text-[10px] font-black uppercase tracking-[0.2em]">
                <th className="p-6 text-center"><input type="checkbox" className="w-5 h-5 accent-indigo-500" onChange={(e) => setSelectedRows(e.target.checked ? filteredData.map(r => r.id) : [])} checked={selectedRows.length === filteredData.length && filteredData.length > 0} /></th>
                <th className="p-6">Actions</th>
                <th className="p-6">S.No</th>
                {Object.keys(masterSchema).filter(k => k !== 'id').map(key => (
                  <th key={key} className="p-6 whitespace-nowrap">{key.replace(/([A-Z])/g, ' $1')}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {currentItems.map((row, idx) => (
                <tr key={row.id} className={`transition-all hover:bg-indigo-50/50 dark:hover:bg-slate-800 ${selectedRows.includes(row.id) ? 'bg-indigo-50 dark:bg-slate-800' : ''}`}>
                  <td className="p-6 text-center"><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => setSelectedRows(prev => prev.includes(row.id) ? prev.filter(i => i !== row.id) : [...prev, row.id])} className="w-5 h-5 accent-indigo-500" /></td>
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button onClick={() => window.location.href=`tel:${row.phone}`} className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition" title="Call Now"><FaPhone /></button>
                      <button onClick={() => openModal('view', row)} className="p-3 bg-indigo-100 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-md" title="View"><FaEye /></button>
                      <button onClick={() => openModal('edit', row)} className="p-3 bg-amber-100 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition shadow-md" title="Edit"><FaEdit /></button>
                    </div>
                  </td>
                  <td className="p-6 font-black text-slate-400">{(currentPage-1)*itemsPerPage + idx + 1}</td>
                  {Object.keys(masterSchema).filter(k => k !== 'id').map(key => (
                    <td key={key} className="p-6 whitespace-nowrap font-bold text-slate-700 dark:text-slate-300">
                      {key === 'status' ? (
                        <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-tighter">{row[key]}</span>
                      ) : key === 'leadType' ? (
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${row[key] === 'Hot' ? 'bg-rose-100 text-rose-600' : 'bg-slate-100 text-slate-500'}`}>{row[key]}</span>
                      ) : row[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. MODERN PAGINATION */}
      <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-xl border border-slate-100">
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Displaying {currentItems.length} of {filteredData.length} entries</p>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 disabled:opacity-30 transition border border-slate-100"><FaChevronLeft /></button>
          {[...Array(totalPages)].map((_, i) => (
            <button key={i} onClick={() => setCurrentPage(i+1)} className={`px-6 py-4 rounded-2xl font-black transition-all ${currentPage === i+1 ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-white border text-slate-500 hover:bg-slate-50'}`}>{i+1}</button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-4 bg-slate-50 rounded-2xl hover:bg-indigo-50 disabled:opacity-30 transition border border-slate-100"><FaChevronRight /></button>
        </div>
      </div>

      {/* 5. MASTER MODAL (CREATE/EDIT/VIEW) */}
      {modalMode && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4">
          <div className="bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-7xl max-h-[92vh] flex flex-col shadow-2xl border-[12px] border-white dark:border-slate-800 overflow-hidden">
            
            <div className="p-10 border-b flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
              <div>
                <h2 className="text-4xl font-black text-indigo-900 dark:text-white uppercase tracking-tighter italic">
                  {modalMode === 'view' ? 'Entry Profile' : modalMode === 'edit' ? 'Modify Data' : 'New Intake'}
                </h2>
                <span className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Lead Reference ID: {formData.id}</span>
              </div>
              <button onClick={() => setModalMode(null)} className="p-4 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:text-rose-500 transition-all active:scale-90"><FaTimes size={24}/></button>
            </div>

            <form onSubmit={handleSave} className="p-10 overflow-y-auto grid grid-cols-1 md:grid-cols-4 gap-8 scrollbar-hide">
              {Object.keys(masterSchema).filter(k => k !== 'id').map(key => (
                <div key={key} className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{key.replace(/([A-Z])/g, ' $1')}</label>
                  <input 
                    disabled={modalMode === 'view'}
                    type={key.includes('Date') ? 'date' : key.includes('Time') ? 'time' : 'text'}
                    placeholder={`Enter ${key}...`}
                    className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none font-bold text-slate-800 dark:text-white focus:ring-4 ring-indigo-100 transition-all disabled:opacity-60"
                    value={formData[key] || ""}
                    onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                  />
                </div>
              ))}
              
              <div className="md:col-span-4 mt-10 pt-10 border-t flex justify-end gap-5 sticky bottom-0 bg-white dark:bg-slate-900">
                <button type="button" onClick={() => setModalMode(null)} className="px-10 py-5 font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition">Discard</button>
                {modalMode !== 'view' && (
                  <button type="submit" className="px-16 py-5 bg-indigo-600 text-white rounded-[1.5rem] font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition uppercase tracking-widest active:scale-95">
                    Save Record to Vault
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiryPage;
