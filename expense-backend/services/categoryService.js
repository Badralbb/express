const fs = require("fs")

const { v4: uuidv4 } = require('uuid');
const { sql } = require("../configs/database");

const getCategories = async () =>{
    const categories = await sql`select * from category order by name`
    return categories
}
const getCategory = async (id) => {
    const category = await sql`select * from category where id=${id}`
    if(category.length){
        return category[0]
    }
    return null
}

const deleteCategory = async(id) => {
    await sql`DELETE FROM category WHERE id=${id}`
}

const updateCategories = async({ id, updatedName,color,icon }) => {
    await sql`UPDATE category
    SET name = ${updatedName},color = ${color},icon = ${icon}
    WHERE id=${id}`
    
}

const createNewCategory = async ({name,color,icon}) => {
    const id = uuidv4()
    await sql`insert into category (name, id, color, icon) values(${name},${id},${color},${icon})`
    return id
}


module.exports = {
    getCategory,
    deleteCategory,
    updateCategories,
    createNewCategory,
    getCategories,
}