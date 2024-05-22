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
                <p>Sign up successfully </p>
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
    const First_Name = searchParams.get("firstName");
    const Last_Name = searchParams.get("lastName");
    const Phone_Number = searchParams.get("phoneNumber");
    const Address = searchParams.get("address");
    const Company = searchParams.get("company");
    const username = searchParams.get("username");
    const password = searchParams.get("password");

console.log("email: ", email);
console.log("First_Name: ", First_Name);
console.log("Last_Name: ", Last_Name);
console.log("Phone_Number: ", Phone_Number);
console.log("Address: ", Address);
console.log("Company: ", Company);
console.log("username: ", username);
 
const handleSignUp = async () => {
    try {
        if (!username || !password || !email || !First_Name || !Last_Name || !Phone_Number || !Address || !Company) {
            setShowErrorPopup(true);
            return;
        }
      console.log("username: ", username);
      // Send POST request to backend API with username and password
      const response = await fetch('http://localhost:4000/account/confirmsign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password ,email, First_Name,Last_Name, Phone_Number, Address, Company}),
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

     <p>Click the button below to verify your email</p>
     <Button color="success" className="buttonsuccess" onClick={handleSignUp}>
        Success
     </Button> 
     </div> 
     {showErrorPopup && <ErrorPopup onClose={closeErrorPopup} />}
            {showSucessPopup && <SucessPopup onClose={closeSucessPopup} />}
    </div>
  );
}
