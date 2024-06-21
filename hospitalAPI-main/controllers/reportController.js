const Report = require('../models/reportModel');

exports.getReportsByStatus = async (req, res) => {
    try {
        const { status } = req.params;

        // Find all reports with the specified status
        const reports = await Report.find({ status });

        res.status(200).json({ reports });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
