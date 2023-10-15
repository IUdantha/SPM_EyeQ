// PrescriptionModal.js
import React, { useState } from "react";
import Modal from "react-modal";
import moment from "moment"; // Import the moment library for date formatting
import "../css/ViewPrescription.css";
import EditPrescription from "./EditPrescription";
import axios from "axios";
import { toast } from "react-toastify";
import { Document, Page, pdfjs } from "react-pdf";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

Modal.setAppElement("#root"); // Set root element for accessibility
const ViewPrescription = ({ isOpen, closeModal, prescriptionData }) => {
  const [EditModal, setEditModal] = useState(false);
  const id = prescriptionData._id;
  const [show, setshow] = useState(false);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(null);

  // Handle download pdf
  const handleDownloadPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Define the doctor name
    pdf.setFont("Courier");
    pdf.setFontSize(26);
    pdf.setTextColor(1, 48, 140);
    pdf.text(prescriptionData.doctorName, 15, 15);

    // Define the hospital name
    pdf.setFont("Courier");
    pdf.setFontSize(16);
    pdf.setTextColor(1, 48, 140);
    pdf.text(prescriptionData.hospitalName, 15, 24);

    // Define the content for  PDF report
    const contentLeft = `
----------------------------------------------------------------------

Full Name: ${prescriptionData.fName + " " + prescriptionData.lName}
Birthdate: ${moment(prescriptionData.birthOfDate).format("YYYY-MM-DD")}
Contact: ${prescriptionData.contact}

----------------------------------------------------------------------
`;

    // Add the text content to the PDF
    pdf.setFont("courier");
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(contentLeft, 15, 35); // Adjust the position as needed

    const contentRight = `
Prescribed Date: ${moment(prescriptionData.presDate).format("YYYY-MM-DD")}
Expired date: ${moment(prescriptionData.expDate).format("YYYY-MM-DD")}
`;

    // Add the text content to the PDF
    pdf.setFont("courier");
    pdf.setFontSize(12);
    pdf.setTextColor(0, 0, 0);
    pdf.text(contentRight, 125, 44.5); // Adjust the position as needed

    pdf.setTextColor(0, 0, 0); // Set text color to blue (RGB)
    pdf.text("Prescription Details : ", 15, 90);

    // Generate a sample table data
    const tableData = [
      ["Spehere", prescriptionData.leftSpehere, prescriptionData.rightSpehere],
      [
        "Cylinder",
        prescriptionData.leftCylinder,
        prescriptionData.rightCylinder,
      ],
      ["Axis", prescriptionData.leftAxis, prescriptionData.rightAxis],
      ["Add", prescriptionData.leftAdd, prescriptionData.rightAdd],
      ["Prism", prescriptionData.leftPrism, prescriptionData.rightPrism],
    ];

    // Define table options
    const tableOptions = {
      startY: 100,
      head: [["", "Left Eye", "Right Eye"]],
      columnStyles: {
        0: {
          halign: "center",
          fillColor: (255, 255, 255),
          cellWidth: 60,
          lineWidth: 0.5,
          lineColor: (1, 48, 140),
        },
        1: {
          halign: "center",
          fillColor: (255, 255, 255),
          cellWidth: 60,
          lineWidth: 0.5,
          lineColor: (1, 48, 140),
        },
        2: {
          halign: "center",
          fillColor: (255, 255, 255),
          cellWidth: 60,
          lineWidth: 0.5,
          lineColor: (1, 48, 140),
        },
      },
    };

    console.log("Before autoTable");
    // Add the table to the PDF using autoTable
    autoTable(pdf, {
      ...tableOptions,
      body: tableData,
    });
    console.log("After autoTable");

    // Define  additional information space
    pdf.setTextColor(0, 0, 0); // Set text color to black
    pdf.text("Additional Information : ", 15, 160);
    pdf.text(prescriptionData.additionalInfo, 30, 175);

    // Save the PDF with a specific filename
    const reportName =
      "Report of " +
      prescriptionData.fName +
      " " +
      prescriptionData.lName +
      " - Prescribed by " +
      prescriptionData.doctorName +
      " on " +
      moment(prescriptionData.presDate).format("YYYY-MM-DD");

    pdf.save(`${reportName}.pdf`);
  };

  // handle close
  const handleClose = () => {
    setshow(false);
  };
  // Handele Delete function
  function handleDelete(id) {
    setshow(true);

    const confirm = window.confirm("Do you want to delete ");

    if (confirm) {
      axios
        .delete("http://localhost:5000/prescriptionFun/delete/" + id)
        .then((res) => {
          toast.success("Prescription has deleted sucessfully", {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          
          setTimeout(() => {
            toast.dismiss(); // Close the toast after a specified time (e.g., 5000 milliseconds)
          }, 5000); // Close the toast after 5 seconds
          
          alert("Prescription has deleted sucessfully");

          // Reload the page to display updated cards
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error with Deletion" + err, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    }
  }

  return (
    <Modal
      id="modal-content"
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Prescription Details"
    >
      <div className="mainHeader"></div>
      <div className="detailContainer">
        <div className="left">
          <div className="conHeader">
            <h1>Prescriped By : {prescriptionData.doctorName}</h1>
            <h1>
              Prescribed To :{" "}
              {prescriptionData.fName + " " + prescriptionData.lName}
            </h1>

            <div className="colDivs">
              <div className="colDiv-Item">
                <h4 className="text-yellow-400 ">Prescribed on </h4>
                <input
                  disabled
                  value={moment(prescriptionData.presDate).format("YYYY-MM-DD")}
                ></input>
              </div>

              <div className="colDiv-Item">
                <h4 className="text-red-400 ">Expire on</h4>
                <input
                  disabled
                  value={moment(prescriptionData.expDate).format("YYYY-MM-DD")}
                ></input>
              </div>
            </div>
          </div>
          <div className="conUp">
            <h2 className="conHeaders">Patient Details</h2>

            <div className="rowDivs">
              <div className="rowDiv-Item">
                <h2>First Name : </h2>
                <input disabled value={prescriptionData.fName}></input>
              </div>

              <div className="rowDiv-Item">
                <h2>Last Name :</h2>
                <input disabled value={prescriptionData.lName}></input>
              </div>

              <div className="rowDiv-Item">
                <h2>Contact Number : </h2>
                <input disabled value={prescriptionData.contact}></input>
              </div>

              <div className="rowDiv-Item">
                <h2>Date of Birth :</h2>
                <input
                  disabled
                  value={moment(prescriptionData.birthOfDate).format(
                    "YYYY-MM-DD"
                  )}
                ></input>
              </div>
            </div>
          </div>

          <div className="conDown">
            <h2 className="conHeaders">Doctor Details</h2>

            <div className="rowDivs">
              <div className="rowDiv-Item">
                <h2>Doctor Name : </h2>
                <input disabled value={prescriptionData.doctorName}></input>
              </div>

              <div className="rowDiv-Item">
                <h2>Hospital Name :</h2>
                <input disabled value={prescriptionData.hospitalName}></input>
              </div>
            </div>
          </div>
        </div>

        <div className="right">
          <h2 className="conHeaders" style={{ paddingRight: 0 }}>
            Prescription Details
          </h2>

          <div className="conMiddleRow" id="table-content">
            {/* ----- Table ------ */}
            <div className="prescriptionTable">
              {/* Topic */}
              <div className="flex flex-row text-sm font-semibold text-center title">
                <div
                  className="flex-1 leftEye"
                  style={{
                    width: "50%",
                    marginLeft: "110px",
                  }}
                >
                  <h4>Left Eye</h4>
                </div>

                <div
                  className="flex-1 RightEye"
                  style={{
                    width: "50%",
                    paddingRight: "42px",
                  }}
                >
                  <h4>Right Eye</h4>
                </div>
              </div>
              {/* Spehere */}
              <div className="flex flex-row my-3 text-center">
                <div className="flex-3 Spehere">
                  <h5 className="text-base ">Spehere</h5>
                </div>

                <div
                  className=" Spehere-left"
                  style={{
                    display: "flex",
                    flex: 2,
                    marginLeft: "70px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.leftSpehere}
                    type="number"
                    // onChange={(e) => {
                    //   setLeftSpehere(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <div
                  className="flex-1 Spehere-right"
                  style={{
                    display: "flex",
                    flex: 2,
                    paddingRight: "40px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.rightSpehere}
                    type="number"
                    // onChange={(e) => {
                    //   setRightSpehere(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
              {/* Cylinder */}
              <div className="flex flex-row my-3 text-center">
                <div className="flex-3 Cylinder">
                  <h5 className="text-base ">Cylinder</h5>
                </div>

                <div
                  className=" Cylinder-left"
                  style={{
                    display: "flex",
                    flex: 2,
                    marginLeft: "70px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.leftCylinder}
                    type="number"
                    // onChange={(e) => {
                    //   setLeftCylinder(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <div
                  className="flex-1 Cylinder-right"
                  style={{
                    display: "flex",
                    flex: 2,
                    paddingRight: "40px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.rightCylinder}
                    type="number"
                    // onChange={(e) => {
                    //   setRightCylinder(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
              {/* Axis */}
              <div className="flex flex-row my-3 text-center">
                <div className="flex-3 Axis">
                  <h5 className="text-base ">Axis</h5>
                </div>

                <div
                  className=" Axis-left"
                  style={{
                    display: "flex",
                    flex: 2,
                    marginLeft: "100px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.leftAxis}
                    type="number"
                    // onChange={(e) => {
                    //   setLeftAxis(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <div
                  className="flex-1 Axis-right"
                  style={{
                    display: "flex",
                    flex: 2,
                    paddingRight: "40px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.rightAxis}
                    type="number"
                    // onChange={(e) => {
                    //   setRightAxis(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
              {/* Add */}
              <div className="flex flex-row my-3 text-center">
                <div className="flex-3 Add">
                  <h5 className="text-base ">Add</h5>
                </div>

                <div
                  className=" Add-left"
                  style={{
                    display: "flex",
                    flex: 2,
                    marginLeft: "100px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.leftAdd}
                    type="number"
                    // onChange={(e) => {
                    //   setLeftAdd(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <div
                  className="flex-1 Add-right"
                  style={{
                    display: "flex",
                    flex: 2,
                    paddingRight: "40px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.rightAdd}
                    type="number"
                    // onChange={(e) => {
                    //   setRightAdd(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
              {/* Prism */}
              <div className="flex flex-row my-3 text-center">
                <div className="flex-3 Prism">
                  <h5 className="text-base ">Prism</h5>
                </div>

                <div
                  className=" Prism-left"
                  style={{
                    display: "flex",
                    flex: 2,
                    marginLeft: "85px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.leftPrism}
                    type="text"
                    // onChange={(e) => {
                    //   setLeftPrism(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>

                <div
                  className="flex-1 Prism-right"
                  style={{
                    display: "flex",
                    flex: 2,
                    paddingRight: "40px",
                  }}
                >
                  <input
                    disabled
                    value={prescriptionData.rightPrism}
                    type="text"
                    // onChange={(e) => {
                    //   setRightPrism(e.target.value);
                    // }}
                    className="w-9/12 text-sm text-center "
                    style={{
                      border: "2px solid gray",
                      borderRadius: "5px",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* PD BVD row */}
            <div className="flex flex-row gap-2">
              <label className="relative flex-1">
                PD :
                <input
                  disabled
                  value={prescriptionData.pd}
                  type="text"
                  style={{
                    border: "1px solid gray",
                    padding: "0 5px",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                />
              </label>

              <label className="relative flex-1">
                BVD :
                <input
                  disabled
                  value={prescriptionData.bvd}
                  type="text"
                  style={{
                    border: "1px solid gray",
                    padding: "0 5px",
                    marginTop: "8px",
                    borderRadius: "5px",
                  }}
                />
              </label>
            </div>
          </div>

          {/* Additional Information */}
          <div className="additionalInfo">
            <h4 className="my-2 text-sm font-semibold">
              Additional Information
            </h4>
            <textarea
              disabled
              value={prescriptionData.additionalInfo}
              style={{
                width: "100%",
                backgroundColor: "#f2f5f5",
                padding: "5px 10px",
                border: "0.5px solid gray",
                borderRadius: "5px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <div className="leftBtn">
          <button id="btnBack" onClick={closeModal}>
            Back
          </button>
        </div>
        <div className="rightBtn">
          <button id="btnExport" onClick={handleDownloadPDF}>
            Export
          </button>
          <button
            id="btnEdit"
            onClick={() => {
              setEditModal(true);
            }}
          >
            Edit
          </button>
          <button id="btnDelete" onClick={(e) => handleDelete(id)}>
            Delete
          </button>
        </div>
      </div>

      <EditPrescription
        isVisible={EditModal}
        onClose={() => {
          setEditModal(false);
        }}
        editableId={id}
      ></EditPrescription>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Prescription Delete Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <button varient="secondary" onClick={handleClose}>
            Delete
          </button>
          <button varient="primary" onClick={handleClose}>
            Cancel
          </button>
        </Modal.Footer>
      </Modal> */}
    </Modal>
  );
};

export default ViewPrescription;
