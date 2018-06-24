import {h, Component} from 'preact';
import ToggleButton from './ToggleButton';
import SelectImg from './SelectImg';
import Card from './Card';
import {messaging} from '../index';
const destinations = [
    {
        img: '/img/home.svg',
        stopId: 'BKK_F02550',
        name: 'Home'
    },
    {
        img: '/img/office.svg',
        stopId: 'BKK_F01051',
        name: 'Office'
    }
];
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};
const initialArrival = {
    body: '\'',
    title: '...'
};
class App extends Component{
    state = {
        arrival: {...initialArrival},
        selected: 0,
        isNotificationOn: false
    };
    toggleNotification = () => {
        this.setState(prevState => ({isNotificationOn: !prevState.isNotificationOn}))
    }
    startPush = () => {
        this.toggleNotification();
        messaging.requestPermission()
            .then(() => messaging.getToken())
            .then(token => {
                const {stopId} = destinations[this.state.selected];
                const body = JSON.stringify({
                    token,
                    stopId,
                    routeId: 'BKK_0205'
                });
                fetch('/api/startjourney', {method: 'POST', body, headers});
            })
            .then(() => {
                messaging.onMessage((payload) => {
                    this.setState({arrival: payload.notification})
                });
            });
    }
    stopPush = () => {
        this.toggleNotification();
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        };
        this.setState({arrival: {...initialArrival}});
        fetch('/api/stopjourney', {method: 'POST', headers});
    }
    onSelectionChange = (selected) => {
        this.setState({selected});
        if (this.state.isNotificationOn) {
            this.stopPush();
            this.startPush();
        }
    }
    render() {
        return (
            <section id="app">
                <section id="direction">
                    <div className="direction__container">
                        <h1 className="direction__title">Select Your Destination</h1>
                        <SelectImg
                            imgs={destinations.map(destination => destination.img)}
                            onChange={this.onSelectionChange}
                        />
                        <ToggleButton
                            onHandler={this.startPush}
                            offHandler={this.stopPush}
                            onContent={() => <span>Start sending notifications</span>}
                            offContent={() => <span>Stop sending notifications</span>}
                        />
                    </div>
                </section>
                <section id="details">
                    <h1 className="details__title">Arrivals to {destinations[this.state.selected].name}</h1>
                    <Card
                        iconPath="/"
                        col1={this.state.arrival.title}
                        col2={this.state.arrival.body}
                    />
                </section>
            </section>
        );
    }
}

export default App;