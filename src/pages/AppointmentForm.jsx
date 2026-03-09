import { useEffect, useRef, useState } from "react";
import { Calendar, ClipboardList, Pencil, Trash2 } from "lucide-react";
import apiClient from "../api/client";
import PrimaryButton from "../components/PrimaryButton.jsx";

// mock data 
const MOCK_APPOINTMENTS = [
  {
    _id: "1",
    appointmentDate: "2026-03-15",
    appointmentTime: "10:30",
    doctorName: "Dr. Priya",
    hospital: "Apollo Hospital",
    reason: "Regular Checkup",
    contact: "9876543210",
    notes: "Bring previous reports",
  },
  {
    _id: "2",
    appointmentDate: "2026-03-20",
    appointmentTime: "14:45",
    doctorName: "Dr. Ravi",
    hospital: "KMCH",
    reason: "Follow-up",
    contact: "9876543211",
    notes: "",
  },
  {
    _id: "3",
    appointmentDate: "2026-03-25",
    appointmentTime: "09:15",
    doctorName: "Dr. Anjali",
    hospital: "Sudha Hospital",
    reason: "Vaccination",
    contact: "9876543212",
    notes: "Baby's vaccination due",
  },
];

const emptyAppointment = {
  appointmentDate: "",
  appointmentTime: "",
  doctorName: "",
  hospital: "",
  reason: "",
  contact: "",
  notes: "",
};

function formatDateForGrid(iso) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function formatTimeForGrid(value) {
  if (!value) return "";
  const [hh, mm] = value.split(":");
  const h = Number(hh);
  if (Number.isNaN(h)) return value;
  const ampm = h >= 12 ? "PM" : "AM";
  const hr12 = ((h + 11) % 12) + 1;
  return `${hr12}:${mm || "00"} ${ampm}`;
}

