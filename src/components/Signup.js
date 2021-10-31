import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom';

const Signup = (props) => {
    const host = 'https://my-inotebook-api.herokuapp.com'
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

    let history  = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // API Call
        const { name, email, password } = credentials
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        const json = await response.json()
        console.log(json);
        // Save the auth token and redirect
        if(json.success){
        localStorage.setItem('token', json.authtoken)
        history.push("/")
        props.showAlert("Account Created Successfully", "success")
        }
        else {
            props.showAlert("Invalid credentails", "danger")
        }


    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className="container mt-2">
            <h2>Create an account to continue to iNotebook</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name="email" id="email" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" id="password" onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Conform Password</label>
                    <input type="password" className="form-control" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button><br />
                <small>Already have an account? <Link to="/login">Signin</Link></small>
            </form>
        </div>
    )
}

export default Signup