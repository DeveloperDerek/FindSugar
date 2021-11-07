import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../utils/UserContext";

const EditProfile = (props) => {
    const {toggle} = props;
    const {loggedUser} = useContext(UserContext);
    const [firstName, setFirstName] = useState(loggedUser.userInfo.firstName);
    const [lastName, setLastName] = useState(loggedUser.userInfo.lastName);
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const exit = () => {
        toggle();
    }

    const editUser = (e) => {
        e.preventDefault();
        const updateUser = { info: {firstName, lastName}, password : {password}}
        axios
            .post(`http://localhost:9000/api/user/update/${loggedUser.userInfo._id}`, updateUser, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                toggle();
                window.location.reload(false); //to refresh the page
            })
            .catch((err) => {
                console.log(err.response.data.errors);
                setErrors(err.response.data.errors)
            })
    }

    return(
        <div className="modal-dialog popup" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <p className="modal-title lead">Edit User</p>
                    <button className="close" data-dismiss="modal" aria-label="Close" onClick={exit}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form onSubmit={editUser}>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label">First Name</label>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label">Last Name</label>
                            </div>
                            <div className="col">
                                <input type="text" className="form-control" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <label className="form-label">Enter Password to Update</label>
                            </div>
                            <div className="col">
                                <input type="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="row pt-2">
                        {errors?.password && (<small className="text-danger">{errors.password?.message}</small>)}
                        {errors?.firstName && (<small className="text-danger">{errors.firstName?.message}</small>)}
                        {errors?.lastName && (<small className="text-danger">{errors.lastName?.message}</small>)}
                            <div className="col">
                                <button className="btn btn-primary btn-sm float-end">Update</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditProfile;