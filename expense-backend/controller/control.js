const { getCategories, getCategory, createNewCategory, updateCategories, deleteCategory } = require("../services/categoryService");
const fs = require("fs")
const readCategories = (req,res) =>{
    const categories = getCategories();
    res.json(categories)
}
const readOneCategory = (req,res) =>{
    const { id } = req.params
    const category = getCategory(id)

    res.json(category)
}
const postCategories = async (req,res)=>{
    const { name } = req.body
    const id = await createNewCategory({name})
   res.status(201).json({id})
}

const deleteCategories = (req,res)=>{
    const { id } = req.params
    const categories = JSON.parse(fs.readFileSync("data/content.json", "utf-8"))
    const deleteIndex =  categories.findIndex(cat=>cat.id == id)
   deleteCategory({id})
    if(deleteIndex < 0){
      res.sendStatus(404)
      return
    }
    res.sendStatus(205)
  
}
const putCategories = (req,res) =>{
    const { id } = req.params
    const { updatedName } = req.body
    if(!updatedName){
      res.status(400).json({message: "Name field is required"})
      return
    }
    updateCategories({id,updatedName})
  
    res.sendStatus(205)
}

module.exports = {
    readCategories,
    readOneCategory,
   postCategories,
   deleteCategories,
   putCategories
}