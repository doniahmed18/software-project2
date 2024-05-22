"use client";
import { useSearchParams } from "next/navigation";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from '../Footer/page';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faFire, faPercentage, faShare, faUser } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import { TbFlagDiscount } from "react-icons/tb";
const ProductPage = () => {
 
  const [product, setProduct] = useState<any[]>([]);
  const [ProductsReview, setProductsReview] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [profile, setprofile] = useState<any[]>([]);
  const [productinfo, setProductInfo] = useState<any[]>([]);
  const [category, setcategory] = useState(null);
  const [CategoryName, setCategoryName] = useState(null);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const  id  = searchParams.get("id") ?? ""; 
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviewText, setReviewText] = useState(""); // New state for review text input
  const [rating, setRating] = useState(0); // Move rating state here

  // Function to handle rating change
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };
  // Function to handle input change for review text
  const handleReviewTextChange = (event :any) => {
    setReviewText(event.target.value);
  };
  const handleAddReviewClick = () => {
    setIsAddingReview(true);
  };

  const handleCancelAddReview = () => {
    setIsAddingReview(false);
  };

  const  handleSaveReview = async (productID :string) => {
    try {
    
      const response = await fetch(`http://localhost:4000/products/addReview/${productID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ review: reviewText, rating: rating}), 
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
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
    // Logic to save the review
    setIsAddingReview(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:4000/products/getProduct/${id}`, {
          headers: {
            Authorization: `${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const productData = await response.json();
        setProduct(productData);
        console.log("Product data:", productData);

      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
  
    fetchData();
  }, [id, token]);
  

  console.log("ProductsReview data:", ProductsReview);
  const handleCart = async (product : any) => {
    try {
      console.log("product id: ", id);
      const response = await fetch('http://localhost:4000/cart/editrentCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ products: [`${id}`,product.startdate,product.enddate,"rent" ] }), 
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
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  const handleCopyUrl = () => {
    const url = window.location.href;
    const newUrl = url.replace(/&token=.*$/, '').replace('Product', 'GuestProduct');
    navigator.clipboard.writeText(newUrl)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error('Error copying URL to clipboard:', error);
      });
  };
  const handledateformonth = () => {
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + 1);
    setStartDate(start);
    setEndDate(end);
    handleCart({ id: `${id}`, type: "rent" ,startdate : start ,enddate:end});
  };

  const handledatefor3month = () => {
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + 3);
    setStartDate(start);
    setEndDate(end);
    handleCart({ id: `${id}`, type: "rent" ,startdate : start ,enddate:end});
  };

  const handledatefor6month = () => {
    const start = new Date();
    const end = new Date();
    end.setMonth(start.getMonth() + 6);
    setStartDate(start);
    setEndDate(end);
    handleCart({ id: `${id}`, type: "rent" ,startdate : start ,enddate:end});

  };
  const handleAddToCart = () => {
    handleCart({ id: `${id}`, startdate: startDate , enddate: endDate,type:"rent"});
  };

  return (
    <div className="ProductPage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
      <div className="ProductBoody">
        {product ? (
            <div className="productboddy">
              <div className="ProductHeader">
                
                <h1 className="ProductTitle">{(product as any).ProductName}</h1>
                <button className="copybut" onClick={handleCopyUrl}><FontAwesomeIcon icon={faShare} className="profile-icon" />
</button>
</div>
                <div className="ProductContainer">
                    <img alt={(product as any).ProductName} src={(product as any).ProductImage} className="ProductImage"/>
                    <div className="ProductInfo">
                        <p className="ProductCategory"> <span><b>Category : </b></span>{(product as any).ProductCategory}</p>
                        <p className="ProductDescribtion"><span><b>Description : </b></span> {(product as any).ProductDescription}</p>
                        <p className="ProductPrice"> <span><b>Price : </b></span> {(product as any).ProductPrice}<span>$ </span></p>
                        <p className="ProductSpecifications"> <span><b>Specifications : </b></span> {(product as any).ProductSpecifications}</p>
                        <p className="ProductRating"> <span><b>Rating : </b></span> {(product as any).ProductCategory}</p>
                        <p className="ProductAvailability"> <span><b>Stock : </b></span> {(product as any).ProductAvailability}</p>
                
                    </div>
                </div>


            </div>
        ) : (
          <p>No product found</p>
        )}
      <div className="ProductReviews">
  {product ? ( 
    <>

        
  
      <h2>Rent Options</h2>
      <h4>Offers</h4>

<div className="fixedtime">
<div className="timecard">
  <h3>1 Month <FontAwesomeIcon icon={faFire} className="fire-icon" /></h3>
  <p>Get a special offer 10 <FontAwesomeIcon icon={faPercentage} className="percent-icon" /> off when you rent for a whole month</p>
<p><strong>Price :</strong> ${((product as any).ProductPrice/300 * 0.1 *30).toFixed(3)}</p>
<button className="add-to-cart-button" onClick={() => handledateformonth()}>Add to Cart</button>
</div>
<div className="timecard">
  <h3>3 Months <FontAwesomeIcon icon={faFire} className="fire-icon" /></h3>
  <p>Get a special offer 15 <FontAwesomeIcon icon={faPercentage} className="percent-icon" /> off when you rent for  3 month</p>
  <p><strong>Price :</strong> ${((product as any).ProductPrice/300 * 0.15 * 90).toFixed(3)}</p>
  <button className="add-to-cart-button" onClick={handledatefor3month}>Add to Cart</button>

</div>
<div className="timecard">
  <h3>6 Months <FontAwesomeIcon icon={faFire} className="fire-icon" /></h3>
  <p>Get a special offer 20 <FontAwesomeIcon icon={faPercentage} className="percent-icon" /> off when you rent for 6 month</p>
  <p><strong>Price :</strong> ${((product as any).ProductPrice/300 * 0.2*180).toFixed(3)}</p>
  <button className="add-to-cart-button" onClick={handledatefor6month}>Add to Cart</button>

</div>
 
</div>

      <div className="ReviewContainer">
        <h4>Rent for a while</h4>
        <p></p>
        <div className="calendar-container">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date ?? new Date())}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            placeholderText="From"
            className="date-picker"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => {
              console.log("Selected End Date:", date);
              setEndDate(date ?? new Date());
            }}
          
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            placeholderText="To"
            className="date-picker"

          />
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
        </div>
        </div>
    </>
  ):(
    <p>No product found</p>

  )}
</div>
</div>

      
      <FooterComponent /> 
    </div>
  );
};

export default ProductPage;