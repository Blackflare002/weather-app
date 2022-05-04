// import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";

const lat = 45.5031824;
const lon = -73.5698065;
const key = "e55d17952f7e09c6f4873cd19cec6be6";

const App = () => {
	const [weather, setWeather] = useState(null);
	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				console.log("WEATHER: ", data.weather[0]);
				setWeather(data.weather[0]);
			});
	}, []);
	return (
		<>
			<p>{weather && weather.main}</p>
		</>
	);
};

export default App;
