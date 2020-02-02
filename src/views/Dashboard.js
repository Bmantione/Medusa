import React from 'react';
import "../assets/css/dashboard.css";
import { Button, Icon, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RenderComponent from '../service/renderComponent';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { config: {} };
    }

    componentDidMount() {
        axios.get("config.json")
            .then(res => {
                this.setState({ config: res.data })
            })
    }

    renderGrid() {
        var { config } = this.state;

        config.DashboardConfig.map(val => {
            return console.log(val)

        })
    }

    render() {
        const seg_size = Math.floor(document.body.offsetHeight / 2);
        const segment_style = {
            height: seg_size + 'px',
            overflow: "auto"
        };
        const bloc_style = {
            padding: '1px',
            marging: '2px'
        };
        if (this.state.config.DashboardConfig !== undefined) {
            return (
                <div>
                    <div className="ui grid">
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui blue inverted segment" style={segment_style}>
                                {RenderComponent(this.state.config.DashboardConfig.TopLeft, this.state.config.WidgetList)}
                            </div>
                        </div>
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui red inverted segment" style={segment_style}>
                                {RenderComponent(this.state.config.DashboardConfig.TopRight, this.state.config.WidgetList)}
                            </div>
                        </div>
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui green inverted segment" style={segment_style}>
                                {RenderComponent(this.state.config.DashboardConfig.BottomLeft, this.state.config.WidgetList)}
                            </div>
                        </div>
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui black inverted segment" style={segment_style}>
                                {RenderComponent(this.state.config.DashboardConfig.BottomRight, this.state.config.WidgetList)}
                            </div>
                        </div>
                    </div>
                    <Button icon labelPosition='left' fluid as={Link} to="/admin">
                        <Icon name='cogs' />
                        Configuration
                </Button>
                </div>
            );
        } else {
            return <Loader active />
        }
    }
}

export default Dashboard;