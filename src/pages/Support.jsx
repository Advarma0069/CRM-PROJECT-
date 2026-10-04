import { useState, useMemo } from "react";
import { 
  FaHeadset, FaUser, FaPhone, FaBuilding, FaEdit, FaEnvelope, 
  FaTrash, FaPlus, FaTimes, FaSearch, FaMapMarkerAlt, FaIdCard 
} from "react-icons/fa";

const initialData = [
  {
    id: 1,
    staffName: "Aryan Varma",
    staffPhone: "+91 98765-43210",
    staffImg: "https://i.pravatar.cc",
    custName: "Vikram Mehta",
    custPhone: "+91 77788-99900",
    custEmail: "vikram@mehtalogistics.com",
    custCompany: "Mehta Logistics Pvt Ltd",
    custAddress: "Sector 5, Gurgaon, HR",
    custGST: "06AAAAA0000A1Z5",
    dept: "Technical"
  },
  // Add more sample data if needed for testing pagination
];

export default function DeepCustomerERP() {
  const [data, setData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    staffName: "",
    staffPhone: "",
    custName: "",
    custPhone: "",
    custEmail: "",
    custCompany: "",
    custAddress: "",
    custGST: "",
    dept: "Technical"
  });

  // --- Pagination States ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return data.slice(start, end);
  }, [data, currentPage]);

  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setData(data.map(item => item.id === editingId ? { ...item, ...formData } : item));
    } else {
      setData([{ ...formData, id: Date.now(), staffImg: `https://i.pravatar.cc/${Date.now()}` }, ...data]);
    }
    setIsModalOpen(false);
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item.id);
      setFormData(item);
    } else {
      setEditingId(null);
      setFormData({ staffName: "", staffPhone: "", custName: "", custPhone: "", custEmail: "", custCompany: "", custAddress: "", custGST: "", dept: "Technical" });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-10 bg-[#f8fafc] dark:bg-[#020617] min-h-screen text-left font-sans transition-all">
      {/* HEADER */}
      <div className="flex flex-wrap justify-between items-center mb-8 bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border dark:border-slate-800">
        <div className="flex items-center gap-5 text-left">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
            <FaHeadset size={28}/>
          </div>
          <div>
            <h1 className="text-2xl font-black dark:text-white tracking-tighter uppercase">Enterprise Manager</h1>
            <p className="text-[10px] text-slate-400 font-bold tracking-[0.2em]">Deep Customer Intelligence & Support</p>
          </div>
        </div>
        <button onClick={() => openModal()} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs hover:bg-indigo-700 transition-all shadow-lg">+ ADD PROFILE</button>
      </div>

      {/* DATA GRID */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[3rem] shadow-2xl border dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase text-slate-400">
              <tr>
                <th className="p-6">Executive Info</th>
                <th className="p-6">Detailed Customer Profile</th>
                <th className="p-6">Business Identity</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800 text-[13px] font-bold">
              {currentData.map(item => (
                <tr key={item.id} className="group hover:bg-indigo-50/10 transition-all">
                  {/* STAFF INFO */}
                  <td className="p-6 align-top">
                    <div className="flex items-center gap-4">
                      <img src={item.staffImg} className="w-12 h-12 rounded-full border-2 border-indigo-200" alt="staff" />
                      <div className="flex flex-col text-left">
                        <span className="dark:text-white text-sm font-black">{item.staffName}</span>
                        <span className="text-indigo-500 text-[11px] font-bold uppercase">{item.dept} Specialist</span>
                        <span className="text-slate-400 text-[10px] font-medium mt-1 italic">{item.staffPhone}</span>
                      </div>
                    </div>
                  </td>

                  {/* DEEP CUSTOMER INFO */}
                  <td className="p-6 border-l dark:border-slate-800/50 align-top">
                    <div className="flex flex-col text-left">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="dark:text-slate-200 font-black text-base">{item.custName}</span>
                        <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[9px] rounded font-mono">GST: {item.custGST}</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2 text-slate-500 dark:text-slate-400 font-medium text-[11px]">
                        <span className="flex items-center gap-2"><FaEnvelope className="text-indigo-400"/> {item.custEmail}</span>
                        <span className="flex items-center gap-2 text-emerald-600 font-black"><FaPhone size={11}/> {item.custPhone}</span>
                        <span className="flex items-center gap-2"><FaMapMarkerAlt className="text-rose-400"/> {item.custAddress}</span>
                      </div>
                    </div>
                  </td>

                  {/* BUSINESS IDENTITY */}
                  <td className="p-6 align-top">
                    <div className="flex flex-col text-left">
                      <span className="flex items-center gap-2 text-slate-800 dark:text-slate-200"><FaBuilding size={12}/> {item.custCompany}</span>
                      <span className="mt-2 text-[10px] text-slate-400 font-black uppercase tracking-widest bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full inline-block w-fit">Corp-Client</span>
                    </div>
                  </td>

                  {/* CRUD ACTIONS */}
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button onClick={() => openModal(item)} className="p-3 bg-slate-100 dark:bg-slate-800 text-slate-500 hover:bg-indigo-600 hover:text-white rounded-xl transition-all"><FaEdit/></button>
                      <button onClick={() => setData(data.filter(x => x.id !== item.id))} className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><FaTrash/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-end items-center gap-2 p-4 text-sm font-bold text-slate-700 dark:text-slate-300">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 hover:text-white transition-all disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* EXPANDED CRUD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-3xl rounded-[3rem] p-10 shadow-3xl relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 text-slate-400 hover:text-rose-500 transition-colors"><FaTimes size={20}/></button>
            <h2 className="text-2xl font-black mb-8 dark:text-white uppercase tracking-tighter text-left">Unified Data Entry</h2>                         
            <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              {/* STAFF SECTION */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-indigo-600 uppercase border-b pb-2 tracking-widest">Internal Assignment</p>
                <input required placeholder="Staff Full Name" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.staffName} onChange={e => setFormData({...formData, staffName: e.target.value})} />
                <input required placeholder="Staff Contact No." className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.staffPhone} onChange={e => setFormData({...formData, staffPhone: e.target.value})} />
                <select className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.dept} onChange={e => setFormData({...formData, dept: e.target.value})}>
                  <option>Technical</option><option>Billing</option><option>Sales</option><option>Deployment</option>
                </select>
              </div>

              {/* CUSTOMER SECTION */}
              <div className="space-y-4">
                <p className="text-[10px] font-black text-emerald-600 uppercase border-b pb-2 tracking-widest">External Customer Profile</p>
                <input required placeholder="Customer Name" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.custName} onChange={e => setFormData({...formData, custName: e.target.value})} />
                <div className="grid grid-cols-2 gap-2">
                  <input required placeholder="Contact No." className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.custPhone} onChange={e => setFormData({...formData, custPhone: e.target.value})} />
                  <input required placeholder="GST / Tax ID" className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.custGST} onChange={e => setFormData({...formData, custGST: e.target.value})} />
                </div>
                <input required placeholder="Official Email Address" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.custEmail} onChange={e => setFormData({...formData, custEmail: e.target.value})} />
                <input placeholder="Organization Name" className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold" value={formData.custCompany} onChange={e => setFormData({...formData, custCompany: e.target.value})} />
                <textarea placeholder="Physical Office Address..." className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white font-bold h-24" value={formData.custAddress} onChange={e => setFormData({...formData, custAddress: e.target.value})}></textarea>
              </div>

              <button type="submit" className="md:col-span-2 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all uppercase tracking-[0.2em] mt-4">
                {editingId ? "Update Data" : "Finalize Mapping"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}