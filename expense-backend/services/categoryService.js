const fs = require("fs")

const { v4: uuidv4 } = require('uuid');
const { sql } = require("../configs/database");

const getCategories = async () =>{
    const categories = await sql`select * from category`
    return categories
}
const getCategory = async (id) => {
    const category = await sql`select id=${id} from category`
    return category
}

const deleteCategory = async(id) => {
    await sql`DELETE FROM category WHERE id=${id}`
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