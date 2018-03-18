const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/api/get', (req, res) => res.status(200).json({"test": "foo"}))

app.listen(3000, () => console.log('Example app listening on port 3000!'))