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

const resetJourney = () => {
    clearInterval(intervalId)
    // reset state (current arrival time, last values sent to FCM)
}
// const journeyDetails = [
//   {stopId: 'F02550', routeIds: []},
//   {stopId: 'F02550', routeIds: []}
// ]
app.post('/api/startjourney', (req, res) => {
    const {token, stopId, routeId} = req.body
    let timeLastSent = null;

    if (intervalId) {
        resetJourney()
        return res.status(200).json({message: ''})
    }

    intervalId = setInterval(() => {
        getStopTimes(stopId, routeId)
            .then(data => {
                if (timeLastSent === data.predictedArrivalTime) return

                const payload = {
                    notification: {
                        title: data.stopHeadsign,
                        body: `'${data.predictedArrivalTime}`,
                        icon: '',
                        tag: 'commuter-info'
                    }
                };

                admin.messaging().sendToDevice(req.body.token, payload).then(() => timeLastSent = data.predictedArrivalTime)
            })
            .catch(error => {
                console.error(error)
                clearInterval(intervalId)
                // handle the different error scenarios
            })
    }, 5000)
})

app.get('/api/stopjourney', (req,res) => {
    resetJourney(req.body.token)
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))