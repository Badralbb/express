const express = require('express')
const app = express()
const port = process.env.port || 4000
const cors = require("cors")
app.use(cors())
app.get('/articles/:id', (req, res) => {
  res.send('Hello World!') 
  console.log(req.params)
})
app.get('/articles', (req, res) => {
    res.json([{title:"Hello world1",id:1},{title:"Hello world2",id:2},{title:"Hello world3",id:3}])
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})