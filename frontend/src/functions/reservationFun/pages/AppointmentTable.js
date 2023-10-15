import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch("http://localhost:5000/app/getA");
        if (response.status === 200) {
          const data = await response.json();
          setAppointments(data);
        } else {
          console.error("Error fetching appointments");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="flex flex-col items-center h-screen">
    <h2 className="text-2xl font-bold my-4">Appointments</h2>
    <div className="bg-white rounded-lg shadow-lg p-3">
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left py-2 px-3">Date</th>
            <th className="text-left py-2 px-3">Time</th>
            <th className="text-left py-2 px-3">Doctor</th>
            <th className="text-left py-2 px-3">Patient Name</th>
            <th className="text-left py-2 px-3">Contact Number</th>
            <th className="text-left py-2 px-3">Age</th>
            <th className="text-left py-2 px-3">Address</th>
            <th className="text-left py-2 px-3">Email</th>
            <th className="text-left py-2 px-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td className="py-2 px-3">{appointment.date}</td>
              <td className="py-2 px-3">{appointment.time}</td>
              <td className="py-2 px-3">{appointment.doctor}</td>
              <td className="py-2 px-3">{appointment.patientName}</td>
              <td className="py-2 px-3">{appointment.contactNumber}</td>
              <td className="py-2 px-3">{appointment.age}</td>
              <td className="py-2 px-3">{appointment.address}</td>
              <td className="py-2 px-3">{appointment.email}</td>
              <td className="py-2 px-3">
                <Link to={`/Aedit/${appointment._id}`}>
                  <button className=" bg-yellow-400 text-white px-4 py-2 rounded-lg">
                    Edit
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg ml-2"
                  onClick={async () => {
                    const response = await fetch(
                      `http://localhost:5000/app/delete/${appointment._id}`,
                      {
                        method: "DELETE",
                      }
                    );
                    if (response.ok) {
                      setAppointments((prevAppointments) =>
                        prevAppointments.filter(
                          (prevAppointment) =>
                            prevAppointment._id !== appointment._id
                        )
                      );
                    }
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  
  );
};

export default AppointmentTable;
