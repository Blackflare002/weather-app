// import logo from './logo.svg';
import "./App.css";
import { useEffect, useState } from "react";
import styled from "styled-components";

const lat = 45.5031824;
const lon = -73.5698065;
const key = "e55d17952f7e09c6f4873cd19cec6be6";

const App = () => {
	const [weather, setWeather] = useState(null);
	const [temp, setTemp] = useState(null);
	const [feelsLike, setFeelsLike] = useState(null);
	const [icon, setIcon] = useState(null);
	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				console.log("WEATHER: ", data.weather[0].description);
				// console.log("ICON: ", data.weather[0].icon);
				// console.log("TEMP: ", data.main.temp);
				// console.log("FEELS: ", data.main.feels_like);
				setWeather(data.weather[0].description);
				setTemp(data.main.temp);
				setFeelsLike(data.main.feels_like);
				setIcon(data.weather[0].icon);
			});
	}, []);

	const [forecastWeather, setForecastWeather] = useState(null);
	const [forecastTemp, setForecastTemp] = useState(null);
	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
		)
			.then((res) => res.json())
			.then((data) => {
				// console.log(data);
				// console.log(data.list);
				// console.log(data.list[0].main);
				let forecast = data.list.map((el) => {
					return el.weather[0].main;
				});
				console.log(forecast.slice(0, 7));
				//
				let forecastTemp = data.list.map((el) => {
					return el.main.temp;
				});
				console.log(forecastTemp.slice(0, 7));
				//
				setForecastWeather(forecast.slice(0, 7));
				setForecastTemp(forecastTemp.slice(0, 7));
			});
	}, []);
	return (
		<>
			<Container>
				<ImageBox>
					<TodayText>Today</TodayText>
					<img
						src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
						alt=""
					/>
					<p>{weather}</p>
				</ImageBox>
				{/* <p>{weather && weather.main}</p> */}
				<TempBox>
					<p>{temp && temp}</p>
					<FeelsStyle>{feelsLike && feelsLike}</FeelsStyle>
				</TempBox>
			</Container>
			<Container>
				{forecastWeather &&
					forecastWeather.map((el) => {
						return (
							<div>
								<p>{el}</p>
							</div>
						);
					})}
				{/* Maybe I should return an object in the forecast var? */}
				{forecastTemp &&
					forecastTemp.map((el) => {
						return (
							<div>
								<p>{el}</p>
							</div>
						);
					})}
			</Container>
		</>
	);
};

const TodayText = styled.p`
	font-weight: bold;
`;

const FeelsStyle = styled.p`
	color: gray;
`;

const ImageBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const TempBox = styled.div`
	display: flex;
	justify-content: space-around;
`;

const Container = styled.div`
	border: solid 2px black;
	width: 250px;
	margin-left: 50px;
`;

export default App;
