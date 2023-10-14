const {v4: uuidv4} = require("uuid");
const {validationResult} = require("express-validator");
const mongoose = require("mongoose");

const HttpError = require("../models/http-error");
const TestResult = require("../models/TestResult");

//create notification
const createTestResult = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const {userId, date, result, note} = req.body;

  const createTestResult = new TestResult({
    userId,
    date,
    result,
    note,
  });

  try {
    await createTestResult.save();
  } catch (err) {
    const error = new HttpError(
      "Creating vision test record failed, please try again.",
      500
    );
    console.log(err);
    return next(error);
  }

  res.status(201).json({TestResult: createTestResult});
};

//get All vision results
const getAllVResults = async (req, res, next) => {
  let results;
  try {
    results = await TestResult.find({});
  } catch (err) {
    const error = new HttpError(
      "Fetching users failed, please try again later.",
      500
    );
    return next(error);
  }
  res.json({
    results: results.map((user) => user.toObject({getters: true})),
  });
};

//delete result
const deleteVResults = async (req, res, next) => {
  const resultId = req.params.resultid;

  let result;
  try {
    result = await TestResult.findById(resultId);
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete Vresult.",
      500
    );
    return next(error);
  }

  if (!result) {
    const error = new HttpError("Could not find Vreuslt for this id", 404);
    return next(error);
  }

  try {
    await result.deleteOne();
  } catch (err) {
    const error = new HttpError(
      "something went wrong, could not delete Vresult.",
      500
    );
    return next(error);
  }

  res.status(200).json({message: "Deleted vReuslt."});
};

exports.createTestResult = createTestResult;
exports.getAllVResults = getAllVResults;
exports.deleteVResults = deleteVResults;
