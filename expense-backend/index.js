const express = require('express')
const app = express()
const port = process.env.port || 4000
const fs = require("fs")
const cors = require("cors")
app.use(cors())
app.get('/articles', (req, res) => {
  res.json([{ title: "Hello world1", id: 1 }, { title: "Hello world2", id: 2 }, { title: "Hello world3", id: 3 }])
})

const content = fs.readFileSync("content.json", "utf-8")




let categories = JSON.parse(content)

app.get("/categories/list", (req, res) => {
  res.json(categories)
})

app.get("/categories/create", (req, res) => {

  const { name } = req.query
  if(name != "") {
    categories.push({ name: name })
  }

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])
})
app.get("/categories/delete", (req, res) => {
  const { dlt } = req.query
  
  categories.splice(dlt, 1)

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])

})
app.get("/categories/create/edit", (req, res) => {

  const { edit } = req.query
  const {index} = req.query
  if(edit != "") {
   categories[index].name = edit
  }

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})