const express = require("express")
const { createBlog, getBlogs, getById, setComment, getComments } = require("../controllers/blogData")
const router = express.Router()

router.get("/", getBlogs)
router.post("/create", createBlog)
router.get("/:id", getById)
router.post("/comments/:id", setComment)
router.get("/comments/:id", getComments)

module.exports = router