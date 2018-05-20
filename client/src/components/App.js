import {h, Component} from 'preact';
import ToggleButton from './ToggleButton';
import {messaging} from '../index';
// const arrival = {
//     body: '\'5',
//     title: 'Keleti pályaudvar M'
// }
class App extends Component{
    state = {arrival: {}};
    componentDidMount() {
        messaging.onMessage((payload) => {
            this.setState({arrival: payload.notification})
        });
    }
    render() {
        return (
            <section id="app">
                <section id="direction">
                    <div className="direction__container">
                        <h1 className="direction__title">Select Your Destination</h1>
                        <div className="direction__options">
                            <img className="direction__icon direction__icon--active" src="/img/home.svg" alt="" />
                            <img className="direction__icon" src="/img/office.svg" alt="" />
                        </div>
                        <ToggleButton
                            onContent={() => <span>Start sending notifications</span>}
                            offContent={() => <span>Stop sending notifications</span>}
                        />
                    </div>
                </section>
                <section id="details">
                    <h1 className="details__title">Arrivals to your destination</h1>
                    <article className="card">
                        <div className="circle"></div>
                        <p>20E</p>
                        <p>Keleti pályaudvar</p>
                        <p>20:30</p>
                        <p>8</p>
                    </article>
                </section>
            </section>
        );
    }
}

export default App;