import './styles.css';
import {h, render} from 'preact';
import fireBaseMessaging from './firebaseMessaging';
import App from './components/App';

export const messaging = fireBaseMessaging();

render(<App />, document.body);
