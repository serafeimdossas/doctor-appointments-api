const express = require("express");
const router = express.Router();
const moment = require("moment");
const { SLOT_STATUS } = require("../utils/config");
const { Slot, Patient, Appointment, Doctor, sequelize } = require("../db/db");

router.get("/", async (req, res) => {
  try {
    const { doctor_id } = req.query;

    // find all appointments for given doctor_id
    // if not provided return all appointments
    const appointments = await Appointment.findAll({
      include: [
        {
          model: Patient,
          as: "patient",
          attributes: ["first_name", "last_name", "email"],
        },
        {
          model: Slot,
          as: "slot",
          attributes: ["start_time", "end_time"],
          required: true,
          include: {
            model: Doctor,
            as: "doctor",
            attributes: ["first_name", "last_name", "specialty"],
            where: doctor_id ? { id: doctor_id } : undefined,
            required: true,
          },
        },
      ],
    });

    // format appointments object
    const formattedAppointments = appointments
      .map((appointment) => appointment.toJSON())
      .map(({ patient, slot }) => ({
        patient,
        slot: {
          ...slot,
          start_time: moment(slot.start_time).format("DD-MM-YYYY HH:mm"),
          end_time: moment(slot.end_time).format("DD-MM-YYYY HH:mm"),
        },
      }));

    // return formatted found appointments
    return res.status(200).send(formattedAppointments);
  } catch (error) {
    console.error("Failed to fetch appointments:", error);
    return res.status(500).json({ message: "Failed to fetch appointments" });
  }
});

router.post("/", async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { patient_id, slot_id } = req.body;

    // get patient object for given patient id
    const patient = await Patient.findOne({
      where: {
        id: patient_id,
      },
      transaction: t,
    });

    // if patient not found return error response
    if (!patient) {
      await t.rollback();
      return res.status(404).send({ message: "Patient not found" });
    }

    // get slot object for given slot id
    const slot = await Slot.findOne({
      attributes: ["status"],
      where: {
        id: slot_id,
      },
      transaction: t,
    });

    // if slot not found return error response
    if (!slot) {
      await t.rollback();
      return res.status(404).send({ message: "Slot not found" });
    } else if (slot.status !== SLOT_STATUS.AVAILABLE) {
      await t.rollback();
      return res.status(404).send({ message: "Slot not available" });
    }

    // valid given data, book appointment
    await Appointment.create(
      {
        patient_id,
        slot_id,
      },
      { transaction: t }
    );

    // adjust status in slot table
    await Slot.update(
      {
        status: SLOT_STATUS.BOOKED,
      },
      {
        where: {
          id: slot_id,
        },
        transaction: t,
      }
    );

    // commit transaction
    await t.commit();

    // success response
    return res.status(200).send({ message: "Successfully booked appointment" });
  } catch (error) {
    // something went wrong, rollback trnsction
    await t.rollback();
    console.error("Failed to book appointment:", error);
    return res.status(500).json({ message: "Failed to book appointment" });
  }
});

module.exports = router;
