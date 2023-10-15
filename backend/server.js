const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

connectDB();

const usersRoutes = require("./user/routers/users-routers");

const HttpError = require("./user/models/http-error");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

//give access to localhost 3000 to 5000 (to different domain)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//common
app.use("/api/users", usersRoutes);

// revervation fun
// Reservation fun
const DocRouter = require("./functions/reservationFun/routers/docRoutes");
app.use("/doc", DocRouter);

const AppRouter = require("./functions/reservationFun/routers/appointment");
app.use("/app", AppRouter);

const PRoute = require("./functions/reservationFun/routers/p");
app.use("/payment", PRoute);

//prescription fun

//vTest fun
app.use("/api/vTest", require("./functions/vTestFun/routers/TestResultRoutes"));

// -------------- prescription fun ----------------
//Crud Route
const prescriptionRouter = require("./functions/prescriptionFun/routers/PrescriptionFormRouter");
app.use("/prescriptionFun", prescriptionRouter);

//OCR Route
const ocrRouter = require("./functions/prescriptionFun/controllers/UploadController");
app.use("/api/ocr", ocrRouter);

//eBlink fun

//common
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({message: error.message || "An unknown error occurred!"});
});

app.listen(5000, () => console.log(`Server started on port ${port}`));
