import React, { useEffect, useState } from "react";
import axios from "axios";
import "../components/docS.css";

function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors from the backend
    axios.get("http://localhost:5000/doc/get").then((response) => {
      setDoctors(response.data);
    });
  }, []);

  return (
    <div className="doctor-card-container">
      <h2>Doctor List</h2>
      <div className="doctor-cards">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor._id}>
            <h3>{doctor.name}</h3>
            <p>Specialty: {doctor.specialization}</p>
            <p>Hospital: {doctor.hospital}</p>
            <p>Email: {doctor.email}</p>

          

            <a href={`/doctor/${doctor._id}`} className="button-link">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
