const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = 3001; // Choose a port for your backend

app.use(express.json());

// CORS configuration for localhost
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests from your localhost frontend
  // You can add other CORS options here if needed.
};

app.use(cors(corsOptions)); // Apply the CORS configuration

// this route gets the daft total properties for sale count
app.get("/daft", async (req, res) => {
  try {
    // Define the URL you want to scrape
    const url = "https://www.daft.ie/property-for-sale/ireland"; // Replace with the URL you want to scrape

    // Make an HTTP GET request to the URL
    const response = await axios.get(url);

    // Parse the HTML content using Cheerio
    const $ = cheerio.load(response.data);
    const results = $(
      'h1[data-testid="search-h1"].styles__SearchH1-sc-1t5gb6v-3.guZHZl'
    );
    let daftSales = results.text();
    daftSales = daftSales.replace(" Properties for Sale in Ireland", "");
    daftSales = daftSales.replace(",", "");

    // Extract data from the HTML using jQuery-like syntax
    const title = $("title").text(); // Example: Extract the title
    const daftCount = daftSales;
    // console.log(title);
    console.log(daftSales);
    // Send the scraped data as a JSON response
    res.json({ title, daftCount });
  } catch (error) {
    // Inside the catch block in server.js
    console.error("Error scraping data:", error);
    res.status(500).json({ error: "Error scraping data" });
  }
});

app.get("/weather", async (req, res) => {
  try {
    const { city } = req.query; // Get the city from the query parameters

    if (!city) {
      return res.status(400).json({ error: "City name is required" });
    }
    console.log(`Received weather request for city: ${city}`);

    // Define the URL for the OpenWeatherMap API
    const weatherAPIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=API-KEY&units=metric`; // Replace "YOUR_API_KEY" with your OpenWeatherMap API key

    // Make an HTTP GET request to the OpenWeatherMap API
    const response = await axios.get(weatherAPIUrl);

    // Extract the weather data from the response
    const weatherData = response.data; // Adjust this based on the structure of the weather API response

    // Send the weather data as a JSON response
    res.json(weatherData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Error fetching weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
