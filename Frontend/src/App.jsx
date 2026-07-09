import './App.css'
import React from 'react';
import blogPosts from "./dummy.js";
import Sign_Up from './components/Sign_Up'
import Sign_In from './components/Sign_In'
import MainPage from './components/MainPage';
import Blog from './components/Blog';
import Create_Blog from './components/Create_Blog';
import Edit_Blog from './components/Edit_Blog.jsx';
import EditBlog from './components/EditBlog.jsx';
import { useNavigate } from 'react-router-dom'
import { Routes, Route} from 'react-router-dom';

function App() {

  const[blogs, setAllBlogs] = React.useState([])
  const[userBlog, setUserBlog] = React.useState([])
  const[user, setUser] = React.useState([])
  const navigate = useNavigate()

    React.useEffect(() => {
        fetch("http://localhost:5000/api/blogs", {
            credentials: "include"
        })
            .then(res => {
                if (res.status === 401) {
                    navigate("/")
                    return null
                }
                if (!res.ok) throw new Error("Failed to fetch blogs")
                return res.json()
            })
            .then(data => {
                if (data) setAllBlogs(data)
            })
            .catch(err => console.error("Failed to fetch blogs:", err))
    }, [])

    console.log(user)

  return (
    <Routes>
      <Route path="/" element={ <Sign_Up/> }/>
      <Route path="/login" element={ <Sign_In/> }/>
      <Route path="/home" element={<MainPage blogs={blogs} user={user} setUser={setUser} />} />
      <Route path="/blog_page/:id" element={ <Blog blogs={blogs} user={user} /> }/>
      <Route path="/create" element={ <Create_Blog blogs={blogs} setAllBlogs={setAllBlogs} /> }/>
      <Route path="/edit/:id" element={ <Edit_Blog setUserBlog={setUserBlog} userBlog={ userBlog } /> }/>
      <Route path="/edit_blog_form/:id" element={ <EditBlog setUserBlog={setUserBlog} userBlog={ userBlog } /> }/>
    </Routes>
  )
}

export default App
