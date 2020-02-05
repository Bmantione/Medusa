import Axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Divider, Form, Grid, Header, Icon, Message } from 'semantic-ui-react';
import './adminPage.views.css';

class AdminPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {},
            TopRight: "",
            TopLeft: "",
            BottomLeft: "",
            BottomRight: "",
        };
    }


    componentDidMount() {
        Axios.get("config.json")
            .then(res => {
                var config = res.data
                this.setState({
                    config: config,
                    TopLeft: config.DashboardConfig.TopLeft,
                    TopRight: config.DashboardConfig.TopRight,
                    BottomLeft: config.DashboardConfig.BottomLeft,
                    BottomRight: config.DashboardConfig.BottomRight
                })
            })
    }

    createOptionList() {
        var options = [];
        for (let [key] of Object.entries(this.state.config.WidgetList)) {
            options.push({
                key: key,
                value: key,
                text: key,
            })
        }
        return options
    }

    generateFormParam = (key, config) => {
        
        if (key !== "Radio") {
            var formField = [];
            for (var [param, value] of Object.entries(config.WidgetList[key].WidgetConfig)) {
                formField.push(<Form.Input label={param} value={value} />);
            }

            return formField;
        }

        return (
            <Message info icon='info' content={`Le widget radio n'est pas paramétrable`}/>
        );
        
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    updateJson = () => {
        const { BottomLeft, BottomRight, TopLeft, TopRight, config } = this.state;
        config.DashboardConfig.TopLeft = TopLeft;
        config.DashboardConfig.TopRight = TopRight;
        config.DashboardConfig.BottomLeft = BottomLeft;
        config.DashboardConfig.BottomRight = BottomRight;

        Axios.post("/api/save", config).then(res => {
            console.log("Save success")
        })
    }

    componentWillUnmount() {

    }

    renderFormPosition() {
        const { BottomLeft, BottomRight, TopLeft, TopRight, config } = this.state;
        if (this.state.config.DashboardConfig !== undefined) {
            return (
                <Form onSubmit={this.updateJson}>
                    <Grid columns={2}>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Select name='TopLeft' label="Position Haut Gauche" defaultValue={TopLeft} options={this.createOptionList()} onChange={this.handleChange} />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Select name='TopRight' label="Position Haut Droite" defaultValue={TopRight} options={this.createOptionList()} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Select name='BottomLeft' label="Position Bas Gauche" defaultValue={BottomLeft} options={this.createOptionList()} onChange={this.handleChange} />
                            </Grid.Column>
                            <Grid.Column>
                                <Form.Select name='BottomRight' label="Position Bas Droite" defaultValue={BottomRight} options={this.createOptionList()} onChange={this.handleChange} />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Divider horizontal>Config {TopLeft}</Divider>
                                {this.generateFormParam(TopLeft, config)}
                            </Grid.Column>
                            <Grid.Column>
                                <Divider horizontal>Config {TopRight}</Divider>
                                {this.generateFormParam(TopRight, config)}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Divider horizontal>Config {BottomLeft}</Divider>
                                {this.generateFormParam(BottomLeft, config)}
                            </Grid.Column>
                            <Grid.Column>
                                <Divider horizontal>Config {BottomRight}</Divider>
                                {this.generateFormParam(BottomRight, config)}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>

                    <Button.Group floated='right'>
                        <Button>Annuler</Button>
                        <Button.Or text='ou' />
                        <Button positive type='submit' onClick={this.handleSave}>Valider</Button>
                    </Button.Group>
                </Form>
            );
        }
    }

    render() {
        return (
            <div>
                <Button icon labelPosition='left' fluid as={Link} to="/dashboard">
                    <Icon name="arrow left" />
                    Retour
                </Button>
                <Container>
                    <Header as='h1'>Admin Page</Header>
                    {this.renderFormPosition()}
                </Container>
            </div>
        );
    }
}

export default AdminPage;