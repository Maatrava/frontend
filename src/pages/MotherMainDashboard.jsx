import { useNavigate } from "react-router-dom";
import { User, Bell, Calendar, Heart, ClipboardList, Download } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from "recharts";
import apiClient from "../api/client";

export default function MotherMainDashboard() {
  const nav = useNavigate();

  const handleBlueBoxClick = () => {
    nav("/mother-form");
  };

  const handleFillFormClick = () => {
    nav("/mother-form");
  };

  const handleAppointmentClick = () => {
    nav("/appointments");
  };

  const [recoveryData, setRecoveryData] = useState([
    { weekOfPostpartum: "Week 1", bpSystolic: 130, hemoglobin: 11.2, weight: 70 },
    { weekOfPostpartum: "Week 2", bpSystolic: 125, hemoglobin: 11.5, weight: 68 },
    { weekOfPostpartum: "Week 3", bpSystolic: 122, hemoglobin: 11.8, weight: 67 },
    { weekOfPostpartum: "Week 4", bpSystolic: 120, hemoglobin: 12.0, weight: 65 },
    { weekOfPostpartum: "Week 6", bpSystolic: 118, hemoglobin: 12.2, weight: 64 },
    { weekOfPostpartum: "Week 8", bpSystolic: 115, hemoglobin: 12.5, weight: 63 }
  ]);
  const [mentalData, setMentalData] = useState(() => [
    { sleepHours: 4, moodScore: 3, dateRecorded: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000) },
    { sleepHours: 5, moodScore: 4, dateRecorded: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
    { sleepHours: 6, moodScore: 6, dateRecorded: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) },
    { sleepHours: 5, moodScore: 5, dateRecorded: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
    { sleepHours: 7, moodScore: 8, dateRecorded: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
    { sleepHours: 8, moodScore: 9, dateRecorded: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
    { sleepHours: 7, moodScore: 8, dateRecorded: new Date() }
  ]);
  const reportRef = useRef(null);

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [recRes, menRes, apptsRes] = await Promise.all([
          apiClient("/api/mother-form/recovery").catch(() => ({ success: false, data: [] })),
          apiClient("/api/mother-form/mental-health").catch(() => ({ success: false, data: [] })),
          apiClient("/api/appointments").catch(() => ({ data: [] }))
        ]);
        if (recRes?.success && recRes.data?.length > 0) setRecoveryData(recRes.data);
        if (menRes?.success && menRes.data?.length > 0) setMentalData(menRes.data);

        let fetchedAppointments = [];
        if (apptsRes?.data && Array.isArray(apptsRes.data)) {
          fetchedAppointments = apptsRes.data;
        } else if (Array.isArray(apptsRes)) {
          fetchedAppointments = apptsRes;
        }
        setAppointments(fetchedAppointments);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      }
    };
    fetchDashboardData();
  }, []);

  // Compute upcoming reminders
  const todayDate = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const tmrDate = useMemo(() => {
    const d = new Date(todayDate);
    d.setDate(todayDate.getDate() + 1);
    return d;
  }, [todayDate]);

  const dayAfterDate = useMemo(() => {
    const d = new Date(todayDate);
    d.setDate(todayDate.getDate() + 2);
    return d;
  }, [todayDate]);

  const formatYMD = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };

  const tmrStr = formatYMD(tmrDate);
  const dayAfterStr = formatYMD(dayAfterDate);

  // Reminders: filter appointments that fall on tomorrow or day after tomorrow
  const reminders = appointments.filter(a => a.appointmentDate === tmrStr || a.appointmentDate === dayAfterStr);

  // Next appointment: earliest appointment from today onwards
  const todayStr = formatYMD(todayDate);
  const futureAppointments = appointments
    .filter(a => a.appointmentDate && a.appointmentDate >= todayStr)
    .sort((a, b) => {
      const dateA = a.appointmentDate || "";
      const dateB = b.appointmentDate || "";
      if (dateA === dateB) {
        const timeA = a.appointmentTime || "";
        const timeB = b.appointmentTime || "";
        return timeA.localeCompare(timeB);
      }
      return dateA.localeCompare(dateB);
    });

  const nextAppointment = futureAppointments.length > 0 ? futureAppointments[0] : null;

  const formatDateNicely = (iso) => {
    if (!iso || typeof iso !== 'string') return "";
    const parts = iso.split("-");
    if (parts.length !== 3) return iso;
    const [y, m, d] = parts;
    const dateObj = new Date(y, m - 1, d);
    if (isNaN(dateObj.getTime())) return iso;
    return dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };
  const formatTimeNicely = (time) => {
    if (!time || typeof time !== 'string') return "";
    if (!time.includes(":")) return time;
    const [h, m] = time.split(":");
    let hr = parseInt(h);
    if (isNaN(hr)) return time;
    const ampm = hr >= 12 ? 'PM' : 'AM';
    hr = hr % 12 || 12;
    return `${hr}:${m} ${ampm}`;
  };

  const downloadReport = () => {
    let csvContent = "data:text/csv;charset=utf-8,";

    csvContent += "Postnatal Health Recovery\n";
    csvContent += "Week of Postpartum,BP Systolic,Hemoglobin,Weight\n";
    recoveryData.forEach(row => {
      csvContent += `${row.weekOfPostpartum},${row.bpSystolic},${row.hemoglobin},${row.weight}\n`;
    });

    csvContent += "\nSleep & Mood Correlation\n";
    csvContent += "Date Recorded,Sleep Hours,Mood Score\n";
    mentalData.forEach(row => {
      let dateStr = "";
      if (row.dateRecorded) {
        const d = new Date(row.dateRecorded);
        if (!isNaN(d.getTime())) dateStr = d.toLocaleDateString();
      }
      csvContent += `${dateStr},${row.sleepHours},${row.moodScore}\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "Mother_Wellness_Report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* blue box - click to go to forms */}
          <div
            onClick={handleBlueBoxClick}
            className="bg-[#e6edfc] rounded-3xl px-5 sm:px-6 py-6 flex items-center justify-between cursor-pointer hover:bg-[#d8e3fa] transition-colors"
          >
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mother Dashboard
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
                Welcome mommy! You're doing great every single day!!
              </p>
            </div>

            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-200 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
            </div>
          </div>

          {/* reminders sec */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Your Reminders</h2>

            {/* reminders box */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-8 flex flex-col items-center justify-center min-h-[200px]">
              {reminders.length > 0 ? (
                <div className="w-full">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Upcoming Appointments</h3>
                  <div className="space-y-3">
                    {reminders.map((appt) => (
                      <div key={appt._id} className="p-4 bg-pink-50 rounded-2xl flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <Bell className="w-6 h-6 text-pink-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{appt.reason || "Appointment"} with {appt.doctorName}</p>
                          <p className="text-sm text-gray-600">
                            {formatDateNicely(appt.appointmentDate)} at {formatTimeNicely(appt.appointmentTime)}
                          </p>
                          <p className="text-xs text-gray-500 mt-0.5">{appt.hospital}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <Bell className="w-12 h-12 text-gray-400 mb-3" />
                  <p className="text-gray-500 text-center">No reminders for now</p>
                  <p className="text-sm text-gray-400 mt-1">Check back later</p>
                </>
              )}
            </div>
          </div>

          {/* form and appo. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* appointment box */}
            <div
              onClick={handleAppointmentClick}
              className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-6 cursor-pointer hover:from-pink-100 hover:to-pink-200 transition-colors"
            >
              <Calendar className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-semibold text-gray-800">Next Appointment</h3>
              {nextAppointment ? (
                <div className="mt-2">
                  <p className="text-sm font-semibold text-pink-800">{nextAppointment.doctorName}</p>
                  <p className="text-xs text-gray-700">{formatDateNicely(nextAppointment.appointmentDate)} at {formatTimeNicely(nextAppointment.appointmentTime)}</p>
                </div>
              ) : (
                <p className="text-sm text-gray-600 mt-1">No upcoming appointments</p>
              )}
            </div>

            {/* form - nav */}
            <div
              onClick={handleFillFormClick}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl p-6 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-colors"
            >
              <ClipboardList className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-semibold text-gray-800">Fill Form</h3>
              <p className="text-sm text-gray-600 mt-1">Click to update your health details</p>
            </div>
          </div>

          {/* Charts & Reports Area */}
          <div ref={reportRef} className="space-y-6 pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Health & Wellness Tracker</h2>
              <button
                onClick={downloadReport}
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-full text-sm font-semibold shadow-sm hover:bg-pink-700 transition"
              >
                <Download className="w-4 h-4" />
                Download Wellness Report
              </button>
            </div>

            {/* Postnatal Recovery Chart */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Postnatal Health Recovery</h3>
              {recoveryData.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={recoveryData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis dataKey="weekOfPostpartum" stroke="#6B7280" fontSize={12} tickMargin={10} />
                      <YAxis yAxisId="left" stroke="#6B7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                      />
                      <Legend iconType="circle" />
                      <Line yAxisId="left" type="monotone" dataKey="bpSystolic" name="BP (Systolic)" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line yAxisId="left" type="monotone" dataKey="hemoglobin" name="Hemoglobin" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                      <Line yAxisId="left" type="monotone" dataKey="weight" name="Weight (kg)" stroke="#F59E0B" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  Fill your form to see recovery trends
                </div>
              )}
            </div>

            {/* Mental Health Correlation Chart */}
            <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Sleep & Mood Correlation</h3>
              {mentalData.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={mentalData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis
                        dataKey="dateRecorded"
                        tickFormatter={(val) => {
                          if (!val) return "";
                          const d = new Date(val);
                          return isNaN(d.getTime()) ? "" : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                        }}
                        stroke="#6B7280" fontSize={12} tickMargin={10}
                      />
                      <YAxis stroke="#6B7280" fontSize={12} label={{ value: 'Score / Hours', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6B7280' } }} />
                      <Tooltip
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        labelFormatter={(val) => {
                          if (!val) return "";
                          const d = new Date(val);
                          return isNaN(d.getTime()) ? "" : d.toLocaleDateString();
                        }}
                      />
                      <Legend iconType="circle" />
                      <Bar dataKey="sleepHours" name="Sleep Hours" fill="#818cf8" radius={[4, 4, 0, 0]} maxBarSize={40} />
                      <Line
                        type="monotone"
                        dataKey="moodScore"
                        name="Mood Score"
                        stroke="#ec4899"
                        strokeWidth={3}
                        dot={(props) => {
                          const { cx, cy, payload } = props;
                          // highlight low mood (<4)
                          if (payload.moodScore < 4) {
                            return <circle cx={cx} cy={cy} r={6} fill="#ef4444" stroke="#fff" strokeWidth={2} key={`dot-${payload.dateRecorded}`} />;
                          }
                          return <circle cx={cx} cy={cy} r={4} fill="#ec4899" stroke="#fff" strokeWidth={2} key={`dot-${payload.dateRecorded}`} />;
                        }}
                      />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[200px] flex items-center justify-center text-gray-500 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  Track your mood to see insights
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}