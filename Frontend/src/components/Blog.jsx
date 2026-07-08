import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Blog( { user } ) {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:5000/api/blogs/${id}`, {
            credentials:"include"
        })
            .then(res => res.json())
            .then(data => setBlog(data))
            .catch(err => console.error("Failed to fetch blog:", err))
    }, [id])

    if (!blog) return <p>Loading...</p>

    return (
        <div className='blog_page'>
            <div className='blog_content'>
                <h1>{blog.title}</h1>
                <p>By: {user?.name}</p>
                <img src={blog.image} alt={blog.title} />
                <p>{blog.description}</p>
                <p className="blog_text">{blog.textContent}</p>
            </div>
        </div>
    )
}

export default Blog