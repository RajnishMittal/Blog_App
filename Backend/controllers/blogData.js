const blogModel = require("../models/blogs")

async function getBlogs(req, res) {
    try {
        const allBlogs = await blogModel.find({})
        return res.status(200).json(allBlogs)
    } catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

async function getById(req, res) {
    const id = req.params.id
    try {
        const result = await blogModel.findOne({
            _id: id
        })
        return res.status(201).json(result)
    }
    catch (err) {
        console.error(err)
        return res.status(500).json({ message: err.message })
    }
}

async function createBlog(req, res) {
    const body = req.body
    console.log(body)
    if (!body) return res.json({ error: "no data" })
    try {
        const result = await blogModel.create({
            title: body.title,
            image: body.image,
            description: body.description,
            textContent: body.textContent,
            createdBy: req.user._id
        })
        return res.status(201).json({
            message: "User created successfully"
        });
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    createBlog,
    getBlogs,
    getById
}