import firebase from '@firebase/app';
import '@firebase/messaging';

export default () => {
    firebase.initializeApp({
        apiKey: 'AIzaSyCGvPyhQNF_N2l05rpipvnqqX8fJU4C5pw',
        authDomain: 'commuter-6f37d.firebaseapp.com',
        databaseURL: 'https://commuter-6f37d.firebaseio.com',
        projectId: 'commuter-6f37d',
        storageBucket: 'commuter-6f37d.appspot.com',
        messagingSenderId: '136385783930',
    });
    
    const messaging = firebase.messaging();
    
    messaging.usePublicVapidKey('BAYUltWY2ANcfrUpBvnRoEvIQSk2b4JxfESAGjV2PPFKoBfcjaN418KJuRbyaj35Up5AWeoIsQQVLbn5mTwCx6Q');
    
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then((registration) => messaging.useServiceWorker(registration));
    }

    return messaging;
}