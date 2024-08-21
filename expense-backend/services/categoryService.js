const fs = require("fs")

const { v4: uuidv4 } = require('uuid');
const { sql } = require("../configs/database");

const getCategories = async () =>{
    const categories = await sql`select * from category`
    return categories
}
const getCategory = (id) => {
    const categories = JSON.parse(fs.readFileSync("data/content.json", "utf-8"))

    const category = categories.find(cat => cat.id === id)
    return category
}

const deleteCategory = (id) => {
    let categories = getCategories()
    categories = categories.filter((cat) => cat.id != id)
    fs.writeFileSync("data/content.json", JSON.stringify(categories))
    return categories
}

const updateCategories = async({ id, updatedName }) => {
    await sql`UPDATE category
    SET name = ${updatedName}
    WHERE id=${id}`
    
}

const createNewCategory = async ({name}) => {
    const id = uuidv4()
    await sql`insert into category (name, id) values(${name},${id})`
    return id
}


module.exports = {
    getCategory,
    deleteCategory,
    updateCategories,
    createNewCategory,
    getCategories,
}