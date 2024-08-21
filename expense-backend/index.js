const {sql} = require("./configs/database")
const {startApp} = require("./configs/basic")
const { readCategories, readOneCategory, postCategories, putCategories, deleteCategories } = require("./controller/control")
const app = startApp()
app.get("/categories",readCategories)
app.get("/categories/:id",readOneCategory)
app.post("/categories", postCategories)
app.delete("/categories/:id",deleteCategories)
app.put("/categories/:id", putCategories)


