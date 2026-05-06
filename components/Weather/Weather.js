import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const city = "Pomarance";

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
        return <Icon icon="lucide:sun" className="w-6 h-6 text-white" />;
      case "Clouds":
        return <Icon icon="lucide:cloud" className="w-6 h-6 text-white" />;
      case "Rain":
        return <Icon icon="lucide:cloud-rain" className="w-6 h-6 text-white" />;
      case "Snow":
        return <Icon icon="lucide:snowflake" className="w-6 h-6 text-white" />;
      case "Drizzle":
        return (
          <Icon icon="lucide:cloud-drizzle" className="w-6 h-6 text-white" />
        );
      case "Thunderstorm":
        return (
          <Icon icon="lucide:cloud-lightning" className="w-6 h-6 text-white" />
        );
      default:
        return <Icon icon="lucide:sun" className="w-6 h-6 text-white" />;
    }
  };

  return (
    <div className="flex  items-center gap-2">
      <div className="flex items-center gap-2">
        <WeatherIcon condition={condition} />
        <p className="text-white text-[12px] font-medium">{temperature}°C</p>
      </div>
      <p className="text-white/60 text-[12px] font-normal capitalize">
        {cityName}
      </p>
      <span className="mx-2 hidden lg:block"> &bull;</span>
    </div>
  );
};

export default Weather;
