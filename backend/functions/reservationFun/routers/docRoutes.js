const express = require("express");
const router = express.Router();
const Doc = require("../models/doc"); // Assuming your model is in a separate file

// Create a new doc
router.post("/add", async (req, res) => {
  try {
    const newDoc = new Doc(req.body);
    const savedDoc = await newDoc.save();
    res.status(201).json(savedDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all docs
router.get("/get", async (req, res) => {
  try {
    const docs = await Doc.find();
    res.status(200).json(docs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single doc by ID
router.get("/:id", getDoc, (req, res) => {
  res.status(200).json(res.doc);
});

// Update a doc by ID
router.patch("/:id", getDoc, async (req, res) => {
  if (req.body.name != null) {
    res.doc.name = req.body.name;
  }
  if (req.body.hospital != null) {
    res.doc.hospital = req.body.hospital;
  }
  if (req.body.email != null) {
    res.doc.email = req.body.email;
  }
  if (req.body.phoneNumber != null) {
    res.doc.phoneNumber = req.body.phoneNumber;
  }
  if (req.body.specialization != null) {
    res.doc.specialization = req.body.specialization;
  }
  try {
    const updatedDoc = await res.doc.save();
    res.status(200).json(updatedDoc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a doc by ID
router.delete("/del/:id", getDoc, async (req, res) => {
  try {
    await Doc.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a doc by ID
async function getDoc(req, res, next) {
  try {
    const doc = await Doc.findById(req.params.id);
    if (doc == null) {
      return res.status(404).json({ message: "Doc not found" });
    }
    res.doc = doc;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
