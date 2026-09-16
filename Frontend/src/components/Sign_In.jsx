import React from 'react'
import "../css/style.css"
import { useNavigate, Link } from 'react-router-dom'

function Sign_In() {

    const navigate = useNavigate()
    const [error, setError] = React.useState("")

    async function SignIn_data(e) {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        setError("")

        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })

            const result = await res.json()

            if (!res.ok) {
                setError(result.error || "Login failed")
                return
            }

            navigate("/home")
        }
        catch (err) {
            console.log(err)
            setError("Login failed")
        }
    }

    return (
        <div className='body'>
            <div className='container' >
                <h1>Welcome Back</h1>
                <form action="" onSubmit={SignIn_data} >
                    <div className="SignUp">
                        <label htmlFor="email">Email Address</label>
                        <input type="email" name='email' placeholder='you@example.com' required />
                        <label htmlFor="pass">Password</label>
                        <input type="password" name='pass' placeholder='••••••••' required />
                        {error ? <p style={{ color: '#ef4444', fontSize: '0.88rem', textAlign: 'center' }}>{error}</p> : null}
                        <Link to="/">Don't have an account? Sign up</Link>
                        <button type='submit' >SIGN IN</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sign_In
