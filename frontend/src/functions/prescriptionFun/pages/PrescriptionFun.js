import React, { Fragment, useEffect, useState } from "react";
import AddPrescription from "../components/AddPrescription";
import axios from "axios";
import "../css/Prescription.css";
import Card from "../components/Card";
import back2 from "../images/Add a New Prescription.png";
import ViewPrescription from "../components/ViewPrescription";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Upload from "../components/Upload";
import searchIcon from "../images/search_icon.png";

const PrescriptionFun = () => {
  const [cardData, setCardData] = useState([]);
  const [extractedData, setExtractedData] = useState({});
  const [searchValue, setSearchValue] = useState(""); // Step 1: Search input value state
  // ---------------- for Add Model ---------------------
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    contact: "",
    birthOfDate: "",
    doctorName: "",
    hospitalName: "",
    presDate: "",
    expDate: "",
    leftSpehere: "",
    rightSpehere: "",
    leftCylinder: "",
    rightCylinder: "",
    leftAxis: "",
    rightAxis: "",
    leftAdd: "",
    rightAdd: "",
    leftPrism: "",
    rightPrism: "",
    pd: "",
    bvd: "",
    additionalInfo: "",
  });

  //fill form with ocr data
  const fillFormWithData = (data) => {
    // Get an array of keys
    const keys = Object.keys(data);

    console.log(data[keys[0]]);

    setFormData((prevData) => ({
      ...prevData,
      fName: data[keys[0]],
      lName: data[keys[1]],
      contact: data[keys[2]],
      birthOfDate: data[keys[3]],
      doctorName: data[keys[4]],
      hospitalName: data[keys[5]],
      presDate: data[keys[6]],
      expDate: data[keys[7]],
      leftSpehere: data[keys[8]],
      rightSpehere: data[keys[9]],
      leftCylinder: data[keys[10]],
      rightCylinder: data[keys[11]],
      leftAxis: data[keys[12]],
      rightAxis: data[keys[13]],
      leftAdd: data[keys[14]],
      rightAdd: data[keys[15]],
      leftPrism: data[keys[16]],
      rightPrism: data[keys[17]],
      pd: data[keys[18]],
      bvd: data[keys[19]],
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:5000/prescriptionFun");
      setCardData(res.data);
    };
    fetchData();
    console.log(cardData);
  }, []);

  // Parse the ISO date string and create a Date object
  const parsedPresDate = new Date(cardData.presDate);
  const parsedExpDate = new Date(cardData.expDate);

  // Format the dates as needed (e.g., "MM/DD/YYYY" or "September 20, 2023")
  const formattedPresDate = parsedPresDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedExpDate = parsedExpDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ----------------- for View Modal ------------------
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  const handleViewMore = (prescriptionData) => {
    setSelectedPrescription(prescriptionData);
    setViewModal(true);
  };

  function sendData(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/prescriptionFun/add", formData)
      .then(() => {
        alert("Prescription Added");

        // Reload the page to display updated cards
        window.location.reload();
      })
      .catch((err) => {
        alert(err);
      });
  }

  // handle data extraction with ocr
  const handleDataExtraction = (extractedData) => {
    fillFormWithData(extractedData);
    console.log("Called fillFormWithData inner function ");

    // for (const key in extractedData) {
    //   if (Object.hasOwnProperty.call(extractedData, key)) {
    //     console.log(`${key}: ${extractedData[key]}`);
    //   }
    // }
  };

  // ------------------------ handle Search bar functions -------------------------------------
  // Function to handle changes in the search input value
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  // Filter cardData based on the search input value
  const filteredCardData = cardData.filter((item) => {
    const fullName = item.fName + " " + item.lName;
    const lowerCaseSearch = searchValue.toLowerCase();

    // Check if the search input matches either the hospital name or doctor name
    return (
      fullName.toLowerCase().includes(lowerCaseSearch) ||
      item.hospitalName.toLowerCase().includes(lowerCaseSearch) ||
      item.doctorName.toLowerCase().includes(lowerCaseSearch)
    );
  });
  // ------------------------------------------------------------------------------------------
  return (
    <Fragment>
      <div className="prescription-header">
        <h1 className="heading">Your Prescriptions</h1>
      </div>

      {/* ---------------------------------- Search Bar -------------------------------------------------------- */}
      <input
        type="text"
        id="search-bar"
        placeholder="Search any prescription by hospital name, doctor name or patient name ......"
        value={searchValue}
        onChange={handleSearchChange} // Step 3: Handle changes in the search input
      />
      <img src={searchIcon} id="searchIcon"></img>

      <Link to={"/Pres/add"}>
        <button id="newBtnAddPres" className="btn-Add ">
          Add New Prescription
        </button>
      </Link>

      <br />

      <div
        className="cardMain"
        style={{
          display: "grid",
          justifyContent: "center",
          placeItems: "center",
          gridGap: "90px",
          gridRowGap: "15px",
          gridTemplateColumns: "repeat(3, 300px)",
        }}
      >
        {/* {cardData &&
          cardData.map((cardData) => (
            <Card
              key={cardData.id}
              preTo={cardData.fName + " " + cardData.lName}
              doctorName={cardData.doctorName}
              hospitalName={cardData.hospitalName}
              presDate={cardData.presDate}
              expDate={cardData.expDate}
              onCardClick={() => handleViewMore(cardData)}
            />
          ))}
           */}
        {/* ------------------------------- Render cards -------------------------------- */}
        {filteredCardData.map((cardData) => (
          <Card
            key={cardData.id}
            preTo={cardData.fName + " " + cardData.lName}
            doctorName={cardData.doctorName}
            hospitalName={cardData.hospitalName}
            presDate={cardData.presDate}
            expDate={cardData.expDate}
            onCardClick={() => handleViewMore(cardData)}
          />
        ))}
      </div>

      <br />
      <br />

      {/* ---------------------------- View prescription model render -------------------------- */}
      {viewModal && (
        <ViewPrescription
          isOpen={viewModal}
          closeModal={() => setViewModal(false)}
          prescriptionData={selectedPrescription}
        />
      )}

      {/* ---------------------------- Add prescription model render -------------------------- */}
      <AddPrescription
        isVisible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <div>
          <img src={back2} style={{ height: "200px", width: "600px" }}></img>
        </div>

        <div
          className="h-[45vh] overflow-y-auto my-1"
          style={{ maxHeight: "100vh", overflowY: "auto" }}
        >
          <form className="flex flex-col px-6 py-4 lg:px-8 justify-items-center">
            <Upload onDataExtracted={handleDataExtraction} />
            {/* Render the Upload component */}
            <div className="patient-info">
              {/* <i className="text-black fa-solid fa-bars"></i> */}
              <h2
                style={{
                  borderBottom: "2px solid #898b8f",
                  width: "180px",
                  paddingBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Patient Details
              </h2>
              {/* 1st row */}
              <div className="flex flex-row my-3">
                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    First Name :
                  </span>
                  <input
                    value={formData.fName}
                    type="text"
                    id="input1"
                    onChange={(e) => {
                      setFormData({ ...formData, fName: e.target.value });
                    }}
                    //placeholder="First Name"
                    className="w-11/12 h-8 px-4 my-0.5 mx-2 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>

                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    Last Name :
                  </span>
                  <input
                    type="text"
                    value={formData.lName}
                    id="input2"
                    onChange={(e) => {
                      setFormData({ ...formData, lName: e.target.value });
                    }}
                    //placeholder="Last Name"
                    className="w-11/12 h-8 px-4 my-0.5 mx-2 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>
              </div>

              {/* 2nd row */}
              <div className="flex flex-row my-3">
                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    Contact Number :
                  </span>
                  <input
                    type="text"
                    value={formData.contact}
                    id="input3"
                    onChange={(e) => {
                      setFormData({ ...formData, contact: e.target.value });
                    }}
                    className="w-11/12 h-8 px-4 mx-2 my-0.5 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>

                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    Date of Birth :
                  </span>
                  <input
                    type="date"
                    value={formData.birthOfDate}
                    id="input4"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        birthOfDate: e.target.value,
                      });
                    }}
                    className="w-11/12 h-8 px-4 mx-2 my-0.5 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>
              </div>
            </div>
            {/* Doctor details */}
            <div className="doctor-info">
              <h2
                style={{
                  borderBottom: "2px solid #898b8f",
                  width: "180px",
                  paddingBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Doctor Details
              </h2>
              {/* 1st row */}
              <div className="flex flex-row my-3">
                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    Doctor Name :
                  </span>
                  <input
                    type="text"
                    value={formData.doctorName}
                    required
                    id="input5"
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        doctorName: e.target.value,
                      });
                    }}
                    className="w-11/12 h-8 px-4 mx-2 my-0.5 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>

                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    Hospital Name :
                  </span>
                  <input
                    type="text"
                    value={formData.hospitalName}
                    id="input6"
                    required
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        hospitalName: e.target.value,
                      });
                    }}
                    className="w-11/12 h-8 px-4 mx-2 my-0.5 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>
              </div>
            </div>
            {/* Prescription details */}
            <div className="prescription-info">
              <h2
                style={{
                  borderBottom: "2px solid #898b8f",
                  width: "180px",
                  paddingBottom: "5px",
                  fontWeight: "bold",
                }}
              >
                Prescription Details
              </h2>
              {/* 1st row */}
              <div className="flex flex-row my-3">
                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    Date of Prescription :
                  </span>
                  <input
                    type="date"
                    value={formData.presDate}
                    id="input7"
                    onChange={(e) => {
                      setFormData({ ...formData, presDate: e.target.value });
                    }}
                    className="w-11/12 h-8 px-4 mx-2 my-0.5 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>

                <label className="relative flex-1">
                  <span
                    className=""
                    style={{
                      marginLeft: "10px",
                      fontFamily: "Verdana",
                      fontSize: "13px",
                    }}
                  >
                    Date of Expiration :
                  </span>
                  <input
                    type="date"
                    value={formData.expDate}
                    id="input8"
                    onChange={(e) => {
                      setFormData({ ...formData, expDate: e.target.value });
                    }}
                    className="w-11/12 h-8 px-4 mx-2 my-0.5 text-sm text-black bg-gray-300 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                  />
                </label>
              </div>

              {/* Table */}
              <div
                className="flex flex-col px-4 py-3 mx-2 my-6 border-2 border-blue-400 rounded-lg"
                style={{ marginRight: "15px" }}
              >
                {/* Topic */}
                <div className="flex flex-row text-sm font-semibold text-center title">
                  <div
                    className="flex-1 leftEye"
                    style={{
                      marginLeft: "90px",
                    }}
                  >
                    <h3>Left Eye</h3>
                  </div>

                  <div
                    className="flex-1 RightEye"
                    style={{
                      paddingRight: "80px",
                    }}
                  >
                    <h3>Right Eye</h3>
                  </div>
                </div>
                {/* Spehere */}
                <div className="flex flex-row my-3 text-center">
                  <div className="flex-3 Spehere">
                    <h2 className="text-base ">Spehere</h2>
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
                      type="number"
                      value={formData.leftSpehere}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          leftSpehere: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                      type="number"
                      value={formData.rightSpehere}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          rightSpehere: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                    <h2 className="text-base ">Cylinder</h2>
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
                      type="number"
                      value={formData.leftCylinder}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          leftCylinder: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                      type="number"
                      value={formData.rightSpehere}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          rightCylinder: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                    <h2 className="text-base ">Axis</h2>
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
                      type="number"
                      value={formData.leftAxis}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          leftAxis: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                      type="number"
                      value={formData.rightAxis}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          rightAxis: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                    <h2 className="text-base ">Add</h2>
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
                      type="number"
                      value={formData.leftAdd}
                      onChange={(e) => {
                        setFormData({ ...formData, leftAdd: e.target.value });
                      }}
                      className="w-1/2 text-sm text-center"
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
                      type="number"
                      value={formData.rightAdd}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          rightAdd: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                    <h2 className="text-base ">Prism</h2>
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
                      type="text"
                      value={formData.leftPrism}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          leftPrism: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
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
                      type="text"
                      value={formData.rightPrism}
                      onChange={(e) => {
                        setFormData({
                          ...formData,
                          rightPrism: e.target.value,
                        });
                      }}
                      className="w-1/2 text-sm text-center"
                      style={{
                        border: "2px solid gray",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>
                {/* 1st row */}
                <div className="flex flex-row my-2">
                  <label className="relative flex-1">
                    PD :
                    <input
                      type="text"
                      value={formData.pd}
                      onChange={(e) => {
                        setFormData({ ...formData, pd: e.target.value });
                      }}
                      className="w-11/12 h-7 px-4 my-0.5  text-sm text-black bg-gray-200 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                    />
                  </label>

                  <label className="relative flex-1">
                    BVD :
                    <input
                      type="text"
                      value={formData.bvd}
                      onChange={(e) => {
                        setFormData({ ...formData, bvd: e.target.value });
                      }}
                      className="w-11/12 h-7 px-4 my-0.5  text-sm text-black bg-gray-200 bg-opacity-25 border-2 border-gray-400 border-opacity-50 rounded-lg "
                    />
                  </label>
                </div>

                {/* Additional Information */}
                <h3 className="my-2 text-sm font-semibold">
                  Additional Information
                </h3>
                <textarea
                  className="h-8 h-20 bg-gray-100 border-2 border-gray"
                  value={formData.additionalInfo}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      additionalInfo: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </form>
        </div>
        <div
          className="mx-8 btn-div"
          style={{ marginRight: "5px", marginLeft: "5px" }}
        >
          <button
            onClick={sendData}
            className="w-full px-3 py-2 text-sm text-white rounded-lg bg-blue-950"
          >
            Submit
          </button>
        </div>
      </AddPrescription>
      <ToastContainer />
    </Fragment>
  );
};

export default PrescriptionFun;
