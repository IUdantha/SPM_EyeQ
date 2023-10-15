import React from "react";
// import Layout from "../../../components/Layout";
import card1Image from "../images/d1.jpg";
import card2Image from "../images/d2.jpg";
import card3Image from "../images/d3.jpg";
import card4Image from "../images/d4.jpg";
import card5Image from "../images/d5.jpg";
import card6Image from "../images/d6.jpg";
import { Link } from "react-router-dom";

export const ReservationFun = () => {
  // Create an array of data for your cards with different images
  const cardData = [
    {
      title: "Dr. John Doe -Ophthalmologist",
      category: "Make an Appointment",
      description: "Specializes in eye care and vision health.",
      image: card1Image,
    },
    {
      title: "Dr. Jane Smith -Optometrist",
      category: "Make an Appointment",
      description: "Provides comprehensive eye exams and eyeglass fittings.",
      image: card2Image,
    },
    {
      title: "Dr. Ann Johnson -Ophthalmologist",
      category: "Make an Appointment",
      description: "Specializes in eye care for children and adolescents.",
      image: card3Image,
    },
    {
      title: "Dr. Sarah Adams - Cornea Specialist",
      category: "Make an Appointment",
      description: "Focuses on cornea-related eye conditions and surgeries.",
      image: card4Image,
    },
    {
      title: "Dr. Robert White -Glaucoma Specialist",
      category: "Make an Appointment",
      description: "Specializes in the management of glaucoma patients.",
      image: card5Image,
    },
    {
      title: "Dr. Emily Davis-Retina Specialist",
      category: "Make an Appointment",
      description: "Expert in diagnosing and treating retinal diseases.",
      image: card6Image,
    },
  ];
  return (
    <div className="mx-auto max-w-screen-xl my-12">
      <div className="grid grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <div key={index} className="bg-white rounded-md shadow-md">
            <div className="flex justify-center p-4">
              <img className="rounded-md" src={card.image} alt="Prescription" />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg">{card.title}</h2>
              <Link to="/Aform">
                <button className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs my-1">
                  {card.category}
                </button>
              </Link>

              <p className="text-xs mt-1">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReservationFun;
