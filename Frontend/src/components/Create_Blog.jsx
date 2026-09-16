import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "../css/style.css"

function Create_Blog({ blogs, setAllBlogs }) {

    const navigate = useNavigate()

    const handleCreate = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        try {
            const res = await fetch("http://localhost:5000/api/blogs/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                credentials: "include"
            })

            if (res.status === 401) {
                navigate("/login")
                return
            }

            const result = await res.json()

            if (!res.ok) {
                console.error("Failed to create blog:", result.message || result.error)
                return
            }

            setAllBlogs(prev => [...prev, result.blog])
            navigate("/home")
        } catch (err) {
            console.error("Failed to create blog:", err)
        }
    }

    return (
        <div className='form_page'>
            <div className='form_container'>
                <h1>Create Blog</h1>
                <form onSubmit={handleCreate}>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter blog title"
                        required
                    />

                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        placeholder="Paste image link"
                        required
                    />

                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        placeholder="Write a short description"
                        rows="4"
                        required
                    ></textarea>

                    <label htmlFor="textContent">Blog Text</label>
                    <textarea
                        name="textContent"
                        placeholder="Write your blog..."
                        rows="8"
                        required
                    ></textarea>

                    <div className='form_buttons'>
                        <button type='submit'>Publish</button>
                        <button type='button' onClick={() => navigate("/home")}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Create_Blog
