import React, { useState } from 'react';
import { Calendar, Syringe, Clock } from 'lucide-react';

const VaccinationForm = ({ onSubmit, babyId }) => {
  const [formData, setFormData] = useState({
    vaccineName: '',
    vaccineType: 'Routine',
    administeredDate: '',
    nextDoseDate: '',
    administeredBy: '',
    batchNumber: '',
    sideEffects: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.vaccineName.trim()) newErrors.vaccineName = 'Vaccine name is required';
    if (!formData.vaccineType) newErrors.vaccineType = 'Vaccine type is required';
    if (!formData.administeredBy.trim()) newErrors.administeredBy = 'Administered by is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit({ ...formData, babyId });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vaccine Name
          </label>
          <div className="relative">
            <Syringe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="vaccineName"
              value={formData.vaccineName}
              onChange={handleChange}
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
                errors.vaccineName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="e.g., BCG, DTP, Polio"
            />
          </div>
          {errors.vaccineName && <p className="text-red-500 text-sm mt-1">{errors.vaccineName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vaccine Type
          </label>
          <select
            name="vaccineType"
            value={formData.vaccineType}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
              errors.vaccineType ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="Routine">Routine</option>
            <option value="Optional">Optional</option>
            <option value="Travel">Travel</option>
            <option value="Emergency">Emergency</option>
          </select>
          {errors.vaccineType && <p className="text-red-500 text-sm mt-1">{errors.vaccineType}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Administered Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="administeredDate"
              value={formData.administeredDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Next Dose Date (if applicable)
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="date"
              name="nextDoseDate"
              value={formData.nextDoseDate}
              onChange={handleChange}
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Administered By
        </label>
        <input
          type="text"
          name="administeredBy"
          value={formData.administeredBy}
          onChange={handleChange}
          className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500 ${
            errors.administeredBy ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Healthcare provider name"
        />
        {errors.administeredBy && <p className="text-red-500 text-sm mt-1">{errors.administeredBy}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Batch Number
        </label>
        <input
          type="text"
          name="batchNumber"
          value={formData.batchNumber}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          placeholder="Vaccine batch number"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Side Effects (if any)
        </label>
        <textarea
          name="sideEffects"
          value={formData.sideEffects}
          onChange={handleChange}
          rows={2}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          placeholder="Any observed side effects..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-rose-500"
          placeholder="Additional notes..."
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => setFormData({
            vaccineName: '',
            vaccineType: 'Routine',
            administeredDate: '',
            nextDoseDate: '',
            administeredBy: '',
            batchNumber: '',
            sideEffects: '',
            notes: ''
          })}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors"
        >
          Add Vaccination Record
        </button>
      </div>
    </form>
  );
};

export default VaccinationForm;
