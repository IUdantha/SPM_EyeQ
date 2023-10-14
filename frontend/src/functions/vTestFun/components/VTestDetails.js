import React, {useState} from "react";

import "./VTestDetails.css";

import TumblingEImg from "../images/Tumbling-E-Test-DBOCC-Health.png";
import EyeColor from "../images/Ishiharas-Test-For-Colour-Deficiency-DBOCC-Health-1024x1024.png";
import HetoSecImg from "../images/HeroSecImg.jpg";

const vTestDetails = () => {
  return (
    <div className="vTestDetials">
      {/* <div className="image-container">
        <img src={HetoSecImg} alt="Hero Image" height="800px" />
        <div className="overlay-text">Tumbling E Eye Tests</div>
      </div> */}
      <h1 className="main-headings">What are Tumbling E Eye Tests?</h1>
      <p>
        Tumbling E Eye tests are like the regular eye tests you receive at the
        opticians in as much as the E’s are big at the top and gradually get
        smaller as you go down. The difference being, at the opticians, there
        are different letters on each of the lines and not just E’s. The reason
        it is known as ‘Tumbling’ is that the E’s are facing in different
        directions. See below for an example of a tumbling E Eye Test.
      </p>
      <img src={TumblingEImg} />
      <h1 className="main-headings">How to set up Tumbling E Eye Tests?</h1>
      <p>
        Before the test is taken, you must ensure the testing room is set up
        correctly. The room must be bright enough – a minimum of 500lux with a
        maximum of 750lux. The random tests that are printed need to be a
        correct size – there is a line which needs to be measured and must
        measure 250mm (with only 5mm of error room) and the person having the
        test must hold the test sheet 400mm away (or within 25mm of that
        distance).
      </p>

      <h1 className="main-headings">
        What happens during the Tumbling E Eye Test?
      </h1>
      <p>
        Once this is all satisfactory, the test can begin. If the person wears
        glasses when performing his/her day to day job, these should be worn for
        the test. On each line, there are 5 E’s so they will go across each line
        and advise in which direction the E is facing. As per the diagram, it
        would be ‘up, right, down, left, up’. The person conducting the test
        will record how many out of 5 they got correctly on each line.
      </p>

      <h1 className="main-headings">Ishihara Test For Colour-Deficiency</h1>
      <p>
        After this test, we are also required to carry out a colour vision test
        using the ‘Ishihara’s test for Colour-Deficiency’ book. The Ishihara
        test recording starts off with the tester opening the pages randomly and
        the person being tested is asked to read the numbers on the plates. They
        are also required to trace with their fingers a pattern from one side of
        the plate to another to further prove they do not have a colour
        deficiency.
      </p>

      <img src={EyeColor} width="300px" />

      <p>
        All the information is recorded as either a ‘pass’ or a ‘fail’. The test
        is then passed to the NDT Level 3 Special Processes Auditor to review
        the tests and issue an inspection stamp where necessary.
      </p>
    </div>
  );
};

export default vTestDetails;
