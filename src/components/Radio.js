import React from "react";
import './Radio.component.css';
import radio from '../assets/icon/radio.png';
import { Image } from "semantic-ui-react";

class Radio extends React.Component {
    render() {
        return (
            <div>
                <a href="/radio">
                    <br/>
                    <br/>
                    <Image src={radio} size='medium' centered/>
                </a>
            </div>
        );
    }
}

export default Radio