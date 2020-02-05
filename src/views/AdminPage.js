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
            Location: "",
            Temperature: "",
            TimeZone: "",
            Format: "",
            Source: "",
            NewsNumber: "",
            Times: "",
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
                    BottomRight: config.DashboardConfig.BottomRight,
                    Location: config.WidgetList["Météo"].WidgetConfig.Location,
                    Temperature: config.WidgetList["Météo"].WidgetConfig.Temperature,
                    TimeZone: config.WidgetList["Horloge"].WidgetConfig.TimeZone,
                    Format: config.WidgetList["Horloge"].WidgetConfig.Format,
                    Source: config.WidgetList["News"].WidgetConfig.Source,
                    NewsNumber: config.WidgetList["News"].WidgetConfig.NewsNumber,
                    Times: config.WidgetList["Timer"].WidgetConfig.Times,
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

    generateFormParam = (config) => {
        var formField = [];
        for (var key in config.WidgetList) {
            if (key === "Radio") {
                formField.push(
                    <Grid.Column key={key}>
                        <Divider horizontal>Config Radio</Divider>
                        <Message info icon='info' content={`Le widget radio n'est pas paramétrable`} />
                    </Grid.Column>
                );
            } else {
                formField.push(
                    <Grid.Column key={key}>
                        <Divider horizontal>Config {key}</Divider>
                        {this.generateFormList(config.WidgetList[key].WidgetConfig)}
                    </Grid.Column>
                );
            }
        }
        return formField;
    }

    generateFormList = (config) => {
        var formField = [];
        for (var [param, value] of Object.entries(config)) {
            formField.push(
                <Form.Input label={param} defaultValue={value} key={param} name={param} onChange={this.handleChange}/>
            );
        }
        return formField;
    }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    updateJson = () => {
        const { BottomLeft, BottomRight, TopLeft, TopRight, config, Location ,Temperature, TimeZone, Format, Source, NewsNumber, Times } = this.state;
        config.DashboardConfig.TopLeft = TopLeft;
        config.DashboardConfig.TopRight = TopRight;
        config.DashboardConfig.BottomLeft = BottomLeft;
        config.DashboardConfig.BottomRight = BottomRight;

        // Weather config
        config.WidgetList["Météo"].WidgetConfig.Location = Location;
        config.WidgetList["Météo"].WidgetConfig.Temperature = Temperature;

        // Clock config
        config.WidgetList["Horloge"].WidgetConfig.TimeZone = TimeZone;
        config.WidgetList["Horloge"].WidgetConfig.Format = Format;

        // News config
        config.WidgetList["News"].WidgetConfig.Source = Source;
        config.WidgetList["News"].WidgetConfig.NewsNumber = NewsNumber;

        // Timer config
        config.WidgetList["Timer"].WidgetConfig.Times = Times;

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
                            {this.generateFormParam(config)}
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