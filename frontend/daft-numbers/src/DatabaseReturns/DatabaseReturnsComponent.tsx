import React, { useState } from "react";
import axios from "axios";

const DatabaseReturnsComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const randomNumber = Math.floor(Math.random() * 10);
      const finalNumber = randomNumber < 1 ? 1 : randomNumber;

      const response = await axios.get(
        `http://localhost:3001/query?limit=${finalNumber}`
      );

      setData(response.data);
      setError(null);
    } catch (error) {
      setError("An error occurred while fetching data.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Database Returns</h1>
      <button className="btn btn-primary" onClick={fetchData}>
        Fetch Data
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data && (
        <div>
          <h2>Results:</h2>
          {data.map((item, index) => (
            <div key={index}>
              <p>Date: {item.date}</p>
              <p>Site: {item.site}</p>
              <p>County: {item.county}</p>
              <p>Buy/Rent: {item.buyrent}</p>
              <p>Total: {item.Total}</p>
              <hr />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DatabaseReturnsComponent;
