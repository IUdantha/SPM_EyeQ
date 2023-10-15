import React from "react";
import moment from "moment";
import "../css/Card.css";

const Card = ({ doctorName, hospitalName, presDate, expDate, onCardClick, preTo }) => {
  return (
    <div className="cardContainer">
      <div className="cardImage">{/* <img src={image} alt="" /> */}</div>

      <div className="cardInfo">
        <h2 className="byDoctor">By {doctorName}</h2>
        <h3 className="fromHospital">{hospitalName}</h3>
        
        <div className="dates">
        <p className="preTo" >Prescribed To : {preTo}</p>
          <p className="preDate" >Prescribed On : {moment(presDate).format("YYYY-MM-DD")}</p>
          <p className="expDate" >Expired On : {moment(expDate).format("YYYY-MM-DD")}</p>
          
        </div>

        <button className="btnView " onClick={onCardClick}>
          View More
        </button>
      </div>
    </div>
  );
};

export default Card;
