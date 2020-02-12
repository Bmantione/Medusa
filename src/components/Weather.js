import Axios from "axios";
import React from "react";
import { Message } from "semantic-ui-react";
import 'weathericons/css/weather-icons.css';
import 'weathericons/css/weather-icons-wind.css';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            main: null,
            description: null,
            icon: null,
            temp: {
                actuel: null,
                min: null,
                max: null
            },
            wind: {
                speed: null,
                deg: null
            },
            humidity: null,
            sunrise: null,
            sunset: null,
            name: null,
            isError: false,
            errorMsg: "",
        }
    }

    componentDidMount() {
        //https://api.openweathermap.org/data/2.5/weather?q=rennes&APPID=fbea750d7d1154542724db10d81cfd9e&lang=fr
        Axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + this.props.Location + "&APPID=fbea750d7d1154542724db10d81cfd9e&units=metric")
            .then((response) => {
                var result = response.data
                if (response.status === 200) {
                    console.log(result)
                    this.setState({
                        main: result.weather[0].description,
                        icon: result.weather[0].icon,
                        description: result.weather[0].description,
                        temp: {
                            actuel: this.precise(result.main.temp),
                            min: this.precise(result.main.temp_min),
                            max: this.precise(result.main.temp_max)
                        },
                        wind: {
                            speed: result.wind.speed,
                            deg: result.wind.deg,
                        },
                        humidity: result.main.humidity + " %",
                        sunrise: this.format(result.sys.sunrise),
                        sunset: this.format(result.sys.sunset),
                        name: result.name
                    });
                }
            }).catch((error) => {
                if (error.response) {
                    this.setState({
                        isError: true,
                        errorMsg: error.response.data.message
                    })
                }
            });
    }

    // TOUTES LES FONCTIONS UTILES DANS LE COMPOSANT
    precise(x) {
        if (this.props.Temperature[0] !== "Celsius") {
            let number = x - 273.15;
            return Number.parseFloat(number).toPrecision(2);
        } else {
            return Math.trunc(x);
        }
    }

    format(date) {
        let d = new Date(date * 1000);
        return d.getHours() + "H" + d.getMinutes();
    }

    getIcon(name) {
        const icons = {
            "light rain": "wi-rain",
            "moderate rain": "wi-rain",
            "heavy intensity rain": "wi-day-rain",
            "very heavy rain": "wi-day-rain",
            "extreme rain": "wi-rain",
            "freezing rain": "wi-rain-mix",
            "light intensity shower rain": "wi-showers",
            "shower rain": "wi-showers",
            "heavy intensity shower rain": "wi-showers",
            "ragged shower rain	": "wi-showers",
            "thunderstorm with light rain":"wi-thunderstorm",
            "thunderstorm with rain": "wi-thunderstorm",
            "thunderstorm with heavy rain": "wi-thunderstorm",
            "light thunderstorm": "wi-thunderstorm",
            "thunderstorm": "wi-thunderstorm",
            "heavy thunderstorm": "wi-thunderstorm",
            "ragged thunderstorm": "wi-thunderstorm",
            "thunderstorm with light drizzle": "wi-thunderstorm",
            "thunderstorm with drizzle": "wi-thunderstorm",
            "thunderstorm with heavy drizzle": "wi-thunderstorm",
            "light intensity drizzle": "wi-sprinkle",
            "drizzle": "wi-sprinkle",
            "heavy intensity drizzle": "wi-sprinkle",
            "light intensity drizzle rain": "wi-sprinkle",
            "drizzle rain": "wi-sprinkle",
            "heavy intensity drizzle rain": "wi-sprinkle",
            "shower rain and drizzle": "wi-sprinkle",
            "heavy shower rain and drizzle": "wi-showers",
            "shower drizzle": "wi-showers",
            "light snow": "wi-snow",
            "Snow": "wi-snow",
            "Heavy snow": "wi-snow",
            "Sleet": "wi-snow",
            "Light shower sleet": "wi-snow",
            "Shower sleet": "wi-snow",
            "Light rain and snow": "wi-snow",
            "Rain and snow": "wi-snow",
            "Light shower snow": "wi-snow",
            "Shower snow": "wi-snow",
            "Heavy shower snow": "wi-snow",
            "clear sky": "wi-day-sunny",
            "few clouds: 11-25%	": "wi-day-cloudy",
            "scattered clouds: 25-50%": "wi-day-cloudy",
            "broken clouds: 51-84%": "wi-day-cloudy", 
            "overcast clouds: 85-100%":"wi-day-cloudy",
            "few clouds": "wi-day-cloudy",
            "scattered clouds": "wi-day-cloudy-high",
            "broken clouds":"wi-day-cloudy-high",
            "shower rain":"wi-showers",
            "rain":"wi-rain",
            "thunderstorm": "wi-thunderstorm",
            "snow": "wi-snowflake-cold",
            "mist":"wi-fog",
        }
        console.log(name)
        console.log( icons[name])
        return icons[name]
    }

    render() {
        // let icon_link = "https://openweathermap.org/img/wn/" + this.state.icon + "@2x.png";
        if (this.state.isError) {
            return (
                <div>
                    <Message error icon='warning' header='Erreur lors de la récupération de la météo'
                        content={this.state.errorMsg} />
                </div>
            );
        }

        return (
            <div className={"ui blue inverted segment"} style={{ textAlign: "center" }}>
                <br />
                <i className={"inverted center aligned font-big hour mb-0 wi " + this.getIcon(this.state.main)} />
                <br />
                <br />
                <h1>{this.state.name}</h1>
                <br />
                <div className="ui grid centered">
                    <div className="four wide column text-center">
                        <div><span className={"font-massive"}><i className='wi wi-thermometer' /></span></div><br />
                        <span className={"font-large"}>
                            {this.state.temp.actuel} <i className='wi wi-celsius' />&nbsp;
                            (<i className='wi wi-direction-down' /> {this.state.temp.min} <i
                                className='wi wi-celsius' /> à <i
                                className='wi wi-direction-up' /> {this.state.temp.max} <i className='wi wi-celsius' />)
                            </span>
                    </div>
                    <div className="four wide column text-center">
                        <div><span className={"font-massive"}><i className='wi wi-day-sunny' /></span></div><br />
                        <span className={"font-large"}><i
                            className='wi wi-sunrise' /> {this.state.sunrise} à {this.state.sunset} <i
                                className='wi wi-sunset' />
                        </span>
                    </div>
                    <div className="four wide column text-center">
                        <div><span className={"font-massive"}><i className='wi wi-humidity' /></span></div><br />
                        <span className={"font-large"}>
                            {this.state.humidity}
                        </span>
                    </div>
                    <div className="four wide column text-center">
                        <div><span className={"font-massive"}><i className='wi wi-strong-wind' /></span></div><br />
                        <span className={"font-large"}>
                            {this.state.wind.speed + " km/h"} (<i
                                className={"wi wi-wind towards-" + this.state.wind.deg + "-deg"} /> {this.state.wind.deg})
                    </span>
                    </div>
                </div>


            </div>

        );
    }
}

export default Weather;