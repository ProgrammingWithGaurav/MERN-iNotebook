import React, { useEffect, useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

const Setting = () => {
    let [username, setUsername] = useState("Loading...");
    let [email, setEmail] = useState("Loading...");
    const host = "https://my-inotebook-api.herokuapp.com"
    const refDelete = useRef(null);

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

    const deleteClick = () => {
        refDelete.current.click()
    }

    const handleDelete = async () => {
        const response = await fetch(`${host}/api/auth/deleteuser`, {
            method: "GET",
            headers: {
                'Content-Type': 'applicatin/json',
                'auth-token': localStorage.getItem('token')
            }
        })
        const json = response.json()
        console.log(json);
        localStorage.clear('token')
        history.push('/login')


    }

    useEffect(() => {
        getUserData()
    })
    return (
        <>
            <button ref={refDelete} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Do you really want to delete your account ? </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handleDelete} type="button" className="btn btn-primary">Delete Account</button>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="fs-1">Profile</h3>
                <div className="container my-3">
                    <p className="h6 my-2">Name: </p> <li className="list-group-item">{username}</li>
                    <p className="h6 my-2">Email: </p> <li className="list-group-item">{email}</li>
                </div>
                <div className="my-3">
                    <button onClick={handleLogout} type="button" className="btn btn-outline-danger">Signout</button>
                </div>
                <div className="my-3">
                    <h2 className="text-warning">Delete Account</h2>
                    <small>Once you delete you account, there is no going back. Please be certain.</small><br />
                    <button onClick={deleteClick} type="button" className="btn my-2 btn-outline-warning">Delete Account</button>
                </div>
            </div>
        </>
    )
}

export default Setting
