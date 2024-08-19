const express = require('express')
const app = express()
const port = process.env.port || 4000
const fs = require("fs")
const cors = require("cors")
app.use(cors())
app.use(express.json())
app.get('/articles', (req, res) => {
  res.json([{ title: "Hello world1", id: 1 }, { title: "Hello world2", id: 2 }, { title: "Hello world3", id: 3 }])
})



let categories = JSON.parse(fs.readFileSync("content.json", "utf-8"))

app.get("/categories", (req, res) => {
  res.json(categories)
})
app.get("/categories/:id", (req, res) => {
  const { id } = req.params
  const category = categories.find(cat => cat.id === id)
  res.json(category)
})

app.post("/categories", (req, res) => {

  const { name } = req.body
  const id = new Date().toISOString()

  categories.push({
    name: name,
    id

  })

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])
})
app.delete("/categories/:id", (req, res) => {
  const { id } = req.params

  categories = categories.filter((cat) => cat.id != id)

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])

})
app.put("/categories/:id", (req, res) => {
  const { id } = req.params
  const { updatedName } = req.body

  const index = categories.findIndex(cat => cat.id == id)

  categories[index].name = updatedName

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})