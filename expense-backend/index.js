const express = require('express')
const app = express()
const port = 4000
const cors = require("cors")
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello World!') 
})
app.get('/articles', (req, res) => {
    res.json([{title:"Hello world1",id:1},{title:"Hello world2",id:2},{title:"Hello world3",id:3}])
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})