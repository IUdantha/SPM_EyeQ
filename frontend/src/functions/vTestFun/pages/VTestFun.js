import React, {useState} from "react";
import VTestDetails from "../components/VTestDetails";
import FAQs from "../components/FQAs";
import Modal from "../components/Modal";
import Question from "../components/Question";
import MyVResults from "../components/MyVResults";

import axios from "axios";

import "./VTestFun.css";

const VTestFun = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMyResultModalVisible, setIsMyResultModalVisible] = useState(false);

  const toggleModalVisibility = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleMyResultModalVisibility = () => {
    setIsMyResultModalVisible(!isMyResultModalVisible);
  };

  const handleRunScript = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8001/run_script");
      this.setState({response: response.data});
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <VTestDetails />
      <FAQs />

      {/* Button to open the modal for Camera */}
      <button onClick={handleRunScript} className="camBtn">
        Virtual test
      </button>

      {/* Button to open the modal for Question */}
      <button onClick={toggleModalVisibility} className="testBtn">
        Test My Eye
      </button>

      {/* Button to open the modal for MyResult */}
      <button onClick={toggleMyResultModalVisibility} className="vResultBtn">
        My Results
      </button>

      {/* Render the modal for Question if isModalVisible is true */}
      {isModalVisible && (
        <Modal onClose={toggleModalVisibility} content={<Question />}>
          {/* You can pass additional props to the Question component here */}
        </Modal>
      )}

      {/* Render the modal for MyResult if isMyResultModalVisible is true */}
      {isMyResultModalVisible && (
        <Modal onClose={toggleMyResultModalVisibility} content={<MyVResults />}>
          {/* You can pass additional props to the MyResult component here */}
        </Modal>
      )}
    </div>
  );
};

export default VTestFun;
