import React, { useState } from "react";
import axios from "axios"; // You will need axios or any other HTTP library for making API requests

function AddDoctor() {
  const [doctorData, setDoctorData] = useState({
    name: "",
    hospital: "",
    email: "",
    phoneNumber: "",
    specialization: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctorData({
      ...doctorData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend to create a new doctor
      const response = await axios.post(
        "http://localhost:5000/doc/add/",
        doctorData
      );
      console.log("Doctor added:", response.data);

      // Optionally, you can reset the form fields after successful submission
      setDoctorData({
        name: "",
        hospital: "",
        email: "",
        phoneNumber: "",
        specialization: "",
      });
    } catch (error) {
      console.error("Error adding doctor:", error);
    }
  };

  return (
    <div class="w-1/2 mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Add Doctor</h2>
      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label for="name" class="block text-gray-600">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={doctorData.name}
            onChange={handleChange}
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label for="hospital" class="block text-gray-600">
            Hospital:
          </label>
          <input
            type="text"
            id="hospital"
            name="hospital"
            value={doctorData.hospital}
            onChange={handleChange}
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label for="email" class="block text-gray-600">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={doctorData.email}
            onChange={handleChange}
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label for="phoneNumber" class="block text-gray-600">
            Phone Number:
          </label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={doctorData.phoneNumber}
            onChange={handleChange}
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label for="specialization" class="block text-gray-600">
            Specialization:
          </label>
          <input
            type="text"
            id="specialization"
            name="specialization"
            value={doctorData.specialization}
            onChange={handleChange}
            required
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Add Doctor
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddDoctor;
