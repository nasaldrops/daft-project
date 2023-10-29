import React from "react";
import "./App.css";
import ScrapedData from "./ScrapedData/ScrapedData.tsx";
import WeatherComponent from "./WeatherComponent/WeatherComponent.tsx";

function App() {
  return (
    <div className="App">
      <ScrapedData />
      <WeatherComponent />
    </div>
  );
}

export default App;
