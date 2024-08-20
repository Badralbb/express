const cors = require("cors")
const express = require('express')
const app = express()
const port = process.env.port || 4000
app.use(express.json())
app.use(cors())

function startApp(){
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
      return app
}

module.exports = {
    startApp
}