const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('doctor', doctorSchema);
