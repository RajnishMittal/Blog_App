import React from 'react'
import "../css/style.css"
import { useNavigate } from 'react-router-dom'

function Sign_Up() {

    const navigate = useNavigate()

    async function SignUp_data(e){
        e.preventDefault()
        const formdata = new FormData(e.target)
        const data = Object.fromEntries(formdata)

        try{
            const res = await fetch("http://localhost:5000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (res.ok) {
                navigate("/login");
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return (
        <div className='body'>
            <div className='container' >
                <h1>Sign Up</h1>
                <form action="" onSubmit={SignUp_data} >
                    <div className="SignUp">
                        <label htmlFor="name">Name</label>
                        <input type="text" name='name' required />
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' placeholder='xyz@abc.com' required />
                        <label htmlFor="pass">Password</label>
                        <input type="password" name='pass' required />
                        <a href="/login">Already have an account?</a>
                        <button type='submit'>SUBMIT</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Sign_Up
