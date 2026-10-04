import { useState, useMemo } from "react";
import {
  FaWhatsapp, FaEnvelope, FaPlus, FaTrash, FaSms, FaEye, FaEdit, 
  FaPhone, FaDownload, FaUpload, FaTimes, FaChevronLeft, FaChevronRight, FaSearch,
  FaFileInvoiceDollar, FaCheckCircle, FaUserShield, FaMapMarkerAlt
} from "react-icons/fa";

export default function CreateQuotation() {
  // 1. MASTER ERP SCHEMA (50+ Fields) - ZERO DATA LOSS
  const masterSchema = {
    id: "", inquiryNo: "", date: "", time: "",
    // Customer Profile
    name: "", company: "", phone: "", altPhone: "", email: "", website: "", industry: "",
    // Commercials & Identity
    gstNo: "", panNo: "", currency: "INR", paymentTerms: "", deliveryTerms: "",
    // Sales Intel
    salesperson: "", assignedTo: "", leadType: "", source: "", leadStage: "", leadScore: "",
    // Product Intel
    category: "", productName: "", quantity: "", unit: "", rate: "", estimatedValue: "", taxPercent: "18",
    // Location
    address: "", city: "", state: "", country: "", pincode: "", landmark: "",
    // Tracking & Meta
    status: "New", nfDate: "", nfTime: "", lastFollowUp: "", remarks: "", tags: "",
    branch: "", department: "", createdBy: "Admin", createdAt: "", updatedBy: "", updatedAt: ""
  };

  const [data, setData] = useState([
    { id: 1, inquiryNo: "QT-2024-001", name: "Aryan Khan", company: "Red Chillies", phone: "9876543210", email: "aryan@rc.com", status: "Active", estimatedValue: "1,50,000", city: "Mumbai", leadStage: "Negotiation" }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [activeModal, setActiveModal] = useState(null); // 'create' | 'edit' | 'view'
  const [formData, setFormData] = useState(masterSchema);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- Search & Pagination Logic ---
  const filteredData = useMemo(() => {
    return data.filter(item => Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase())));
  }, [searchTerm, data]);

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // --- Actions ---
  const openModal = (mode, row = null) => {
    setActiveModal(mode);
    setFormData(row || { ...masterSchema, id: Date.now(), inquiryNo: `QT-${Math.floor(1000 + Math.random() * 9000)}`, date: new Date().toISOString().split('T') });
  };

  const handleSave = (e) => {
    e.preventDefault();
    setData(activeModal === 'edit' ? data.map(r => r.id === formData.id ? { ...formData, updatedAt: new Date().toLocaleString() } : r) : [...data, { ...formData, createdAt: new Date().toLocaleString() }]);
    setActiveModal(null);
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] dark:bg-[#020617] min-h-screen font-sans">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">
            Quotation <span className="text-indigo-600 underline decoration-indigo-200">Studio</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-1">Enterprise Lead & Billing Engine</p>
        </div>
        <button onClick={() => openModal('create')} className="bg-indigo-600 text-white px-10 py-4 rounded-[1.5rem] font-black shadow-2xl shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
          + GENERATE QUOTATION
        </button>
      </div>

      {/* FILTER & BULK ACTIONS BAR */}
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-xl rounded-[2rem] p-6 mb-8 border border-white/50 dark:border-slate-800 flex flex-wrap gap-5 items-center justify-between">
        <div className="relative flex-1 min-w-[300px]">
          <FaSearch className="absolute left-5 top-5 text-slate-400" />
          <input 
            type="text" placeholder="Search across 50+ fields (GST, Name, Co)..." 
            className="w-full pl-14 pr-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none outline-none focus:ring-4 ring-indigo-50 font-bold"
            value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          {selectedRows.length > 0 && (
            <div className="flex gap-2 p-1.5 bg-indigo-50 dark:bg-slate-800 rounded-2xl border border-indigo-100 animate-in zoom-in">
              <button onClick={() => window.open(`https://wa.me{data.find(r=>r.id===selectedRows[0]).phone}`)} className="p-4 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-100"><FaWhatsapp size={18}/></button>
              <button className="p-4 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-100"><FaEnvelope size={18}/></button>
              <button onClick={() => {setData(data.filter(r => !selectedRows.includes(r.id))); setSelectedRows([]);}} className="p-4 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-100"><FaTrash size={18}/></button>
            </div>
          )}
          <button className="px-6 py-4 bg-white dark:bg-slate-800 border rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:text-indigo-600 transition"><FaDownload className="inline mr-2"/> Export</button>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-[2.5rem] shadow-2xl border border-white dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 sticky top-0 z-10 border-b">
              <tr>
                <th className="p-6 text-center"><input type="checkbox" className="w-5 h-5 rounded-lg accent-indigo-600" onChange={(e) => setSelectedRows(e.target.checked ? currentItems.map(r => r.id) : [])} checked={selectedRows.length === currentItems.length && currentItems.length > 0} /></th>
                <th className="p-6">Control</th>
                <th className="p-6">Client Identity</th>
                <th className="p-6">Commercials</th>
                <th className="p-6">ERP Stage</th>
                <th className="p-6">Next Follow-Up</th>
                <th className="p-6">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {currentItems.map((row) => (
                <tr key={row.id} className={`group hover:bg-indigo-50/40 transition-all ${selectedRows.includes(row.id) ? 'bg-indigo-50/60 dark:bg-indigo-900/20' : ''}`}>
                  <td className="p-6 text-center"><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => setSelectedRows(prev => prev.includes(row.id) ? prev.filter(i => i !== row.id) : [...prev, row.id])} className="w-5 h-5 rounded-lg accent-indigo-600" /></td>
                  <td className="p-6 whitespace-nowrap">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => window.location.href=`tel:${row.phone}`} className="p-3 bg-white border rounded-xl text-blue-600 shadow-sm hover:scale-110 transition"><FaPhone/></button>
                      <button onClick={() => openModal('view', row)} className="p-3 bg-white border rounded-xl text-indigo-600 shadow-sm hover:scale-110 transition"><FaEye/></button>
                      <button onClick={() => openModal('edit', row)} className="p-3 bg-white border rounded-xl text-amber-500 shadow-sm hover:scale-110 transition"><FaEdit/></button>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-base font-black text-slate-900 dark:text-white leading-tight">{row.name}</span>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter italic">{row.company} | {row.inquiryNo}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-black text-emerald-600">₹{row.estimatedValue}</span>
                      <span className="text-[9px] font-bold text-slate-400 uppercase italic">Status: {row.status}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-tighter ${row.leadStage === 'Negotiation' ? 'bg-amber-100 text-amber-700' : 'bg-indigo-100 text-indigo-700'}`}>
                      {row.leadStage}
                    </span>
                  </td>
                  <td className="p-6 text-[10px] font-bold text-slate-500">
                    <span className="text-indigo-600">{row.nfDate || "TBA"}</span><br/>
                    {row.nfTime || "--"}
                  </td>
                  <td className="p-6 font-bold text-slate-600">{row.city}, {row.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- CENTER MODAL (50+ FIELDS ENTERPRISE FORM) --- */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Blur Background */}
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md animate-in fade-in" onClick={() => setActiveModal(null)} />
          
          {/* Modal Container */}
          <div className="relative bg-white dark:bg-slate-900 rounded-[3rem] w-full max-w-6xl max-h-[92vh] flex flex-col shadow-2xl border-[12px] border-white dark:border-slate-800 overflow-hidden animate-in zoom-in duration-300">
            
            <div className="p-10 border-b flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50 sticky top-0 z-10 backdrop-blur-md">
              <div>
                <h2 className="text-4xl font-black text-indigo-900 dark:text-white uppercase tracking-tighter italic flex items-center gap-3">
                  <FaFileInvoiceDollar className="text-indigo-600"/> {activeModal === 'view' ? 'System Intel' : activeModal === 'edit' ? 'Modify ERP' : 'New Quotation'}
                </h2>
                <div className="flex gap-4 mt-2">
                   <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Ref: {formData.inquiryNo}</span>
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ID: {formData.id}</span>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-4 bg-white dark:bg-slate-700 rounded-full shadow-lg hover:text-rose-500 transition active:scale-90"><FaTimes size={24}/></button>
            </div>

            <form onSubmit={handleSave} className="p-10 overflow-y-auto space-y-12 scrollbar-hide">
              {/* Organized Enterprise Sections */}
              {[
                { title: "Client Core Profile", icon: <FaCheckCircle/>, fields: ["name", "company", "phone", "altPhone", "email", "website", "industry"] },
                { title: "Identification & Tax", icon: <FaUserShield/>, fields: ["gstNo", "panNo", "currency", "paymentTerms", "deliveryTerms"] },
                { title: "Opportunity & Sales", icon: <FaSearch/>, fields: ["salesperson", "assignedTo", "leadType", "source", "leadStage", "leadScore", "inquiryNo"] },
                { title: "Product Commercials", icon: <FaFileInvoiceDollar/>, fields: ["category", "productName", "quantity", "unit", "rate", "estimatedValue", "taxPercent"] },
                { title: "Physical Location", icon: <FaMapMarkerAlt/>, fields: ["address", "city", "state", "country", "pincode", "landmark"] },
                { title: "Operational Meta", icon: <FaEye/>, fields: ["status", "nfDate", "nfTime", "remarks", "tags", "branch", "department"] }
              ].map((section, idx) => (
                <div key={idx} className="space-y-6">
                  <h3 className="text-xs font-black text-indigo-600 uppercase tracking-[0.3em] border-l-4 border-indigo-600 pl-4 flex items-center gap-2">{section.icon} {section.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {section.fields.map(key => (
                      <div key={key} className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest ml-1">{key.replace(/([A-Z])/g, ' $1')}</label>
                        <input 
                          disabled={activeModal === 'view'}
                          type={key.includes('Date') ? 'date' : key.includes('Time') ? 'time' : 'text'}
                          className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 rounded-2xl border-none font-bold text-slate-800 dark:text-white focus:ring-4 ring-indigo-50 transition-all outline-none text-sm"
                          value={formData[key] || ""}
                          onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              <div className="mt-10 pt-10 border-t flex justify-end gap-5 sticky bottom-0 bg-white dark:bg-slate-900">
                <button type="button" onClick={() => setActiveModal(null)} className="px-10 py-5 font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition">Discard</button>
                {activeModal !== 'view' && (
                  <button type="submit" className="px-16 py-5 bg-indigo-600 text-white rounded-[2rem] font-black shadow-2xl shadow-indigo-200 hover:bg-indigo-700 transition uppercase tracking-widest active:scale-95">
                    Save ERP Record
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
