import React, {useEffect, useState} from "react";
import {useHttpClient} from "../components/http-hook";
import MyVResultList from "../components/MyVResultList";

const MyVResults = () => {
  const {isLoading, error, sendRequest, clearError} = useHttpClient();
  const [loadedvResult, setVResult] = useState();

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/vTest"
        );

        setVResult(responseData.results);
      } catch (err) {}
    };
    fetchPayments();
  }, [sendRequest]);
  return (
    <React.Fragment>
      {!isLoading && loadedvResult && <MyVResultList items={loadedvResult} />}
    </React.Fragment>
  );
};

export default MyVResults;
