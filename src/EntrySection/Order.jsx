import React, { useState, useMemo, useRef } from "react";
import { 
  FiPackage, FiSearch, FiPlus, FiEdit, FiTrash2, FiMapPin, FiTruck, FiX, 
  FiChevronLeft, FiChevronRight, FiUpload, FiCreditCard, FiUser, FiBriefcase, FiPrinter, FiDownload 
} from "react-icons/fi";

export default function OrderERP() {
  // --- 1. ENTERPRISE DATA STATE ---
  const [orders, setOrders] = useState([
    { 
      id: 1, orderNo: "ORD-1001", customer: "Aditya Varma", org: "AV Tech Solutions",
      orderDate: "2026-02-20", deliveryDate: "2026-03-05", value: 155000, 
      paymentStatus: "Paid", orderStatus: "Processing", salesperson: "Rahul S.",
      priority: "High", paymentMode: "Bank Transfer", shippingMethod: "Courier",
      notes: "Fragile items, handle with care.", img: "https://images.unsplash.com"
    },
    { 
      id: 2, orderNo: "ORD-1002", customer: "Suhana Khan", org: "Khan Graphics",
      orderDate: "2026-02-22", deliveryDate: "2026-03-10", value: 45000, 
      paymentStatus: "Pending", orderStatus: "Shipped", salesperson: "Priya V.",
      priority: "Medium", paymentMode: "Credit", shippingMethod: "Pickup",
      notes: "Customer will pick up from warehouse.", img: "https://images.unsplash.com"
    }
  ]);

  // --- 2. UI & SEARCH & PAGINATION STATES ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({ 
    customer: "", org: "", orderDate: "", deliveryDate: "", value: "", 
    paymentStatus: "Pending", orderStatus: "Processing", salesperson: "", 
    priority: "Medium", paymentMode: "Cash", shippingMethod: "Courier", notes: "", img: "" 
  });

  // --- 3. FILTER & PAGINATION ENGINE ---
  const filteredOrders = useMemo(() => {
    return orders.filter(o => 
      Object.values(o).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [orders, searchTerm]);

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const currentItems = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // --- 4. CRUD HANDLERS ---
  const handleSave = (e) => {
    e.preventDefault();
    if (editingId) {
      setOrders(orders.map(o => o.id === editingId ? { ...o, ...formData } : o));
    } else {
      setOrders([{ ...formData, id: Date.now(), orderNo: `ORD-${Math.floor(1000 + Math.random() * 9000)}` }, ...orders]);
    }
    setIsModalOpen(false);
  };

  const handleImageUpload = (e) => {
    const reader = new FileReader();
    reader.onloadend = () => setFormData({ ...formData, img: reader.result });
    if (e.target.files[0]) reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <div className="p-4 md:p-8 bg-[#f8fafc] dark:bg-[#020617] min-h-screen font-sans text-left transition-all">
      
      {/* ENTERPRISE ACTION BAR */}
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4 bg-white dark:bg-slate-900 p-6 rounded-[2rem] shadow-sm border dark:border-slate-800">
        <div className="flex items-center gap-4 text-left">
          <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl"><FiPackage size={28}/></div>
          <div className="text-left">
            <h1 className="text-2xl font-black dark:text-white tracking-tighter">Enterprise Order Nexus</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Global Logistics & Fulfillment ERP</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={() => { setEditingId(null); setIsModalOpen(true); }} className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs shadow-xl hover:bg-indigo-700 transition-all">+ NEW INTAKE</button>
          <button className="p-4 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-2xl hover:text-indigo-600"><FiDownload/></button>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/>
          <input placeholder="Search SKU, Customer, Salesperson..." className="w-full pl-12 pr-4 py-4 bg-white dark:bg-slate-900 rounded-2xl border-none outline-none shadow-sm text-sm font-bold" onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} />
        </div>
        <select value={itemsPerPage} onChange={(e) => setItemsPerPage(Number(e.target.value))} className="px-6 py-4 bg-white dark:bg-slate-900 rounded-2xl border-none outline-none text-xs font-black uppercase text-slate-400 shadow-sm cursor-pointer">
          <option value={5}>Show 5</option><option value={10}>Show 10</option>
        </select>
      </div>

      {/* DATA GRID */}
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border dark:border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black uppercase text-slate-400">
              <tr>
                {["Order & Customer", "Organization", "Financials", "Timelines", "Salesperson", "Status", "Actions"].map(h => (
                  <th key={h} className="p-6 border-b dark:border-slate-800 tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y dark:divide-slate-800 text-[13px] font-bold italic">
              {currentItems.map(row => (
                <tr key={row.id} className="group hover:bg-indigo-50/20 transition-all">
                  <td className="p-6">
                    <div className="flex items-center gap-4 text-left">
                      <img src={row.img} className="w-12 h-12 rounded-xl object-cover border dark:border-slate-700" alt="p"/>
                      <div className="flex flex-col text-left">
                        <span className="text-indigo-600 text-[10px] uppercase font-black">#{row.orderNo}</span>
                        <span className="dark:text-white leading-tight">{row.customer}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 dark:text-slate-400 font-medium">{row.org}</td>
                  <td className="p-6 text-left">
                    <p className="dark:text-white">₹{row.value.toLocaleString()}</p>
                    <span className={`text-[9px] uppercase ${row.paymentStatus === 'Paid' ? 'text-emerald-500' : 'text-rose-500'}`}>{row.paymentStatus}</span>
                  </td>
                  <td className="p-6 text-left">
                    <p className="text-slate-500 text-[11px]">Placed: {row.orderDate}</p>
                    <p className="text-indigo-500 text-[11px]">Due: {row.deliveryDate}</p>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                      <FiUser size={12}/> {row.salesperson}
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col gap-1.5 items-start">
                      <span className={`px-3 py-1 rounded-lg text-[9px] uppercase ${row.orderStatus === 'Shipped' ? 'bg-indigo-100 text-indigo-600' : 'bg-amber-100 text-amber-600'}`}>{row.orderStatus}</span>
                      <span className={`text-[8px] uppercase tracking-tighter ${row.priority === 'High' ? 'text-rose-500' : 'text-slate-400'}`}>{row.priority} Priority</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all justify-end">
                      <button onClick={() => { setEditingId(row.id); setFormData(row); setIsModalOpen(true); }} className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white"><FiEdit/></button>
                      <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white"><FiPrinter/></button>
                      <button onClick={() => setOrders(orders.filter(o => o.id !== row.id))} className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white"><FiTrash2/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAGINATION ENGINE */}
      <div className="mt-8 flex justify-between items-center bg-white dark:bg-slate-900 p-6 rounded-[2.5rem] border dark:border-slate-800 shadow-xl">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Displaying {currentItems.length} of {filteredOrders.length} Invoices</span>
        <div className="flex gap-2">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-indigo-50 disabled:opacity-20 transition"><FiChevronLeft/></button>
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:bg-indigo-50 disabled:opacity-20 transition"><FiChevronRight/></button>
        </div>
      </div>

      {/* FULL-DETAIL MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 w-full max-w-4xl rounded-[3rem] p-10 shadow-3xl border border-white/10 text-left font-bold animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8 border-b dark:border-slate-800 pb-6">
              <h2 className="text-xl font-black dark:text-white uppercase tracking-tighter">{editingId ? "Modify Order Protocol" : "Enterprise Order Intake"}</h2>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-rose-500"><FiX size={24}/></button>
            </div>
            <div className="grid grid-cols-3 gap-6 text-sm">
              <div className="col-span-1 flex flex-col gap-3">
                <div className="w-24 h-24 bg-slate-50 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 flex items-center justify-center overflow-hidden">
                  {formData.img ? <img src={formData.img} className="w-full h-full object-cover"/> : <FiUpload className="text-slate-300"/>}
                </div>
                <button type="button" onClick={() => fileInputRef.current.click()} className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] uppercase">Upload SKU Photo</button>
                <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" />
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-6 text-left">
                <div className="space-y-1 text-left"><label className="text-[9px] uppercase text-slate-400 font-black">Customer</label><input required value={formData.customer} onChange={e => setFormData({...formData, customer: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" /></div>
                <div className="space-y-1 text-left"><label className="text-[9px] uppercase text-slate-400 font-black">Organization</label><input required value={formData.org} onChange={e => setFormData({...formData, org: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" /></div>
                <div className="space-y-1 text-left"><label className="text-[9px] uppercase text-slate-400 font-black">Order Value</label><input required type="number" value={formData.value} onChange={e => setFormData({...formData, value: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" /></div>
                <div className="space-y-1 text-left"><label className="text-[9px] uppercase text-slate-400 font-black">Delivery Date</label><input type="date" required value={formData.deliveryDate} onChange={e => setFormData({...formData, deliveryDate: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" /></div>
                <div className="space-y-1 text-left"><label className="text-[9px] uppercase text-slate-400 font-black">Sales Manager</label><input required value={formData.salesperson} onChange={e => setFormData({...formData, salesperson: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none focus:ring-2 ring-indigo-500 dark:text-white" /></div>
                <div className="space-y-1 text-left"><label className="text-[9px] uppercase text-slate-400 font-black">Shipping Method</label><select value={formData.shippingMethod} onChange={e => setFormData({...formData, shippingMethod: e.target.value})} className="w-full p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl outline-none dark:text-white appearance-none"><option>Courier</option><option>Pickup</option><option>Other</option></select></div>
              </div>
              <button type="submit" className="col-span-3 py-5 bg-indigo-600 text-white rounded-3xl font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-indigo-700 transition-all mt-4">Confirm Enterprise Record</button>
            </div>

            
            
          </form>
        </div>
      )}
    </div>
  );
}
