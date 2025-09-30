const express = require("express");
const router = express.Router();
const { validateDoctor } = require("../middleware/validate");
const { Doctor } = require("../db/db");

router.get("/", async (_req, res) => {
  try {
    const doctors = await Doctor.findAll({
      attributes: [
        "first_name",
        "last_name",
        "specialty",
        "address",
        "phone",
        "email",
      ],
      order: [["last_name", "ASC"]],
    });
    return res.status(200).send(doctors);
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return res.status(500).json({ message: "Failed to fetch doctors" });
  }
});

router.post("/", validateDoctor, async (req, res) => {
  try {
    // get data from request
    const { first_name, last_name, specialty, address, phone, email } =
      req.body;

    // save doctor object in db
    await Doctor.create({
      first_name,
      last_name,
      specialty,
      address,
      phone,
      email,
    });

    // Sucess response
    return res.status(200).send({
      message: "Doctor successfully saved",
    });
  } catch (error) {
    console.error("Failed to create doctor:", error);
    return res.status(500).json({ message: "Failed to create doctor" });
  }
});

module.exports = router;
