import React from "react";
import paymentImage from "./IM.png";

const Home = () => {
  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full flex">
        <div className="w-1/2 pr-4">
          <img
            src={paymentImage}
            alt="Payment Image"
            className="w-full rounded-lg"
          />
        </div>
        <div className="w-1/2 p-5">
          <h1 className="text-4xl font-bold mb-4">Welcome to Vision Care</h1>
          <p className="text-gray-700 text-lg mb-6">
            Your vision health is our top priority.
          </p>
          <a
            href="/apptable"
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300 inline-block"
          >
            Appointments
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
