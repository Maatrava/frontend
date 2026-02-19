import { useNavigate } from "react-router-dom";
import { User, Bell, Calendar, Heart, ClipboardList } from "lucide-react";

export default function MotherMainDashboard() {
  const nav = useNavigate();

  const handleBlueBoxClick = () => {
    nav("/mother-form");
  };

  const handleFillFormClick = () => {
    nav("/mother-form");
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
              <Bell className="w-12 h-12 text-gray-400 mb-3" />
              <p className="text-gray-500 text-center">No reminders for now</p>
              <p className="text-sm text-gray-400 mt-1">Check back later</p>
            </div>
          </div>

          {/* form and appo. */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* appointment box */}
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl p-6">
              <Calendar className="w-8 h-8 text-pink-600 mb-3" />
              <h3 className="font-semibold text-gray-800">Next Appointment</h3>
              <p className="text-sm text-gray-600 mt-1">No upcoming appointments</p>
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
        </div>
      </div>
    </div>
  );
}