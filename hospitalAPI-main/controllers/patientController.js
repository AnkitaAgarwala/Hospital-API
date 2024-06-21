const Patient = require('../models/patientModel');
const Report = require('../models/reportModel');
const bcrypt = require('bcrypt');

module.exports = {
    registerPatient: async (req, res) => {
    try {
        const { name, phone_number, password } = req.body;
        
        // Generate a salt using the specified number of rounds
        const hashedPhoneNumber = await bcrypt.hash(phone_number, 10);
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new patient
        const patient = await Patient.create({ name, phone_number: hashedPhoneNumber, password: hashedPassword });

        res.status(201).json({ message: 'Patient registered successfully', patient }).redirect("/login");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
},
createReport: async (req, res) => {
    try {
        const { id } = req.params;

        // Find patient by ID
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        const { createdBy, status } = req.body;

        // Create a new report
        const report = new Report({
            createdBy,
            status,
            patient: id
        });

        // Ensure the reports array is defined and initialized
        if (!patient.reports) {
            patient.reports = [];
        }

        // Push the report to the patient's reports array
        patient.reports.push(report);

        // Save the patient to update the reports array
        await patient.save();
        await report.save();

        res.status(201).json({ message: 'Report created successfully', report });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
},
getAllReports: async (req, res) => {
    try {
        const { id } = req.params;

        // Find patient by ID and populate 'reports' field
        const patient = await Patient.findById(id).populate('reports');

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        // Check if patient has reports
        if (!patient.reports || patient.reports.length === 0) {
            return res.status(404).json({ message: 'No reports found for this patient' });
        }

        // Sort reports by date in ascending order (oldest to latest)
        const sortedReports = patient.reports.sort((a, b) => a.date - b.date);

        res.status(200).json({ reports: sortedReports });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
}
