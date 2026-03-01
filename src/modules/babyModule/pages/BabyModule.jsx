import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Home, TrendingUp, Calendar, Download, Activity, Baby, Heart, BarChart3, Zap, User, Weight, Ruler, Droplet, Hospital, Syringe } from 'lucide-react';

export default function BabyModule() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderView = () => {
    switch(activeView) {
      case 'dashboard':
        return (
          <div>
            <div className="bg-pink-200 rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Baby's Health Overview
              </h2>
              <p className="text-gray-600">
                Track your baby's growth, vaccinations, and health milestones
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-pink-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-pink-500 flex items-center justify-center">
                    <Baby className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-pink-600">1</h3>
                    <p className="text-sm text-gray-500">Total Babies</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-amber-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-600">0</h3>
                    <p className="text-sm text-gray-500">Growth Records</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-green-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-600">0</h3>
                    <p className="text-sm text-gray-500">Vaccinations Done</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-200 flex items-center justify-center">
                      <Baby className="w-5 h-5 text-pink-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Baby Added Successfully!</h4>
                      <p className="text-sm text-gray-600">Check your MongoDB database</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">Just now</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'add-baby':
        return (
          <div>
            <div className="bg-pink-200 rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Add New Baby 👶
              </h2>
              <p className="text-gray-600">Enter your baby's information to get started</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <form className="space-y-6" onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const babyData = {
                  babyName: formData.get('name'),
                  gender: formData.get('gender'),
                  dateOfBirth: formData.get('dateOfBirth'),
                  birthWeight: parseFloat(formData.get('birthWeight')) || 0,
                  birthHeight: parseFloat(formData.get('birthHeight')) || 0,
                  bloodGroup: formData.get('bloodGroup') || 'O+',
                  birthHospital: formData.get('birthHospital') || '',
                  deliveryType: formData.get('deliveryType') || 'Normal',
                  complications: formData.get('complications') || '',
                  motherId: 'MOTHER123', // This should come from auth context
                  createdAt: new Date().toISOString()
                };

                console.log('Sending baby data:', babyData);

                try {
                  const response = await fetch('http://localhost:5000/api/baby', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(babyData)
                  });
                  
                  console.log('Response status:', response.status);
                  console.log('Response ok:', response.ok);
                  
                  if (response.ok) {
                    alert('Baby added successfully!');
                    setActiveView('dashboard');
                  } else {
                    const responseText = await response.text();
                    console.error('Server response:', responseText);
                    alert('Error adding baby: ' + responseText);
                  }
                } catch (error) {
                  console.error('Error:', error);
                  alert('Error adding baby: ' + error.message);
                }
              }}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Baby Name
                    </label>
                    <input name="name" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Enter baby name" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select name="gender" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500" required>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input name="dateOfBirth" type="date" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Weight (kg)
                    </label>
                    <input name="birthWeight" type="number" step="0.01" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="3.2" required />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Height (cm)
                    </label>
                    <input name="birthHeight" type="number" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="50.5" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                    <select name="bloodGroup" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                      <option value="">Select blood group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Birth Hospital
                    </label>
                    <input name="birthHospital" type="text" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Hospital name" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Delivery Type</label>
                    <select name="deliveryType" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500">
                      <option value="">Select delivery type</option>
                      <option value="Normal">Normal</option>
                      <option value="C-Section">C-Section</option>
                      <option value="Assisted">Assisted</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Complications at Birth</label>
                  <textarea name="complications" rows={4} className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500" placeholder="Any complications during birth..."></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button type="submit" className="bg-pink-500 text-white px-8 py-3 rounded-xl hover:bg-pink-600 font-semibold shadow-lg">
                    Add Baby
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
        
      case 'growth':
        return (
          <div>
            <div className="bg-amber-100 rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Growth Tracker 📈
              </h2>
              <p className="text-gray-600">Monitor your baby's physical development over time</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Growth Record</h3>
                <form className="space-y-4" onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const growthData = {
                    babyId: 'BABY123', // This should come from selected baby
                    date: formData.get('date'),
                    weight: parseFloat(formData.get('weight')),
                    height: parseFloat(formData.get('height')),
                    headCircumference: parseFloat(formData.get('headCircumference')),
                    notes: formData.get('notes'),
                    createdAt: new Date().toISOString()
                  };

                  try {
                    const response = await fetch('/api/baby/growth', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify(growthData)
                    });
                    
                    if (response.ok) {
                      alert('Growth record added successfully!');
                      e.target.reset();
                    } else {
                      alert('Error adding growth record');
                    }
                  } catch (error) {
                    console.error('Error:', error);
                    alert('Error adding growth record');
                  }
                }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input name="date" type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                      <input name="weight" type="number" step="0.01" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="3.5" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Height (cm)</label>
                      <input name="height" type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="65.2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Head Circumference (cm)</label>
                      <input name="headCircumference" type="number" step="0.1" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="42.5" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea name="notes" rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" placeholder="Additional notes..."></textarea>
                  </div>
                  <button type="submit" className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 font-semibold">
                    Add Record
                  </button>
                </form>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Chart</h3>
                <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
                  <BarChart3 className="w-12 h-12" />
                  <p className="text-sm">Growth chart will appear here</p>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'vaccination':
        return (
          <div>
            <div className="bg-green-100 rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Vaccination Schedule 💉
              </h2>
              <p className="text-gray-600">Keep track of your baby's immunization timeline</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <h4 className="font-semibold text-gray-900">BCG Vaccine</h4>
                    <p className="text-sm text-gray-600">Given at birth</p>
                  </div>
                  <div className="px-3 py-1 bg-green-600 text-white text-xs rounded-full font-semibold">
                    Completed
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <h4 className="font-semibold text-gray-900">Hepatitis B</h4>
                    <p className="text-sm text-gray-600">Due: Next week</p>
                  </div>
                  <div className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-full font-semibold">
                    Upcoming
                  </div>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <div>
                    <h4 className="font-semibold text-gray-900">DTP Vaccine</h4>
                    <p className="text-sm text-gray-600">Due: In 2 weeks</p>
                  </div>
                  <div className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-full font-semibold">
                    Upcoming
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'health-logs':
        return (
          <div>
            <div className="bg-red-100 rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Health Logs 📋
              </h2>
              <p className="text-gray-600">Track illnesses, medications, and health observations</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <button className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 font-semibold mb-4">
                Add Health Log
              </button>
              
              <div className="space-y-3">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-red-200 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Fever</h4>
                      <p className="text-sm text-gray-600">Baby Emma - Mild fever, 38.2°C</p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Medication</h4>
                      <p className="text-sm text-gray-600">Baby Emma - Paracetamol drops</p>
                      <p className="text-xs text-gray-500">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'health-reports':
        return (
          <div>
            <div className="bg-purple-100 rounded-3xl p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Health Reports 📊
              </h2>
              <p className="text-gray-600">Generate comprehensive health reports for your baby</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth Report</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                    <BarChart3 className="w-8 h-8 text-purple-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Weight & Height Progress</h4>
                      <p className="text-sm text-gray-600">Monthly growth analysis</p>
                    </div>
                  </div>
                  <button className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 font-semibold">
                    Generate Report
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccination Report</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                    <Syringe className="w-8 h-8 text-green-600" />
                    <div>
                      <h4 className="font-medium text-gray-900">Immunization History</h4>
                      <p className="text-sm text-gray-600">Complete vaccination timeline</p>
                    </div>
                  </div>
                  <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-semibold">
                    Generate Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div>
            <div className="bg-pink-200 rounded-3xl p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome to Baby Tracker
              </h2>
              <p className="text-gray-600">Select a tab to get started with tracking your baby's health</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
      {/* Add padding before header */}
      <div className="h-20 py-1 bg-pink-50"></div>

      {/* Header - Reduced Size */}
      <div className="w-full bg-white shadow-sm border-b border-pink-100">
        <div className="px-4 py-3">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Baby Tracker
              </h1>
              <p className="text-sm text-gray-600">
                Monitor your baby's health and growth
              </p>
            </div>
            <button 
              onClick={() => setActiveView('add-baby')}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-4 py-2 rounded-lg hover:from-pink-600 hover:to-rose-600 flex items-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add Baby
            </button>
          </div>
        </div>
      </div>

      {/* Add spacing after header */}
      <div className="h-6 bg-pink-50"></div>

      {/* Navigation Tabs - Reduced Size */}
      <div className="w-full bg-gradient-to-r from-pink-100 to-amber-50 border-b border-pink-200">
        <div className="px-4">
          <div className="flex space-x-1 py-3 overflow-x-auto">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'add-baby', label: 'Add Baby', icon: Plus },
              { id: 'growth', label: 'Growth', icon: TrendingUp },
              { id: 'vaccination', label: 'Vaccination', icon: Syringe },
              { id: 'health-logs', label: 'Health Logs', icon: Activity },
              { id: 'health-reports', label: 'Reports', icon: Download }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all whitespace-nowrap text-sm ${
                  activeView === tab.id
                    ? 'bg-white text-pink-600 shadow-lg border-2 border-pink-200'
                    : 'text-gray-600 hover:text-pink-600 hover:bg-white hover:bg-opacity-60'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
  
      {/* Content Area - Full Width (No Left/Right Padding) */}
      <div className="w-full">
        <div className="py-8">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            {renderView()}
          </div>
        </div>
      </div>

      {/* AI Health Assistant - Reduced Size */}
      <div className="w-full bg-gradient-to-r from-purple-100 to-pink-100 mt-8">
        <div className="px-4 py-6">
          <div className="bg-white rounded-2xl shadow-xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">AI Health Assistant</h3>
                <p className="text-sm text-gray-600">Get instant answers about your baby's health</p>
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-3">
              <p className="text-gray-700 mb-3 text-sm">
                <span className="font-semibold text-purple-600">Welcome Emma!</span> I'm here to help you track your baby's health and answer any questions you might have about growth milestones, vaccinations, or general care.
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-xs">
                  💡 Growth Tips
                </button>
                <button className="px-3 py-1 bg-pink-600 text-white rounded-lg hover:bg-pink-700 text-xs">
                  🍼 Feeding Guide
                </button>
                <button className="px-3 py-1 bg-amber-600 text-white rounded-lg hover:bg-amber-700 text-xs">
                  😴 Sleep Patterns
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
