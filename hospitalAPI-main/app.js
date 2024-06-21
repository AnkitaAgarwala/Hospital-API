const express = require("express");
const app = express();

//Requiring extras usage packages.
const cookieParser = require("cookie-parser");

//Routes
const db = require('./config/db');
const doctorRoutes = require('./routes/doctorRoute');
const patientRoutes = require('./routes/patientRoute');
const reportRoutes = require("./routes/reportRoutes")

//Middlewares for form data parsing and cookies handling.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//Using routes
app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/reports", reportRoutes);

app.get("/", (req, res) => {
    res.send("Everything works fine")
});

// connectDB(); // Call the connectDB function to establish MongoDB connection

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});