import React from 'react';
import { Button, Icon, Container, Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Button icon labelPosition='left' fluid as={Link} to="/dashboard">
                    <Icon name="arrow left"/>
                    Retour
                </Button>
                <Container>
                    <Header as='h1'>Admin Page</Header>
                </Container>
            </div>
        );
    }
}

export default AdminPage;