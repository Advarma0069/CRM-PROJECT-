import { useState, useMemo } from "react";
import { 
  FaWhatsapp, FaPlus, FaTrash, FaArrowLeft, FaCheckCircle, FaExclamationCircle,
  FaSearch, FaEnvelope, FaSms, FaChevronLeft, FaChevronRight, FaEdit, FaUsers, FaTasks, FaExclamationTriangle
} from "react-icons/fa";

// --- Employees & Mock Data ---
const EMPLOYEES = [
  { id: 1, name: "Suresh Kumar", dept: "Sales" },
  { id: 2, name: "Priya Singh", dept: "Operations" },
  { id: 3, name: "Anil Mehta", dept: "Support" },
];

const INITIAL_TASKS = Array.from({ length: 25 }, (_, i) => ({
  id: `T-${1000 + i}`,
  customer: ["Rahul Sharma", "Amit Verma", "Neha Gupta", "Vikram Sai"][i % 4],
  phone: `987654321${i % 10}`,
  assignedTo: EMPLOYEES[i % 3].name,
  status: i % 3 === 0 ? "Completed" : "Pending",
  date: "2023-11-20",
  priority: i % 2 === 0 ? "High" : "Medium",
  deadline: "2023-12-01",
  description: "Follow up on inquiry"
}));

