"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCcMastercard, faPaypal } from "@fortawesome/free-brands-svg-icons"
const Payment: React.FC = () => {
  const [profile, setProfile] = useState([]);
  const [Payment, setPayment] = useState<any[]>([]);
  const [newPayment, setNewPayment] = useState("");
  const [newPaymentType, setNewPaymentType] = useState("");
  const [newPaymentName, setNewPaymentName] = useState("");
  const [newPaymentNumber, setNewPaymentNumber] = useState("");
  const [newPaymentExpiry, setNewPaymentExpiry] = useState("");
  const [newPaymentCvv, setNewPaymentCvv] = useState("");
  const [newPaymentNamem, setNewPaymentNamem] = useState("");
  const [newPaymentNumberm, setNewPaymentNumberm] = useState("");
  const [newPaymentExpirym, setNewPaymentExpirym] = useState("");
  const [newPaymentCvvm, setNewPaymentCvvm] = useState("");
  const [newPaymentAccount, setNewPaymentAccount] = useState("");
  const [newPaymentTypep, setNewPaymentTypep] = useState("");

  
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const [wishlistData, setWishlistData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const[isPaypal,setIsPaypal]=useState(false);
  const[isCreditCard,setIsCreditCard]=useState(true);
  const[isMasterCard,setIsMasterCard]=useState(false);
  const handlePaypal = () => {
    setIsPaypal(true);
    setIsCreditCard(false);
    setIsMasterCard(false);
  };
  const handleMastercard = () => {
    setIsMasterCard(true);
    setIsCreditCard(false);
    setIsPaypal(false);
  };
    const handleCreditcard = () => {
        setIsCreditCard(true);
        setIsMasterCard(false);
        setIsPaypal(false);
    };


  const handleEdit = async (PaymentIndex: number, newValue: string) => {
    try {
      const updatedPayment = [...Payment]; // Create a copy of the Payment array
      updatedPayment[PaymentIndex] = newValue; // Update the Payment at the specified index
      setPayment(updatedPayment); // Update the state with the new Payment array
  
      const requestBody = { "Payment": updatedPayment }; // Send the updated Payment array to the server
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
      console.error("Error editing Payment:", error);
    }
  };
  
  const handleDelete = async (PaymentIndex: number, newValue: string) => {
    try {
      const updatedPayment = Payment.filter((Payment, index) => index !== PaymentIndex);
      const requestBody = { "Payment": updatedPayment };
  
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
      // Get the new Payment value from the state
      const newPaymentValue = newPayment.trim();
      const newPaymentType1 = newPaymentType.trim();
      const newPaymentName1 = newPaymentName.trim();
      const newPaymentNumber1 = newPaymentNumber.trim();
      const newPaymentExpiry1 = newPaymentExpiry.trim();
      const newPaymentCvv1 = newPaymentCvv.trim();
      const newPaymentNamem1 = newPaymentNamem.trim();
      const newPaymentNumberm1 = newPaymentNumberm.trim();
      const newPaymentExpirym1 = newPaymentExpirym.trim();
      const newPaymentCvvm1 = newPaymentCvvm.trim();
      const newPaymentAccount1 = newPaymentAccount.trim();
      const newPaymentTypep1 = newPaymentTypep.trim();
  console.log("called")
  console.log(newPaymentName1);
      // Check if the new Payment value is empty
  
      // Determine the payment type based on the selected option
      let paymentType = "";
      if (isCreditCard) {
        paymentType = "Credit Card";
        if (!newPaymentName1 || !newPaymentNumber1 || !newPaymentExpiry1 || !newPaymentCvv1) return;
      } else if (isMasterCard) {
        paymentType = "MasterCard";
        if (!newPaymentNamem1 || !newPaymentNumberm1 || !newPaymentExpirym1 || !newPaymentCvvm1) return;
      } else if (isPaypal) {
        paymentType = "Paypal";
        if (!newPaymentAccount1 || !newPaymentTypep1) return;
      }
  
      // Construct the payment object based on the payment type
      let paymentData = {};
      if (paymentType === "Credit Card" || paymentType === "MasterCard") {
        paymentData = {
          type: paymentType,
          name: paymentType === "Credit Card" ? newPaymentName1 : newPaymentNamem1,
          number: paymentType === "Credit Card" ? newPaymentNumber1 : newPaymentNumberm1,
          expiry: paymentType === "Credit Card" ? newPaymentExpiry1 : newPaymentExpirym1,
          cvv: paymentType === "Credit Card" ? newPaymentCvv1 : newPaymentCvvm1,
        };
      } else if (paymentType === "Paypal") {
        paymentData = {
          type: paymentType,
          account: newPaymentAccount1,
          accounttype: newPaymentTypep1,
        };
      }
  
      // Create a copy of the current Payment array and add the new payment data
      const updatedPayment = [...Payment, paymentData];
  
      // Send the updated Payment array to the server
      const requestBody = { Payment: paymentData };
      const response = await fetch(`http://localhost:4000/profile/addpayment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error("Adding Payment failed");
        if (response.status === 409) {
          // Handle conflict error
        }
      } else {
        const data = await response.json();

        console.log(data);
        setPayment(updatedPayment);
window.location.reload();
        // Clear the new Payment input fields
        setNewPayment("");
        setNewPaymentName("");
        setNewPaymentNumber("");
        setNewPaymentExpiry("");
        setNewPaymentCvv("");
        setNewPaymentNamem("");
        setNewPaymentNumberm("");
        setNewPaymentExpirym("");
        setNewPaymentCvvm("");
        setNewPaymentAccount("");
        setNewPaymentTypep("");
      }
    } catch (error) {
      console.error('Error adding Payment:', error);
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
        setPayment(data.Payment);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, [token]);

  console.log("Payment", Payment);
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
          <h1 className="title">Your Payment</h1>
          <table>
            <thead className="table-header">
              <tr>
                <th>Payment</th>

                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {Payment.map((ADD: any, index: number) => (
                <tr key={ADD._id} className="items">
                  <td>
                    <div className="product">
                    {ADD.type === "Paypal" &&<p className="product-d"><strong>Type :</strong> {ADD.type} <FontAwesomeIcon className="creditcardd" icon={faPaypal}/> </p>} 
                    {ADD.type === "MasterCard" &&<p className="product-d"><strong>Type :</strong> {ADD.type} <FontAwesomeIcon className="creditcardd" icon={faCcMastercard}/> </p>}
                    {ADD.type === "Credit Card" &&<p className="product-d"><strong>Type :</strong> {ADD.type} <FontAwesomeIcon className="creditcardd" icon={faCreditCard}/> </p>}
                      {ADD.type !== "Paypal" &&<p className="product-d"><strong>Name :</strong> {ADD.name}</p>}
                      {ADD.type !== "Paypal" &&<p className="product-d"><strong>Expiry Date :</strong> {ADD.expiry}</p>}
                      {ADD.type !== "Paypal" &&<p className="product-d"><strong>Number :</strong> {ADD.number}</p>}
                      {ADD.type !== "Paypal" && <p className="product-d"><strong>CVV :</strong> {ADD.cvv}</p>}
                      {ADD.type === "Paypal" && <p className="product-d"><strong>Account :</strong> {ADD.account}</p>}
                      {ADD.type === "Paypal" && <p className="product-d"><strong>Account Type :</strong> {ADD.accounttype}</p>}
      

                    </div>
                  </td>
                  
                  <td>
                    <div className="deletee">
                      <button className="edit-button" onClick={() => handleDelete(index, newPayment)}><FontAwesomeIcon icon={faTrash} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
                
        <div className="checkout">
<div className="paymentmethod">
<button className="credit" type="button" onClick={handleCreditcard}>Credit <FontAwesomeIcon icon={faCreditCard}/></button>
<button className="paypal" type="button" onClick={handlePaypal}>Paypal <FontAwesomeIcon icon={faPaypal}/></button>
<button className="Mastercard" type="button" onClick={handleMastercard}>MasterCard <FontAwesomeIcon icon={faCcMastercard}/></button>
</div>
{isCreditCard && (

<div className="creditcard">
<div className="creditcardinfo">
<h2>CreditCard info</h2>
  <input type="text" id="fname" className="cardholder" name="fname" placeholder="Name on Card" onChange={(e) => setNewPaymentName(e.target.value)}/>
  <div className="cardnumbeer">
    <input type="text" id="lname" className="cardnumber" name="lname" placeholder="Card Number" onChange={(e) => setNewPaymentNumber(e.target.value)}/>
    <p><FontAwesomeIcon className="creditcardd" icon={faCreditCard}/></p>
    </div>
    <div className="expiry-cvv">
    <input type="expirydate" id="lname" className="expiry" name="lname" placeholder="MM/YY" onChange={(e) => setNewPaymentExpiry(e.target.value)}/>
    <input type="text" id="lname" className="cvv" name="lname" placeholder="CVV" onChange={(e) => setNewPaymentCvv(e.target.value)}/>
    </div>
    </div>
    </div>

)}
{isMasterCard && (

<div className="creditcard">
<div className="creditcardinfo">
<h2>CreditCard info</h2>
  <input type="text" id="fname" className="cardholder" name="fname" placeholder="Name on Card" onChange={(e) => setNewPaymentNamem(e.target.value)} />
  <div className="cardnumbeer">
    <input type="text" id="lname" className="cardnumber" name="lname" placeholder="Card Number" onChange={(e) => setNewPaymentNumberm(e.target.value)}/>
    <p><FontAwesomeIcon className="mastercard" icon={faCcMastercard}/></p>
    </div>
    <div className="expiry-cvv">
    <input type="expirydate" id="lname" className="expiry" name="lname" placeholder="MM/YY" onChange={(e) => setNewPaymentExpirym(e.target.value)}/>
    <input type="text" id="lname" className="cvv" name="lname" placeholder="CVV" onChange={(e) => setNewPaymentCvvm(e.target.value)}/>
    </div>
    </div>
    </div>

)}
{isPaypal && (

<div className="paypalhh">
<div className="paypalinfo">
<h2>Paypal account info</h2>
  <div className="cardnumbeer">
  <input type="email" id="fname" className="paypayaccount" name="fname" placeholder="Paypal Account " onChange={(e) => setNewPaymentAccount(e.target.value)}/>
    <p><FontAwesomeIcon className="paypalinon" icon={faPaypal}/></p>
    </div>
    <div className="expiry-cvv">
    <input type="text" id="lname" className="expiry" name="lname" placeholder="Account Type" onChange={(e) => setNewPaymentTypep(e.target.value)}/>
    </div>
    </div>
    </div>

)}

          <button className="checkoutbtnn" type="button" onClick={handleAdd}>Add <FontAwesomeIcon icon={faEdit}/></button>

        </div>
        </main>
      )}
      <FooterComponent />
    </div>
  );
}

export default Payment;
