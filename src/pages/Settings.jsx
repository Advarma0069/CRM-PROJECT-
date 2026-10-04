import React, { useState, useEffect, useMemo } from "react";

/* ------------------ REUSABLE ENTERPRISE UI COMPONENTS ------------------ */
const Section = ({ title, badge, children }) => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
      <h3 className="text-lg font-extrabold text-slate-800 tracking-tight">{title}</h3>
      {badge && <span className="px-2.5 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-black uppercase rounded-md ring-1 ring-indigo-200">{badge}</span>}
    </div>
    <div className="p-6">{children}</div>
  </div>
);

const Toggle = ({ enabled, onChange }) => (
  <div onClick={() => onChange(!enabled)} className={`w-11 h-6 rounded-full transition-all cursor-pointer flex items-center px-1 ${enabled ? 'bg-indigo-600' : 'bg-slate-300'}`}>
    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'}`}></div>
  </div>
);

/* ------------------ 1. IAM (IDENTITY & ACCESS MANAGEMENT) ------------------ */
const IAMModule = () => {
  const [roles] = useState([
    { id: "R1", name: "System Admin", permissions: ["ALL_ACCESS"], scope: "Global", color: "bg-purple-500" },
    { id: "R2", name: "Finance Director", permissions: ["FIN_READ", "FIN_WRITE", "TAX_APPROVE"], scope: "Org-wide", color: "bg-blue-500" },
    { id: "R3", name: "Inventory Manager", permissions: ["SCM_READ", "STOCK_EDIT"], scope: "Warehouse-specific", color: "bg-emerald-500" },
  ]);

  return (
    
      <div className="space-y-4">
        {roles.map(role => (
          <div key={role.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:shadow-md transition cursor-pointer group">
            <div className="flex items-center gap-4">
              <div className={`w-2 h-10 rounded-full ${role.color}`}></div>
              <div>
                <p className="font-bold text-slate-900">{role.name} <span className="text-xs font-normal text-slate-400 ml-2">ID: {role.id}</span></p>
                <div className="flex gap-1 mt-1">
                  {role.permissions.map(p => <span key={p} className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold">{p}</span>)}
                </div>
              </div>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-xs font-bold text-indigo-600 underline transition">Manage Policy</button>
          </div>
        ))}
      </div>
  );
};

/* ------------------ 2. ERP FINANCIAL & COMPLIANCE ------------------ */
const FinanceModule = () => {
  const [config, setConfig] = useState({ autoTax: true, multiCurrency: true, fiscalStart: "April" });
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Section title="Financial Localization" badge="Finance">
        <div className="space-y-5">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-1.5">Reporting Currency</label>
            <select className="w-full border-slate-200 rounded-lg p-2.5 text-sm bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option>INR (₹) - Indian Rupee</option>
              <option>USD ($) - US Dollar</option>
            </select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-700">Automatic GST/Tax Calculation</span>
            <Toggle enabled={config.autoTax} onChange={(v) => setConfig({...config, autoTax: v})} />
          </div>
        </div>
      </Section>
      <Section title="Inventory Control" badge="SCM">
        <div className="space-y-3 text-sm">
          {["Enable Batch/Serial Tracking", "Low Stock Smart-Alerts", "FIFO (First-In, First-Out) Valuation"].map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg border border-slate-100">
              <input type="checkbox" defaultChecked className="accent-indigo-600" />
              <span className="font-medium text-slate-600">{item}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};

/* ------------------ 3. IMMUTABLE AUDIT LOGS ------------------ */
const AuditLogModule = () => {
  const logs = [
    { id: 101, user: "admin@nexus.com", action: "Changed Tax Policy", timestamp: "2025-02-23 14:22:01", status: "Critical" },
    { id: 102, user: "finance@nexus.com", action: "Exported Q4 Ledger", timestamp: "2025-02-23 11:05:44", status: "Moderate" },
  ];

  return (
    <Section title="Regulatory Audit Trail" badge="Compliance">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-50 text-[10px] uppercase font-black text-slate-400">
            <tr>
              <th className="p-3">Entity/User</th>
              <th className="p-3">Action Description</th>
              <th className="p-3">UTC Timestamp</th>
              <th className="p-3 text-right">Severity</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map(log => (
              <tr key={log.id} className="text-xs hover:bg-slate-50 transition-colors">
                <td className="p-3 font-bold text-indigo-600">{log.user}</td>
                <td className="p-3 text-slate-600 font-medium">{log.action}</td>
                <td className="p-3 text-slate-400 font-mono">{log.timestamp}</td>
                <td className="p-3 text-right"><span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${log.status === 'Critical' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'}`}>{log.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
};

/* ------------------ MAIN COMMAND CENTER DASHBOARD ------------------ */
export default function NexusERPDashboard() {
  const [activeTab, setActiveTab] = useState("iam");
  const [isSyncing, setIsSyncing] = useState(false);

  const sidebar = [
    { id: "iam", label: "Security & IAM", icon: "🛡️" },
    { id: "finance", label: "ERP Finance", icon: "💰" },
    { id: "audit", label: "Audit Logs", icon: "📋" },
    { id: "system", label: "System Health", icon: "⚡" },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex font-sans text-slate-900">
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-72 bg-white border-r border-slate-200 hidden lg:flex flex-col p-8 sticky top-0 h-screen">
        <div className="mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-indigo-100">N</div>
          <span className="text-2xl font-black tracking-tighter">NEXUS<span className="text-indigo-600 underline decoration-4">ERP</span></span>
        </div>
        
        <nav className="space-y-1.5 flex-1">
          {sidebar.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl font-bold transition-all ${
                activeTab === item.id ? "bg-indigo-50 text-indigo-700 shadow-sm" : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="bg-slate-900 rounded-3xl p-5 text-white shadow-2xl">
          <p className="text-[9px] font-black text-slate-500 uppercase mb-1.5 tracking-widest">Global Status</p>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span>
            <p className="text-xs font-bold uppercase tracking-tight">Systems Operational</p>
          </div>
          <div className="text-[10px] text-slate-400 leading-relaxed">Cluster: AP-South-1<br/>Uptime: 99.98%</div>
        </div>
      </aside>

      {/* MAIN VIEWPORT */}
      <main className="flex-1 p-6 lg:p-14 overflow-y-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900">Governance Console</h1>
            <p className="text-slate-500 font-medium mt-2">Manage enterprise-wide security, finance, and operational protocols.</p>
          </div>
          
          <button 
            onClick={() => { setIsSyncing(true); setTimeout(() => setIsSyncing(false), 1500); }}
            className={`px-10 py-4 rounded-2xl font-black text-white transition-all shadow-2xl active:scale-95 ${
              isSyncing ? "bg-slate-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200"
            }`}
          >
            {isSyncing ? "Deploying Updates..." : "Deploy Global Policy"}
          </button>
        </header>

        {/* DYNAMIC CONTENT */}
        <div className="max-w-5xl">
          {activeTab === "iam" && <IAMModule />}
          {activeTab === "finance" && <FinanceModule />}
          {activeTab === "audit" && <AuditLogModule />}
          {activeTab === "system" && (
            <Section title="Infrastructure Overview" badge="Performance">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[{l: "DB Connections", v: "142"}, {l: "Queue Latency", v: "12ms"}, {l: "Storage used", v: "84%"}].map((s, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{s.l}</p>
                    <p className="text-3xl font-black text-slate-900">{s.v}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        <footer className="mt-20 flex justify-between items-center text-[11px] font-bold text-slate-400 uppercase tracking-widest border-t border-slate-200 pt-8">
          <div>Nexus Enterprise Framework v8.4.1</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-600">Documentation</a>
            <a href="#" className="hover:text-indigo-600">Incident Logs</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
