"use client"
import { useState,useEffect } from "react"
import { Input } from "@nextui-org/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash ,faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
import './globals.css'; 
function ErrorPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="popupmain">
      <div className="popuperror-inner">
        <h2>Error</h2>
        <FontAwesomeIcon icon={faTriangleExclamation} className="faTriangleExclamation-icon" />
        <p>Incorrect email or password </p>
        <button className="close-btn" onClick={onClose}>close</button>
      </div>
    </div>
  );
}
export default function LoginPage() {
  // State variables to store username and password
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const [guestcart, setGuestCart] = useState<any[]>([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const closeErrorPopup = () => {
    setShowErrorPopup(false);
};
useEffect(() => {
  const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
  setGuestCart(storedCart);
}, []);
console.log(guestcart)
  // Function to handle login
  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setShowErrorPopup(true);
        return;
      }
      console.log("username: ", username);
      // Send POST request to backend API with username and password
      const response = await fetch('http://localhost:4000/account/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Handle response
      if (response.ok) {
        // Login successful
        const data = await response.json();
        console.log(data);
        const token = data.access_token;
        console.log(token);
        const encodedToken = encodeURIComponent(token);
        console.log(encodedToken);
        window.location.href = `/HomePage?token=${encodedToken}`;
      } else {
        // Login failed
        setShowErrorPopup(true);
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
    }
  };

  return (
    <div>
    <div className= "loginPage">
        <main className ="logincontainer">
            <p className ="logintitle">
                Login
            </p>
            <input className="email" type="email" id="email" name="email" placeholder="Email" onChange={(e) => setUsername(e.target.value)} >
            </input>
           <div className="passcon">
            <input className= "password"type={passwordVisible ? 'text' : 'password'} id="Password" name="Password" placeholder="Password"  onChange={(e) => setPassword(e.target.value)}
>
            </input>
            <button
            className="password-toggle"
            type="button"
            onClick={togglePasswordVisibility}
          >
            <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} />
          </button>
         </div>
           
            <button className = "login" onClick={handleLogin}>Login</button>
            <a className ="signupa" href ="/SignUp" >NEW ? ...Create new account</a>
            <a className ="Forgeta" href ="/ForgetPassword" >Forget Password</a>

            {showErrorPopup && <ErrorPopup onClose={closeErrorPopup} />}
        </main>
        
    </div>

  
    </div>
  );
}