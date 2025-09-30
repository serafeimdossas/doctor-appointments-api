const express = require("express");
const router = express.Router();
const moment = require("moment");
const { Slot, Doctor } = require("../db/db");

router.get("/", async (_req, res) => {
  try {
    // get available slots
    const slots = await Slot.findAll({
      attributes: ["start_time", "end_time", "status"],
      where: {
        status: "available",
      },
      include: {
        model: Doctor,
        as: "doctor",
        attributes: ["first_name", "last_name", "specialty"],
      },
      order: [["start_time", "ASC"]],
    });

    // transform times in human readable format
    const formattedSlots = slots.map((slot) => ({
      ...slot.get({ plain: true }),
      start_time: moment(slot.start_time).format("DD-MM-YYYY HH:mm"),
      end_time: moment(slot.end_time).format("DD-MM-YYYY HH:mm"),
    }));

    // return available slots
    return res.status(200).send(formattedSlots);
  } catch (error) {
    console.error("Failed to fetch available slots:", error);
    return res.status(500).json({ message: "Failed to fetch available slots" });
  }
});

router.post("/", async (req, res) => {
  try {
    // get data from request
    const { doctor_id, start_time, end_time } = req.body;

    // get doctor object for given doctor id
    const doctor = await Doctor.findOne({
      where: {
        id: doctor_id,
      },
    });

    // if doctor not found return error response
    if (!doctor) {
      return res.status(404).send({ message: "Doctor not found" });
    }

    // if start time is not before end time return error response
    if (!moment(start_time).isBefore(end_time)) {
      return res
        .status(404)
        .send({ message: "Start time must be before end time" });
    }

    // create slot object
    await Slot.create({
      doctor_id,
      start_time,
      end_time,
    });

    // Sucess response
    return res.status(200).send({
      message: "Available slot successfully saved",
    });
  } catch (error) {
    console.error("Failed to create slot:", error);
    return res.status(500).json({ message: "Failed to create slot" });
  }
});

module.exports = router;
