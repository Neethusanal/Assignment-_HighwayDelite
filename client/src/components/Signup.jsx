import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [step, setStep] = useState(1); // Tracks the current step: 1 (Enter Details), 2 (Verify OTP), 3 (Enter Final OTP)
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [showOtp, setShowOtp] = useState(false); // Toggles OTP visibility
    const navigate = useNavigate();

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/send-otp', { name,email, dob });
            if (response.data.success) {
                Swal.fire('Success', response.data.message, 'success');
                setStep(2); // Move to OTP verification step
            } else {
                Swal.fire('Error', response.data.message, 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/verify-otp', { email, otp });
            if (response.data.success) {
                Swal.fire('Success', response.data.message, 'success');
                setStep(3); // Move to final OTP entry step
            } else {
                Swal.fire('Error', response.data.message, 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Invalid OTP. Please try again.', 'error');
        }
    };

    const handleFinalOtp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/finalize-signup', { email, otp });
            if (response.data.success) {
                Swal.fire('Success', response.data.message, 'success');
                navigate('/dashboard'); // Navigate to the dashboard or home page
            } else {
                Swal.fire('Error', response.data.message, 'error');
            }
        } catch (err) {
            console.error(err);
            Swal.fire('Error', 'Something went wrong. Please try again.', 'error');
        }
    };

    return (
        <div className="main">
            <div className="login-container">
                {step === 1 && (
                    <div className="step-container">
                        <h4 className="text">Sign Up</h4>
                        <form onSubmit={handleSendOtp}>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="dob">Date of Birth</label>
                                <input
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button type="submit" className="signup-button">
                                Send OTP
                            </button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="step-container">
                        <h4 className="text">Verify OTP</h4>
                        <form onSubmit={handleVerifyOtp}>
                            <div className="form-group">
                                <label htmlFor="otp">OTP</label>
                                <input
                                    type="text"
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    placeholder="Enter the OTP sent to your email"
                                />
                            </div>
                            <button type="submit" className="signup-button">
                                Verify OTP
                            </button>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="step-container">
                        <h4 className="text">Enter Final OTP</h4>
                        <form onSubmit={handleFinalOtp}>
                            <div className="form-group">
                                <label htmlFor="otp">Final OTP</label>
                                <input
                                    type={showOtp ? 'text' : 'password'} // Toggle input type
                                    id="otp"
                                    name="otp"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    required
                                    placeholder="Enter the final OTP"
                                />
                                <button
                                    type="button"
                                    className="toggle-otp-visibility"
                                    onClick={() => setShowOtp(!showOtp)}
                                >
                                    {showOtp ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <button type="submit" className="signup-button">
                                Complete Signup
                            </button>
                        </form>
                    </div>
                )}
            </div>

            <div className="image-container">
                <img
                    className="image"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkXcmSpJ26yomp2U-jpnIXW9JgHB4voVrKrg&usqp=CAU"
                    alt="Signup Illustration"
                />
            </div>
        </div>
    );
};

export default Signup;
