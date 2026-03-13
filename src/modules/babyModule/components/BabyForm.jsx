import React, { useState } from 'react';
import { Calendar, User, Weight, Ruler, Heart, MapPin, Phone, Mail, FileText, Camera, AlertCircle, CheckCircle } from 'lucide-react';

const BabyForm = ({ onSubmit, loading, submitText = 'Save Baby Profile' }) => {
  const [formData, setFormData] = useState({
    // Basic Information
    name: '',
    dateOfBirth: '',
    gender: '',
    birthTime: '',
    birthPlace: '',
    
    // Physical Measurements
    weight: '',
    height: '',
    headCircumference: '',
    chestCircumference: '',
    apgarScore: '',
    
    // Medical Information
    bloodType: '',
    rhFactor: '',
    congenitalConditions: '',
    birthComplications: '',
    medicationsAtBirth: '',
    
    // Family Information
    fatherName: '',
    fatherAge: '',
    fatherOccupation: '',
    fatherPhone: '',
    motherName: '',
    motherAge: '',
    motherOccupation: '',
    motherPhone: '',
    parentEmail: '',
    
    // Additional Information
    deliveryType: '',
    gestationalAge: '',
    birthOrder: '',
    siblings: '',
    
    // Emergency Contact
    emergencyContact: '',
    emergencyPhone: '',
    emergencyRelation: '',
    
    // Preferences
    preferredLanguage: '',
    healthcareProvider: '',
    insuranceInfo: '',
    
    // Notes
    specialInstructions: '',
    allergies: '',
    notes: ''
  });
  
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState('basic');

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.name.trim()) newErrors.name = 'Baby name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.weight || formData.weight <= 0) newErrors.weight = 'Valid weight is required';
    if (!formData.height || formData.height <= 0) newErrors.height = 'Valid height is required';
    if (!formData.motherName.trim()) newErrors.motherName = 'Mother name is required';
    if (!formData.fatherName.trim()) newErrors.fatherName = 'Father name is required';
    if (!formData.parentEmail.trim()) newErrors.parentEmail = 'Parent email is required';
    
    // Email validation
    if (formData.parentEmail && !/\S+@\S+\.\S+/.test(formData.parentEmail)) {
      newErrors.parentEmail = 'Valid email is required';
    }
    
    // Phone validation
    if (formData.motherPhone && !/^\d{10,}$/.test(formData.motherPhone.replace(/\D/g, ''))) {
      newErrors.motherPhone = 'Valid phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const sections = [
    { id: 'basic', title: 'Basic Information', icon: User },
    { id: 'physical', title: 'Physical Measurements', icon: Ruler },
    { id: 'medical', title: 'Medical Information', icon: Heart },
    { id: 'family', title: 'Family Information', icon: User },
    { id: 'additional', title: 'Additional Details', icon: FileText },
    { id: 'emergency', title: 'Emergency Contact', icon: AlertCircle }
  ];

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Baby Name *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                errors.name ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter baby's full name"
            />
          </div>
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gender *
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
              errors.gender ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date of Birth *
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
              }`}
            />
          </div>
          {errors.dateOfBirth && <p className="text-red-500 text-sm mt-1">{errors.dateOfBirth}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time of Birth
          </label>
          <input
            type="time"
            name="birthTime"
            value={formData.birthTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Place of Birth
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="birthPlace"
              value={formData.birthPlace}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="Hospital name and location"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Type
          </label>
          <select
            name="deliveryType"
            value={formData.deliveryType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="">Select delivery type</option>
            <option value="Normal">Normal</option>
            <option value="C-Section">C-Section</option>
            <option value="Vacuum">Vacuum Extraction</option>
            <option value="Forceps">Forceps</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderPhysicalMeasurements = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Weight (kg) *
          </label>
          <div className="relative">
            <Weight className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              step="0.01"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                errors.weight ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="3.5"
            />
          </div>
          {errors.weight && <p className="text-red-500 text-sm mt-1">{errors.weight}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Height (cm) *
          </label>
          <div className="relative">
            <Ruler className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="number"
              step="0.1"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                errors.height ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="50"
            />
          </div>
          {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Head Circumference (cm)
          </label>
          <input
            type="number"
            step="0.1"
            name="headCircumference"
            value={formData.headCircumference}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="34.5"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Chest Circumference (cm)
          </label>
          <input
            type="number"
            step="0.1"
            name="chestCircumference"
            value={formData.chestCircumference}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="32.0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Apgar Score
          </label>
          <input
            type="text"
            name="apgarScore"
            value={formData.apgarScore}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="9/9"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gestational Age (weeks)
          </label>
          <input
            type="number"
            name="gestationalAge"
            value={formData.gestationalAge}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="40"
          />
        </div>
      </div>
    </div>
  );

  const renderMedicalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Blood Type
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="">Select blood type</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Rh Factor
          </label>
          <select
            name="rhFactor"
            value={formData.rhFactor}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="">Select Rh factor</option>
            <option value="Positive">Positive (+)</option>
            <option value="Negative">Negative (-)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Congenital Conditions
          </label>
          <textarea
            name="congenitalConditions"
            value={formData.congenitalConditions}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Any congenital conditions or abnormalities"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Complications
          </label>
          <textarea
            name="birthComplications"
            value={formData.birthComplications}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Any complications during birth"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medications Given at Birth
          </label>
          <textarea
            name="medicationsAtBirth"
            value={formData.medicationsAtBirth}
            onChange={handleChange}
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Any medications administered immediately after birth"
          />
        </div>
      </div>
    </div>
  );

  const renderFamilyInfo = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Father Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father Name *
            </label>
            <input
              type="text"
              name="fatherName"
              value={formData.fatherName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                errors.fatherName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Father's full name"
            />
            {errors.fatherName && <p className="text-red-500 text-sm mt-1">{errors.fatherName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father Age
            </label>
            <input
              type="number"
              name="fatherAge"
              value={formData.fatherAge}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="30"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father Occupation
            </label>
            <input
              type="text"
              name="fatherOccupation"
              value={formData.fatherOccupation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Father Phone
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="fatherPhone"
                value={formData.fatherPhone}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
                placeholder="1234567890"
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Mother Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother Name *
            </label>
            <input
              type="text"
              name="motherName"
              value={formData.motherName}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                errors.motherName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Mother's full name"
            />
            {errors.motherName && <p className="text-red-500 text-sm mt-1">{errors.motherName}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother Age
            </label>
            <input
              type="number"
              name="motherAge"
              value={formData.motherAge}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="28"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother Occupation
            </label>
            <input
              type="text"
              name="motherOccupation"
              value={formData.motherOccupation}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="Teacher"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mother Phone *
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="motherPhone"
                value={formData.motherPhone}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                  errors.motherPhone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="1234567890"
              />
            </div>
            {errors.motherPhone && <p className="text-red-500 text-sm mt-1">{errors.motherPhone}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Parent Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="parentEmail"
                value={formData.parentEmail}
                onChange={handleChange}
                className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                  errors.parentEmail ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="parent@email.com"
              />
            </div>
            {errors.parentEmail && <p className="text-red-500 text-sm mt-1">{errors.parentEmail}</p>}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Birth Order
          </label>
          <select
            name="birthOrder"
            value={formData.birthOrder}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="">Select birth order</option>
            <option value="First">First child</option>
            <option value="Second">Second child</option>
            <option value="Third">Third child</option>
            <option value="Fourth">Fourth child</option>
            <option value="Fifth+">Fifth or more</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Siblings
          </label>
          <input
            type="number"
            name="siblings"
            value={formData.siblings}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="0"
          />
        </div>
      </div>
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Language
          </label>
          <select
            name="preferredLanguage"
            value={formData.preferredLanguage}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          >
            <option value="">Select language</option>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Chinese">Chinese</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Healthcare Provider
          </label>
          <input
            type="text"
            name="healthcareProvider"
            value={formData.healthcareProvider}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Dr. Smith"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Insurance Information
          </label>
          <input
            type="text"
            name="insuranceInfo"
            value={formData.insuranceInfo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Insurance company and policy number"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Known Allergies
        </label>
        <textarea
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          placeholder="Any known allergies (food, medication, environmental)"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Special Instructions
        </label>
        <textarea
          name="specialInstructions"
          value={formData.specialInstructions}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          placeholder="Any special care instructions or preferences"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Additional Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          placeholder="Any additional information or notes"
        />
      </div>
    </div>
  );

  const renderEmergencyContact = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Contact Name
          </label>
          <input
            type="text"
            name="emergencyContact"
            value={formData.emergencyContact}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Emergency contact person"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Emergency Phone
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="tel"
              name="emergencyPhone"
              value={formData.emergencyPhone}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
              placeholder="Emergency contact phone"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Relationship to Baby
          </label>
          <input
            type="text"
            name="emergencyRelation"
            value={formData.emergencyRelation}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            placeholder="Grandparent, Aunt, Uncle, etc."
          />
        </div>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'basic':
        return renderBasicInfo();
      case 'physical':
        return renderPhysicalMeasurements();
      case 'medical':
        return renderMedicalInfo();
      case 'family':
        return renderFamilyInfo();
      case 'additional':
        return renderAdditionalInfo();
      case 'emergency':
        return renderEmergencyContact();
      default:
        return renderBasicInfo();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Section Navigation */}
      <div className="bg-white border border-gray-200 rounded-lg p-1">
        <div className="flex flex-wrap gap-2">
          {sections.map(section => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                type="button"
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeSection === section.id
                    ? 'bg-rose-500 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          {sections.find(s => s.id === activeSection)?.title}
        </h3>
        {renderSection()}
      </div>

      {/* Progress Indicator */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Form Progress</span>
          <span className="text-sm text-gray-500">
            {sections.findIndex(s => s.id === activeSection) + 1} of {sections.length}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-rose-500 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${((sections.findIndex(s => s.id === activeSection) + 1) / sections.length) * 100}%`
            }}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-between items-center">
        <button
          type="button"
          onClick={() => {
            const currentIndex = sections.findIndex(s => s.id === activeSection);
            if (currentIndex > 0) {
              setActiveSection(sections[currentIndex - 1].id);
            }
          }}
          disabled={sections.findIndex(s => s.id === activeSection) === 0}
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => setFormData({
              name: '',
              dateOfBirth: '',
              gender: '',
              birthTime: '',
              birthPlace: '',
              weight: '',
              height: '',
              headCircumference: '',
              chestCircumference: '',
              apgarScore: '',
              bloodType: '',
              rhFactor: '',
              congenitalConditions: '',
              birthComplications: '',
              medicationsAtBirth: '',
              fatherName: '',
              fatherAge: '',
              fatherOccupation: '',
              fatherPhone: '',
              motherName: '',
              motherAge: '',
              motherOccupation: '',
              motherPhone: '',
              parentEmail: '',
              deliveryType: '',
              gestationalAge: '',
              birthOrder: '',
              siblings: '',
              emergencyContact: '',
              emergencyPhone: '',
              emergencyRelation: '',
              preferredLanguage: '',
              healthcareProvider: '',
              insuranceInfo: '',
              specialInstructions: '',
              allergies: '',
              notes: ''
            })}
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Clear Form
          </button>

          {activeSection !== sections[sections.length - 1].id ? (
            <button
              type="button"
              onClick={() => {
                const currentIndex = sections.findIndex(s => s.id === activeSection);
                if (currentIndex < sections.length - 1) {
                  setActiveSection(sections[currentIndex + 1].id);
                }
              }}
              className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
            >
              Next Section
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  {submitText}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default BabyForm;
