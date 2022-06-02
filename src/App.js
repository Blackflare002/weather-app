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

	const [forecastData, setForecastData] = useState(null);
	useEffect(() => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`
		)
			.then((res) => res.json())
			.then((data) => {
				let forecast = data.list;
				setForecastData(forecast);
			});
	}, []);
	return (
		<TopBox>
			<CurrentWeatherBox>
				<Container>
					<ImageBox>
						<TodayText>Today</TodayText>
						<img
							src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
							alt="Icon depicting the weather"
						/>
						<p>{weather}</p>
					</ImageBox>
					<TempBox>
						<p>{temp && temp}</p>
						<FeelsStyle>{feelsLike && feelsLike}</FeelsStyle>
					</TempBox>
				</Container>
			</CurrentWeatherBox>
			<ForecastContainer>
				<InnerForecastBox>
					{forecastData &&
						forecastData.slice(0, 7).map((el) => {
							return (
								<ForecastItem>
									<ImageBox>
										<p>{el.dt_txt.slice(0, 10)}</p>
										<img
											src={`http://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`}
											alt="Weather icons"
										/>
										<p>{el.weather[0].main}</p>
									</ImageBox>
									<TempBox2>
										<p>{el.main.temp}</p>
										<FeelsStyle>{el.main.feels_like}</FeelsStyle>
									</TempBox2>
								</ForecastItem>
							);
						})}
				</InnerForecastBox>
			</ForecastContainer>
		</TopBox>
	);
};

const TempBox2 = styled.div`
	display: flex;
	gap: 35px;
`;

const TopBox = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
`;

const CurrentWeatherBox = styled.div`
	display: flex;
	justify-content: center;
`;

const ForecastItem = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	border: solid 1px grey;
	padding: 0 30px 0 30px;
	margin: 0 5px 0 5px;
`;

const InnerForecastBox = styled.div`
	display: flex;
`;

const ForecastContainer = styled.div`
	/* border: solid 2px black; */
	margin-top: 50px;
	display: flex;
	flex-direction: row;
	justify-content: center;
`;

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
	border: solid 1px grey;
	width: 250px;
	margin-left: 50px;
	margin-top: 50px;
`;

export default App;
