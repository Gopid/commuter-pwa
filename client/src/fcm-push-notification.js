importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.8.1/firebase-messaging.js');

firebase.initializeApp({
  apiKey: 'AIzaSyCGvPyhQNF_N2l05rpipvnqqX8fJU4C5pw',
  authDomain: 'commuter-6f37d.firebaseapp.com',
  databaseURL: 'https://commuter-6f37d.firebaseio.com',
  projectId: 'commuter-6f37d',
  storageBucket: 'commuter-6f37d.appspot.com',
  messagingSenderId: '136385783930',
});

const messaging = firebase.messaging();