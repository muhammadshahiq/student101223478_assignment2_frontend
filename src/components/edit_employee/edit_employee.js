import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from 'react-router-dom';
import { showSuccessMsg, showErrMsg } from '../utils/notification/Notification'

const EditBlogs = (props) => {

    const { id } = useParams()


    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [emailid, setEmailid] = useState("");
    const [message, setMessage] = useState("")
    const [user, setUser] = useState("");
    const { err1, success1 } = user;


    const handleClick = e => {
        e.preventDefault();

        const formData = new FormData();


        formData.append('firstname', firstname)
        formData.append('lastname', lastname)
        formData.append('emailid', emailid)


        setFirstname("");
        setLastname("");
        setEmailid("");

        axios.put(`/api/v1/employees/${id}`, formData)
            .then(res => {
                // setLoading(false);
                setMessage(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        axios.get(`/api/v1/employees/${id}`)
            .then(res => [
                setFirstname(res.data.firstname),
                setLastname(res.data.lastname),
                setEmailid(res.data.emailid),

            ])
            .catch(error => console.log(error))
    }, [`${id}`]);

    return (


        <div className="mt-4 d-flex justify-content-center ">
            <div className="Add_employee_container">
                <div className="d-flex justify-content-center ">
                    <h2 className='text-dark font-weight-bold border-bottom border-dark' >Update Employee</h2>
                </div>
                <div>
                    <span className="text-success">{message}</span>
                    {err1 && showErrMsg(err1)}
                    {success1 && showSuccessMsg(success1)}
                </div>
                <form onSubmit={handleClick} encType="multipart/form-data"  >
                    <div>
                        <label htmlFor="formGroupExampleInput2"> First Name</label>
                        <input onChange={(e) => setFirstname(e.target.value)} type="text" name="firstname" value={firstname} id="formGroupExampleInput2" placeholder="Enter First Name" />
                    </div>
                    <div >
                        <label htmlFor="formGroupExampleInput2">Last Name</label>
                        <input onChange={(e) => setLastname(e.target.value)} type="text" name="lastname" value={lastname} id="formGroupExampleInput2" placeholder="Enter Last Name" />
                    </div>
                    <div >
                        <label htmlFor="formGroupExampleInput2">Email</label>
                        <input onChange={(e) => setEmailid(e.target.value)} type="text" name="emailid" value={emailid} id="formGroupExampleInput2" placeholder="Enter Email " />
                    </div>

                    <div className="d-flex justify-content-center m-3">
                        <button className="btn btn-success" type="submit">Update Employee</button>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default EditBlogs