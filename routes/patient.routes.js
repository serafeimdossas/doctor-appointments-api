const express = require("express");
const router = express.Router();
const { validatePatient } = require("../middleware/validate");
const { Patient } = require("../db/db");

router.get("/", async (_req, res) => {
  try {
    const patients = await Patient.findAll({
      attributes: ["first_name", "last_name", "phone", "email"],
      order: [["last_name", "ASC"]],
    });
    return res.status(200).send(patients);
  } catch (error) {
    console.error("Failed to fetch patients:", error);
    return res.status(500).json({ message: "Failed to fetch patients" });
  }
});

router.post("/", validatePatient, async (req, res) => {
  try {
    // get data from request
    const { first_name, last_name, phone, email } = req.body;

    // save patient object in db
    await Patient.create({
      first_name,
      last_name,
      phone,
      email,
    });

    // Sucess response
    return res.status(200).send({
      message: "Patient successfully saved",
    });
  } catch (error) {
    console.error("Failed to create patient:", error);
    return res.status(500).json({ message: "Failed to create patient" });
  }
});

module.exports = router;
