const express = require('express')
const app = express()
const port = process.env.port || 4000
const fs = require("fs")
const cors = require("cors")
app.use(cors())
const { v4: uuidv4 } = require('uuid');

app.use(express.json())
app.get('/articles', (req, res) => {
  res.json([{ title: "Hello world1", id: 1 }, { title: "Hello world2", id: 2 }, { title: "Hello world3", id: 3 }])
})


const getCategory = ({id})=>{
  const category = categories.find(cat => cat.id === id)
  return category
}

const deleteCategory = ({id}) =>{
  categories = categories.filter((cat) => cat.id != id)
  fs.writeFileSync("content.json", JSON.stringify(categories))
}

const updateCategories = ({id,updatedName}) =>{
  const index = categories.findIndex(cat => cat.id == id)

  categories[index].name = updatedName

  fs.writeFileSync("content.json", JSON.stringify(categories))
}

const createNewCategory = async ({name}) =>{
  const id = uuidv4()
 
  categories.push({name,id})

  fs.writeFileSync("content.json", JSON.stringify(categories))
  return id
}

let categories = JSON.parse(fs.readFileSync("content.json", "utf-8"))

app.get("/categories", (req, res) => {
  res.json(categories)
})
app.get("/categories/:id", (req, res) => {
  const { id } = req.params
  const category = getCategory({id})
  res.sendStatus(200)
})

app.post("/categories", async (req, res) => {

  const { name } = req.body
   const id = await createNewCategory({name})
  res.status(201).json({id})
})
app.delete("/categories/:id", (req, res) => {
  const { id } = req.params
  const deleteIndex = categories.findIndex(cat=>cat.id === id)
  if(deleteIndex < 0){
    res.sendStatus(404)
    return
  }
  deleteCategory({id})
  res.sendStatus(205)

})
app.put("/categories/:id", (req, res) => {
  const { id } = req.params
  const { updatedName } = req.body
  if(!updatedName){
    res.status(400).json({message: "Name field is required"})
    return
  }
  updateCategories({id,updatedName})

  res.sendStatus(205)
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})