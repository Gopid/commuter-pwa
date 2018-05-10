import './styles.css';
import {h, render} from 'preact';
import fireBaseMessaging from './firebaseMessaging';
import App from './components/App';

fireBaseMessaging();

render(<App />, document.body);
