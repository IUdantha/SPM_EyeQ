const router = require("express").Router();
let Prescription = require("../models/PrescriptionFormModel");

//http://localhost:5000/prescriptionFun/add
router.route("/add").post((req, res) => {
  const {
    fName,
    lName,
    contact,
    birthOfDate,
    doctorName,
    hospitalName,
    presDate,
    expDate,
    leftSpehere,
    rightSpehere,
    leftCylinder,
    rightCylinder,
    leftAxis,
    rightAxis,
    leftAdd,
    rightAdd,
    leftPrism,
    rightPrism,
    pd,
    bvd,
    additionalInfo,
  } = req.body;

  const newPrescription = new Prescription({
    fName,
    lName,
    contact,
    birthOfDate,
    doctorName,
    hospitalName,
    presDate,
    expDate,
    leftSpehere,
    rightSpehere,
    leftCylinder,
    rightCylinder,
    leftAxis,
    rightAxis,
    leftAdd,
    rightAdd,
    leftPrism,
    rightPrism,
    pd,
    bvd,
    additionalInfo,
  });

  newPrescription
    .save()
    .then(() => {
      res.json("Prescription Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//http://localhost:5000/prescription/
router.route("/").get((req, res) => {
  Prescription.find()
    .then((prescriptions) => {
      res.json(prescriptions);
    })
    .catch((err) => {
      console.log(err);
    });
});

//http://localhost:5000/prescriptionFun/update/:id
router.route("/update/:id").patch(async (req, res) => {
  let prescriptionId = req.params.id;

  const {
    fName,
    lName,
    contact,
    birthOfDate,
    doctorName,
    hospitalName,
    presDate,
    expDate,
    leftSpehere,
    rightSpehere,
    leftCylinder,
    rightCylinder,
    leftAxis,
    rightAxis,
    leftAdd,
    rightAdd,
    leftPrism,
    rightPrism,
    pd,
    bvd,
    additionalInfo,
  } = req.body; // destructure method

  const updatePrescription = {
    fName,
    lName,
    contact,
    birthOfDate,
    doctorName,
    hospitalName,
    presDate,
    expDate,
    leftSpehere,
    rightSpehere,
    leftCylinder,
    rightCylinder,
    leftAxis,
    rightAxis,
    leftAdd,
    rightAdd,
    leftPrism,
    rightPrism,
    pd,
    bvd,
    additionalInfo,
  };

  const update = await Prescription.findByIdAndUpdate(
    prescriptionId,
    updatePrescription
  )
    .then(() => {
      res.status(200).send({ status: "Prescription Updated" });
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({ status: "Error with updating data", error: err.message() });
    });
});

//http://localhost:5000/prescriptionFun/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
  let prescriptionId = req.params.id;

  await Prescription.findByIdAndDelete(prescriptionId)
    .then(() => {
      res.status(200).send({ status: "Prescription deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with delete prescription", error: err.message });
      //500 internal server error
    });
});

// --------- Get data of a particular prescription----------
router.route("/get/:id").get(async (req, res) => {
  let prescriptionId = req.params.id;

  const prescription = await Prescription.findById(prescriptionId)
    .then((prescription) => {
      res.status(200).send({
        status: "prescription successfuly fetched",
        prescription: prescription,
      });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error with get prescription", error: err.message });
    });
});

module.exports = router;
