import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const Setting = () => {
    let [username, setUsername] = useState("");
    let [email, setEmail] = useState("");
    const host = "https://my-inotebook-api.herokuapp.com"
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }

    const getUserData = async () => {
        const response = await fetch(`${host}/api/auth/getuser`, {
            method: "GET",
            headers: {
                'Content-Type': 'applicatin/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = await response.json();
        setUsername(json.name)
        setEmail(json.email)
    }
    
    useEffect(() => {
        getUserData()
    })
    return (
        <div>
            <h3 className="fs-1">Profile</h3>
            <div className="container my-3">
                <p className="h6 my-2">Name: </p> <li className="list-group-item">{username}</li>
                <p className="h6 my-2">Email: </p> <li className="list-group-item">{email}</li>
            </div>
            <div className="my-3">
                <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Signout</button>
            </div>
        </div>
    )
}

export default Setting
