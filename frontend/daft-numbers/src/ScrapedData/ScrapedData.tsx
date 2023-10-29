import React, { useState } from "react";
import axios from "axios";

function ScrapedData() {
  const [daftSales, setDaftSales] = useState("");
  const [error, setError] = useState(null);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Initially not disabled

  const handleScrapeClick = async () => {
    try {
      // Disable the button while waiting for the response
      setIsButtonDisabled(true);

      // Make a GET request to your /daft route
      const response = await axios.get("http://localhost:3001/daft");

      // Extract the scraped data from the response
      const data = response.data;

      // Update the state with the scraped data
      setDaftSales(data.daftCount);
    } catch (err) {
      console.error("Error scraping data:", err);
      setError("Error scraping data");
    } finally {
      // Re-enable the button after the response (whether successful or not)
      setIsButtonDisabled(false);
    }
  };

  return (
    <div>
      <h1>Total Properties For Sale</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          <button
            className="btn btn-primary"
            onClick={handleScrapeClick}
            disabled={isButtonDisabled} // Disable the button based on state
          >
            Daft Count
          </button>
          <p></p>
          <p>{daftSales}</p>
        </div>
      )}
    </div>
  );
}

export default ScrapedData;
