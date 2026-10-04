import { useState, useMemo } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Users,
  Briefcase,
  Filter,
} from "lucide-react";

const leaveTypes = {
  CL: { color: "bg-blue-500", label: "Casual Leave" },
  SL: { color: "bg-red-500", label: "Sick Leave" },
  WFH: { color: "bg-emerald-500", label: "Work From Home" },
  HOLIDAY: { color: "bg-purple-500", label: "Holiday" },
};

const employees = [
  { id: 1, name: "Rahul Sharma", department: "IT" },
  { id: 2, name: "Priya Singh", department: "HR" },
  { id: 3, name: "Amit Verma", department: "Sales" },
];

const leaveData = [
  { date: "2026-02-05", employeeId: 1, type: "CL" },
  { date: "2026-02-10", employeeId: 2, type: "SL" },
  { date: "2026-02-14", employeeId: 3, type: "WFH" },
  { date: "2026-02-20", employeeId: 1, type: "WFH" },
  { date: "2026-02-26", employeeId: 2, type: "CL" },
];

export default function LeaveCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [departmentFilter, setDepartmentFilter] = useState("All");

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentDate.toLocaleString("default", { month: "long" });

  const today = new Date();

  const filteredLeaves = useMemo(() => {
    return leaveData.filter((leave) => {
      const emp = employees.find((e) => e.id === leave.employeeId);
      return (
        departmentFilter === "All" ||
        emp.department === departmentFilter
      );
    });
  }, [departmentFilter]);

  const getLeavesForDay = (day) => {
    const formattedDate = `${year}-${String(month + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;

    return filteredLeaves.filter((leave) => leave.date === formattedDate);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-600 rounded-2xl shadow-lg">
            <CalendarDays className="text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Leave Calendar
            </h1>
            <p className="text-slate-500 text-sm">
              Enterprise HR Leave Planning Dashboard
            </p>
          </div>
        </div>

        {/* Month Switch */}
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl shadow">
          <button
            onClick={() =>
              setCurrentDate(new Date(year, month - 1, 1))
            }
            className="p-2 hover:bg-slate-100 rounded-xl"
          >
            <ChevronLeft />
          </button>

          <span className="font-semibold text-lg">
            {monthName} {year}
          </span>

          <button
            onClick={() =>
              setCurrentDate(new Date(year, month + 1, 1))
            }
            className="p-2 hover:bg-slate-100 rounded-xl"
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {Object.keys(leaveTypes).map((type) => (
          <div
            key={type}
            className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-slate-500">
                {leaveTypes[type].label}
              </p>
              <h2 className="text-2xl font-bold text-slate-800">
                {leaveData.filter((l) => l.type === type).length}
              </h2>
            </div>
            <div
              className={`w-4 h-16 rounded-full ${leaveTypes[type].color}`}
            />
          </div>
        ))}
      </div>

      {/* FILTER */}
      <div className="bg-white p-6 rounded-2xl shadow mb-8 flex items-center gap-4">
        <Filter className="text-slate-500" />
        <select
          className="border px-4 py-2 rounded-xl"
          value={departmentFilter}
          onChange={(e) => setDepartmentFilter(e.target.value)}
        >
          <option>All</option>
          <option>IT</option>
          <option>HR</option>
          <option>Sales</option>
        </select>
      </div>

      {/* CALENDAR */}
      <div className="bg-white rounded-3xl shadow-xl p-6">
        <div className="grid grid-cols-7 text-center text-slate-500 font-medium mb-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
            (d) => (
              <div key={d}>{d}</div>
            )
          )}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {Array(firstDay)
            .fill(null)
            .map((_, i) => (
              <div key={i}></div>
            ))}

          {Array.from({ length: daysInMonth }, (_, i) => {
            const day = i + 1;
            const leaves = getLeavesForDay(day);

            const isToday =
              today.getDate() === day &&
              today.getMonth() === month &&
              today.getFullYear() === year;

            return (
              <div
                key={day}
                className={`rounded-2xl border p-3 h-32 transition hover:shadow-md ${
                  isToday
                    ? "bg-indigo-50 border-indigo-400"
                    : "bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center mb-2">
                  <span
                    className={`text-sm font-semibold ${
                      isToday
                        ? "text-indigo-600"
                        : "text-slate-700"
                    }`}
                  >
                    {day}
                  </span>
                </div>

                <div className="space-y-1 overflow-auto max-h-20">
                  {leaves.map((leave, idx) => {
                    const emp = employees.find(
                      (e) => e.id === leave.employeeId
                    );

                    return (
                      <div
                        key={idx}
                        className={`text-xs text-white px-2 py-1 rounded-lg ${leaveTypes[leave.type].color}`}
                      >
                        {emp.name.split(" ")[0]} • {leave.type}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* LEGEND */}
      <div className="mt-6 flex gap-6">
        {Object.keys(leaveTypes).map((type) => (
          <div key={type} className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${leaveTypes[type].color}`}
            />
            <span className="text-sm text-slate-600">
              {leaveTypes[type].label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}