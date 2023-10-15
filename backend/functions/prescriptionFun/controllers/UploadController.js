const express = require("express");
const router = express.Router();
const multer = require("multer");
const { spawn } = require("child_process");
const fs = require("fs");

// const {low} = require("lowdb");
// const FileSync = require("lowdb/adapters/FileSync");
// const adapter = new FileSync(`${__dirname}/db.json`);
// const db = low(adapter);

// Initialize an empty object to store extracted data
let extractedData = {};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${__dirname}/../controllers/UserForms`);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

//Import the function to handle data extraction
// const handleDataExtraction = () => {
//   require("../../frontend/src/functions/prescriptionFun/pages/Prescription.js");
// };

//------------------------------------------- Extract endpoint -----------------------------------------------------
router.post("/extract", upload.single("image"), async (req, res) => {
  try {
    console.log("Upload controller run success");

    const { filename } = req.file;
    console.log("Filename : " + filename);

    // Construct the command to run the Python script with the uploaded file as an argument
    const pythonProcess = spawn(
      `${__dirname}/../../../../.myenv/Scripts/python`,
      [`${__dirname}/../controllers/main.py`],
      {
        cwd: `${__dirname}/../controllers`, // Set the working directory to where main.py is located
      }
    );

    pythonProcess.stdout.on("data", (data) => {
      // Capture the script's output (if needed)
      const scriptOutput = data.toString().trim();
      console.log(`Python script output: ${scriptOutput}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      // Handle any errors from the script
      console.error(`Python script error: ${data.toString()}`);
    });

    pythonProcess.on("close", async (code) => {
      console.log(`Python script exited with code ${code}`);

      if (code === 0) {
        // Successfully processed
        res.status(200).json({ message: "Image processed successfully" });
      } else {
        // Failed to process
        res.status(500).json({ message: "Internal Server Error" });
      }
    });
  } catch (error) {
    console.error(`Error processing file upload: ${error}`);
    res.status(500).send("Internal Server Error");
  }
});

// ------------------------------------------- Receive records endpoint ----------------------------------------------------
router.post("/records", async (req, res) => {
  try {
    const receivedData = req.body;

    // Store the received data
    extractedData = receivedData;
    console.log("---- set received data as extracted data ----");
    // console.log(extractedData);

    //Write the received data to a JSON file
    fs.writeFileSync(
      `${__dirname}/../controllers/Records.json`,
      JSON.stringify(receivedData)
    );
    console.log("Write received data in records.json file");

    handleDataExtraction(receivedData);
    console.log("Received data:", receivedData);

    // db.set("extractedData", receivedData).write();
    // console.log("received data write to low db as extractedData");

    // Send a response back to the Python client
    res.status(200).json({ message: "Data received and stored successfully" });
  } catch (error) {
    console.error("Error handling data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// API endpoint to retrieve the extracted data
router.get("/getExtractedData", (req, res) => {
  try {
    // Send the extracted data as the response
    console.log(extractedData);

    // const extractedData = db.get("extractedData").value();
    // console.log("Read extracedData from low DB");

    // Read the contents of the records.json file
    const recordsData = fs.readFileSync(
      `${__dirname}/../controllers/Records.json`,
      "utf8"
    );

    // Parse the JSON data from the file
    const parsedData = JSON.parse(recordsData);

    // Send the parsed data as the response
    res.status(200).json(parsedData);

    console.log(
      "Send extracted data as the response to frontend : " + recordsData
    );
  } catch (error) {
    console.error("Error getting extracted data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
