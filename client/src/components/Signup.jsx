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
                    src="data:image/jpeg;base64,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"
            alt="Notes"
                />
            </div>
        </div>
    );
};

export default Signup;
