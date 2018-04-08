import './styles.css';
import firebase from '@firebase/app';
import '@firebase/messaging';

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

messaging.requestPermission()
    .then(function() {
        console.log('Notification permission granted.');
        return messaging.getToken();
    })
    .then((token) => {
        if (token) {
            const body = JSON.stringify({
                token,
                stopId: 'BKK_F02550',
                routeId: 'BKK_0205',
            });
            const headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            };

            fetch('/api/startjourney', {method: 'post', body, headers});
        } else {
            console.log('No Instance ID token available. Request permission to generate one.');
        }
    })
    .catch(function(err) {
        console.log('Unable to get permission to notify.', err);
    });
