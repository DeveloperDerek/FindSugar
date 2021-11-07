import React, { useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAlert } from 'react-alert'

const ContactPage = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState([]);
    const alert = useAlert();

    const handleSubmit = (e) => {
        e.preventDefault();
        const msg = {fullName, email, message}
        axios
            .post("/api/contact/submit", msg)
            .then((res) => {
                alert.show('Message has been sent!')
                setErrors([]);
                setFullName("");
                setEmail("");
                setMessage("");
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err);
                setErrors(err.response.data.errors)
            });
    }

    return(
        <div className="fill-vertical bg-light">
            <Navbar />
            <div className="container-fluid">

                <div className="text-center">
                    <h1 className="display-6 py-2">Contact Us</h1>
                    <h6 className="text-muted">Plase fill out this form completely</h6>
                </div>

                <div className="px-5">
                    <form onSubmit={handleSubmit}>
                        <div className="py-2">
                            <label className="form-label">
                                Full Name <span className="text-danger">*</span>
                                {errors?.fullName && (
                                    <span className="text-danger">
                                        {errors.fullName?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <input type="text" className="form-control" value={fullName} onChange={(e) => {setFullName(e.target.value)}}/>
                        </div>

                        <div className="py-2">
                            <label className="form-label">
                                Email <span className="text-danger">*</span>
                                {errors?.email && (
                                    <span className="text-danger">
                                        {errors.email?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <input type="email" className="form-control" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                            <h6 className="text-muted"><small>example@example.com</small></h6>
                        </div>

                        <div className="py-2">
                            <label className="form-label">
                                Message <span className="text-danger">*</span>
                                {errors?.message && (
                                    <span className="text-danger">
                                        {errors.message?.properties?.message}
                                    </span>
                                )}
                            </label>
                            <textarea className="form-control" rows="4" value={message} onChange={(e) => {setMessage(e.target.value)}} />
                        </div>
                        
                        <p>We will email you back as soon as possible</p>
                        <button className="float-end btn btn-success">Send</button>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default ContactPage