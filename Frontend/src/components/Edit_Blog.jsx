import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import "../css/style.css"

function Edit_Blog({ setUserBlog, userBlog }) {
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:5000/api/edit/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                setUserBlog(data.allBlogs)
            })
            .catch(err => console.error(err))
    }, [id])

    async function handleDelete(id) {
        const confirmed = window.confirm("Delete this blog? This can't be undone.")
        if (!confirmed) return

        try {
            const res = await fetch(`http://localhost:5000/api/edit/${id}`, {
                method: "DELETE",
                credentials: "include"
            })

            if (!res.ok) {
                const err = await res.json()
                console.error(err.message || "Failed to delete")
                return
            }

            setUserBlog(prev => prev.filter(blog => blog._id !== id))
        } catch (err) {
            console.error("Delete failed:", err)
        }
    }

    return (
        <div className="edit_page_wrapper">
            <div className="edit_page_header">
                <h1>My Blogs</h1>
                <button onClick={() => navigate("/home")}>← Back to Home</button>
            </div>
            <div className="blog_list">
                {!userBlog || userBlog.length === 0 ? (
                    <h1 className='no_blogs' >No blogs yet — start writing!</h1>
                ) : (
                    userBlog.map(blog => (
                        <div className="blog_edit_item" key={blog._id}>
                            <div
                                className="blog_card"
                                onClick={() => navigate(`/blog_page/${blog._id}`)}
                            >
                                <img src={blog.image} alt={blog.title} className="blog_image" />
                                <h2 className="blog_title">{blog.title}</h2>
                                <p className="blog_desc">{blog.description}</p>
                            </div>
                            <div className="blog_actions">
                                <button onClick={() => navigate(`/edit_blog_form/${blog._id}`)}>Edit</button>
                                <button onClick={() => handleDelete(blog._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Edit_Blog