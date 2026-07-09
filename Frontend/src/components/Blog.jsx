import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Blog({ user }) {
    const { id } = useParams()
    const [blog, setBlog] = useState(null)
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(`http://localhost:5000/api/blogs/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setBlog(data))
            .catch(err => console.error("Failed to fetch blog:", err))
    }, [id])

    const fetchComments = () => {
        fetch(`http://localhost:5000/api/blogs/comments/${id}`, {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setComments(data))
            .catch(err => console.error("Failed to fetch comments:", err))
    }

    useEffect(() => {
        fetchComments()
    }, [id])

    if (!blog) return <p>Loading...</p>

    const addComment = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const dataa = Object.fromEntries(formdata)

        try {
            const res = await fetch(`http://localhost:5000/api/blogs/comments/${id}`, {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(dataa)
            })

            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                return console.log(data.message)
            }
            fetchComments()
            e.target.reset()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='blog_page'>
            <div className='blog_content'>
                <h1>{blog.title}</h1>
                <p>By: {blog.createdBy?.name || "Unknown"}</p>
                <img src={blog.image} alt={blog.title} />
                <p>{blog.description}</p>
                <p className="blog_text">{blog.textContent}</p>
            </div>
            <div className="comment_tab">
                <h1>Comments</h1>
                <form onSubmit={addComment}>
                    <input name='text' type="text" placeholder="Add a comment..." />
                    <button type='submit'>Send</button>
                </form>
                <div className="comments">
                    {comments.map(comment => {
                        // works whether createdBy is populated (object) or a raw ObjectId string
                        const commenterId = comment.createdBy
                        const isOwn = commenterId === user?._id

                        return (
                            <div
                                className={`commentCapsule ${isOwn ? "own" : "other"}`}
                                key={comment._id}
                            >
                                <p className="commenterName">
                                    {isOwn ? "You" : comment.createdBy?.name || "Unknown"}
                                </p>
                                <p className="commentText">{comment.text}</p>
                                <p className="commentTime">
                                    {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Blog