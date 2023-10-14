import React, { useState } from "react"; 
import Stepper from "../components/Stepper";
import StepperControl from "../components/StepperControl";
import Details from "./Details";
import Final from "./Final";
import Account from "./Account";


const ReservationFun = () => {

  const [currentStep,setCurrentStep] = useState(1);

  const steps = [

    "Account information",
    "Personal information",
    "complete"

  ];

  const displayStep =(step) =>{

    switch(step){

      case 1:
        return <Account/>
        case 2:
        return <Details/>
        case 3:
        return <Final/>
    }
  }
  return (
    <>
      <div className=" md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-slate-400">

        <div className=" container mt-5">
          <Stepper
          
          step = {steps}
          currentStep ={currentStep}
          />
        </div>

        <StepperControl/>
      </div>
    </>
  );
};

export default ReservationFun;
