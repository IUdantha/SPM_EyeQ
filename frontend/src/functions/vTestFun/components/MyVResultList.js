import React, {useState, useContext} from "react";
import axios from "axios"; // Import Axios for making HTTP requests
import {AuthContext} from "../../../common/context/auth-context";
import "./MyVResultList.css";

const MyVResultList = (props) => {
  const [filteredItems, setFilteredItems] = useState(props.items);
  const Auth = useContext(AuthContext);

  async function fetchData() {
    try {
      // Fetch updated data from the server (you should replace this with the actual endpoint)
      const response = await axios.get("http://localhost:5000/api/vTest");

      if (response.status === 200) {
        setFilteredItems(response.data); // Update the state with the new data
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function handleSearch(event) {
    const filter = event.target.value.toUpperCase();
    const filtered = props.items.filter((result) =>
      Object.values(result).join(" ").toUpperCase().includes(filter)
    );
    setFilteredItems(filtered);
  }

  // Function to delete a row by ID
  async function handleDeleteRow(rowId) {
    // Show a confirmation dialog
    const confirmed = window.confirm(
      "Are you sure you want to delete this Result of your vision test?"
    );

    if (confirmed) {
      try {
        // Make an HTTP DELETE request to the server
        const response = await axios.delete(
          `http://localhost:5000/api/vTest/${rowId}`
        );

        // Create a new filteredItems array without the deleted row
        const updatedItems = filteredItems.filter(
          (result) => result.id !== rowId
        );
        setFilteredItems(updatedItems);

        if (response.status === 204) {
          // Deletion successful on the server, re-fetch updated data
          fetchData();
        }
      } catch (error) {
        console.error("Error deleting row:", error);
      }
    }
  }

  return (
    <ul>
      <h1 className="main-headings">My Vision Results</h1>
      <table className="content-table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Result</th>
            <th scope="col">Note</th>
            <th scope="col">Actions</th> {/* New column for delete button */}
          </tr>
        </thead>

        <tbody>
          {filteredItems.length === 0 ? (
            <tr>
              <td colSpan="4">
                <div className="center">
                  <h2>No results details found.</h2>
                </div>
              </td>
            </tr>
          ) : (
            filteredItems
              .filter((result) => result.userId === Auth.userId)
              .reverse()
              .map((result) => (
                <tr key={result.id}>
                  <td>{result.date}</td>
                  <td>{result.result}</td>
                  <td>{result.Note}</td>
                  <td>
                    <button
                      onClick={() => handleDeleteRow(result.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </ul>
  );
};

export default MyVResultList;
