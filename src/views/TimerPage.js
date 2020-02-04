import React from "react";
import {Button, Container, Header, Icon} from "semantic-ui-react";
import {Link} from "react-router-dom";
import Axios from "axios";

class TimerPage extends React.Component {

    componentDidMount() {
        Axios.get("config.json")
            .then(res => {
                const config = res.data;
                this.setState({
                    config: config,
                })
            })
    }

    render() {
        return (
            <div>
                <Button icon labelPosition='left' fluid as={Link} to="/">
                    <Icon name="arrow left"/>
                    Retour
                </Button>
                <Container>
                    <Header as='h1'>Timer page</Header>
                </Container>
            </div>
        );
    }
}

export default TimerPage