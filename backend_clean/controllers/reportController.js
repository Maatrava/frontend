import Baby from '../models/Baby.js';
import GrowthRecord from '../models/GrowthRecord.js';
import VaccinationRecord from '../models/VaccinationRecord.js';
import IllnessRecord from '../models/IllnessRecord.js';
import MedicationRecord from '../models/MedicationRecord.js';

// Generate comprehensive baby health report
export const generateBabyReport = async (req, res) => {
  try {
    const { babyId } = req.params;

    // Fetch all baby data
    const [baby, growthRecords, vaccinations, illnesses, medications] = await Promise.all([
      Baby.findById(babyId),
      GrowthRecord.find({ babyId }).sort({ date: -1 }),
      VaccinationRecord.find({ babyId }).sort({ scheduledDate: -1 }),
      IllnessRecord.find({ babyId }).sort({ startDate: -1 }),
      MedicationRecord.find({ babyId }).sort({ startDate: -1 })
    ]);

    if (!baby) {
      return res.status(404).json({ success: false, message: 'Baby not found' });
    }

    // Calculate statistics
    const stats = {
      totalGrowthRecords: growthRecords.length,
      totalVaccinations: vaccinations.length,
      completedVaccinations: vaccinations.filter(v => v.status === 'Completed').length,
      totalIllnesses: illnesses.length,
      activeMedications: medications.filter(m => m.status === 'Active').length,
      latestWeight: growthRecords.length > 0 ? growthRecords[0].weight : null,
      latestHeight: growthRecords.length > 0 ? growthRecords[0].height : null
    };

    // Generate HTML report
    const htmlContent = generateHTMLReport(baby, growthRecords, vaccinations, illnesses, medications, stats);

    // Set response headers for HTML download (PDF would require puppeteer)
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Content-Disposition', `attachment; filename="baby-health-report-${baby.babyName}-${new Date().toISOString().split('T')[0]}.html"`);

    res.send(htmlContent);

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ success: false, message: 'Error generating report', error: error.message });
  }
};

// Get report summary
export const getReportSummary = async (req, res) => {
  try {
    const { babyId } = req.params;

    const [baby, growthCount, vaccinationCount, illnessCount, medicationCount] = await Promise.all([
      Baby.findById(babyId),
      GrowthRecord.countDocuments({ babyId }),
      VaccinationRecord.countDocuments({ babyId }),
      IllnessRecord.countDocuments({ babyId }),
      MedicationRecord.countDocuments({ babyId })
    ]);

    if (!baby) {
      return res.status(404).json({ success: false, message: 'Baby not found' });
    }

    const summary = {
      baby: {
        name: baby.babyName,
        gender: baby.gender,
        dateOfBirth: baby.dateOfBirth
      },
      stats: {
        growthRecords: growthCount,
        vaccinations: vaccinationCount,
        illnesses: illnessCount,
        medications: medicationCount
      }
    };

    res.status(200).json({ success: true, data: summary });
  } catch (error) {
    console.error('Error fetching report summary:', error);
    res.status(500).json({ success: false, message: 'Error fetching report summary', error: error.message });
  }
};

