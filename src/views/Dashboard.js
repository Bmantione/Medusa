import React from 'react';
import "../assets/css/dashboard.css";
import { Button, Icon, Loader } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import RenderComponent from '../service/renderComponent';


class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { db: {} };
    }

    componentDidMount() {
        axios.get("db.json")
            .then(res => {
                this.setState({ db: res.data })
            })
    }

    renderGrid() {
        var { db } = this.state;

        db.DashboardConfig.map(val => {
            return console.log(val)

        })
    }

    render() {
        const seg_size = Math.floor(document.body.offsetHeight / 2) - 15;
        const segment_style = {
            height: seg_size + 'px',
            overflow: "auto"
        };
        const bloc_style = {
            padding: '1px',
            marging: '2px'
        };
        if (this.state.db.DashboardConfig !== undefined) {
            return (
                <div>
                    <div className="ui grid">
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui blue inverted segment" style={segment_style}>
                                {RenderComponent(this.state.db.DashboardConfig.TopLeft)}
                            </div>
                        </div>
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui red inverted segment" style={segment_style}>
                                {RenderComponent(this.state.db.DashboardConfig.TopRight)}
                            </div>
                        </div>
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui green inverted segment" style={segment_style}>
                                {RenderComponent(this.state.db.DashboardConfig.BottomLeft)}
                            </div>
                        </div>
                        <div className="eight wide column" style={bloc_style}>
                            <div className="ui black inverted segment" style={segment_style}>
                                {RenderComponent(this.state.db.DashboardConfig.BottomRight)}
                            </div>
                        </div>
                        <div className="sixteen wide column" style={{padding: '1px'}}>
                        <Button icon labelPosition='left' fluid as={Link} to="/admin">
                            <Icon name='cogs' />Configuration
                        </Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loader active />
        }
    }
}

export default Dashboard;