export default function AppointmentForm() {
  const [form, setForm] = useState(emptyAppointment);
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [useMockData, setUseMockData] = useState(true); // fallback 
  const toastTimerRef = useRef(null);

  const showToast = (message, variant = "success") => {
    setToast({ message, variant });
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2400);
  };

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching appointments from API...");
      const response = await apiClient("/appointments");
      console.log("API Response:", response);
      
      // handle different response structures
      if (response?.data && Array.isArray(response.data)) {
        setAppointments(response.data);
        setUseMockData(false);
      } else if (Array.isArray(response)) {
        setAppointments(response);
        setUseMockData(false);
      } else {
        console.warn("Unexpected response format, using mock data:", response);
        setAppointments(MOCK_APPOINTMENTS);
        setUseMockData(true);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      showToast("Using sample appointments while connecting to server", "info");
    
      setAppointments(MOCK_APPOINTMENTS);
      setUseMockData(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  const setField = (key) => (value) => setForm((prev) => ({ ...prev, [key]: value }));

  const validateForm = () => {
    if (!form.appointmentDate) {
      showToast("Please select appointment date", "error");
      return false;
    }
    if (!form.appointmentTime) {
      showToast("Please select appointment time", "error");
      return false;
    }
    if (!form.doctorName) {
      showToast("Please enter doctor name", "error");
      return false;
    }
    if (!form.hospital) {
      showToast("Please enter hospital name", "error");
      return false;
    }
    if (!form.contact) {
      showToast("Please enter contact number", "error");
      return false;
    }
    if (form.contact && !/^\d{10}$/.test(form.contact.replace(/\D/g, ''))) {
      showToast("Please enter a valid 10-digit contact number", "error");
      return false;
    }
    return true;
  };

  const handleBook = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 800));
        
        if (editingId) {
          setAppointments(prev => 
            prev.map(appt => 
              appt._id === editingId ? { ...form, _id: editingId } : appt
            )
          );
          showToast("Appointment updated successfully!", "success");
        } else {
          const newAppointment = {
            ...form,
            _id: Date.now().toString(), 
          };
          setAppointments(prev => [newAppointment, ...prev]);
          showToast("Appointment booked successfully!", "success");
        }
      } else {
        if (editingId) {
          await apiClient(`/appointments/${editingId}`, { 
            method: "PUT", 
            body: form 
          });
          showToast("Appointment updated successfully!", "success");
        } else {
          await apiClient("/appointments", { body: form });
          showToast("Appointment booked successfully!", "success");
        }
        await fetchAppointments(); 
      }
      
      setForm(emptyAppointment);
      setEditingId(null);
      
    } catch (error) {
      console.error("Error saving appointment:", error);
      showToast(error.message || "Failed to save appointment", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (appt) => {
    setEditingId(appt._id);
    setForm({
      appointmentDate: appt.appointmentDate || "",
      appointmentTime: appt.appointmentTime || "",
      doctorName: appt.doctorName || "",
      hospital: appt.hospital || "",
      reason: appt.reason || "",
      contact: appt.contact || "",
      notes: appt.notes || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const ok = window.confirm("Are you sure you want to cancel this appointment?");
    if (!ok) return;
    
    setIsSaving(true);
    try {
      if (useMockData) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setAppointments(prev => prev.filter(appt => appt._id !== id));
        
        if (editingId === id) {
          setEditingId(null);
          setForm(emptyAppointment);
        }
        showToast("Appointment cancelled successfully!", "success");
      } else {
        await apiClient(`/appointments/${id}`, { method: "DELETE" });
        
        if (editingId === id) {
          setEditingId(null);
          setForm(emptyAppointment);
        }
        
        await fetchAppointments();
        showToast("Appointment cancelled successfully!", "success");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      showToast(error.message || "Failed to cancel appointment", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm(emptyAppointment);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-2 pb-20"> {/* Added pb-20 for bottom navigation space */}
      <div className="pt-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Header */}
          <div className="bg-[#e6edfc] rounded-3xl px-5 sm:px-6 py-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Appointment Booking
                </h1>
                <p className="text-sm sm:text-base text-gray-600 mt-2 max-w-2xl">
                  Book or cancel your appointments.
                </p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-pink-200 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 sm:w-7 sm:h-7 text-gray-600" />
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
                  <ClipboardList className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    {editingId ? "Edit Appointment" : "Book New Appointment"}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {editingId ? "Update your appointment details" : "Fill details and book your appointment"}
                  </p>
                </div>
              </div>
              
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="px-3 py-1.5 rounded-full border border-gray-200 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 active:scale-95 transition"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <form onSubmit={handleBook} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="block">
                  <div className="mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      Appointment Date 
                    </span>
                  </div>
                  <input
                    type="date"
                    value={form.appointmentDate}
                    onChange={(e) => setField("appointmentDate")(e.target.value)}
                    required
                    className="w-full h-12 rounded-2xl px-4 text-sm bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200"
                  />
                </label>

                <label className="block">
                  <div className="mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      Appointment Time 
                    </span>
                  </div>
                  <input
                    type="time"
                    value={form.appointmentTime}
                    onChange={(e) => setField("appointmentTime")(e.target.value)}
                    required
                    className="w-full h-12 rounded-2xl px-4 text-sm bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200"
                  />
                </label>

                <label className="block">
                  <div className="mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      Doctor Name 
                    </span>
                  </div>
                  <input
                    type="text"
                    value={form.doctorName}
                    onChange={(e) => setField("doctorName")(e.target.value)}
                    placeholder="e.g., Dr. Kanishka"
                    required
                    className="w-full h-12 rounded-2xl px-4 text-sm bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200"
                  />
                </label>

                <label className="block">
                  <div className="mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      Hospital 
                    </span>
                  </div>
                  <input
                    type="text"
                    value={form.hospital}
                    onChange={(e) => setField("hospital")(e.target.value)}
                    placeholder="e.g., Apollo Hospital"
                    required
                    className="w-full h-12 rounded-2xl px-4 text-sm bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <div className="mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      Reason for Visit
                    </span>
                  </div>
                  <input
                    type="text"
                    value={form.reason}
                    onChange={(e) => setField("reason")(e.target.value)}
                    placeholder="e.g., Regular checkup, Follow-up, Vaccination"
                    className="w-full h-12 rounded-2xl px-4 text-sm bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <div className="mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                      Contact Number 
                    </span>
                  </div>
                  <input
                    type="tel"
                    value={form.contact}
                    onChange={(e) => setField("contact")(e.target.value)}
                    placeholder="10-digit mobile number"
                    required
                    maxLength="10"
                    pattern="[0-9]{10}"
                    className="w-full h-12 rounded-2xl px-4 text-sm bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200"
                  />
                </label>

                <label className="block sm:col-span-2">
                  <div className="mb-1.5">
                    <span className="text-sm font-semibold text-gray-900">
                       Notes
                    </span>
                  </div>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setField("notes")(e.target.value)}
                    placeholder="Any special requests or additional information..."
                    rows={3}
                    className="w-full rounded-2xl px-4 py-3 text-sm bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-200"
                  />
                </label>
              </div>

              <div className="flex justify-center pt-4">
                <PrimaryButton 
                  type="submit" 
                  disabled={isSaving}
                  className="w-full sm:w-auto px-8 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full transition-colors"
                >
                  {isSaving ? "Saving..." : (editingId ? "Update Appointment" : "Book Appointment")}
                </PrimaryButton>
              </div>
            </form>
          </section>

          {/* Appointments List */}
          <section className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-600">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-gray-900">
                    Your Appointments
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                    {appointments.length} {appointments.length === 1 ? 'appointment' : 'appointments'} scheduled
                  </p>
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-pink-200 border-t-pink-600"></div>
                <p className="text-sm text-gray-500 mt-2">Loading appointments...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b border-gray-100">
                      <th className="py-3 pr-4 font-semibold">Date</th>
                      <th className="py-3 pr-4 font-semibold">Time</th>
                      <th className="py-3 pr-4 font-semibold">Doctor</th>
                      <th className="py-3 pr-4 font-semibold">Hospital</th>
                      <th className="py-3 pr-4 font-semibold">Reason</th>
                      <th className="py-3 pr-4 font-semibold">Contact</th>
                      <th className="py-3 pr-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-8 text-center">
                          <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                          <p className="text-sm text-gray-500">No appointments yet</p>
                          <p className="text-xs text-gray-400 mt-1">Book your first appointment above</p>
                        </td>
                      </tr>
                    ) : (
                      appointments.map((appt) => (
                        <tr key={appt._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                          <td className="py-3 pr-4 text-sm text-gray-900 whitespace-nowrap">
                            {formatDateForGrid(appt.appointmentDate)}
                          </td>
                          <td className="py-3 pr-4 text-sm text-gray-900 whitespace-nowrap">
                            {formatTimeForGrid(appt.appointmentTime)}
                          </td>
                          <td className="py-3 pr-4 text-sm text-gray-900">
                            {appt.doctorName}
                          </td>
                          <td className="py-3 pr-4 text-sm text-gray-900">
                            {appt.hospital}
                          </td>
                          <td className="py-3 pr-4 text-sm text-gray-900 max-w-[150px] truncate">
                            {appt.reason || '-'}
                          </td>
                          <td className="py-3 pr-4 text-sm text-gray-900">
                            {appt.contact}
                          </td>
                          <td className="py-3 pr-4">
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() => handleEdit(appt)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-pink-100 text-pink-700 text-xs font-semibold hover:bg-pink-200 transition"
                                disabled={isSaving}
                              >
                                <Pencil className="w-3.5 h-3.5" />
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(appt._id)}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition"
                                disabled={isSaving}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-4 animate-fade-in-down">
          <div
            className={[
              "rounded-2xl border shadow-lg px-4 py-3 text-sm font-medium backdrop-blur",
              toast.variant === "success"
                ? "bg-green-50/95 border-green-200 text-green-800"
                : toast.variant === "info"
                  ? "bg-blue-50/95 border-blue-200 text-blue-800"
                  : toast.variant === "error"
                    ? "bg-red-50/95 border-red-200 text-red-800"
                    : "bg-gray-50/95 border-gray-200 text-gray-800",
            ].join(" ")}
          >
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
}