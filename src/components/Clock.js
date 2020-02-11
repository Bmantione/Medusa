import 'moment-timezone';
import 'moment/locale/fr';
import React from 'react';
import Moment from 'react-moment';
import { Header } from 'semantic-ui-react';
import './Clock.component.scss';
class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = { seconds: 0 };
    }

    tick() {
        this.setState(prevState => ({
            seconds: prevState.seconds + 1
        }));
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div className="clock">
                <Header as='h1' className='hour' inverted textAlign='center'>
                    <Moment format={'HH:mm:ss'} locale="fr" tz={this.props.TimeZone} />
                    <Header.Subheader className='date'>
                        <Moment format={this.props.FormatDate} locale="fr" />
                    </Header.Subheader>
                </Header>
                <Header as='h4' inverted textAlign='center'>
                    {this.props.TimeZone}
                </Header>
            </div>
        );
    }
}

export default Clock;