const { getCategories, getCategory, createNewCategory, updateCategories, deleteCategory } = require("../services/categoryService");
const fs = require("fs")
const readCategories =  async (req,res) =>{
    const categories = await getCategories();
    res.json(categories)
}
const readOneCategory = async(req,res) =>{
    const { id } = req.params
    const category = await getCategory(id)
    if(!category){
        res.sendStatus(404)
        return
    }
    res.sendStatus(200)
}
const postCategories = async (req,res)=>{
    const { name,color,icon } = req.body
    
    const id = await createNewCategory({name,color,icon})
   res.status(201).json({id})
}

const deleteCategories = async(req,res)=>{
    const { id } = req.params
   
    await deleteCategory(id)
    res.sendStatus(205)
  
}
const putCategories = async(req,res) =>{
    const { id } = req.params
    const { updatedName,color,icon } = req.body
    
    if(!updatedName){
      res.status(400).json({message: "Name field is required"})
      return
    }
    await updateCategories({id,updatedName,color,icon})
  
    res.sendStatus(205)
}

module.exports = {
    readCategories,
    readOneCategory,
   postCategories,
   deleteCategories,
   putCategories
}