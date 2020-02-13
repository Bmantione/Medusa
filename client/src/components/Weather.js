import Axios from "axios";
import React from "react";
import { Message } from "semantic-ui-react";
import GetIcon from "../service/iconService.js"
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
        if (this.props.Temperature === "Kelvin") {
            return Number.parseFloat(x + 273.15).toFixed(2);
        } else if (this.props.Temperature === "Fahrenheit") {
            return Number.parseFloat(x * 1.8 + 32).toFixed(0)
        }
        else {
            return Math.trunc(x);
        }
    }

    format(date) {
        let d = new Date(date * 1000);
        return d.getHours() + "H" + d.getMinutes();
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
                <i className={"inverted center aligned font-big hour mb-0 wi " + GetIcon(this.state.main)} />
                <br />
                <br />
                <h1>{this.state.name}</h1>
                <br />
                <div className="ui grid centered">
                    <div className="four wide column text-center">
                        <div><span className={"font-massive"}><i className='wi wi-thermometer' /></span></div><br />
                        <span className={"font-large"}>
                            {this.state.temp.actuel} <i className={'wi ' + GetIcon(this.props.Temperature)} />&nbsp;
                            (<i className='wi wi-direction-down' /> {this.state.temp.min} <i className={'wi ' + GetIcon(this.props.Temperature)} /> à 
                            <i className='wi wi-direction-up' /> {this.state.temp.max} <i className={'wi ' + GetIcon(this.props.Temperature)} />)
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