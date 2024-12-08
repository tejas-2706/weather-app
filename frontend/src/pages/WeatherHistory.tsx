// import axios from "axios";
// import { useState } from "react"
// import { BACKEND_URL } from "../config";

// export const WeatherHistory = () => {
//     const [weatherdata, setWeatherdata] = useState<any | null>(null);
//     const fetchWeatherData = async () => {
//         // const apiKey = "894c0ccff83797ea85aaaf8300da1454";
//         // const apiKey = "hey";
//         // https://api.weatherstack.com/current?access_key=894c0ccff83797ea85aaaf8300da1454&query=New Delhi
//         try {
//             const search = await axios.get(`${BACKEND_URL}/api/v1/weather/details`, );
//             console.log("saved data to DB");
//         } catch (error) {
//             console.log(error);
//         }
//     }
//     return <div>
//         <input onChange={(e) => { setCity(e.target.value) }}
//             type="text" placeholder="Enter City Name" value={city} />
//         <button onClick={fetchWeatherData}>Search</button>
//         {weatherdata && (
//             <div>
//                 <h2> Weather in {weatherdata.location.name}</h2>
//                 <p>Temperature: {weatherdata.current.temperature}°C</p>
//                 <p>Weather: {weatherdata.current.weather_descriptions[0]}</p>
//             </div>
//         )}
//     </div>
// }














import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND_URL } from "../config";

export const WeatherHistory = () => {
    const [weatherHistory, setWeatherHistory] = useState<any[]>([]); // To store all weather records from the database

    const fetchWeatherHistory = async () => {
        try {
            // Fetch all weather records from the backend
            const response = await axios.get(`${BACKEND_URL}/api/v1/weather/details`, {
                headers: {
                    Authorization: localStorage.getItem("token"), // Correct usage of headers
                },
            });
            
            setWeatherHistory(response.data); // Assuming the backend sends an array of weather records
            console.log("Fetched weather history:", response.data);
        } catch (error) {
            console.error("Error fetching weather history:", error);
            alert("Failed to fetch weather history. Please try again later.");
        }
    };

    // Fetch weather history on component mount
    useEffect(() => {
        fetchWeatherHistory();
    }, []);

    return (
        <div>
            <h1>Weather History</h1>
            {weatherHistory.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>City</th>
                            <th>Temperature (°C)</th>
                            <th>Weather Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherHistory.map((entry, index) => (
                            <tr key={index}>
                                <td>{entry.cityname}</td>
                                <td>{entry.temperature}</td>
                                <td>{entry.weather_description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No weather history available.</p>
            )}
        </div>
    );
};
