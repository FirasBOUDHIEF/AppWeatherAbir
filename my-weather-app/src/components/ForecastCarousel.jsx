import React from "react";

const ForecastCarousel = ({ forecastList = [] }) => {
  return (
    <div className="d-flex overflow-auto py-3">
      {forecastList.map((item, index) => (
        <div key={index} className="card p-3 mx-2 text-center">
          <p className="fw-bold">{item.date}</p>
          <img
            src={`http://openweathermap.org/img/wn/${item.icon}@2x.png`}
            alt="Weather Icon"
            style={{ width: "60px" }}
          />
          <p>{item.temp}°C</p>
        </div>
      ))}
    </div>
  );
};

export default ForecastCarousel;
