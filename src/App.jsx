import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Contacts from "./pages/Contacts";
import Deals from "./pages/Deals";
import Tasks from "./pages/Tasks";
import Reports from "./pages/Reports";
import Marketing from "./pages/Marketing";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";
import CreateInquiry from "./EntrySection/CreateInquiry";
import CreateQuotation from "./EntrySection/Create-Quotation";
import CreateContract from "./EntrySection/CreateContract";
import Order from "./EntrySection/Order";

import HRSection from "./pages/HR-section";
import LiveTracking from "./pages/LiveTracking";

import QuotationView from "./components/QuotationView";

import Payroll from "./HRMS/Payroll";
import Employees from "./HRMS/Employees";
import Attendance from "./HRMS/Attendance";
import Leaves from "./HRMS/Leaves";
import LeaveCalender from "./HRMS/LeaveCalender";
import KPI from "./HRMS/KPI";
import Expenses from "./HRMS/Expenses";

export default function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="leads" element={<Leads />} />
          <Route path="HR-section" element={<HRSection />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="deals" element={<Deals />} />
          <Route path="reports" element={<Reports />} />
          <Route path="marketing" element={<Marketing />} />
          <Route path="support" element={<Support />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="EntrySection/create-inquiry" element={<CreateInquiry />} />
          <Route path="EntrySection/create-quotation" element={<CreateQuotation />} />
          <Route path="EntrySection/create-contract" element={<CreateContract />} />
          <Route path="live-tracking" element={<LiveTracking />} />
          <Route path="Quotaion" element={<QuotationView />} />
          <Route path="EntrySection/Order" element={<Order />} />
          <Route path="HRMS/Payroll" element={<Payroll />} />
          <Route path="HRMS/Employees" element={<Employees />} />
          <Route path="HRMS/Leaves" element={<Leaves />} />
          <Route path="HRMS/LeaveCalender" element={<LeaveCalender />} />
          <Route path="HRMS/Attendance" element={<Attendance />} />
          <Route path="HRMS/KPI" element={<KPI />} />
          <Route path="HRMS/Expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
