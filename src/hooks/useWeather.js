import { useState } from "react"

const useWeather = () => {

   const [weatherData, setWeatherData] = useState({
      location: "",
      climate: "",
      temperature: "",
      maxTemperature: "",
      minTemperature: "",
      humidity: "",
      cloudPercentage: "",
      wind: "",
      time: "",
      longitude: "",
      latitude: "",
   });

   const [loading, setLoading] = useState({
      state: false,
      message: ""
   })
   const [error, setError] = useState(null)

   const fetchWeatherData = async ({ latitude, longitude }) => {

      try {
         setLoading({
            ...loading,
            state: "true",
            message: "Fetching weather data..."
         })

         const response = await fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`)

         if (!response.ok) {
            const errorMessage = `Fetching weather data  failed :${response.status}`;
            throw new Error(errorMessage)
         }

         const data = response.json();
         const updateWeatherData = {
            ...weatherData,
            location:data?.name,
            climate: data?.weather[0].main,
            temperature: data?.main?.temp,
            maxTemperature: data?.main?.temp_max,
            minTemperature: data?.main?.temp_min,
            humidity: data?.main?.humidity,
            cloudPercentage:  data?.main?.cloudPercentage,
            wind: data?.wind?.speed,
            time: data?.dt,
            longitude:data?.longitude,
            latitude: data?.latitude,
         }
         setWeatherData(updateWeatherData)
      }
      catch (err) {
         setError(err);
      } finally {  // for safety  reasons  only      

         setLoading({
            ...loading,
            state: "false",
            message: ""
         })
      }
   }
}