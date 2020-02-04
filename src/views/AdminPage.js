import React from 'react';
import { Button, Icon, Container, Header, Form, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './adminPage.views.css'

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

    generateFormParam = (formField, key, config) => {
        formField.push(
            <React.Fragment>
                <Divider horizontal>{key} Config</Divider>
                <br />
            </React.Fragment>
        )
        for (var [param, value] of Object.entries(config.WidgetList[key].WidgetConfig)) {
            formField.push(
                <Form.Input label={param} value={value} fluid width={8} />
            )
        }

        return formField;
    }

    renderFormParam() {
        const { BottomLeft, BottomRight, TopLeft, TopRight, config } = this.state;
        var formField = []
        for (var key in config.WidgetList) {
            switch (key) {
                case BottomLeft:
                    formField = this.generateFormParam(formField, key, config)
                    break;
                case BottomRight:
                    formField = this.generateFormParam(formField, key, config)
                    break;
                case TopLeft:
                    formField = this.generateFormParam(formField, key, config)
                    break;
                case TopRight:
                    formField = this.generateFormParam(formField, key, config)
                    break;
                default:
            }
           
        }
        return formField;
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
        const { BottomLeft, BottomRight, TopLeft, TopRight } = this.state;
        if (this.state.config.DashboardConfig !== undefined) {
            return (
                <div>
                    <Form onSubmit={this.updateJson}>
                        <Form.Group>
                            <Form.Select name='TopLeft' label="Position Haut Gauche" width={8} defaultValue={TopLeft} options={this.createOptionList()} onChange={this.handleChange} />
                            <Form.Select name='TopRight' label="Position Haut Droite" width={8} defaultValue={TopRight} options={this.createOptionList()} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                        </Form.Group>
                        <Form.Group>
                            <Form.Select name='BottomLeft' label="Position Bas Gauche" width={8} defaultValue={BottomLeft} options={this.createOptionList()} onChange={this.handleChange} />
                            <Form.Select name='BottomRight' label="Position Bas Droite" width={8} defaultValue={BottomRight} options={this.createOptionList()} onChange={this.handleChange} />
                        </Form.Group>
                        <Form.Group>
                            {this.renderFormParam()}
                        </Form.Group>
                    </Form>
                    
                   
                    <Button.Group floated='right'>
                        <Button>Annuler</Button>
                        <Button.Or text='ou' />
                        <Button positive type='submit' onClick={this.handleSave}>Valider</Button>
                    </Button.Group>
                </div>
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