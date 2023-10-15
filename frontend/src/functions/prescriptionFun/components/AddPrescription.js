import React from "react";

const AddPrescription = ({ isVisible, onClose, children }) => {
  if (!isVisible) {
    return null;
  }

  // const handleClose = (e) => {
  //   if (e.target.id == "wrapper") onClose();
  // };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-sm"
      style={{
        backgroundImage: `url("../images/back4.jpg")`,
        backgroundColor: "white",
      }}
      id="wrapper"
    >
      {/* Model content */}
      <div className="w-[600px] flex flex-col">
        <button
          className="text-xl text-black place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>

        {/* form content */}
        <div
          className="p-2 bg-white rounded-lg "
          style={{
            boxShadow: "-6px 4px 20px 0px rgba(119, 119, 119, 0.65)",
            WebkitBoxShadow: "-6px 4px 20px 0px rgba(119, 119, 119, 0.65)",
            MozBoxShadow: "-6px 4px 20px 0px rgba(119, 119, 119, 0.65)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AddPrescription;
