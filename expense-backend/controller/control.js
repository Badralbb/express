const { getCategories, getCategory } = require("../services/categoryService");
const readCategories = (req,res) =>{
    
    const categories = getCategories();
    res.json(categories)
}
const readOneCategory = (req,res) =>{
    const { id } = req.params
    const category = getCategory({id})
    console.log(category)
    res.json(category)
}



module.exports = {
    readCategories,
    readOneCategory,

}