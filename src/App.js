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
				console.log(data);
				console.log("WEATHER: ", data.weather[0]);
				console.log("ICON: ", data.weather[0].icon);
				console.log("TEMP: ", data.main.temp);
				console.log("FEELS: ", data.main.feels_like);
				setWeather(data.weather[0]);
				setTemp(data.main.temp);
				setFeelsLike(data.main.feels_like);
				setIcon(data.weather[0].icon);
			});
	}, []);
	return (
		<>
			<Container>
				<ImageBox>
					<p>Today</p>
					<img
						src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
						alt=""
					/>
				</ImageBox>
				{/* <p>{weather && weather.main}</p> */}
				<TempBox>
					<p>{temp && temp}</p>
					<FeelsStyle>{feelsLike && feelsLike}</FeelsStyle>
				</TempBox>
			</Container>
		</>
	);
};

const FeelsStyle = styled.p`
	color: lightgray;
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
	/* border: solid 2px black; */
	width: 250px;
	margin-left: 50px;
`;

export default App;
