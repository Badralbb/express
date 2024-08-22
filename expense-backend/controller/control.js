const { getCategories, getCategory, createNewCategory, updateCategories, deleteCategory } = require("../services/categoryService");
const fs = require("fs")
const readCategories =  async (req,res) =>{
    const categories = await getCategories();
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

const deleteCategories = async(req,res)=>{
    const { id } = req.params
   
    await deleteCategory(id)
    res.sendStatus(205)
  
}
const putCategories = async(req,res) =>{
    const { id } = req.params
    const { updatedName } = req.body
    if(!updatedName){
      res.status(400).json({message: "Name field is required"})
      return
    }
    await updateCategories({id,updatedName})
  
    res.sendStatus(205)
}

module.exports = {
    readCategories,
    readOneCategory,
   postCategories,
   deleteCategories,
   putCategories
}