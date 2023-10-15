import axios from "axios";
import React, { useState, useEffect } from "react";
import "../css/Upload.css";
import { ToastContainer, toast } from "react-toastify";

const Upload = ({ onDataExtracted }) => {
  const [imagePath, setImagePath] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [uploadClicked, setUploadClicked] = useState(false); // State to track Upload button click
  const [fileSelected, setFileSelected] = useState(false);
  const [chooseFileClicked, setchooseFileClicked] = useState(false); // State to track Upload button click

  useEffect(() => {
    // Enable the "Upload" button if both conditions are met
    if (imagePath && imageURL) {
      setchooseFileClicked(true);
    } else {
      setchooseFileClicked(false);
    }
  }, [imagePath, imageURL]);

  const handleChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setImagePath(selectedFile);
      console.log("Image Changed " + selectedFile.name);

      setImageURL(URL.createObjectURL(selectedFile));
      setFileSelected(true);
      console.log(imageURL);
    }
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", imagePath);
    console.log("Upload and Extract button clicked");

    axios
      .post("http://localhost:5000/api/ocr/extract", formData)
      .then(function (res) {
        console.log("Image uploaded successfully: " + res.message);
      })
      .catch(function (error) {
        console.log("Error uploading image: " + error.message);
      });

    toast.success("Wait while extracting data...", {
      position: "top-center",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    // setTimeout to set the state after the toast message has finished
    setTimeout(() => {
      setUploadClicked(true);
    }, 7000); // Adjust the delay to match the toast message duration
  };

  const handleDataExtraction = (extractedData) => {
    // Call the onDataExtracted function to pass the extracted data to the parent component (Prescription.js)
    onDataExtracted(extractedData);
    console.log("handleDataExtraction method called with extractedData : ");
    for (const key in extractedData) {
      if (Object.hasOwnProperty.call(extractedData, key)) {
        console.log(`${key}: ${extractedData[key]}`);
      }
    }
  };

  const handleFormFill = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/ocr/getExtractedData"
      );

      if (response.ok) {
        const data = await response.json();
        // console.log("Extracted data from backend:", data);
        // console.log(typeof data);
        handleDataExtraction(data);
      } else {
        console.error(
          "Error retrieving data from the server:",
          response.statusText
        );
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
    }
  };

  return (
    <div>
      <form id="upload-form" encType="multipart/form-data">
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />
        <br />
        <br />

        <div className="contentDiv">
          <div className="imageDisplay">
            <img
              src={imageURL}
              style={{ width: "300px" }}
              alt="Click above choose file button to upload your prescription"
            />
          </div>

          {/* dividers */}
          <div className="divider" id="divider1">
            |
          </div>
          <div className="dividerInfo">
            <h2>Upload</h2>
            <h1>OR</h1>
            <h2>Fill Form Manually</h2>
            <br />
            <br />

            <p>To Upload Prescription first click </p>
            <p><b>"Choose File"</b></p>
            <p>button</p>
          </div>
          <div className="divider" id="divider2">
            |
          </div>
          <ToastContainer />
        </div>
        <br />

        {/* Buttons */}
        <div className="buttonDiv">
          <button
            type="button"
            className={`btnUpload ${
              !fileSelected || !chooseFileClicked ? "disabled-button" : ""
            }`}
            onClick={handleUpload}
            disabled={!fileSelected || !chooseFileClicked}
          >
            Upload
          </button>

          <button
            type="button"
            className={`btnFill ${!uploadClicked ? "disabled-button" : ""}`}
            onClick={handleFormFill}
            disabled={!uploadClicked}
          >
            Fill Form
          </button>
        </div>
      </form>
    </div>
  );
};

export default Upload;
