import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal"; // Import the Modal component
import "react-toastify/dist/ReactToastify.css";
import { useHistory } from "react-router-dom";
import paymentImage from "./image.png";
Modal.setAppElement("#root");
export const Aform = () => {
  const history = useHistory();
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [currentPageFieldsFilled, setCurrentPageFieldsFilled] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false); // Add state for the modal

  const closeModal = () => {
    setModalOpen(false); // Function to close the modal
  };
  const formArray = ["1", "2", "3"];
  const [state, setState] = useState({
    date: getCurrentDate(), // Set the default date to the current date,
    time: "morning",
    hospital: "",
    patientName: "",
    contactNumber: "",
    age: "",
    address: "",
    email: "",
    paymentMethod: "cash",
  });

  const [formNo, setFormNo] = useState(1);
  const next = () => {
    // Check if the current page's fields are filled
    let areFieldsFilled = false;
    if (formNo === 1) {
      areFieldsFilled =
        state.date !== "" && state.time !== "" && state.hospital !== "";
    } else if (formNo === 2) {
      areFieldsFilled =
        state.patientName !== "" &&
        state.contactNumber !== "" &&
        state.age !== "" &&
        state.address !== "" &&
        state.email !== "";
    }

    if (areFieldsFilled) {
      setFormNo(formNo + 1);
    } else {
      // Open the modal if fields are not filled
      setModalOpen(true);
    }
  };

  const pre = () => {
    setFormNo(formNo - 1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/app/addA/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      });

      if (response.status === 201) {
        console.log("Appointment saved successfully!");
        // You can reset the form or show a success message here
        localStorage.setItem("appointmentData", JSON.stringify(state));
        console.log("Form Data:", state);
        history.push("/pp", { appointmentData: state });
      } else {
        console.error("Error saving appointment");
        // Handle the error, e.g., show an error message
      }
    } catch (error) {
      console.error("Network error:", error);
    }

    // Check if the current page's fields are valid and set the state variable
    if (formNo === 1) {
      setCurrentPageFieldsFilled(
        state.date !== "" && state.time !== "" && state.hospital !== ""
      );
    } else if (formNo === 2) {
      setCurrentPageFieldsFilled(
        state.patientName !== "" &&
          state.contactNumber !== "" &&
          state.age !== "" &&
          state.address !== "" &&
          state.email !== ""
      );
    }
  };

  //Date validation
  // Function to get the current date in YYYY-MM-DD format
  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });

    // Check if the field is "contactNumber" and the value doesn't contain exactly 10 digits
    if (name === "contactNumber" && !/^\d{10}$/.test(value)) {
      setPhoneNumberError("Phone number must be 10 digits");
    } else {
      setPhoneNumberError(""); // Clear the error message when it's valid
    }

    if (name === "age" && (!/^\d+$/.test(value) || parseInt(value, 10) <= 0)) {
      setAgeError("Age must be a positive number");
    } else {
      setAgeError(""); // Clear the error message when it's valid
    }

    if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError(""); // Clear the error message when it's valid
    }
  };

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 20; hour++) {
      for (let minutes = 0; minutes < 60; minutes += 15) {
        const time = `${hour}:${minutes === 0 ? "00" : minutes} ${
          hour < 12 ? "AM" : "PM"
        }`;
        options.push(
          <option key={time} value={time}>
            {time}
          </option>
        );
      }
    }
    return options;
  };

  function cancelAppointment() {
    // You can add any confirmation logic here if needed
    // For now, let's directly navigate to the home page
    history.push("/"); // Replace "/" with the URL of your home page
  }

  return (
    <div className="flex justify-center items-center p-4">
      <div className="card w-96 rounded-md shadow-md bg-white p-1">
        <div className="text-center text-lg font-bold">Doctor Booking</div>
        <div className="flex justify-center items-center">
          {formArray.map((v, i) => (
            <React.Fragment key={i}>
              <div
                className={`w-[35px] my-3 text-white rounded-full ${
                  formNo - 1 === i ||
                  formNo - 1 === i + 1 ||
                  formNo === formArray.length
                    ? "bg-blue-500"
                    : "bg-slate-400"
                } h-[35px] flex justify-center items-center`}
              >
                {v}
              </div>
              {i !== formArray.length - 1 && (
                <div
                  className={`w-[85px] h-[2px] ${
                    formNo === i + 2 || formNo === formArray.length
                      ? "bg-blue-500"
                      : "bg-slate-400"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>
        {formNo === 1 && (
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor="date">Date</label>
              <input
                value={state.date}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                type="date"
                name="date"
                id="date"
                min={getCurrentDate()} // Set the min attribute to the current date
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="time">Time</label>
              <select
                value={state.time}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                name="time"
                id="time"
              >
                <option value="">Select Time</option>
                {generateTimeOptions()}
              </select>
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="hospital">Hospital</label>
              <select
                value={state.hospital}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus:border-blue-500 rounded-md"
                name="hospital"
                id="hospital"
              >
                <option value="ABC">ABC</option>
                <option value="XYZ">XYZ</option>
                <option value="DFG">DFG</option>
              </select>
            </div>
            <div className="mt-4 flex justify-center items-center">
              <button
                onClick={next}
                className="px-3 py-2 text-lg rounded-md w-full text-white bg-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {formNo === 2 && (
          <div>
            <div className="flex flex-col mb-2">
              <label htmlFor="patientName">Patient Name</label>
              <input
                value={state.patientName}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus-border-blue-500 rounded-md"
                type="text"
                name="patientName"
                placeholder="Patient Name"
                id="patientName"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="contactNumber">Contact Number</label>
              <input
                value={state.contactNumber}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus-border-blue-500 rounded-md"
                type="tel"
                name="contactNumber"
                placeholder="Contact Number"
                id="contactNumber"
              />
              {phoneNumberError && (
                <p className="text-red-500 text-sm mt-1">{phoneNumberError}</p>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="age">Age</label>
              <input
                value={state.age}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus-border-blue-500 rounded-md"
                type="text"
                name="age"
                placeholder="Age"
                id="age"
              />
              {ageError && (
                <p className="text-red-500 text-sm mt-1">{ageError}</p>
              )}
            </div>

            <div className="flex flex-col mb-2">
              <label htmlFor="address">Address</label>
              <textarea
                value={state.address}
                onChange={inputHandle}
                rows="5"
                className="p-2 border border-slate-400 mt-1 outline-0 focus-border-blue-500 rounded-md"
                name="address"
                placeholder="Address"
              ></textarea>
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="email">Email</label>
              <input
                value={state.email}
                onChange={inputHandle}
                className="p-2 border border-slate-400 mt-1 outline-0 focus-border-blue-500 rounded-md"
                type="email"
                name="email"
                placeholder="Email"
                id="email"
              />
              {emailError && (
                <p className="text-red-500 text-sm mt-1">{emailError}</p>
              )}
            </div>

            <div className="mt-4 gap-3 flex justify-center items-center">
              <button
                onClick={pre}
                className="px-3 py-2 text-lg rounded-md w-1/2 text-white bg-blue-500"
              >
                Previous
              </button>
              <button
                onClick={next}
                className="px-3 py-2 text-lg rounded-md w-1/2 text-white bg-blue-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {formNo === 3 && (
          <div>
            <div className="mt-4">
              <p className="text-center">
                Please proceed to payment to confirm your appointment or cancel
                your appointment.
              </p>

              <img
                src={paymentImage}
                alt="Payment Image"
                className="mt-4 mx-auto"
              />
            </div>
            <div className="mt-4 gap-3 flex justify-center items-center">
              <button
                onClick={cancelAppointment}
                className="px-3 py-2 text-lg rounded-md w-1/2 text-white bg-red-500"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-3 py-2 text-lg rounded-md w-1/2 text-white bg-green-600"
              >
                Confirm
              </button>
            </div>
          </div>
        )}
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Please fill in all fields before proceeding"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "50%",
            maxWidth: "400px",
            margin: "0 auto",
            padding: "20px",
            textAlign: "center",
          },
        }}
      >
        <h2>Please fill in all fields before proceeding</h2>
        <button onClick={closeModal}>OK</button>
      </Modal>
    </div>
  );
};

export default Aform;
