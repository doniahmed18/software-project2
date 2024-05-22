"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faCcMastercard, faPaypal } from "@fortawesome/free-brands-svg-icons";

const Cart: React.FC = () => {
  const [productData, setProductData] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const token = searchParams.get("token") ?? "";
  const coupon = searchParams.get("coupon") ?? "";
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState<number | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);
  const [total, setTotal] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [profile, setProfile] = useState([]);
  const [address, setAddress] = useState<any[]>([]);
  const [payment, setPayment] = useState<any[]>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>("");
  const [selectedAddress, setSelectedAddress] = useState<string>("");

  const handlecheckout = async () => {
    try {
      for (let i = 0; i < productData.length; i++) {
        const item = productData[i];
        console.log(item);
        console.log("p");
        console.log(item.id, "aaa");

      if (item.type === 'purchase') {
      console.log("product id: ", item._id);

      const response = await fetch('http://localhost:4000/Order/editOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          products: [
            item.id,
            item.quantity,
            item.type,
            item.height,
            item.width,
            item.material,
            item.color,
            item.startdate,
            item.enddate
          ]
        }),
            });
  
      // Handle response
      if (!response.ok) {
        console.error('Adding failed');
        if(response.status === 409) {
        //  window.location.href = '/Login';
        }
      } else {
        const data = await response.json();
        console.log(data);
        alert("Product is added to your cart")
      }
    }
    else if (item.type === 'rent') {
      console.log("product id: ", item._id);

      const response = await fetch('http://localhost:4000/Order/editrentOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          products: [
            item.id,
            item.type,
            item.startdate,
            item.enddate
          ]
        }), 
            });
  
      // Handle response
      if (!response.ok) {
        console.error('Adding failed');
        if(response.status === 409) {
        //  window.location.href = '/Login';
        }
      } else {
        const data = await response.json();
        console.log(data);
        alert("Product is added to your cart")
      }
    }
    else if (item.type === 'Customization') {
      console.log("product id: ", item._id);

      const response = await fetch('http://localhost:4000/Order/editcustomizeOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({
          products: [
            item.id,
            item.type,
            item.height,
            item.width,
            item.material,
            item.color
          ]
        }), 
      });
  
  
      // Handle response
      if (!response.ok) {
        console.error('Adding failed');
        if(response.status === 409) {
        //  window.location.href = '/Login';
        }
      } else {
        const data = await response.json();
        console.log(data);
        alert("Product is added to your cart")
      }
    }
  }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  
  };


  const calculateTotalForCustomizationPrice = () => {
    let totalPrice = 0;

    productData.forEach((product) => {
      if (product.type === 'Customization') {
        let price = product.ProductPrice;

        if (product.color) {
          price *= 1.3; // Multiply by 1.3 if there is a color
        }

        if (product.height === '40') {
          price *= 1.2; // Multiply by 1.2 if height is 40
        } else if (product.height === '50') {
          price *= 1.5; // Multiply by 1.5 if height is 50
        }

        switch (product.material) {
          case 'Wood':
            price *= 1.3; // Multiply by 1.3 if material is wood
            break;
          case 'Stainless steel':
            price *= 1.5; // Multiply by 1.5 if material is stainless steel
            break;
          default:
            break;
        }

        totalPrice += price * product.quantity;
      }
    });

    return Number(totalPrice.toFixed(2)); // Return totalPrice as a number
  };

  const calculateTotalPrice = () => {
    let purchaseTotal = 0;
    let rentTotal = 0;
    let customizationTotal = calculateTotalForCustomizationPrice();

    productData.forEach((product) => {
      if (product.type === 'purchase') {
        purchaseTotal += product.ProductPrice * product.quantity;
      } else if (product.type === 'rent') {
        const days = (new Date(product.enddate).getTime() - new Date(product.startdate).getTime()) / (1000 * 60 * 60 * 24);
        rentTotal += days * (product.ProductPrice / 300);
      }
    });

    const total = purchaseTotal + rentTotal + customizationTotal;
    return Number(total.toFixed(2));
  };

  const handleCoupon = async (totalPrice: number) => {
    try {
      const response = await fetch(`http://localhost:4000/coupon/getCoupon/${coupon}`, {
        method: 'GET',
      });

      const responseData = await response.json();
      if (responseData.statusCode === 500) {
        console.log("Coupon wrong ");
      } else {
        if (!couponApplied) {
          const discountPercentage = responseData.value;
          const discountAmount = totalPrice * (discountPercentage / 100);
          let discountedPrice = totalPrice - discountAmount;
          discountedPrice = Number(discountedPrice.toFixed(2));
          setDiscountedTotalPrice(discountedPrice);
          setCouponApplied(true);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    const items = JSON.parse(decodeURIComponent(searchParams.get("items") || "[]"));

    const fetchProductDetails = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:4000/products/getProduct/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Error fetching product");
        }

        return response.json();
      } catch (error) {
        console.error(`Error fetching product with id ${id}:`, error);
        return { status: "error", message: "Internal server error", id };
      }
    };

    const loadProducts = async () => {
      try {
        const productDetails = await Promise.all(items.map((item: any) => fetchProductDetails(item.id)));
        const combinedData = productDetails.map((info, index) => ({
          ...info,
          ...items[index],
        }));
        setProductData(combinedData);
      } catch (error) {
        console.error("Error fetching product info:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [token, searchParams]);

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
        setPayment(data.Payment);
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
      })
      .finally(() => setLoading(false));
  }, [token]);

  useEffect(() => {
    if (productData.length > 0) {
      const totalPrice = calculateTotalPrice();
      if (coupon) {
        handleCoupon(totalPrice);
      } else {
        setDiscountedTotalPrice(totalPrice);
      }
      setTotal(totalPrice);
    }
  }, [productData, coupon]);

  const labels = ["Home", "Work", "Other"];

  const handleSelectAddress = (address: string) => {
    setSelectedAddress((prev) => (prev === address ? "" : address));
  };

  const handleSelectPayment = (payment: string) => {
    setSelectedPayment((prev) => (prev === payment ? "" : payment));
  };



  return (
    <div className="CartPage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
      <header></header>
      <nav></nav>
      {!isLoading && (
        <main className="cartmain">
          <h1 className="title">Your Cart</h1>
          <table>
            <thead className="table-header">
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {productData.map((product: any) => (
                <tr key={product.id} className="items">
                  <td>
                    <div className="product">
                      <img src={product.ProductImage || "/placeholder.png"} alt={product.ProductName || "No image available"} className="product-img" />
                      <div className="product-info">
                        <p className="product-name">{product.ProductName}</p>
                        <p className="product-price">{product.ProductPrice} $</p>
                        <p className="product-category">Specifications :{product.ProductSpecifications}</p>
                        {product.type === 'Customization' && (
                          <>
                            <p className="product-category">Material :{product.material}</p>
                            <div className="product-categoryss" style={{ backgroundColor: product.color, width: '20px', height: '20px' }}></div>
                            <p className="product-category">Size :{product.width}X{product.height}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </td>
                  <td>
                    {product.type === 'rent' && (
                      <div className="renttqutt">
                        <div className="startend">
                          <div className="start">
                            <p className="dates"><strong>Start Date:</strong> {new Date(product.startdate).toLocaleDateString()}</p>
                            <p className="dates"><strong>End Date:</strong> {new Date(product.enddate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    {(product.type === 'purchase' || product.type === 'Customization') && (
                      <div className="quantity">
                        <p>{product.quantity}</p>
                      </div>
                    )}
                  </td>
                  <td>
                    {product.type === 'purchase' && (
                      <p className="total">{product.ProductPrice * product.quantity} $</p>
                    )}
                    {product.type === 'rent' && (
                      <p className="total">
                        {(((new Date(product.enddate).getTime() - new Date(product.startdate).getTime()) / (1000 * 60 * 60 * 24)) * (product.ProductPrice / 300)).toFixed(2)} $
                      </p>
                    )}
                    {product.type === 'Customization' && (
                      <p className="total">{calculateTotalForCustomizationPrice()} $</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="Addressandpayment">
            <div className="address">
              <h3>Choose your delivery address</h3>
              {address.map((add: any, index: number) => (
                <div
                  key={index}
                  className={`innerpayment ${selectedAddress === `${add}` ? "selected" : ""}`}
                  onClick={() => handleSelectAddress(`${add}`)}
                >
                  <div className="address-item">
                    <p><strong>{labels[index]}: </strong> {add}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="paymentt">
              <h3>Choose your payment method</h3>
              {payment.map((pay: any, index: number) => (
                <div
                  key={index}
                  className={`inneraddress ${selectedPayment === `${pay.type}` ? "selected" : ""}`}
                  onClick={() => handleSelectPayment(`${pay.type}`)}
                >
                  <div className="payment-item">
                    {pay.type === "Paypal" && (
                      <p className="product-d">
                        <strong>Type: </strong> {pay.type}
                        <FontAwesomeIcon className="creditcardd" icon={faPaypal} />
                      </p>
                    )}
                    {pay.type === "MasterCard" && (
                      <p className="product-d">
                        <strong>Type: </strong> {pay.type}
                        <FontAwesomeIcon className="creditcardd" icon={faCcMastercard} />
                      </p>
                    )}
                    {pay.type === "Credit Card" && (
                      <p className="product-d">
                        <strong>Type: </strong> {pay.type}
                        <FontAwesomeIcon className="creditcardd" icon={faCreditCard} />
                      </p>
                    )}
                    {pay.type !== "Paypal" && (
                      <>
                        <p className="product-d"><strong>Name: </strong> {pay.name}</p>
                        <p className="product-d"><strong>Expiry Date: </strong> {pay.expiry}</p>
                        <p className="product-d"><strong>Number: </strong> {pay.number}</p>
                        <p className="product-d"><strong>CVV: </strong> {pay.cvv}</p>
                      </>
                    )}
                    {pay.type === "Paypal" && (
                      <>
                        <p className="product-d"><strong>Account: </strong> {pay.account}</p>
                        <p className="product-d"><strong>Account Type: </strong> {pay.accounttype}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="checkout">
            <div className="total-price">
              <p>Total: {discountedTotalPrice !== null ? discountedTotalPrice : calculateTotalPrice()} $</p>
            </div>
            <button className="checkoutbtn" type="button" onClick={handlecheckout}>Checkout</button>
          </div>
        </main>
      )}
      <FooterComponent />
    </div>
  );
};

export default Cart;
