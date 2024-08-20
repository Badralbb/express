const fs = require("fs")

const { v4: uuidv4 } = require('uuid');

const getCategories = () =>{
    const categories = JSON.parse(fs.readFileSync("data/content.json", "utf-8"))
    return categories
}
const getCategory = ({ id }) => {

    const category = categories.find(cat => cat.id === id)
    return category
}

const deleteCategory = ({ id }) => {
    let categories = JSON.parse(fs.readFileSync("data/content.json", "utf-8"))
    categories = categories.filter((cat) => cat.id != id)
    fs.writeFileSync("data/content.json", JSON.stringify(categories))
    return categories
}

const updateCategories = ({ id, updatedName }) => {
    const index = categories.findIndex(cat => cat.id == id)

    categories[index].name = updatedName

    fs.writeFileSync("data/content.json", JSON.stringify(categories))
}

const createNewCategory = async (form) => {
    const id = uuidv4()
    form.id = id
    categories.push(form)

    fs.writeFileSync("data/content.json", JSON.stringify(categories))
    return id
}


module.exports = {
    getCategory,
    deleteCategory,
    updateCategories,
    createNewCategory,
    getCategories,
}