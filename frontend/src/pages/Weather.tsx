import axios from "axios";
import { useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Weather = () => {
    const [city, setCity] = useState("");
    const [weatherdata, setWeatherdata] = useState<any | null>(null);
    const [searchHistory, setSearchHistory] = useState<any>([]);
    const navigate = useNavigate();
    const fetchWeatherData = async () => {
        // const apiKey = "894c0ccff83797ea85aaaf8300da1454";
        // const apiKey = "hey";
        // https://api.weatherstack.com/current?access_key=894c0ccff83797ea85aaaf8300da1454&query=New Delhi
        try {
            const response = await axios.get(`https://api.weatherstack.com/current?access_key=894c0ccff83797ea85aaaf8300da1454&query=${city}`);
            const data = response.data;
            console.log(data);
            if (data.success === false) {
                console.log("City Not found");
                alert("Wrong city")
            }
            setWeatherdata(data);

            const searchRecord = {
                city,
                weather: {
                    temperature: data.current.temperature,
                    description: data.current.weather_descriptions[0],
                },
            };
            setSearchHistory([...searchHistory,searchRecord]);
            const search = await axios.post(
                `${BACKEND_URL}/api/v1/weather/details`,
                searchRecord, // Send the record as the body
                {
                    headers: {
                        Authorization: localStorage.getItem("token"), // Send token for authentication
                        "Content-Type": "application/json", // Specify JSON content
                    },
                }
            );
            console.log("saved data to DB", search);
            navigate("/weatherhistory")
        } catch (error) {
            console.log(error);
        }
    }
    return <div>
        <input onChange={(e) => { setCity(e.target.value) }}
            type="text" placeholder="Enter City Name" value={city} />
        <button onClick={fetchWeatherData}>Search</button>
        {weatherdata && (
            <div>
                <h2> Weather in {weatherdata.location.name}</h2>
                <p>Temperature: {weatherdata.current.temperature}°C</p>
                <p>Weather: {weatherdata.current.weather_descriptions[0]}</p>
            </div>
        )}

        <h2>Search History</h2>
        {searchHistory.length > 0 ? (
            <ul>
                {searchHistory.map((entry, index) => (
                    <li key={index}>
                        {/* <strong>User:</strong> {entry.user} <br /> */}
                        <strong>City:</strong> {entry.city} <br />
                        <strong>Temperature:</strong> {entry.weather.temperature}°C <br />
                        <strong>Weather:</strong> {entry.weather.description} <br />
                        <hr />
                    </li>
                ))}
            </ul>
        ) : (
            <p>No searches yet.</p>
        )}
    </div>
}