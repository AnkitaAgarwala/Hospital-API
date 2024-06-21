const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    patient: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'patient'
    }]
});

module.exports = mongoose.model('report', reportSchema);
