import React from 'react'
import { useHistory } from 'react-router-dom'

const Setting = () => {
    const history = useHistory();
    const handleLogout = () => {
        localStorage.removeItem('token')
        history.push('/login')
    }
    return (
        <div>
            <h3 className="fs-1">Profile</h3>
            <div className="container my-3">
                <p className="h6 my-2">Name: </p> <li className="list-group-item">Gaurav</li>
                <p className="h6 my-2">Email: </p> <li className="list-group-item">gaurav2499kumar@gmail.com</li>
            </div>
            <div className="my-3">
                <button onClick={handleLogout} type="button" class="btn btn-outline-danger">Signout</button>
            </div>
        </div>
    )
}

export default Setting
