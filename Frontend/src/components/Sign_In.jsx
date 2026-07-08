import React from 'react'
import "../css/style.css"
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Sign_In() {

    const navigate = useNavigate()

    async function SignIn_data(e) {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)
        try {
            const res = await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
            if (!res.ok) {
                const err = await res.json()
                console.log(err.error || "Login failed")
                return
            }

            const result = await res.json()
            navigate("/home")
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='body'>
            <div className='container' >
                <h1>Sign In</h1>
                <form action="" onSubmit={SignIn_data} >
                    <div className="SignUp">
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder='xyz@abc.com' required />
                        <label htmlFor="pass">Password</label>
                        <input type="password" name='pass' required />
                        <a href="/">Don't have an account?</a>
                        <button type='submit' >SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sign_In
