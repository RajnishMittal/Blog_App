import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function EditBlog({ userBlog, setUserBlog }) {
    const { id } = useParams()
    const navigate = useNavigate()
    const blog = userBlog?.find(b => b._id === id)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        textContent: '',
        image: ''
    })

    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                description: blog.description,
                textContent: blog.textContent,
                image: blog.image
            })
        }
    }, [blog])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`http://localhost:5000/api/edit/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (!res.ok) {
                console.log(data.message || "Update failed")
                return
            }

            setUserBlog(prev =>
                prev.map(blog =>
                    blog._id === id ? { ...blog, ...formData } : blog
                )
            )

            navigate("/home")
        } catch (err) {
            console.log(err)
        }
    }

    if (!blog) return <p>Blog not found.</p>

    return (
        <div className="edit_page">
            <div className="edit_container">
                <h1 className="edit_heading">Edit Blog</h1>
                <form className="edit_form" onSubmit={handleSubmit}>
                    <div className="edit_field">
                        <label>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    <div className="edit_field">
                        <label>Description</label>
                        <input
                            type="text"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>

                    <div className="edit_field">
                        <label>Text Content</label>
                        <textarea
                            value={formData.textContent}
                            onChange={(e) => setFormData({ ...formData, textContent: e.target.value })}
                        />
                    </div>

                    <div className="edit_field">
                        <label>Image URL</label>
                        <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />
                    </div>

                    <div className="edit_actions">
                        <button type="submit" className="edit_save_btn">Update Blog</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBlog