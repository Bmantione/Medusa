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
            WidgetList: {},
            TopRight: "",
            TopLeft: "",
            BottomLeft: "",
            BottomRight: "",
            ConfigTopLeft: {},
            ConfigTopRight: {},
            ConfigBottomLeft: {},
            ConfigBottomRight: {},
        };
    }


    componentDidMount() {
        Axios.get("db.json")
            .then(res => {
                var config = res.data
                this.setState({
                    config: config,
                    TopLeft: Object.keys(config.DashboardConfig.TopLeft)[0],
                    TopRight: Object.keys(config.DashboardConfig.TopRight)[0],
                    BottomLeft: Object.keys(config.DashboardConfig.BottomLeft)[0],
                    BottomRight: Object.keys(config.DashboardConfig.BottomRight)[0],
                    ConfigTopLeft: config.DashboardConfig.TopLeft,
                    ConfigTopRight: config.DashboardConfig.TopRight,
                    ConfigBottomLeft: config.DashboardConfig.BottomLeft,
                    ConfigBottomRight: config.DashboardConfig.BottomRight,
                })
            })

        Axios.get("widgetConfig.json")
            .then(res => {
                this.setState({
                    WidgetList: res.data
                })
            })
    }

    createOptionList() {
        var options = [];
        for (let [key] of Object.entries(this.state.WidgetList)) {
            options.push({
                key: key,
                value: key,
                text: key,
            })
        }
        return options
    }

    handleChangeForm = (e, { name, value }) => {
        const nameSplited = name.split(".")
        const stateKey = nameSplited[0]
        const nameKey = nameSplited[1]
        const widgetKey = nameSplited[2]
        let config = Object.assign({}, this.state[stateKey])
        if (Object.keys(this.state[stateKey])[0] === widgetKey) {
            config[widgetKey][nameKey] = value
            this.setState(
                { [stateKey]: config }
            )
        } else {
            let config = Object.assign({}, this.state.WidgetList[widgetKey])
            config = {
                [widgetKey]: config
            }
            this.setState(
                { [stateKey]: config }
            )
        }
    }

    generateFormSelect(values) {
        var options = [];

        values.forEach(val => {
            options.push({
                key: val,
                value: val,
                text: val,
            })
        })
        return options
    }

    generateForm = (configAvailable, widgetKey, position) => {
        var formField = [];

        if (configAvailable[widgetKey] !== undefined && widgetKey !== 'Radio') {
            for (var [param, value] of Object.entries(configAvailable[widgetKey])) {
                if (typeof value === "object") {
                    if (this.state.config.DashboardConfig[position][widgetKey] !== undefined) {
                        formField.push(
                            <Form.Select
                                key={param}
                                name={"Config" + position + "." + param + "." + widgetKey}
                                label={param}
                                defaultValue={this.state.config.DashboardConfig[position][widgetKey][param] || "default"}
                                options={this.generateFormSelect(value)}
                                onChange={this.handleChangeForm}
                            />
                        )
                    } else {
                        //Use default config
                        formField.push(
                            <Form.Select
                                key={param}
                                name={"Config" + position + "." + param + "." + widgetKey}
                                label={param}
                                defaultValue={value[0]}
                                options={this.generateFormSelect(value)}
                                onChange={this.handleChangeForm}
                            />
                        )
                    }
                } else {
                    if (this.state.config.DashboardConfig[position][widgetKey] !== undefined) {
                        let name = "Config" + position + "." + param + "." + widgetKey
                        formField.push(
                            <Form.Input
                                label={param}
                                defaultValue={this.state.config.DashboardConfig[position][widgetKey][param]}
                                key={param}
                                name={name}
                                onChange={this.handleChangeForm}
                            />
                        );
                    } else {
                        //Use default config
                        formField.push(
                            <Form.Input
                                label={param}
                                defaultValue={value}
                                key={param}
                                name={"Config" + position + "." + param + "." + widgetKey}
                                onChange={this.handleChangeForm}
                            />
                        );
                    }
                }
            }
        } else {
            return <Message info icon='warning sign' content='La radio ne peut être modifier' />
        }
        return formField;
    }

    handleChange = (e, { name, value }) => {
        let config = Object.assign({}, this.state.WidgetList[value])
        config = {
            [value]: config
        }

        this.setState({
            ["Config" + name]: config
        })

        this.setState({ [name]: value })
    }

    updateJson = () => {
        const { config, ConfigTopLeft, ConfigBottomLeft, ConfigTopRight, ConfigBottomRight } = this.state;

        config.DashboardConfig.TopLeft = ConfigTopLeft;
        config.DashboardConfig.TopRight = ConfigTopRight;
        config.DashboardConfig.BottomLeft = ConfigBottomLeft;
        config.DashboardConfig.BottomRight = ConfigBottomRight;

        Axios.post("/api/save", config).then(
            console.log("Sauvegarde réussie")
        )
    }

    renderFormPosition() {
        const { BottomLeft, BottomRight, TopLeft, TopRight, config, WidgetList } = this.state;
        if (config.DashboardConfig !== undefined) {
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
                                <Divider horizontal>Config Haut Gauche</Divider>
                                {this.generateForm(WidgetList, TopLeft, "TopLeft")}
                            </Grid.Column>
                            <Grid.Column>
                                <Divider horizontal>Config Haut Droite</Divider>
                                {this.generateForm(WidgetList, TopRight, "TopRight")}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Divider horizontal>Config Bas Gauche</Divider>
                                {this.generateForm(WidgetList, BottomLeft, "BottomLeft")}
                            </Grid.Column>
                            <Grid.Column>
                                <Divider horizontal>Config Bas Droite</Divider>
                                {this.generateForm(WidgetList, BottomRight, "BottomRight")}
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                    <br />
                    <Button.Group floated='right'>
                        <Button type='reset' onClick={() => window.location.reload}>Annuler</Button>
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
                <Container>
                    <Button icon labelPosition='left' fluid as={Link} to="/dashboard">
                        <Icon name="arrow left" />
                        Retour
                    </Button>
                    <Header as='h1'>Admin Page</Header>
                    {this.renderFormPosition()}
                </Container>

            </div>
        );
    }
}

export default AdminPage;