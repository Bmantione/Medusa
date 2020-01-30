import React from "react";
import { List, Image } from "semantic-ui-react";

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
            name: null
        }
    }

    componentDidMount() {
        //https://api.openweathermap.org/data/2.5/weather?q=rennes&APPID=fbea750d7d1154542724db10d81cfd9e&lang=fr
        // Api pour la ville de rennes
        fetch("https://api.openweathermap.org/data/2.5/weather?q=Rennes&APPID=fbea750d7d1154542724db10d81cfd9e&lang=fr")
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
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
                });
    }

    // TOUTES LES FONCTIONS UTILES DANS LE COMPOSANT
    precise(x) {
        let number = x - 273.15;
        return Number.parseFloat(number).toPrecision(2);
    }

    format(date) {
        console.log(date);
        let d = new Date(date * 1000);
        return d.getHours() + "H" + d.getMinutes();
    }

    render() {
        let icon_link = "https://openweathermap.org/img/wn/" + this.state.icon + "@2x.png";

        return (
            <div>
                <img src={icon_link} alt="" title={this.state.description}/>
                <br/>
                <h3>{this.state.name}</h3>
                <br/>
                <List>
                    <List.Item>
                        <Image src={require("../assets/images/wi-thermometer.png")} />
                        <List.Content>Température actuel : {this.state.temp.actuel}</List.Content>
                        <Image src={require("../assets/images/wi-celsius.png")} />
                    </List.Item>
                    <List.Item>
                        <Image src={require("../assets/images/wi-thermometer.png")} />
                        <List.Content>Température minimum : {this.state.temp.min}</List.Content>
                        <Image src={require("../assets/images/wi-celsius.png")} />
                    </List.Item>
                    <List.Item>
                        <Image src={require("../assets/images/wi-thermometer.png")} />
                        <List.Content>Température maximum : {this.state.temp.max}</List.Content>
                        <Image src={require("../assets/images/wi-celsius.png")} />
                    </List.Item>
                    <List.Item>
                        <Image src={require("../assets/images/wi-sunrise.png")} />
                        <List.Content>levé du soleil : {this.state.sunrise}</List.Content>
                    </List.Item>
                    <List.Item>
                        <Image src={require("../assets/images/wi-sunset.png")} />
                        <List.Content>couché du soleil : {this.state.sunset}</List.Content>
                    </List.Item>
                    <List.Item>
                        <Image src={require("../assets/images/wi-humidity.png")} />
                        <List.Content>Humidité : {this.state.humidity}</List.Content>
                    </List.Item>
                </List>
                <br/>
                <br/>
            </div>
        );
    }
}

export default Weather;