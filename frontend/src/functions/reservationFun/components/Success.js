import React, { useEffect, useState } from "react";
import { Document, Page, Text, View } from "@react-pdf/renderer";

const Success = () => {
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    // Retrieve the appointment data from local storage
    const storedData = localStorage.getItem("appointmentData");
    if (storedData) {
      setAppointmentData(JSON.parse(storedData));
      // Clear the data from local storage to prevent showing it again on a subsequent visit
      localStorage.removeItem("appointmentData");
    }
  }, []);

  return (
    <div className="flex justify-center items-center ">
      <Document className="p-4">
        <Page size="A4">
          <Text className="text-2xl font-bold mb-4 text-green-600">
            Payment Successful!!!
          </Text>

          <div>
            <Text className="text-lg mb-4">
              Your payment was processed successfully.
            </Text>{" "}
          </div>

          <View className="mb-4">
            <Text className="text-lg font-semibold">
              Thank you for confirming your appointment. Here are the details:
            </Text>
            <div className=" p-4">
              <ul className="list-disc pl-8">
                {appointmentData && (
                  <>
                    <li>Date: {appointmentData.date}</li>
                    <li>Time: {appointmentData.time}</li>
                    <li>Hospital: {appointmentData.hospital}</li>
                    <li>Patient Name: {appointmentData.patientName}</li>
                    <li>Contact Number: {appointmentData.contactNumber}</li>
                    <li>Age: {appointmentData.age}</li>
                    <li>Address: {appointmentData.address}</li>
                    <li>Email: {appointmentData.email}</li>
                  </>
                )}
              </ul>
            </div>
          </View>
          <View className="mt-4">
            <button
              onClick={() => window.print()}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
            >
              Print
            </button>
          </View>
        </Page>
      </Document>
    </div>
  );
};

export default Success;
