import Link from 'next/link';
"use client"
import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import './globals.css';

function ErrorPopup({ onClose }: { onClose: () => void }) {
    return (
        <div className="popupmain">
            <div className="popuperror-inner">
                <h2>Error</h2>
                <FontAwesomeIcon icon={faTriangleExclamation} className="faTriangleExclamation-icon" />
                <p>Email already exists. Please try again with a different email.</p>
                <button className="close-btn" onClick={onClose}>close</button>
            </div>
        </div>
    );
}
function SucessPopup({ onClose }: { onClose: () => void }) {
    return (
        <div className="popupmain">
            <div className="popupsucess-inner">
                <h2>Done</h2>
                <FontAwesomeIcon icon={faCheckCircle} className="faCheckCircle-icon" />
                <p>Sign up successfully please check your email to confirm registration </p>
            </div>
        </div>
    );
}

export default function SignUp() {
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showSucessPopup, setShowSucessPopup] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [Email, setEmail] = useState('');
    const [First_Name, setFirstName] = useState('');
    const [Last_Name, setLastName] = useState('');
    const [Phone_Number, setPhone] = useState('');
    const [Address, setAddress] = useState('');
    const [Company, setCompany] = useState('');
    const handleSignUp = async () => {
        try {
            if (!username || !password || !Email || !First_Name || !Last_Name || !Phone_Number || !Address || !Company) {
                setShowErrorPopup(true);
                return;
            }
            if(Email.indexOf('@') === -1 || Email.indexOf('.') === -1){
                setShowErrorPopup(true);
                return;
            }
            if(Phone_Number.length !== 10 || Phone_Number.includes('e') || Phone_Number.includes('E') || Phone_Number.includes('.') || Phone_Number.includes('-') || Phone_Number.includes('+') || Phone_Number.includes(' ')){
                setShowErrorPopup(true);
                return;
            }
          console.log("username: ", username);
          // Send POST request to backend API with username and password
          const response = await fetch('http://localhost:4000/account/sign-up', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password ,Email, First_Name,Last_Name, Phone_Number, Address, Company}),
          });
    
          // Handle response
          if (response.ok) {
            // Login successful
            const data = await response.json();
            console.log(data);
            const token = data.token;
            console.log(token);
            const encodedToken = encodeURIComponent(token);
            setShowSucessPopup(true);

          } else {
            // Login failed
            setShowErrorPopup(true);
            console.error('Login failed');
          }
        } catch (error) {
          console.error('Error occurred while logging in:', error);
        }
      };


    const closeErrorPopup = () => {
        setShowErrorPopup(false);
    };
    const closeSucessPopup = () => {
        setShowErrorPopup(false);
        window.location.href = '/login';
    };
  return (
    <div>
    <div className="signupPage">
        <header></header>
        <nav>
        </nav>
        <main className="signupcontainer">
            <p className="signuptitle">Create New Account</p>
            <div className="Name">

            <input className="FirstName" type="text" id="FirstName" name="FirstName" placeholder="First Name" required  onChange={(e) => setFirstName(e.target.value)} />
            <input className="LastName" type="text" id="LastName" name="LastName" placeholder="Last Name" required  onChange={(e) => setLastName(e.target.value)}/>
          
            </div>
            <input className="Username" type="text" id="Username" name="Username" placeholder="UserName" required  onChange={(e) => setUsername(e.target.value)} />
            <input className="email" type="email" id="email" name="email" placeholder="Email" required   onChange={(e) => setEmail(e.target.value)}  />
            <input className="Password" type="password" id="Password" name="Password" placeholder="Password" required  onChange={(e) => setPassword(e.target.value)}  />
             <input className="phone" type="text" id="phone" name="phone" placeholder="Phone" required onChange={(e) => setPhone(e.target.value)}/>
            <input className="address" type="text" id="address" name="address" placeholder="Address" required onChange={(e) => setAddress(e.target.value)} />
            <input className="Company" type="text" id="Company" name="Company" placeholder="Company" required onChange={(e) => setCompany(e.target.value)}/>
            <button className="signup" type="button" onClick={handleSignUp}>Signup</button>
            {showErrorPopup && <ErrorPopup onClose={closeErrorPopup} />}
            {showSucessPopup && <SucessPopup onClose={closeSucessPopup} />}
        </main>
       
    </div>
    </div>
  );
}
