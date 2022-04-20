import React , { useState } from "react";
import Button from "./button";
import Input from "./input";

import './temperature-cards.css'

function WeatherBody() {
  const [city,setCity] = useState('');
  const [loading, setLoading] = useState("false");
  const [info,setInfo] = useState({})
  const [temperature,setTemperature] = useState([])
  const [current,setCurrent] = useState([])
  const [todayFeels,settodayFeels] = useState('')

    //weather icons
  function iconFunc(icon) {  
        if (icon=='Partly cloudy'){
          return (
            <>
          <div className="weather-feels-name">Partly cloudy</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/partly-cloudy-day--v1.png"/>         
          </>
          )
        }else if (icon=='Cloudy') {
          return (
            <>
          <div className="weather-feels-name">Cloudy</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/partly-cloudy-day--v1.png"/>         
          </>
          )
        }else if (icon=='Mist') {
          return (
            <>
          <div className="weather-feels-name">Mist</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/wind.png"/>           
          </>
          )
        }else if (icon=='Overcast') {
          return (
            <>
          <div className="weather-feels-name">Overcast</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/partly-cloudy-day--v1.png"/>
            </>
          )
        }else if (icon=='Blizzard') {
          return (
            <>
          <div className="weather-feels-name">Blizzard</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/wind.png"/>
            </>
          )
        }else if (icon=='Light snow') {
          return (
            <>
          <div className="weather-feels-name">Light snow</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/winter.png"/>
            </>
          )
        }else if (icon=='Blowing snow') {
          return (
            <>
          <div className="weather-feels-name">Blowing snow</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/snow--v1.png"/>
            </>
          )
        }else if (icon=='Patchy snow possible') {
          return (
            <>
          <div className="weather-feels-name">Patchy snow possible</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/rainwater-catchment.png"/>
            </>
          )
        }else if (icon=='Patchy heavy snow') {
          return (
            <>
          <div className="weather-feels-name">Patchy heavy snow</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/snow--v1.png"/>
            </>
          )
        }else if (icon=='Sunny') {
          return (
            <>
          <div className="weather-feels-name">Sunny</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/sun--v1.png"/>
            </>
          )
        }else if (icon=='Patchy moderate snow') {
          return (
            <>
          <div className="weather-feels-name">Patchy moderate snow</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/winter.png"/>            
          </>
          )
        }else if (icon=='Patchy rain possible') {
          return (
            <>
          <div className="weather-feels-name">Patchy rain possible</div>
          <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/rainwater-catchment.png"/>           
          </>
          )
          }else  {
            return (
              <>
            <div className="weather-feels-name"></div>
            <img className="weather-img" src="https://img.icons8.com/doodle/96/000000/thermometer--v3.png"/>            </>
            )
        }
  }

  const hendler = () =>{  
        (async () => {
            try {
            setLoading("true");
            let weatherAPI = `https://api.weatherapi.com/v1/forecast.json?key=f503e85c25234eadbec193044221601&q=${city}&days=3&aqi=no&alerts=no`
            const res = await fetch(encodeURI(weatherAPI));
              if (res.status >= 400) {
              throw new Error("Bad response from server");
              }
            const data = await res.json();
            setInfo(data.location)
            setTemperature(data.forecast.forecastday)
            setCurrent(data.current)
            settodayFeels(data.forecast.forecastday[0].day.condition.text)
            } catch (err) {
              setLoading("null");
            }
        })();
    }
    
        const handleChange = event => {
            setCity(event.target.value);
        }
    
    return (
      <>
        <div className="wrapper">
            <div className="weather-input" >
              <Input value={city} change={handleChange}/>
              <Button triger={hendler}/>
            </div>
            <div className="weather-body">
    {loading === "false" ? (
          <div className="hello-page">
            <span>введіть місто</span>
          </div>
    ) : loading === "null" ? (
          <div className="notFound">
            <h1> Місто не знайдено 😢</h1>
            <span>спробуй змінити мову вводу 😉 Підтримуються RU,ENG</span>
          </div>
    ) : (
          <div className="body">
            <div className="today-wrapper">
              <div className="city-name">
                <div className="city">
                  {info.name}
                </div>
                <div className="country">
                  {info.country}
                </div>
              </div>
              <div className="temperature-today">
                <div className="temperature-now-day">
                    <span>Today</span>
                </div>
                <div className="temperature-now">
                  {current.temp_c}°C
                </div>
                <div className="temperature-feels">
                  feels like {current.feelslike_c}°C
                </div>
              </div>
                <div className="feels-like-today">
                  {iconFunc(todayFeels)}
                </div>
            </div>
          
            <div className="temperature-tree-days-wrapper">
    {temperature.map((el) => (
                <div className="city-temperature-tree-days">
                  <div className="day">
                    <span>{el.date}</span> 
                  </div>
                    <div className="temperature">
                      <div className='min-max-temp-wrap'>
                        <div className="avg-temp">
                          {el.day.avgtemp_c}°C
                        </div>
                        <div className="min-temp">
                          Min {el.day.mintemp_c}°C
                        </div>
                        <div className="max-temp">
                          Max {el.day.maxwind_kph}°C
                        </div>
                        <div className="max-vis">
                          Visibility {el.day.avgvis_km}km
                        </div>
                        <div className="max-vis">
                          Max Wind {el.day.maxwind_kph}km
                        </div>
                      </div>
                        <div className="icon">
                          {iconFunc(el.day.condition.text)}
                        </div>
                    </div>
                        
                </div>
    ))}
            </div>
          </div>
  )}
            </div>
        </div>
    
        
    </>
    )
} 

export default WeatherBody