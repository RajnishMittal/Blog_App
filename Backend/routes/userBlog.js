const express = require("express")
const { getBlogUser, editBlog, deleteBlog } = require("../controllers/userBlogs")
const router = express.Router()
const { restrictToLoggedIn } = require("../middleware/auth")

router.get("/:id", restrictToLoggedIn, getBlogUser)
router.put("/:id", restrictToLoggedIn, editBlog)
router.delete("/:id", restrictToLoggedIn, deleteBlog)

module.exports = router