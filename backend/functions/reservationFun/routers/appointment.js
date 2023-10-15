const express = require("express");
const router = express.Router();
const Appointment = require("../models/appointment");

// Create a new appointment
router.post("/addA", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    const savedAppointment = await appointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    console.error("Error creating appointment:", error); // Log the error
    res
      .status(500)
      .json({error: "An error occurred while creating the appointment."});
  }
});

// Fetch all appointments
router.get("/getA", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while fetching appointments."});
  }
});

// Fetch a specific appointment by ID
router.get("/getA/:appointmentId", async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.appointmentId);
    if (!appointment) {
      return res.status(404).json({error: "Appointment not found"});
    }
    res.json(appointment);
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while fetching the appointment."});
  }
});

// Update a specific appointment by ID
router.patch("/update/:appointmentId", async (req, res) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.appointmentId,
      req.body,
      {new: true} // Return the updated appointment
    );

    if (!updatedAppointment) {
      return res.status(404).json({error: "Appointment not found"});
    }

    res.json(updatedAppointment);
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while updating the appointment."});
  }
});

// Delete a specific appointment by ID
router.delete("/delete/:appointmentId", async (req, res) => {
  try {
    const deletedAppointment = await Appointment.findByIdAndRemove(
      req.params.appointmentId
    );

    if (!deletedAppointment) {
      return res.status(404).json({error: "Appointment not found"});
    }

    res.json(deletedAppointment);
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while deleting the appointment."});
  }
});

module.exports = router;
