import React, { useState } from "react";
import Button from "./button";
import Input from "./input";

import './temperature-cards.css';

// Weather icons mapping
const weatherIcons = {
  "Fog":"https://img.icons8.com/fluency/96/foggy-night-1.png",
  "Light drizzle":"https://img.icons8.com/fluency/96/hail.png",
  "Light sleet":"https://img.icons8.com/fluency/96/sleet.png",
  "Partly cloudy": "https://img.icons8.com/fluency/96/partly-cloudy-day.png",
  "Cloudy": "https://img.icons8.com/fluency/96/cloud.png",
  "Mist": "https://img.icons8.com/fluency/96/fog-day.png",
  "Overcast": "https://img.icons8.com/fluency/96/clouds.png",
  "Blizzard": "https://img.icons8.com/fluency/96/windy-weather.png",
  "Light snow": "https://img.icons8.com/fluency/96/snow.png",
  "Blowing snow": "https://img.icons8.com/fluency/96/sleet.png",
  "Patchy snow possible": "https://img.icons8.com/fluency/96/snow.png",
  "Patchy heavy snow": "https://img.icons8.com/fluency/96/snow-storm.png",
  "Sunny": "https://img.icons8.com/fluency/96/summer.png",
  "Patchy moderate snow": "https://img.icons8.com/fluency/96/snow.png",
  "Patchy rain possible": "https://img.icons8.com/fluency/96/rain.png",
  "Moderate rain": "https://img.icons8.com/fluency/96/moderate-rain.png",
  "Heavy rain": "https://img.icons8.com/fluency/96/intense-rain.png",
};

function WeatherBody() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState({});
  const [temperature, setTemperature] = useState([]);
  const [current, setCurrent] = useState([]);
  const [todayFeels, settodayFeels] = useState('');

  // Weather icons function
  function iconFunc(icon) {
    return (
      <>
        <div className="weather-feels-name">{icon}</div>
        <img className="weather-img" src={weatherIcons[icon] || weatherIcons['Other']} alt={icon} />
      </>
    );
  }

  const hendler = () => {
    setLoading(true);
    (async () => {
      try {
        const weatherAPI = `https://api.weatherapi.com/v1/forecast.json?key=f503e85c25234eadbec193044221601&q=${city}&days=3&aqi=no&alerts=no`;
        const res = await fetch(encodeURI(weatherAPI));
        if (res.status >= 400) {
          throw new Error("Bad response from server");
        }
        const data = await res.json();
        setInfo(data.location);
        setTemperature(data.forecast.forecastday);
        setCurrent(data.current);
        settodayFeels(data.forecast.forecastday[0].day.condition.text);
        console.log(data.forecast.forecastday);
      } catch (err) {
        setLoading(null);
      }
    })();
  };

  const handleChange = event => {
    setCity(event.target.value);
  };

  return (
    <div className="wrapper">
      <div className="weather-input">
        <Input value={city} change={handleChange} />
        <Button triger={hendler} />
      </div>
      <div className="weather-body">
        {loading === false ? (
          <div className="hello-page">
            <span>введіть місто</span>
          </div>
        ) : loading === null ? (
          <div className="notFound">
            <h1> Місто не знайдено 😢</h1>
            <span>спробуй змінити мову вводу 😉 Підтримуються RU,ENG</span>
          </div>
        ) : (
          <div className="body">
            <div className="today-wrapper">
              <div className="city-name">
                <div className="city">{info.name}</div>
                <div className="country">{info.country}</div>
              </div>
              <div className="temperature-today">
                <div className="temperature-now-day">
                  <span>Today</span>
                </div>
                <div className="temperature-now">{current.temp_c}°C</div>
                <div className="temperature-feels">feels like {current.feelslike_c}°C</div>
              </div>
              <div className="feels-like-today">{iconFunc(todayFeels)}</div>
            </div>

            <div className="temperature-tree-days-wrapper">
              {temperature.map((el) => (
                <div className="city-temperature-tree-days" key={el.date}>
                  <div className="day">
                    <span>{el.date}</span>
                  </div>
                  <div className="temperature">
                    <div className="min-max-temp-wrap">
                      <div className="avg-temp">{el.day.avgtemp_c}°C</div>
                      <div className="min-temp">Min {el.day.mintemp_c}°C</div>
                      <div className="max-temp">Max {el.day.maxtemp_c}°C</div>
                      <div className="max-vis">Visibility {el.day.avgvis_km}km</div>
                      <div className="max-vis">Max Wind {el.day.maxwind_kph}km</div>
                    </div>
                    <div className="icon">{iconFunc(el.day.condition.text)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherBody;
