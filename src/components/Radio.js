import React from "react";
import './Radio.component.css';
import radio from '../assets/icon/radio.png';

class Radio extends React.Component {
    render() {
        return (
            <div>
                <a href="/radio">
                    <img src={radio} className="ui small centered image" style={{'height':'auto','width':'auto'}} alt="" />
                </a>
            </div>
        );
    }
}

export default Radio