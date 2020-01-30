import React from 'react';
//import Weather from "../components/Weather";
import Clock from "../components/Clock";
import "../assets/css/dashboard.css";
import News from "../components/News";


class Dashboard extends React.Component {
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
        const seg_size = Math.floor(document.body.offsetHeight / 2);
        const segment_style = {
            height: seg_size + 'px'
        };
        const bloc_style = {
            padding: '1px',
            marging: '2px'
        };

        return (
            <div>
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
                            <News/>
                        </div>
                    </div>
                    <div className="eight wide column" style={bloc_style}>
                        <div className="ui green inverted segment" style={segment_style}>
                            <a href="/timer">
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

export default Dashboard;