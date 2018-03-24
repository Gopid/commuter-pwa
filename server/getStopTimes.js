const fetch = require('node-fetch');
// Futár utca stop id: BKK_F02550
// 20E routeId: BKK_0205
module.exports = (stopId, routeId) => {
    return new Promise((resolve, reject) => {
        fetch(`http://futar.bkk.hu/bkk-utvonaltervezo-api/ws/otp/api/where/arrivals-and-departures-for-stop.json?stopId=${stopId}&onlyDepartures=1&minutesBefore=0&minutesAfter=20`)
            .then(response => {
                if (!response) throw 'Service is not available'

                return response.json()
            })
            .then(json => {
                if (json.code !== 200) throw 'Incorrect response'

                if (
                    !json.data ||
                    !json.data.entry.stopTimes.length ||
                    json.data === null ||
                    !json.data.hasOwnProperty("references")
                ) throw 'No schedule info'

                const {type, iconDisplayText, textColor, color} = json.data.references.routes[routeId]

                const tripIds = Object.values(json.data.references.trips).reduce((ids, trip) => {
                    if (trip.routeId === routeId) ids.push(trip.id)
                    return ids
                }, [])

                const arrivingVechicles = json.data.entry.stopTimes.filter(stopTime => tripIds.includes(stopTime.tripId))

                if (!arrivingVechicles.length) throw 'No arrival in 20 minutes'

                resolve({
                    type,
                    stopHeadsign: arrivingVechicles[0].stopHeadsign,
                    iconDisplayText,
                    textColor,
                    color,
                    predictedArrivalTime: arrivingVechicles[0].predictedArrivalTime
                })
            })
            .catch(error => {
                console.error('error', error)
                reject(null)
            })
    })
};