const blogModel = require("../models/blogs")
const userModel = require("../models/users")

async function getBlogUser(req, res) {
    try {
        const id = req.params.id
        const allBlogs = await blogModel.find({
            createdBy: id
        })

        return res.status(200).json({
            allBlogs
        })
    } catch (err) {
        console.error("Failed to fetch blog user:", err)
        return res.status(500).json({ error: "Something went wrong" })
    }
}

async function editBlog(req, res) {
    try {
        const id = req.params.id
        const body = req.body

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            {
                title: body.title,
                description: body.description,
                textContent: body.textContent,
                image: body.image
            },
            { new: true }
        )

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" })
        }

        return res.status(200).json({
            message: "Blog updated successfully",
            blog: updatedBlog
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}


async function deleteBlog(req, res) {
    const { id } = req.params
    try {
        const blog = await blogModel.findById(id)
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" })
        }
        await blogModel.findByIdAndDelete(id)
        return res.status(200).json({ message: "Blog deleted successfully" })
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getBlogUser,
    editBlog,
    deleteBlog
}