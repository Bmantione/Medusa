import React from "react";
import {Button, Container, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import '../assets/css/player.scss';


class RadioPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {seconds: 0};
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    componentDidMount() {
        Axios.get("config.json")
            .then(res => {
                const config = res.data;
                const source = config.WidgetList.Radio.WidgetConfig.Source;
                let options = Object.entries(source).map((key, i) => {
                    if (key[1].Active !== true) return true;
                    return (
                        <div className="item">
                            <img className="ui avatar image" src={key[1].Img} alt=""/>
                            <div className="content">
                                <div className="header"><a
                                    onClick={() => this.createMusicPlayer(key[1].Source)}>{key[1].Titre}</a></div>
                            </div>
                        </div>
                    );
                });

                this.setState({
                    listRadio: options
                });
            });

        this.interval = setInterval(() => this.tick(), 1000);
    }

    createMusicPlayer(src) {
        this.setState({
            srcRadio: src
        });
    }

    render() {
        const date = new Date();

        let hours = ('0' + date.getHours()).slice(-2);
        let minutes = ('0' + date.getMinutes()).slice(-2);
        let seconds = ('0' + date.getSeconds()).slice(-2);
        let hour_val = hours + ":" + minutes + ":" + seconds;

        return (
            <div>
                <Button icon labelPosition='left' fluid as={Link} to="/">
                    <Icon name="arrow left"/>
                    Retour
                </Button>
                <Container>
                    <Header as='h1'>
                        <div className="ui grid">
                            <div className="four column row">
                                <div className="left floated column">Radio page</div>
                                <div className="right floated column">{hour_val}</div>
                            </div>
                        </div>
                    </Header>
                    <div className="ui container">
                        <h4 className="ui horizontal divider header"><i className="music icon"/>Web Radio</h4>

                        <div className="ui massive horizontal divided list">
                            {this.state.listRadio}
                        </div>
                        <div id="radioPlayer">
                            <AudioPlayer autoPlay src={this.state.srcRadio}
                                         onPlay={e => console.log("onPlay")}/>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default RadioPage