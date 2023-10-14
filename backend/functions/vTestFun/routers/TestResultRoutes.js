const express = require("express");

const router = express.Router();

const TestResultController = require("../controllers/TestResultController");

//create vTestResults request
router.post("/", TestResultController.createTestResult);

//read all vResults
router.get("/", TestResultController.getAllVResults);

//delete payment request
router.delete("/:resultid", TestResultController.deleteVResults);

module.exports = router;