// Generate HTML content for report
function generateHTMLReport(baby, growthRecords, vaccinations, illnesses, medications, stats) {
  return `
<!DOCTYPE html>
<html>
<head>
    <title>Baby Health Report - ${baby.babyName}</title>
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 20px; color: #333; line-height: 1.6; }
        .header { text-align: center; border-bottom: 3px solid #3b82f6; padding-bottom: 20px; margin-bottom: 30px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px; }
        .section { margin-bottom: 30px; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb; }
        .section h2 { color: #3b82f6; margin-bottom: 15px; border-bottom: 2px solid #3b82f6; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; }
        .info-item { padding: 15px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px; }
        .stat-card { text-align: center; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .stat-number { font-size: 28px; font-weight: bold; margin-bottom: 5px; }
        .stat-label { font-size: 14px; opacity: 0.9; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
        th { background: #3b82f6; color: white; font-weight: 600; }
        tr:nth-child(even) { background: #f9fafb; }
        .footer { text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; }
        .watermark { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%) rotate(-45deg); font-size: 72px; color: rgba(0,0,0,0.1); z-index: -1; }
    </style>
</head>
<body>
    <div class="watermark">BABY HEALTH TRACKER</div>
    
    <div class="header">
        <h1>👶 Baby Health Report</h1>
        <h2>${baby.babyName}</h2>
        <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
    </div>

    <div class="section">
        <h2>👤 Baby Profile</h2>
        <div class="info-grid">
            <div class="info-item"><strong>Name:</strong> ${baby.babyName}</div>
            <div class="info-item"><strong>Gender:</strong> ${baby.gender}</div>
            <div class="info-item"><strong>Date of Birth:</strong> ${new Date(baby.dateOfBirth).toLocaleDateString()}</div>
            <div class="info-item"><strong>Blood Group:</strong> ${baby.bloodGroup}</div>
            <div class="info-item"><strong>Birth Weight:</strong> ${baby.birthWeight} kg</div>
            <div class="info-item"><strong>Birth Height:</strong> ${baby.birthHeight} cm</div>
            <div class="info-item"><strong>Hospital:</strong> ${baby.birthHospital}</div>
            <div class="info-item"><strong>Delivery Type:</strong> ${baby.deliveryType}</div>
        </div>
    </div>

    <div class="section">
        <h2>📊 Health Statistics</h2>
        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-number">${stats.totalGrowthRecords}</div>
                <div class="stat-label">Growth Records</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.completedVaccinations}/${stats.totalVaccinations}</div>
                <div class="stat-label">Vaccinations Done</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.totalIllnesses}</div>
                <div class="stat-label">Total Illnesses</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${stats.activeMedications}</div>
                <div class="stat-label">Active Meds</div>
            </div>
        </div>
        <div class="info-grid">
            <div class="info-item"><strong>Latest Weight:</strong> ${stats.latestWeight || 'N/A'} kg</div>
            <div class="info-item"><strong>Latest Height:</strong> ${stats.latestHeight || 'N/A'} cm</div>
        </div>
    </div>

    <div class="section">
        <h2>📈 Growth Records (${growthRecords.length})</h2>
        ${growthRecords.length > 0 ? `
        <table>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Weight (kg)</th>
                    <th>Height (cm)</th>
                    <th>Head Circumference</th>
                    <th>Recorded By</th>
                </tr>
            </thead>
            <tbody>
                ${growthRecords.slice(0, 10).map(record => `
                <tr>
                    <td>${new Date(record.date).toLocaleDateString()}</td>
                    <td>${record.weight}</td>
                    <td>${record.height}</td>
                    <td>${record.headCircumference || 'N/A'}</td>
                    <td>${record.recordedBy}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        ${growthRecords.length > 10 ? `<p><em>Showing 10 of ${growthRecords.length} records</em></p>` : ''}
        ` : '<p>No growth records available</p>'}
    </div>

    <div class="section">
        <h2>💉 Vaccination Records (${vaccinations.length})</h2>
        ${vaccinations.length > 0 ? `
        <table>
            <thead>
                <tr>
                    <th>Vaccine</th>
                    <th>Type</th>
                    <th>Scheduled Date</th>
                    <th>Status</th>
                    <th>Administered By</th>
                </tr>
            </thead>
            <tbody>
                ${vaccinations.slice(0, 10).map(record => `
                <tr>
                    <td>${record.vaccineName}</td>
                    <td>${record.vaccineType}</td>
                    <td>${new Date(record.scheduledDate).toLocaleDateString()}</td>
                    <td><span style="background: ${record.status === 'Completed' ? '#10b981' : record.status === 'Scheduled' ? '#3b82f6' : record.status === 'Missed' ? '#ef4444' : '#f59e0b'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${record.status}</span></td>
                    <td>${record.administeredBy || 'N/A'}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        ${vaccinations.length > 10 ? `<p><em>Showing 10 of ${vaccinations.length} records</em></p>` : ''}
        ` : '<p>No vaccination records available</p>'}
    </div>

    <div class="section">
        <h2>🤒 Illness Records (${illnesses.length})</h2>
        ${illnesses.length > 0 ? `
        <table>
            <thead>
                <tr>
                    <th>Illness Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Severity</th>
                    <th>Treatment</th>
                </tr>
            </thead>
            <tbody>
                ${illnesses.slice(0, 10).map(record => `
                <tr>
                    <td>${record.illnessType}</td>
                    <td>${new Date(record.startDate).toLocaleDateString()}</td>
                    <td>${record.endDate ? new Date(record.endDate).toLocaleDateString() : 'Ongoing'}</td>
                    <td><span style="background: ${record.severity === 'Mild' ? '#10b981' : record.severity === 'Moderate' ? '#f59e0b' : '#ef4444'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${record.severity}</span></td>
                    <td>${record.treatment || 'N/A'}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        ${illnesses.length > 10 ? `<p><em>Showing 10 of ${illnesses.length} records</em></p>` : ''}
        ` : '<p>No illness records available</p>'}
    </div>

    <div class="section">
        <h2>💊 Medication Records (${medications.length})</h2>
        ${medications.length > 0 ? `
        <table>
            <thead>
                <tr>
                    <th>Medication</th>
                    <th>Dosage</th>
                    <th>Frequency</th>
                    <th>Status</th>
                    <th>Prescribed By</th>
                </tr>
            </thead>
            <tbody>
                ${medications.slice(0, 10).map(record => `
                <tr>
                    <td>${record.medicationName}</td>
                    <td>${record.dosage}</td>
                    <td>${record.frequency}</td>
                    <td><span style="background: ${record.status === 'Active' ? '#10b981' : record.status === 'Completed' ? '#3b82f6' : '#6b7280'}; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px;">${record.status}</span></td>
                    <td>${record.prescribedBy}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>
        ${medications.length > 10 ? `<p><em>Showing 10 of ${medications.length} records</em></p>` : ''}
        ` : '<p>No medication records available</p>'}
    </div>

    <div class="footer">
        <p><strong>This report was generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</strong></p>
        <p>For questions about this report, please consult your healthcare provider.</p>
        <p><em>Baby Health Tracker System - Comprehensive Child Health Management</em></p>
    </div>
</body>
</html>
  `;
}
