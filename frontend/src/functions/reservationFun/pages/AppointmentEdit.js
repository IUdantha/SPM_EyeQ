import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";

export const AppointmentEdit = () => {
  const [appointment, setAppointment] = useState({});
  // const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  // const [doctor, setDoctor] = useState("");
  const [patientName, setPatientName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [age, setAge] = useState(null);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash"); // Set a default payment method
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const {id} = useParams(); // Get the ID parameter from the URL.

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await fetch(`http://localhost:5000/app/getA/${id}`);
        if (response.ok) {
          const data = await response.json();
          if (data) {
            // Set existing data to state
            setAppointment(data);
            // setDate(data.date);
            // setTime(data.time);
            // setDoctor(data.doctor);
            setPatientName(data.patientName);
            setContactNumber(data.contactNumber);
            setAge(data.age);
            setAddress(data.address);
            setEmail(data.email);
            setPaymentMethod(data.paymentMethod || "cash");
          } else {
            console.error("No appointment data found in the response.");
          }
        } else {
          console.error("Failed to fetch appointment data.");
        }
      } catch (error) {
        console.error(
          "An error occurred while fetching appointment data:",
          error
        );
      } finally {
        setLoading(false); // Mark loading as complete
      }
    };

    fetchAppointment();
  }, [id]);

  // const handleDateChange = (event) => {
  //   setDate(event.target.value);
  // };

  // const handleTimeChange = (event) => {
  //   setTime(event.target.value);
  // };

  // const handleDoctorChange = (event) => {
  //   setDoctor(event.target.value);
  // };

  const handlePatientNameChange = (event) => {
    setPatientName(event.target.value);
  };

  const handleContactNumberChange = (event) => {
    setContactNumber(event.target.value);
  };

  const handleAgeChange = (event) => {
    setAge(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the updated data to the server
    const response = await fetch(`http://localhost:5000/app/update/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // date,
        // time,
        // doctor,
        patientName,
        contactNumber,
        age,
        address,
        email,
      }),
    });

    if (response.ok) {
      history.push("/apptable");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-center my-5 text-2xl font-semibold">
        Edit Appointment
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        {/*    
        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Date:
          </label>
          <input
            type="date"
            id="date"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={date}
            onChange={handleDateChange}
          />
        </div>

       
        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Time:
          </label>
          <input
            type="time"
            id="time"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={time}
            onChange={handleTimeChange}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="doctor"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Doctor:
          </label>
          <input
            type="text"
            id="doctor"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={doctor}
            onChange={handleDoctorChange}
          />
        </div> */}

        {/* Patient Name Input */}
        <div className="mb-4">
          <label
            htmlFor="patientName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Patient Name:
          </label>
          <input
            type="text"
            id="patientName"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={patientName}
            onChange={handlePatientNameChange}
          />
        </div>

        {/* Contact Number Input */}
        <div className="mb-4">
          <label
            htmlFor="contactNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Contact Number:
          </label>
          <input
            type="text"
            id="contactNumber"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={contactNumber}
            onChange={handleContactNumberChange}
          />
        </div>

        {/* Age Input */}
        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Age:
          </label>
          <input
            type="text"
            id="age"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={age}
            onChange={handleAgeChange}
          />
        </div>

        {/* Address Input */}
        <div className="mb-4">
          <label
            htmlFor="address"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Address:
          </label>
          <input
            type="text"
            id="address"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={address}
            onChange={handleAddressChange}
          />
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email:
          </label>
          <input
            type="text"
            id="email"
            className="form-control appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={email}
            onChange={handleEmailChange}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default AppointmentEdit;
