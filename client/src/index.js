import './styles.css';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}

const body = JSON.stringify({
    clientId: 'sdf',
    stopId: 'BKK_F02550',
    routeId: 'BKK_0205',
});
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

fetch('http://localhost:5000/api/startjourney', {method: 'post', body, headers})
    .then((data) => console.log('data', data));
