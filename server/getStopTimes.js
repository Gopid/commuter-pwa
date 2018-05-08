const fetch = require('node-fetch')
const countdown = require('countdown')

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
                    predictedArrivalTime: countdown(new Date(), arrivingVechicles[0].predictedArrivalTime * 1000).minutes
                })
            })
            .catch(error => {
                console.error('error', error)
                reject(null)
            })
    })
};