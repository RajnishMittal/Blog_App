import React from 'react'
import "../css/style.css"
import { useNavigate, Link } from 'react-router-dom'

function Sign_Up() {

    const navigate = useNavigate()
    const [error, setError] = React.useState("")

    async function SignUp_data(e){
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        setError("")

        try{
            const res = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            const result = await res.json()

            if (!res.ok) {
                setError(result.error || "Signup failed")
                return
            }

            navigate("/login")
        }
        catch(err){
            console.log(err)
            setError("Signup failed")
        }
    }

    return (
        <div className='body'>
            <div className='container' >
                <h1>Create Account</h1>
                <form action="" onSubmit={SignUp_data} >
                    <div className="SignUp">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" name='name' placeholder='John Doe' required />
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name='email' placeholder='you@example.com' required />
                        <label htmlFor="pass">Password</label>
                        <input type="password" name='pass' placeholder='••••••••' required />
                        {error ? <p style={{ color: '#ef4444', fontSize: '0.88rem', textAlign: 'center' }}>{error}</p> : null}
                        <Link to="/login">Already have an account? Sign in</Link>
                        <button type='submit'>CREATE ACCOUNT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sign_Up
