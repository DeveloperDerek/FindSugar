import React, { useState } from 'react';
import axios from 'axios';

const Register = (props) => {
    const {toggle, swap} = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    
    const exit = () => {
        toggle();
    }

    const switchLogin = () => {
        swap();
    }

    const register = (e) => {
        e.preventDefault();
        const logUser = { firstName, lastName, email, password, confirmPassword }
        axios
            .post("/api/user/register", logUser, { withCredentials: true })
            .then((res) => {
                console.log(res.data);
                toggle();
                window.location.reload(false); //to refresh the page
            })
            .catch((err) => {
                console.log(err.response.data);
                setErrors(err.response.data.errors)
            })
    }

    return(
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <p className="modal-title lead">Register</p>
                        <button className="close" data-dismiss="modal" aria-label="Close" onClick={exit}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form onSubmit={register}>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-4">
                                    <label className="form-label">Email</label>
                                </div>
                                <div className="col">
                                    <input type="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                                </div>
                                {errors?.email && (<span className="text-danger">{errors.email?.message}</span>)}
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label className="form-label">First Name</label>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} />
                                </div>
                                {errors?.firstName && (<span className="text-danger">{errors.firstName?.message}</span>)}
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label className="form-label">Last Name</label>
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" value={lastName} onChange={(e) => {setLastName(e.target.value)}} />
                                </div>
                                {errors?.lastName && (<span className="text-danger">{errors.lastName?.message}</span>)}
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label className="form-label">Password</label>
                                </div>
                                <div className="col">
                                    <input type="password" className="form-control" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                                </div>
                                {errors?.password && (<span className="text-danger">{errors.password?.message}</span>)}
                            </div>
                            <div className="row">
                                <div className="col-4">
                                    <label className="form-label">Confirm</label>
                                </div>
                                <div className="col">
                                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value)}}/>
                                </div>
                                {errors?.confirmPassword && (<span className="text-danger">{errors.confirmPassword?.message}</span>)}
                            </div>
                            <div className="row pt-2">
                                <div className="col">
                                    <span className="float-start" onClick={switchLogin}><small>Already have an account?</small></span>
                                </div>
                                <div className="col">
                                    <button className="btn btn-primary btn-sm float-end">Register</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Register;