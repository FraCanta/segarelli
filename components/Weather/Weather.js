import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const Weather = ({ variant = "light" }) => {
  const [weatherData, setWeatherData] = useState(null);
  const city = "Pomarance";
  const isPrimary = variant === "primary";
  const isAccent = variant === "accent";
  const iconClassName = `w-6 h-6 ${
    isAccent ? "text-siena" : isPrimary ? "text-primary" : "text-white"
  }`;
  const temperatureClassName = `${
    isAccent ? "text-siena" : isPrimary ? "text-primary" : "text-white"
  } text-[12px] font-medium`;
  const cityClassName = `${
    isAccent ? "text-siena" : isPrimary ? "text-primary/70" : "text-white/60"
  } text-[12px] font-normal capitalize`;

  // Recupero dati meteo
  useEffect(() => {
    const fetchWeather = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=c097d9dcbbcc8a18f345401bf9703989&units=metric`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Errore nel recupero dei dati");
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error("Errore:", error);
      }
    };

    fetchWeather();
  }, [city]);

  if (!weatherData) return <p>Caricamento...</p>;

  const cityName = weatherData.name;
  const temperature = Math.round(weatherData.main.temp);
  const condition = weatherData.weather[0].main;

  // Icone meteo outline con Iconify
  const WeatherIcon = ({ condition }) => {
    switch (condition) {
      case "Clear":
        return <Icon icon="lucide:sun" className={iconClassName} />;
      case "Clouds":
        return <Icon icon="lucide:cloud" className={iconClassName} />;
      case "Rain":
        return <Icon icon="lucide:cloud-rain" className={iconClassName} />;
      case "Snow":
        return <Icon icon="lucide:snowflake" className={iconClassName} />;
      case "Drizzle":
        return <Icon icon="lucide:cloud-drizzle" className={iconClassName} />;
      case "Thunderstorm":
        return (
          <Icon icon="lucide:cloud-lightning" className={iconClassName} />
        );
      default:
        return <Icon icon="lucide:sun" className={iconClassName} />;
    }
  };

  return (
    <div className="flex  items-center gap-2">
      <div className="flex items-center gap-2">
        <WeatherIcon condition={condition} />
        <p className={temperatureClassName}>{temperature}&deg;C</p>
      </div>
      <p className={cityClassName}>{cityName}</p>
      <span className="mx-2 hidden lg:block"> &bull;</span>
    </div>
  );
};

export default Weather;
