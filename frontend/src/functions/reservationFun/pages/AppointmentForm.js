import React, { useState } from 'react';

export const AppointmentForm = () => {
  // Define the initial state for formData and doctors
  const [formData, setFormData] = useState({
    name: '',
    hospital: '',
    email: '',
    phoneNumber: '',
    specialization: '',
  });

  const [doctors, setDoctors] = useState([]);

  // Define handleChange function to update formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Define handleSubmit function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your code here to submit the form data and update the doctors list
    // You can use setDoctors to update the list of doctors.
    // Example: setDoctors([...doctors, formData]);
    // After updating, you can also clear the form by resetting formData.
    // setFormData({
    //   name: '',
    //   hospital: '',
    //   email: '',
    //   phoneNumber: '',
    //   specialization: '',
    // });
  };

  // Define handleDelete function to delete a doctor
  const handleDelete = (doctorId) => {
    // Add your code here to delete a doctor by ID from the doctors list
    // Example: const updatedDoctors = doctors.filter((doctor) => doctor._id !== doctorId);
    // setDoctors(updatedDoctors);
  };

  return (
    <>
      <div className="container">
        <h2>Add Doctor</h2>
        <form onSubmit={handleSubmit}>
          {/* Form input fields */}
          {/* ... */}
        </form>
      </div>

      <div className="container">
        <h2>Doctor List</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Hospital</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Specialization</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.hospital}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phoneNumber}</td>
                <td>{doctor.specialization}</td>
                <td>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDelete(doctor._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* You may need to import ToastContainer if you are using a library for toasts */}
      {/* <ToastContainer /> */}
    </>
  );
};