export default function EnterpriseTaskMaster() {
  const [view, setView] = useState("list"); // 'list', 'create', 'edit'
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const [formData, setFormData] = useState({
    id: "", customer: "", phone: "", employee: "", deadline: "", description: "", priority: "Medium", status: "Pending"
  });

  const [editingTaskId, setEditingTaskId] = useState(null);

  // --- Filtering & Pagination ---
  const filteredTasks = useMemo(() => tasks.filter(t => 
    t.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  ), [tasks, searchTerm]);

  const totalPages = Math.ceil(filteredTasks.length / rowsPerPage);
  const currentTableData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredTasks.slice(start, start + rowsPerPage);
  }, [filteredTasks, currentPage]);

  // --- KPI counts ---
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const pendingTasks = tasks.filter(t => t.status === "Pending").length;
  const highPriorityTasks = tasks.filter(t => t.priority === "High").length;

  // --- Handlers ---
  const toggleSelectAll = () => setSelectedRows(selectedRows.length === currentTableData.length ? [] : currentTableData.map(r => r.id));
  const toggleRow = (id) => setSelectedRows(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const notify = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleBulkAction = (actionType) => {
    if (!selectedRows.length) return;
    notify(`Initiating ${actionType} for ${selectedRows.length} contacts...`, "success");
  };

  const handleDeleteTask = (id) => {
    if (!window.confirm("Are you sure to delete this task?")) return;
    setTasks(prev => prev.filter(t => t.id !== id));
    notify("Task deleted", "error");
  };

  const handleEditTask = (task) => {
    setFormData({...task});
    setEditingTaskId(task.id);
    setView("edit");
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(res => setTimeout(res, 800));
    if (editingTaskId) {
      // Update existing task
      setTasks(prev => prev.map(t => t.id === editingTaskId ? {...formData} : t));
      notify("Task updated successfully!");
    } else {
      // Create new task
      const newTask = { ...formData, id: `T-${Math.floor(Math.random()*9000)+1000}` };
      setTasks([newTask, ...tasks]);
      notify("Task created successfully!");
    }
    setEditingTaskId(null);
    setFormData({ id: "", customer: "", phone: "", employee: "", deadline: "", description: "", priority: "Medium", status: "Pending" });
    setView("list");
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] p-4 md:p-8 transition-all duration-300">
      {/* Toast */}
              {/* Top Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-6">
          <div>
            <h1 className="text-4xl font-black text-slate-900 dark:text-white">Task Management</h1>
            <p className="text-slate-500 font-medium">Manage inquiries, tasks, and employee assignments efficiently</p>
          </div>
          <button onClick={() => setView("create")} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold shadow-xl flex items-center gap-3 transition-transform active:scale-95">
            <FaPlus /> New Assignment
          </button>
        </div>

      {toast && (
        <div className={`fixed top-10 right-10 z-[100] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right text-white font-bold ${toast.type==="success"?"bg-emerald-600":"bg-rose-600"}`}>
          {toast.type==="success"?<FaCheckCircle/>:<FaExclamationCircle/>} {toast.msg}
        </div>
      )}

      <div className="max-w-7xl mx-auto space-y-6">

        {/* KPI Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <FaTasks className="text-indigo-600 text-3xl mb-2" />
            <span className="font-black text-slate-800 dark:text-white text-xl">{totalTasks}</span>
            <span className="text-slate-400 text-sm">Total Tasks</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <FaCheckCircle className="text-emerald-600 text-3xl mb-2" />
            <span className="font-black text-slate-800 dark:text-white text-xl">{completedTasks}</span>
            <span className="text-slate-400 text-sm">Completed</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <FaExclamationTriangle className="text-amber-500 text-3xl mb-2" />
            <span className="font-black text-slate-800 dark:text-white text-xl">{pendingTasks}</span>
            <span className="text-slate-400 text-sm">Pending</span>
          </div>
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-md border border-slate-200 dark:border-slate-800 flex flex-col items-center">
            <FaUsers className="text-rose-600 text-3xl mb-2" />
            <span className="font-black text-slate-800 dark:text-white text-xl">{highPriorityTasks}</span>
            <span className="text-slate-400 text-sm">High Priority</span>
          </div>
        </div>

        {view === "list" ? (
          <div className="space-y-4">

            {/* Search + Bulk Actions */}
            <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-2 flex flex-wrap items-center justify-between gap-4">
              <div className="relative w-full max-w-xl">
                <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" placeholder="Search by name, ID or phone..." className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-indigo-500 dark:text-white outline-none" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} />
              </div>
              <div className={`flex items-center gap-2 transition-all ${selectedRows.length > 0 ? 'opacity-100 scale-100' : 'opacity-40 grayscale pointer-events-none'}`}>
                <span className="text-xs font-black text-indigo-600 mr-2 bg-indigo-50 px-3 py-1 rounded-full">{selectedRows.length} SELECTED</span>
                <button onClick={()=>handleBulkAction('WhatsApp')} className="p-3 bg-green-50 text-green-600 rounded-xl hover:bg-green-100" title="WhatsApp"><FaWhatsapp /></button>
                <button onClick={()=>handleBulkAction('Email')} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100" title="Email"><FaEnvelope /></button>
                <button onClick={()=>handleBulkAction('SMS')} className="p-3 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100" title="SMS"><FaSms /></button>
                <button onClick={()=>setTasks(prev=>prev.filter(t=>!selectedRows.includes(t.id))) && setSelectedRows([])} className="p-3 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100" title="Delete"><FaTrash /></button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-x-auto">
              <table className="w-full text-left min-w-[900px]">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b dark:border-slate-800">
                    <th className="px-6 py-5 w-12 text-center">
                      <input type="checkbox" className="w-5 h-5 rounded-md accent-indigo-600" onChange={toggleSelectAll} checked={selectedRows.length===currentTableData.length && currentTableData.length>0} />
                    </th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Inquiry</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Assignment</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Priority</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {currentTableData.map(task => (
                    <tr key={task.id} className={`group transition-colors ${selectedRows.includes(task.id)?'bg-indigo-50/30 dark:bg-indigo-900/10':'hover:bg-slate-50 dark:hover:bg-slate-800/40'}`}>
                      <td className="px-6 py-6 text-center">
                        <input type="checkbox" className="w-5 h-5 rounded-md accent-indigo-600" checked={selectedRows.includes(task.id)} onChange={()=>toggleRow(task.id)} />
                      </td>
                      <td className="px-6 py-6">
                        <div className="flex flex-col">
                          <span className="text-xs font-bold text-indigo-500 mb-1">{task.id}</span>
                          <span className="font-bold text-slate-800 dark:text-slate-100">{task.customer}</span>
                          <span className="text-xs text-slate-500">{task.phone}</span>
                          <span className="text-xs text-slate-400">{task.description}</span>
                          <span className="text-xs text-slate-400">Deadline: {task.deadline}</span>
                        </div>
                      </td>
                      <td className="px-6 py-6">{task.assignedTo}</td>
                      <td className="px-6 py-6">
                        <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${task.priority==='High'?'border-rose-200 text-rose-600':'border-blue-200 text-blue-600'}`}>{task.priority.toUpperCase()}</span>
                      </td>
                      <td className="px-6 py-6">
                        <span className={`px-4 py-2 rounded-xl text-xs font-bold ${task.status==='Completed'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{task.status}</span>
                      </td>
                      <td className="px-6 py-6 text-center flex justify-center gap-2">
                        <button onClick={()=>handleEditTask(task)} className="p-2 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100"><FaEdit /></button>
                        <button onClick={()=>handleDeleteTask(task.id)} className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-100"><FaTrash /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-between items-center">
              <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Showing {currentTableData.length} of {filteredTasks.length} entries</span>
              <div className="flex gap-2 bg-white dark:bg-slate-900 p-2 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                <button onClick={()=>setCurrentPage(prev=>Math.max(prev-1,1))} disabled={currentPage===1} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-30 transition-all"><FaChevronLeft /></button>
                {Array.from({length: totalPages},(_,i)=><button key={i+1} onClick={()=>setCurrentPage(i+1)} className={`h-10 w-10 rounded-xl font-bold transition-all ${currentPage===i+1?'bg-indigo-600 text-white shadow-lg':'hover:bg-slate-100 text-slate-500'}`}>{i+1}</button>)}
                <button onClick={()=>setCurrentPage(prev=>Math.min(prev+1,totalPages))} disabled={currentPage===totalPages} className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl disabled:opacity-30 transition-all"><FaChevronRight /></button>
              </div>
            </div>
          </div>
        ) : (
          // Form view for Create/Edit
          <div className="max-w-4xl mx-auto animate-in slide-in-from-bottom-10 duration-500">
            <button onClick={()=>setView("list")} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-8 group transition-all"><FaArrowLeft /> Return</button>
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-10 border border-slate-100 dark:border-slate-800">
              <h2 className="text-3xl font-black mb-8">{editingTaskId?'Edit Task':'New Assignment'}</h2>
              <form onSubmit={handleSaveTask} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest">Customer Name</label><input required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border-none focus:ring-2 focus:ring-indigo-500" value={formData.customer} onChange={(e)=>setFormData({...formData,customer:e.target.value})} /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest">Phone</label><input required className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border-none focus:ring-2 focus:ring-indigo-500" value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} /></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest">Assign Employee</label><select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border-none focus:ring-2 focus:ring-indigo-500" value={formData.employee} onChange={(e)=>setFormData({...formData,employee:e.target.value})}><option>Choose...</option>{EMPLOYEES.map(e=><option key={e.id}>{e.name}</option>)}</select></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest">Priority</label><select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border-none focus:ring-2 focus:ring-indigo-500" value={formData.priority} onChange={(e)=>setFormData({...formData,priority:e.target.value})}><option>Medium</option><option>High</option><option>Urgent</option></select></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest">Status</label><select className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border-none focus:ring-2 focus:ring-indigo-500" value={formData.status} onChange={(e)=>setFormData({...formData,status:e.target.value})}><option>Pending</option><option>In Progress</option><option>Completed</option></select></div>
                <div className="space-y-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest">Deadline</label><input type="date" className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border-none focus:ring-2 focus:ring-indigo-500" value={formData.deadline} onChange={(e)=>setFormData({...formData,deadline:e.target.value})} /></div>
                <div className="space-y-2 md:col-span-2"><label className="text-xs font-black text-slate-400 uppercase tracking-widest">Description</label><textarea className="w-full p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 dark:text-white border-none focus:ring-2 focus:ring-indigo-500" value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}></textarea></div>
                <button className="md:col-span-2 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xl hover:bg-indigo-700 shadow-xl">{loading?'Processing...':(editingTaskId?'Update Task':'Assign Task')}</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
