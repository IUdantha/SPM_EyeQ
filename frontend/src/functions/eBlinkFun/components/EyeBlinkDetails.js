import React, {useState} from "react";
import axios from "axios";

import "./EyeBlinkDetails.css";

const eTestDetails = () => {

    const handleRunScript = async () => {
        try {
            const response = await axios.post("http://127.0.0.1:8000/run_script");
            this.setState({ response: response.data });
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="eyeTestDetails">
            <div className= "eBlinktitle">
                <b>THE EYE BLINK TEST</b>
            </div>
            <p>
                The Eye Blink Test is a simple test that can be used to check if your
                eyes are working properly. It is a test that can be used to assess
                your vision and detect any problems with your eyesight.<br/> It is a
                simple test that can be done at home, at work or at school.
            </p>
            <p>
                Once you click the <b>'Start Test'</b> button you will be redirected to the Eye Blink Test.<br/>
                The test runs for a time of 1min (60 seconds). It advised to be as calm as possible within that time frame.<br/>
                The test works best when you are closer to the webcam (within 1m distance) and in an environment with better lighting.
            </p>
            <p>
                <h2><b>Blink Counter Normal Range</b></h2>
                <h3>20 &lt; Normal &lt; 40</h3>
            </p>
            <p>
                If your blink counter is less than the normal range (&lt; 20)
                <br/>
                Your condition is likely <b>HYPOBLINK</b>
            </p>
            <p>
                If your blink counter is more than the normal range (&gt; 40)
                <br/>
                Your condition is likely <b>HYPERBLINK</b>
            </p>
            <button class="buttonE" onClick={handleRunScript}><span>Start Test</span></button>
        </div>
    );
};

export default eTestDetails;
