"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Address: React.FC = () => {
  const [profile, setProfile] = useState([]);
  const [Address, setAddress] = useState<any[]>([]);
  const [newAddress, setNewAddress] = useState("");
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const [wishlistData, setWishlistData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleEdit = async (addressIndex: number, newValue: string) => {
    try {
      const updatedAddress = [...Address]; // Create a copy of the Address array
      updatedAddress[addressIndex] = newValue; // Update the address at the specified index
      setAddress(updatedAddress); // Update the state with the new Address array
  
      const requestBody = { "Address": updatedAddress }; // Send the updated Address array to the server
      const response = await fetch("http://localhost:4000/profile/editprofile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error("Editing failed");
        if (response.status === 409) {
          // Handle conflict error
        }
      } else {
        const data = await response.json();
        console.log(data);
        window.location.reload();
      }
    } catch (error) {
      console.error("Error editing address:", error);
    }
  };
  
  const handleDelete = async (addressIndex: number, newValue: string) => {
    try {
      const updatedAddress = Address.filter((address, index) => index !== addressIndex);
      const requestBody = { "Address": updatedAddress };
  
      const response = await fetch(`http://localhost:4000/profile/editprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `${token}`
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error("Editing failed");
        if (response.status === 409) {
          // Handle conflict error
        }
      } else {
        const data = await response.json();
        console.log(data);
        window.location.reload();
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  const handleAdd = async () => {
    try {
      // Get the new address value from the state
      const newAddressValue = newAddress.trim();
  
      // If the new address is empty, do nothing
      if (!newAddressValue) return;
  
      // Create a copy of the current address array
      const updatedAddress = [...Address, newAddressValue];
  
      // Send the updated Address array to the server
      const requestBody = { "Address": updatedAddress };
  
      const response = await fetch(`http://localhost:4000/profile/editprofile`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: `${token}`
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error("Adding address failed");
        if (response.status === 409) {
          // Handle conflict error
        }
      } else {
        const data = await response.json();
        console.log(data);
        window.location.reload();
        setAddress(updatedAddress);
        // Clear the new address input field
        setNewAddress("");
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }
  } 
  

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
          return [];
        }
        if (!res.ok) {
          console.log("An error occurred");
          return [];
        }
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setAddress(data.Address);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, [token]);

  console.log("address", Address);
  console.log("token: ", token);
  console.log("products: ", profile);

  const labels = ["Home", "Work", "Other" ,"Other","Other" ,"Other" ,"Other" ,"Other" ,"Other"]; // Add more labels as needed

  return (
    <div className="CartPage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
      <header></header>
      <nav></nav>
      {!isLoading && (
        <main className='cartmain'>
          <h1 className="title">Your Address</h1>
          <table>
            <thead className="table-header">
              <tr>
                <th>Address</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Address.map((ADD: any, index: number) => (
                <tr key={ADD._id} className="items">
                  <td>
                    <div className="product">
                      <p className="product-category"><strong>{labels[index]} : </strong>{ADD}</p>
                    </div>
                  </td>
                  <td>
                    <div className="quantsity">
                      <input className="email" type="email" id="email" name="email" placeholder="New Address" onChange={(e) => setNewAddress(e.target.value)} />
                      <button className="edit-button" onClick={() => handleEdit(index, newAddress)}><FontAwesomeIcon icon={faEdit} /></button>
                    </div>
                  </td>
                  <td>
                    <div className="deletee">
                      <button className="edit-button" onClick={() => handleDelete(index, newAddress)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                
        <div className="checkout">
        <input className="email" type="email" id="email" name="email" placeholder="New Address" onChange={(e) => setNewAddress(e.target.value)} />
          <button className="checkoutbtnn" type="button" onClick={handleAdd}>Add <FontAwesomeIcon icon={faEdit}/></button>

        </div>
        </main>
      )}
      <FooterComponent />
    </div>
  );
}

export default Address;
