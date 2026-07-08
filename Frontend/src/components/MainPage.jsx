import React from 'react'
import { useNavigate } from 'react-router-dom'

function MainPage({ blogs, user, setUser }) {
    
    const navigate = useNavigate()
    React.useEffect(() => {
        fetch("http://localhost:5000/api/users/me", {
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => setUser(data.user))
            .catch(err => console.error("Failed to fetch blogs:", err))
    }, [])

    async function handlelogout(e){
        try{
            const res = await fetch("http://localhost:5000/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include"
            })
            if (!res.ok) {
                const err = await res.json()
                console.log(err.error)
                return
            }

            const result = await res.json()
            navigate("/login")
        }
        catch(err){
            console.log(err)
        }
    }   

    return (
        <div className='MainPage' >
            <nav>
                <div className="nav_bar">
                    <div className="logo">
                        <img src="https://picsum.photos/id/40/400/250" alt="" />
                        <h1>blog</h1>
                    </div>
                    <div className="functions">
                        <button onClick={() => navigate("/create")} >Create</button>
                        <button disabled={!user?._id} onClick={() => navigate(`/edit/${user?._id}`)} >Edit</button>
                        <button onClick={handlelogout} >Logout</button>
                        <img src="https://picsum.photos/id/40/400/250" alt="" />
                    </div>
                </div>
            </nav>
            <div className="blog_list">
                {blogs.map(blog => (
                    <div
                        className="blog_card"
                        key={blog._id}
                        onClick={() => navigate(`/blog_page/${blog._id}`)}
                    >
                        <img src={blog.image} alt={blog.title} className="blog_image" />
                        <h2 className="blog_title">{blog.title}</h2>
                        <p className="blog_desc">{blog.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MainPage