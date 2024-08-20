
const {startApp} = require("./configs/basic")
const { getCategory, getCategories, createNewCategory, deleteCategory, updateCategories } = require("./services/categoryService")




const app = startApp()




app.get("/categories", (req, res) => {
  const categories = getCategories();
  res.json(categories)
})
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
app.delete("/categories/:id", (req, res) => {
  const { id } = req.params
  const categories = deleteCategory({id})
  const deleteIndex = categories.findIndex(cat=>cat.id === id)
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
  await updateCategories({id,updatedName})

  res.sendStatus(205)
})
