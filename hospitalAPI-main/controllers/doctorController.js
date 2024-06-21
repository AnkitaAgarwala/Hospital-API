const Doctor = require('../models/doctorModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
    registerDoctor: async (req, res) => {
        try {
            const { username, password } = req.body;
    
            // Check if the username already exists
            const existingDoctor = await Doctor.findOne({ username });
            if (existingDoctor) {
                return res.status(400).json({ message: 'Username already exists' });
            }
    
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
    
            // Create a new doctor with hashed password
            const doctor = await Doctor.create({ username, password: hashedPassword });
    
            // Send success response with token
            res.status(201).json({ message: 'Doctor registered successfully'}).redirect("/login");
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    loginDoctor: async (req, res) => {
        try {
            const { username, password } = req.body;
            const doctor = await Doctor.findOne({ username });
    
            if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
    
            const token = jwt.sign({ username: doctor.username }, 'your_secret_key', { expiresIn: '1h' });
            res.json({ token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

