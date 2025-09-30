const express = require("express");
require("dotenv").config();
const doctorRoutes = require("./routes/doctor.routes");
const patientRoutes = require("./routes/patient.routes");
const slotRoutes = require("./routes/slot.routes");

const app = express();
const PORT = process.env.API_PORT || 8000;

app.use(express.json());

app.use("/doctors", doctorRoutes);
app.use("/patients", patientRoutes);
app.use("/availability", slotRoutes);

app.get("/", (_req, res) => {
  return res.status(200).send({
    message: "Doctor Appointments API",
  });
});

app.listen(PORT, () => {
  console.log(`API listening on ${PORT}`);
});
