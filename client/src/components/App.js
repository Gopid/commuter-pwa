import {h} from 'preact';
import ToggleButton from './ToggleButton';

const App = () => (
    <section id="app">
        <section id="direction">
            <div className="direction__container">
                <h1 className="direction__title">Select Your Destination</h1>
                <div className="direction__options">
                    <img className="direction__icon" src="/img/home.svg" alt="" />
                    <img className="direction__icon" src="/img/office.svg" alt="" />
                </div>
                <ToggleButton
                    onContent={() => <span>Start sending notifications</span>}
                    offContent={() => <span>Pause sending notifications</span>}
                />
            </div>
        </section>
        <section id="details">
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

export default App;