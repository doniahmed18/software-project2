"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
const Profile: React.FC = () => {
  const [Profile, setProfile] = useState(null);
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [Oldpassword, setOldPassword] = useState("");
const [firstname, setFirstname] = useState("");
const [lastname, setLastname] = useState("");
const [address, setAddress] = useState("");
const [phoneNumber,setphoneNumber] = useState("");
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const [wishlistData, setWishlistData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");


  

  useEffect(() => {
    fetch("http://localhost:4000/profile/getprofile", {
      headers: {
        Authorization: `${token}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.log("Unauthorized");
          window.location.href = "/Login";
          return null;
        }
        if (!res.ok) {
          console.log("An error occurred");
          return null;
        }
        return res.json();
      })
      .then((data) => {
        console.log("data:", data);
        setProfile(data); // Update the profile state with the response data
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      })
      .finally(() => setLoading(false));
  }, [token]);
  
  
console.log("nn",Profile)
const handleEdit = async (field: string, newValue: string) => {
    try {
      const requestBody = { [field]: newValue }; // Dynamically create the request body object
      const response = await fetch("http://localhost:4000/profile/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody), // Stringify the request body
      });

      // Handle response
      if (!response.ok) {
        console.error("Editing failed");
        if (response.status === 409) {
          //  window.location.href = '/Login';
        }
      } else {
        const data = await response.json();
        console.log(data);
        alert("done editing the password");
          window.location.reload();
        
      }
    } catch (error) {
      console.error("Error editing profile :", error);
      alert("Error editing profile :");

    }
  };
  const handleEditpassword = async (field: string, newValue: string) => {
    try {
      // Fetch current profile data
      const profileResponse = await fetch("http://localhost:4000/profile/getprofile", {
        headers: {
          Authorization: `${token}`,
        },
      });
      const profileData = await profileResponse.json();

      // Check if the old password matches the current password
      if (profileData.password === Oldpassword) {
        // Old password matches, proceed with updating the password
        const requestBody = { [field]: newValue }; // Dynamically create the request body object
        const response = await fetch("http://localhost:4000/profile/editprofile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(requestBody), // Stringify the request body
        });

        // Handle response
        if (!response.ok) {
          console.error("Editing failed");
          if (response.status === 409) {
            //  window.location.href = '/Login';
          }
        } else {
          const data = await response.json();
          console.log(data);
          alert("done editing the password");

          window.location.reload();

        }
      } else {
        // Old password does not match
        console.error("Old password is incorrect");
        alert("Old password is incorrect. Please enter the correct old password.");

        // Handle the case where the old password entered by the user does not match the current password
      }
    } catch (error) {
      console.error("Error editing profile:", error);
    }
};




return (
    <div className="CartPage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
      {!isLoading && (
        <main className='cartmain'>
            <table>
          <thead className="table-header">
            <tr>
              <th>Info</th>
              <th>New Value</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {Profile && (
             <><tr className="items">
                                <td>
                                    <strong>Email: </strong> {(Profile as any).Email}
                                </td>
                                <td>
                                    <input className="email" type="email" id="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}>
                                    </input>
                                </td>
                                <td>
                                    <button className="edit-button" onClick={() => handleEdit("Email", email)}><FontAwesomeIcon icon={faEdit} />

                                    </button>
                                </td>

                            </tr>
                            <tr className="spacer-row"></tr>

                            <tr className="items">
                                    <td>
                                        <strong>FirstName: </strong> {(Profile as any).First_Name} 
                                    </td>
                                    <td>
                                        <input className="email" type="email" id="email" name="email" placeholder="FirstName" onChange={(e) => setFirstname(e.target.value)}>
                                        </input>
                                    </td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEdit("First_Name", firstname)}><FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="spacer-row"></tr>

                                <tr className="items">
                                    <td>
                                        <strong>LastName: </strong> {(Profile as any).Last_Name}
                                    </td>
                                    <td>
                                        <input className="email" type="email" id="email" name="email" placeholder="LastName" onChange={(e) => setLastname(e.target.value)}>
                                        </input>
                                    </td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEdit("Last_Name", lastname)}><FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="spacer-row"></tr>

                                <tr className="items">
                                    <td>
                                        <strong>Password: </strong> ********
                                    </td>
                                    <td>
                                      <div className="password-cchange">
                                        <input className="email" type="email" id="email" name="email" placeholder="Password" onChange={(e) => setPassword(e.target.value)}>
                                       
                                        </input>
                                        <input className="email" type="email" id="email" name="email" placeholder="Old Password" onChange={(e) => setOldPassword(e.target.value)}>
                                       
                                       </input>
                                       </div>
                                    </td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEditpassword("password", password)}><FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="spacer-row"></tr>

                                <tr className="items">
                                    <td>
                                        <strong>Address: </strong> {(Profile as any).Address}
                                    </td>
                                    <td>
                                        <input className="email" type="email" id="email" name="email" placeholder="Address">
                                        </input>
                                    </td>
                                    <td>
                                        <button className="edit-button" onClick={() => { window.location.href = `/EditProfile?token=${token}`; } }><FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                </tr>
                                <tr className="items">
                                    <td>
                                        <strong>PhoneNumber: </strong> {(Profile as any).Phone_Number}
                                    </td>
                                    <td>
                                        <input className="email" type="email" id="email" name="email" placeholder="PhoneNumber" onChange={(e) => setphoneNumber(e.target.value)}>
                                        </input>
                                    </td>
                                    <td>
                                        <button className="edit-button" onClick={() => handleEdit("Phone_Number", phoneNumber)}><FontAwesomeIcon icon={faEdit} />
                                        </button>
                                    </td>
                                </tr>
                                </>
          )}
          </tbody>
          </table>
        </main>
        
      )}
      <FooterComponent />
    </div>
  );
  
}

export default Profile;
