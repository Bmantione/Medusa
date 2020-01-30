import React from 'react';
import './App.css';
import Clock from './composant/Clock.js';
//import Weather from "./composant/Weather";
import Twitter from './composant/News';

class App extends React.Component {
    render() {
        const seg_size = Math.floor(document.body.offsetHeight / 2);
        const segment_style = {
            height: seg_size + 'px'
        };
        const bloc_style = {
            padding: '1px',
            marging: '2px'
        };

        return (
            <div className="App">
                <div className="ui grid">
                    <div className="eight wide column" style={bloc_style}>
                        <div className="ui blue inverted segment" style={segment_style}>
                            <a href="./#">
                                <img src="./icon/radio.png" className="ui small centered image" style={{'height':'100%','width':'auto'}} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="eight wide column" style={bloc_style}>
                        <div className="ui red inverted segment" style={segment_style}>
                            <Twitter/>
                        </div>
                    </div>
                    <div className="eight wide column" style={bloc_style}>
                        <div className="ui green inverted segment" style={segment_style}>
                            <a href="./#">
                                <img src="./icon/min.png" className="ui small centered image" style={{'height':'100%','width':'auto'}} alt="" />
                            </a>
                        </div>
                    </div>
                    <div className="eight wide column" style={bloc_style}>
                        <div className="ui black inverted segment" style={{'height': seg_size + 'px', 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center'}}>
                            <Clock/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;