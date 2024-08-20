
const {startApp} = require("./configs/basic")
const fs = require("fs")

const { v4: uuidv4 } = require('uuid');


const app = startApp()

const getCategory = ({id})=>{
  const category = categories.find(cat => cat.id === id)
  return category
}

const deleteCategory = ({id}) =>{
  categories = categories.filter((cat) => cat.id != id)
  fs.writeFileSync("data/content.json", JSON.stringify(categories))
}

const updateCategories = ({id,updatedName}) =>{
  const index = categories.findIndex(cat => cat.id == id)

  categories[index].name = updatedName

  fs.writeFileSync("data/content.json", JSON.stringify(categories))
}

const createNewCategory = async (form) =>{
  const id = uuidv4()
  form.id = id
  categories.push(form)

  fs.writeFileSync("data/content.json", JSON.stringify(categories))
  return id
} 

let categories = JSON.parse(fs.readFileSync("data/content.json", "utf-8"))

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
