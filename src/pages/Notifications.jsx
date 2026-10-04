import { useState, useMemo } from "react";

/* ------------------ Pro UI Components ------------------ */
const NotificationBadge = ({ type }) => {
  const themes = {
    Activity: "bg-blue-100 text-blue-700 ring-blue-200",
    System: "bg-purple-100 text-purple-700 ring-purple-200",
    Message: "bg-emerald-100 text-emerald-700 ring-emerald-200",
    Security: "bg-red-100 text-red-700 ring-red-200",
  };
  return (
    <span className={`px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ring-1 ${themes[type] || "bg-gray-100"}`}>
      {type}
    </span>
  );
};

export default function ProfessionalNotificationCenter() {
  const [notifications, setNotifications] = useState([
    { id: 1, message: "High-value lead assigned: Rahul Sharma", type: "Activity", read: false, date: "2 mins ago", priority: "high" },
    { id: 2, message: "Monthly ERP Financial report is ready for review", type: "System", read: true, date: "1 hour ago", priority: "low" },
    { id: 3, message: "Secure Login: New device detected in Mumbai, IN", type: "Security", read: false, date: "3 hours ago", priority: "critical" },
    { id: 4, message: "Client XYZ Corp uploaded 4 new documents", type: "Message", read: false, date: "Yesterday", priority: "medium" },
  ]);

  const unreadCount = useMemo(() => notifications.filter(n => !n.read).length, [notifications]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const toggleRead = (id) => {
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: !n.read } : n)));
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => setNotifications([]);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 font-sans antialiased text-slate-900">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-black tracking-tight text-slate-900">Command Center</h1>
            {unreadCount > 0 && (
              <span className="bg-indigo-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg shadow-indigo-200">
                {unreadCount} New
              </span>
            )}
          </div>
          <p className="text-slate-500 font-medium text-sm mt-1 text-balance">Real-time alerts from your Nexus ERP ecosystem.</p>
        </div>

        <div className="flex gap-2">
          <button 
            onClick={markAllRead}
            className="text-xs font-bold text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-xl transition"
          >
            Mark All Read
          </button>
          <button 
            onClick={clearAll}
            className="text-xs font-bold text-slate-400 hover:text-red-600 px-4 py-2 transition"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((n) => (
          <div 
            key={n.id} 
            className={`group relative flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 bg-white ${
              !n.read 
                ? "border-indigo-100 shadow-sm ring-1 ring-indigo-50" 
                : "border-slate-100 opacity-80 grayscale-[0.5]"
            }`}
          >
            {/* Unread Indicator Dot */}
            {!n.read && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-indigo-600 rounded-r-full shadow-[2px_0_10px_rgba(79,70,229,0.4)]"></div>
            )}

            {/* Content Area */}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <NotificationBadge type={n.type} />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{n.date}</span>
              </div>
              <p className={`text-sm leading-relaxed ${!n.read ? "text-slate-900 font-bold" : "text-slate-500 font-medium"}`}>
                {n.message}
              </p>
            </div>

            {/* Quick Actions (Visible on Hover) */}
            <div className="flex items-center gap-1 lg:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => toggleRead(n.id)}
                title={n.read ? "Mark Unread" : "Mark Read"}
                className={`p-2 rounded-lg transition ${n.read ? "text-slate-400 hover:bg-slate-100" : "text-indigo-600 hover:bg-indigo-50"}`}
              >
                {n.read ? "↩️" : "✅"}
              </button>
              <button
                onClick={() => deleteNotification(n.id)}
                title="Archive"
                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="py-20 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-200">
            <div className="text-4xl mb-4">📭</div>
            <h3 className="font-bold text-slate-900">All caught up!</h3>
            <p className="text-slate-500 text-sm">Your notification inbox is currently empty.</p>
          </div>
        )}
      </div>

      {/* Footer Meta */}
      <footer className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Real-time Stream Connected</span>
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Last Sync: {new Date().toLocaleTimeString()}
        </div>
      </footer>
    </div>
  );
}
