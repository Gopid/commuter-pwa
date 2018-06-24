const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const fetch = require('node-fetch')
const app = express()
const getStopTimes = require('./getStopTimes')
const serverKey = 'AIzaSyBxrb2ZftGnqZp1hWDRC62NFc_B2KW3brQ'
const admin = require('firebase-admin')

const serviceAccountKey = require('./config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey)
});

app.use(cors())
app.use(bodyParser.json())

let intervalId = 0;
let lastArrivalSent = null;

const resetJourney = () => {
    clearInterval(intervalId)
}

const sendStopTimes = (token, stopId, routeId, timeLastSent) => {
    return getStopTimes(stopId, routeId)
        .then(data => {
            if (timeLastSent === data.predictedArrivalTime) return timeLastSent

            const arrival = {
                notification: {
                    title: data.stopHeadsign,
                    body: `'${data.predictedArrivalTime}`,
                    icon: '',
                    tag: 'commuter-info'
                }
            };
            console.log('arrival', arrival);
            lastArrivalSent = arrival;

            admin.messaging().sendToDevice(token, arrival)

            return data.predictedArrivalTime
        })
        .catch(error => {
            console.error(error)
            clearInterval(intervalId)
            // handle the different error scenarios
        })
}

app.post('/api/startjourney', (req, res) => {
    const {token, stopId, routeId} = req.body
    let timeLastSent = null;

    if (intervalId) resetJourney()

    sendStopTimes(token, stopId, routeId)

    intervalId = setInterval(() => {
        sendStopTimes(token, stopId, routeId, timeLastSent)
            .then((timeSent) => timeLastSent = timeSent)
    }, 5000)

    res.status(200).json({success: true})
})

app.post('/api/stopjourney', (req,res) => {
    resetJourney()

    res.status(200).json({success: true})
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))