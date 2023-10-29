import React from "react";
import "./App.css";
import ScrapedData from "./ScrapedData/ScrapedData.tsx";
import WeatherComponent from "./WeatherComponent/WeatherComponent.tsx";
import DatabaseReturnsComponent from "./DatabaseReturns/DatabaseReturnsComponent.tsx";

function App() {
  return (
    <div className="App">
      <ScrapedData />
      <WeatherComponent />
      <DatabaseReturnsComponent />
    </div>
  );
}

export default App;
