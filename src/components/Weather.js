import Axios from "axios";
import React from "react";
import { List, Message } from "semantic-ui-react";
import 'weathericons/css/weather-icons.css';

class Weather extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            description: null,
            icon: null,
            temp: {
                actuel: null,
                min: null,
                max: null
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
        // Api pour la ville de rennes
        Axios.get("https://api.openweathermap.org/data/2.5/weather?q=" + this.props.Location + "&APPID=fbea750d7d1154542724db10d81cfd9e&lang=fr")
            .then((response) => {
                var result = response.data
                if (response.status === 200) {
                    console.log(result)
                    this.setState({
                        icon: result.weather[0].icon,
                        description: result.weather[0].description,
                        temp: {
                            actuel: this.precise(result.main.temp),
                            min: this.precise(result.main.temp_min),
                            max: this.precise(result.main.temp_max)
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
        if (this.props.Temperature === "Celsius") {
            let number = x - 273.15;
            return Number.parseFloat(number).toPrecision(2);
        }
        return x
    }

    format(date) {
        let d = new Date(date * 1000);
        return d.getHours() + "H" + d.getMinutes();
    }

    render() {
        let icon_link = "https://openweathermap.org/img/wn/" + this.state.icon + "@2x.png";
        if (this.state.isError) {
            return (
                <div>
                    <Message error icon='warning' header='Erreur lors de la récupération de la météo' content={this.state.errorMsg} />
                </div>
            );
        }

        return (
            <div className="Weather ui grid">
                <div className="eight wide column">
                    <div style={{ textAlign: "center" }}>
                        <img src={icon_link} alt="" title={this.state.description} />
                    </div>
                    <br />
                    <h3 style={{ textAlign: "center" }}>{this.state.name}</h3>
                </div>
                <div className="eight wide column">
                    <br />
                    <List>
                        <List.Item>
                            <List.Content>
                                <i className='wi wi-thermometer' /> Température actuel : {this.state.temp.actuel} <i className='wi wi-celsius' />
                            </List.Content>                        
                        </List.Item>
                        <List.Item>
                            <List.Content><i className='wi wi-thermometer' /> Température minimum : {this.state.temp.min} <i className='wi wi-celsius' /></List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content><i className='wi wi-thermometer' /> Température maximum : {this.state.temp.max} <i className='wi wi-celsius' /></List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content><i className='wi wi-sunrise' /> Levé du soleil : {this.state.sunrise}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content><i className='wi wi-sunset' /> Couché du soleil : {this.state.sunset}</List.Content>
                        </List.Item>
                        <List.Item>
                            <List.Content><i className='wi wi-humidity' /> Humidité : {this.state.humidity}</List.Content>
                        </List.Item>
                    </List>
                </div>
            </div>
        );
    }
}

export default Weather;