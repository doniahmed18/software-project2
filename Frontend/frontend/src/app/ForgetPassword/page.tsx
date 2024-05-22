"use client"
import { useState,useEffect } from "react"
import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye,faCheckCircle, faEyeSlash ,faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import './globals.css'; 
function ErrorPopup({ onClose }: { onClose: () => void }) {
    return (
        <div className="popupmain">
            <div className="popuperror-inner">
                <h2>Error</h2>
                <FontAwesomeIcon icon={faTriangleExclamation} className="faTriangleExclamation-icon" />
                <p>Email is wrong. Please try again with a different email.</p>
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
                <p>Please check your email to see the new password </p>
            </div>
        </div>
    );
}
export default function ForgetPassword() {
    const [username, setUsername] = useState('');
    const [showErrorPopup, setShowErrorPopup] = useState(false);
    const [showSucessPopup, setShowSucessPopup] = useState(false);
   
    const handleForget = async () => {
        try {
            if (!username) {
                console.log("username: ", username);
                setShowErrorPopup(true);
                return;
            }
            console.log("username: ", username);
            // Send POST request to backend API with username and password
            const response = await fetch('http://localhost:4000/account/forget-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username }),
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
                console.error('Login failed');
                setShowErrorPopup(true);

            }
        } catch (error) {
            console.error('Login failed');
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
    <div className="ForgetPass">
        <div className="ForgetPass-inner">
           <h3 className="enteryou">Enter your email to reset password</h3>
           <input className="email" type="email" id="email" name="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} >

           </input>
            <button className="ForgetPass-btn" onClick={handleForget}>Submit</button>
    </div>
    {showErrorPopup && <ErrorPopup onClose={closeErrorPopup} />}
            {showSucessPopup && <SucessPopup onClose={closeSucessPopup} />}
    </div>
  );
}
