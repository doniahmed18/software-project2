// pages/verify-email.js
"use client";
import React from "react";
import {Button} from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

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
                <p>Password changed successfully </p>
                <button className="close-btn" onClick={onClose}>Go to login</button>
            </div>
        </div>
    );
}
export default function VerifyEmail() {
    const searchParams = useSearchParams();
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showSucessPopup, setShowSucessPopup] = useState(false);
    const email = searchParams.get("email");
    const [password , setPassword] = useState('');


console.log("email: ", email);


 
const handleSignUp = async () => {
    try {
        if (!email ) {
            setShowErrorPopup(true);
            return;
        }
    
      const response = await fetch('http://localhost:4000/account/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email,password}),
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
    window.location.href = '/Login';
};

  return (
    <div className='b'>
     <div className="verify">

     <p>Enter your new password</p>
        <input type="password" placeholder="Enter your new password" onChange={(e) => setPassword(e.target.value)} />
     <Button color="success" className="buttonsuccess" onClick={handleSignUp}>
        Submit
     </Button> 
     {showErrorPopup && <ErrorPopup onClose={closeErrorPopup} />}
            {showSucessPopup && <SucessPopup onClose={closeSucessPopup} />}
     </div> 

    </div>
  );
}
