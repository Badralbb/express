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

const content = fs.readFileSync("content.json", "utf-8")




let categories = JSON.parse(content)

app.get("/categories/list", (req, res) => {
  res.json(categories)
})

app.post("/categories/create", (req, res) => {

  const { name } = req.body

  if(name != "") {
    categories.push({ name: name,
      id:new Date().toISOString()

    })
  }

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])
})
app.delete("/categories/delete", (req, res) => {
  const {id}  = req.body

  categories = categories.filter((cat)=>cat.id != id)

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])

})
app.put("/categories/create/put", (req, res) => {

  const {id, updatedName} = req.body
  console.log(id,updatedName)
  const index = categories.findIndex(cat => cat.id == id)
 

  if(updatedName != "") {
   categories[index].name = updatedName
  }

  fs.writeFileSync("content.json", JSON.stringify(categories))

  res.json(["Success"])
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})