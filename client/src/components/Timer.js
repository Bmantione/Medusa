import React from 'react';
import './Timer.component.css';
import minuteur from '../assets/icon/min.png';

class Timer extends React.Component {
    render() {
        return (
            <div>
                <a href="/timer">
                    <img src={minuteur} className="ui small centered image" style={{'height':'auto','width':'auto'}} alt="" />
                </a>
            </div>
        );
    }
}

export default Timer;