const express = require("express")
const { createBlog, getBlogs, getById } = require("../controllers/blogData")
const router = express.Router()

router.get("/", getBlogs)
router.post("/create", createBlog)
router.get("/:id", getById)


module.exports = router