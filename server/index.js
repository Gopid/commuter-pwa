const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const getStopTimes = require('./getStopTimes');

app.use(cors())
app.use(bodyParser.json())

const resetJourney = (clientId) => {
    clearInterval(data[clientId])
    // reset state (current arrival time, last values sent to FCM)
}

const data = {}
// const journeyDetails = [
//   {stopId: 'F02550', routeIds: []},
//   {stopId: 'F02550', routeIds: []}
// ]
app.post('/api/startjourney', (req, res) => {
    const {clientId, stopId, routeId} = req.body

    if (data[clientId]) {
        resetJourney(clientId)
        return res.status(200).json({message: ''})
    }

    data[clientId] = setInterval(() => {
        getStopTimes(stopId, routeId)
            .then(data => {
                console.log('data', data)
                // send the data to FCM if the arrival time has changed at least a minute
            })
            .catch(error => {
                console.error(error)
                clearInterval(data[clientId])
                // handle the different error scenarios
            })
    }, 5000)
})

app.get('/api/stopjourney', (req,res) => {
    resetJourney(req.body.clientId)
    // let FCM know to stop the push messages if neccessary
})

app.listen(5000, () => console.log('Example app listening on port 5000!'))