import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import Input from "antd/es/input/Input";
import { Button, Switch, message } from "antd"; // Import Switch from antd
import { List, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";

const api = {
  key: "bebc1c9bcc22a97d80b625d0407799b7",
  url: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const storedUser = localStorage.getItem("loggedInUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const [messageApi, contextHolder] = message.useMessage();
  const [search, setSearch] = useState(parsedUser.prefered);
  const [weather, setWeather] = useState(null);
  const [prefered, setPrefered] = useState(parsedUser.prefered);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric");
  const Navigate = useNavigate();

  useEffect(() => {
    fetchData();
    if (search) {
      fetchData();
    }
  }, [unit]);
  const fetchData = async () => {
    try {
      const weatherResponse = await axios.get(
        `${api.url}weather?q=${search}&units=${unit}&APPID=${api.key}`
      );
      const forecastResponse = await axios.get(
        `${api.url}forecast?q=${search}&units=${unit}&APPID=${api.key}`
      );

      setWeather(weatherResponse.data);
      setForecast(forecastResponse.data);
      updateChart(forecastResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const updateChart = (forecastData) => {
    const ctx = document.getElementById("temperatureChart").getContext("2d");
    const labels = forecastData.list.map((item) => DateFormat(item.dt));
    const data = forecastData.list.map((item) => item.main.temp);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Temperature",
            data: data,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: false,
          },
        },
      },
    });
  };

  const savePreferredLocation = () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    loggedInUser.prefered = prefered;
    localStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
    messageApi.open({
      type: "success",
      content: "preferred location updated",
    });
  };
  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  const DateFormat = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const WeatherModule = () => {
    return (
      <div className="weather-details">
        <h2 className="location">
          <div>
            <div className="card">
              <div class="flex justify-end ">
                <Switch
                  style={{ backgroundColor: "blue", borderColor: "blue" }}
                  checkedChildren="F°"
                  unCheckedChildren="C°"
                  defaultChecked={unit === "imperial"}
                  onChange={toggleUnit}
                />
              </div>

              <div>
                <p className="date">{DateFormat(weather.dt)}</p>
                <div className="temp">
                  {weather.main.temp}°{unit === "metric" ? "C" : "F"}
                </div>

                <div className="text-xl">
                  {weather.name} | {weather.sys.country}{" "}
                </div>
                <div className="text-lg text-black font-bold">
                  {weather.weather[0].description}
                </div>
              </div>
            </div>
          </div>
        </h2>
        <div className="innercard">
          <div
            style={{ display: "flex", gap: "1.5rem", flexDirection: "column" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                style={{ borderRadius: "100%", height: "3rem" }}
                src="https://img.icons8.com/?size=256&id=HwGBDTAiOecf&format=png"
              />
              <div>
                <div className="lg:text-2xl text-base">
                  <b> Weather</b>
                </div>
                {weather.weather[0].main}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                style={{ borderRadius: "100%", height: "3rem" }}
                src="  https://img.icons8.com/?size=256&id=51497&format=png"
              />
              <div>
                <div className="lg:text-2xl text-base">
                  <b>Pressure</b>
                </div>
                {weather.main.pressure}
              </div>
            </div>
          </div>

          <div
            style={{ display: "flex", gap: "1.5rem", flexDirection: "column" }}
          >
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img
                style={{ borderRadius: "100%", height: "3rem" }}
                src="https://img.icons8.com/?size=256&id=UjSURd7eHUYL&format=png"
              />
              <div>
                <div className="lg:text-2xl text-base">
                  <b>Humidity</b>
                </div>
                {weather.main.humidity} %
              </div>
            </div>
            <div
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <img
                className="rounded-full h-12"
                src="https://img.icons8.com/?size=256&id=pLiaaoa41R9n&format=png"
              />
              <div>
                <div className="lg:text-2xl text-base">
                  <b>Wind Speed</b>
                </div>
                {weather.wind.speed} m/s
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ForecastModule = () => {
    if (!forecast) return null;

    const dailyForecasts = forecast.list.filter(
      (item, index) => index % 8 === 0
    );

    return (
      <div className="forecast">
        <div className="text-xl font-bold"> 5 - Day Weather Forecast</div>

        <List
          dataSource={dailyForecasts}
          renderItem={(item) => (
            <List.Item key={item.dt}>
              <div className="forecast-item">
                <p>{DateFormat(item.dt)}</p>
                <p>
                  {item.main.temp}°{unit === "metric" ? "C" : "F"}
                </p>
                <p>{item.weather[0].main}</p>
              </div>
            </List.Item>
          )}
        />
      </div>
    );
  };

  const handleLogOut = () => {
    Navigate("/login");
  };
  const handleSearchClick = () => {
    if (search) {
      fetchData();
    }
  };

  return (
    <div className="Main">
      {contextHolder}
      {weather ? (
        <div>
          <div>
            <header class="text-white py-4 bg-blue-200">
              <div class="container mx-auto flex justify-between items-center">
                <div class="flex items-center">
                  <img
                    className="h-10 ml-4 "
                    src="https://hugeitsolutions.com/images/logo/HugeLogo.png"
                    alt="logo"
                  />
                </div>

                <form>
                  <button
                    onClick={handleLogOut}
                    type="submit"
                    class="bg-sky-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-4"
                  >
                    Logout
                  </button>
                </form>
              </div>
            </header>
          </div>
          <div class="lg:flex justify-evenly mt-4">
            <div className="join">
              <div>
                <div class=" text-xl font-bold flex justify-center opacity-75 rounded">
                  {" "}
                  Welcome {localStorage.getItem("Current")}{" "}
                </div>
                <div class=" text-xl font-bold flex justify-center opacity-75 rounded">
                  {" "}
                  Search City Below{" "}
                </div>
                <Input
                  className="search-box"
                  type="text"
                  placeholder="Search city ..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />{" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={handleSearchClick}
                    class="bg-sky-500 mt-4 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mr-4 w-20"
                  >
                    {" "}
                    Search
                  </button>
                </div>
              </div>
            </div>

            <div className="text-xl font-bold mt-2 lg:mt-0 ">
              <div
                style={{
                  justifyContent: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div class=" text-xl font-bold flex justify-center opacity-75 rounded">
                  {" "}
                  Change preferred
                </div>
                <div class=" text-xl font-bold flex justify-center opacity-75 rounded">
                  {" "}
                  City Below{" "}
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Input
                    className="search-box"
                    value={prefered}
                    onChange={(e) => setPrefered(e.target.value)}
                    placeholder="preferred Location"
                    // className="mb-4"
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={savePreferredLocation}
                    class="bg-sky-500 mt-4 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded mr-4 w-20"
                  >
                    {" "}
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:flex lg:mt-6 lg:p-8 gap-8">
            <div className="p-2">{WeatherModule()}</div>
            <div className="p-2">{ForecastModule()}</div>
          </div>
          <div className="chart">
            <canvas id="temperatureChart" width="400" height="100"></canvas>
          </div>
        </div>
      ) : (
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin size="large" />
        </div>
      )}
    </div>
  );
};

export default Weather;
