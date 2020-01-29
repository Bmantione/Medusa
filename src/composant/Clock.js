import React from 'react';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {seconds: 0};
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
        const dayNames = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];

        let date = new Date();

        let hours = ('0' + date.getHours()).slice(-2);
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let seconds = ('0' + date.getSeconds()).slice(-2);
        let hour_val = hours + ":" + minutes + ":" + seconds;

        let weekday = dayNames[date.getDay()];
        let day = date.getDate();
        let month = monthNames[date.getMonth()];
        let year = date.getFullYear();
        let date_val = weekday + ' ' + day + ' ' + month + ' ' + year;

        return (
            <div style={{'textAlign':'center', 'display':'inline-grid'}}>
                <span className='hour' style={{'fontSize':'9vw', 'marginBottom':'0.6em'}}>{hour_val}</span>
                <span className='date' style={{'fontSize':'4vw', }}>{date_val}</span>
            </div>
        );
    }
}

export default Clock;