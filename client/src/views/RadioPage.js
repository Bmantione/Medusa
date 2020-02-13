import React from "react";
import { Button, Container, Header, Icon, Grid, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Axios from "axios";
import AudioPlayer from "react-h5-audio-player";
import '../assets/css/player.scss';

class RadioPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
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
        Axios.get("widgetConfig.json")
            .then(res => {
                const config = res.data;
                console.log(config)
                const source = config.Radio.Source;
                let options = Object.entries(source).map((key, i) => {
                    if (key[1].Active !== true) return true;
                    return (
                        <Grid.Column>
                            <Image style={{ "cursor": "pointer"}} circular size='small' src={key[1].Img} onClick={() => this.createMusicPlayer(key[1].Source)} />
                        </Grid.Column>
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
                    <Icon name="arrow left" />
                    Retour
                </Button>
                <Container>
                    <Header as='h1'>
                        <div className="ui grid">
                            <div className="four column row">
                                <div className="left floated column">Radio page</div>
                                <div className="right floated column" style={{ textAlign: "right" }}>{hour_val}</div>
                            </div>
                        </div>
                    </Header>
                    <div className="ui container">
                        <h4 className="ui horizontal divider header"><i className="music icon" />Web Radio</h4>

                        <Grid columns={4}>
                            <Grid.Row >
                                {this.state.listRadio}
                            </Grid.Row>
                        </Grid>

                        <div id="radioPlayer">
                            <AudioPlayer autoPlay src={this.state.srcRadio}
                                onPlay={e => console.log("onPlay")} />
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
}

export default RadioPage