import React from "react";
import {Button, Container, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Axios from "axios";

class TimerPage extends React.Component {
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
                this.setState({
                    config: config,
                })
            });

        this.interval = setInterval(() => this.tick(), 1000);
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
                                <div className="right floated column" style={{textAlign:"right"}}>{hour_val}</div>
                            </div>
                        </div>
                    </Header>
                    <div className="ui container">
                        <h4 className="ui horizontal divider header"><i className="clock icon"/>Minuteur</h4>

                    </div>
                </Container>
            </div>
        );
    }
}

export default TimerPage