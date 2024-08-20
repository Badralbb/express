const { getCategories } = require("../services/categoryService");
const readCategories = () =>{

    (req, res) => {
    const categories = getCategories();
    res.json(categories)}
}



module.exports = {
    readCategories,
    
}