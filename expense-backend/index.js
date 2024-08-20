
const {startApp} = require("./configs/basic")
const { readCategories } = require("./controller/control")
const { getCategory, getCategories, createNewCategory, deleteCategory, updateCategories } = require("./services/categoryService")
const fs = require("fs")
const app = startApp()

app.get("/categories", )
app.get("/categories/:id", (req, res) => {
  const { id } = req.params
  const category = getCategory({id})
  console.log(category)
  res.json(category)
})

app.post("/categories", async (req, res) => {

  const { name } = req.body
   const id = await createNewCategory({name})
  res.status(201).json({id})
})
app.delete("/categories/:id",async(req, res) => {
  const { id } = req.params
  const categories = JSON.parse(fs.readFileSync("data/content.json", "utf-8"))
  const deleteIndex =  categories.findIndex(cat=>cat.id == id)
 deleteCategory({id})
  if(deleteIndex < 0){
    res.sendStatus(404)
    return
  }
  res.sendStatus(205)

})
app.put("/categories/:id", async (req, res) => {
  const { id } = req.params
  const { updatedName } = req.body
  if(!updatedName){
    res.status(400).json({message: "Name field is required"})
    return
  }
  updateCategories({id,updatedName})

  res.sendStatus(205)
})
