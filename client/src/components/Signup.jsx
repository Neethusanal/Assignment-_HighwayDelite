import React, { useState } from 'react'
import axios from 'axios';
import "./Signup.css"
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';



const Signup = () => {
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/signup', { name, dob, email, otp });
      if (response.data.success) {
        Swal.fire('Success', response.data.message, 'success');
        navigate('/signin');
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
      {/* Image Section */}
      <div className="image-container">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkXcmSpJ26yomp2U-jpnIXW9JgHB4voVrKrg&usqp=CAU"
          alt="Signup Illustration"
          className="image"
        />
      </div>

      {/* Signup Form Section */}
      <div className="login-container">
        <h2 className="text">Sign Up</h2>
        <div className="login-data">
          <form onSubmit={handleSignUp}>
            {/* Name Field */}
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

            {/* Date of Birth Field */}
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

            {/* Email Field */}
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

            {/* OTP Field */}
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="Enter the OTP"
              />
            </div>

            {/* Sign-Up Button */}
            <button type="submit" className="signup-button">
              Sign Up
            </button>
          </form>

          {/* Sign-In Link */}
          <div className="signin-link">
            <p>
              Already a member? <Link to="/signin">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
