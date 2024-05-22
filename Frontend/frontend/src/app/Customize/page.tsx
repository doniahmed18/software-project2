"use client";
import { useSearchParams } from "next/navigation";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState, useEffect } from 'react';
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from '../Footer/page';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCube, faFire, faPercentage, faShare, faSheetPlastic, faTree, faUser } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { faSalesforce } from "@fortawesome/free-brands-svg-icons";
import { TbFlagDiscount } from "react-icons/tb";
import { Fanwood_Text } from "next/font/google";
import { ChromePicker } from 'react-color';

const RatingStars = ({ totalStars, onRatingChange }: { totalStars: number, onRatingChange: (rating: number) => void }) => {
  const [rating, setRating] = useState(0);

  const handleStarClick = (starIndex: number) => {
    setRating(starIndex + 1);
    onRatingChange(starIndex + 1);
  };

  return (
    <div>
      {[...Array(totalStars)].map((_, index) => (
        <span key={index} onClick={() => handleStarClick(index)}>
          {index < rating ? <FontAwesomeIcon icon={solidStar} /> : <FontAwesomeIcon icon={regularStar} />}
        </span>
      ))}
    </div>
  );
};

const CardRatingStars = ({ rating, totalStars }: { rating: number, totalStars: number }) => {
  const filledStars = Math.floor(rating);
  const emptyStars = totalStars - filledStars;
  
  const stars = [];
  for (let i = 0; i < filledStars; i++) {
    stars.push(<FontAwesomeIcon key={i} icon={solidStar} />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<FontAwesomeIcon key={filledStars + i} icon={regularStar} />);
  }
  
  return (
    <div>
      {stars.map((star, index) => (
        <span key={index}>{star}</span>
      ))}
    </div>
  );
};

const ProductPage = () => {
 
  const [product, setProduct] = useState<any[]>([]);
  const [ProductsReview, setProductsReview] = useState<any[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [material, setMaterial] = useState("");
  const [selectedMaterial, setSelectedMaterial] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState("#000000"); // Default color
  const[height, setHeight] = useState("30");
  const[width, setWidth] = useState("30");;
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const  id  = searchParams.get("id") ?? ""; 
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddingReview, setIsAddingReview] = useState(false);
  const [reviewText, setReviewText] = useState(""); // New state for review text input
  const [rating, setRating] = useState(0); // Move rating state here
  const [priceforheight, setPriceforheight] = useState(0); // New state for price


  const handleHeightChange = (event: any) => {
    const selectedHeight = event.target.value;
    setHeight(selectedHeight);
  
    // Calculate the new price based on the selected height
    let newPrice = 0;
    switch (selectedHeight) {
      case "30":
        newPrice = ((product as any).ProductPrice * 1.2); // Change the multiplier as needed
        break;
      case "40":
        newPrice = ((product as any).ProductPrice * 1.5); // Change the multiplier as needed
        break;
      case "50":
        newPrice = ((product as any).ProductPrice * 1.8); // Change the multiplier as needed
        break;
      default:
        newPrice = (product as any).ProductPrice; // Default price
        break;
    }
  
    // Update the price state
    setPriceforheight(newPrice);
  };

  // Event handler for width selection
  const handleWidthChange = (event:any) => {
    setWidth(event.target.value);
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
  const handlecart = async () => {
    try {
      console.log("product id: ", id);
      const response = await fetch('http://localhost:4000/cart/editcustomizeCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ products: [`${id}`, selectedColor,selectedMaterial,height,width ,"Customization",1] }), 
      });
  
      // Handle response
      if (!response.ok) {
        console.error('Adding failed');
        if(response.status === 409) {

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
const handledateforWood = () => {
    setMaterial("Wood");
}
const handledateforPlastic = () => {
    setMaterial("Plastic");
}
const handledateforsteel = () => {
    setMaterial("Stainless steel");
}
const handleSelectMaterial = (material: string) => {
    setSelectedMaterial(material);
  };
  const handleColorChange = (color :any) => {
    setSelectedColor(color.hex);
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

        
  
      <h2>Customization Options</h2>
      <h4>Materials</h4>

<div className="fixedtime">
<div 
            className={`timecard ${selectedMaterial === "Wood" ? "selected" : ""}`}
            onClick={() => handleSelectMaterial("Wood")}
          >
  <h3>Wood <FontAwesomeIcon icon={faTree} className="tree-icon" /></h3>
  <p>Get your customized high quality wooden pallete </p>
<p><strong>Price :</strong> ${((product as any).ProductPrice * 1.5).toFixed(1)}</p>
</div>
<div
    className={`timecard ${selectedMaterial === "Plastic" ? "selected" : ""}`}
    onClick={() => handleSelectMaterial("Plastic")}>
  <h3>Plastic <FontAwesomeIcon icon={faSheetPlastic} className="plastic-icon" /></h3>
  <p>Get your customized high quality plastic pallete </p>
  <p><strong>Price :</strong> ${((product as any).ProductPrice)}</p>

</div>
<div
            className={`timecard ${selectedMaterial === "Stainless steel" ? "selected" : ""}`}
            onClick={() => handleSelectMaterial("Stainless steel")}
          >
  <h3>Stainless steel <FontAwesomeIcon icon={faCube} className="iron-icon" /></h3>
  <p>Get your customized high quality Stainless steel pallete </p>
  <p><strong>Price :</strong> ${((product as any).ProductPrice* 1.9).toFixed(1)}</p>

</div>
 
</div>

<div className="ReviewContainer">
        <h4>Colour</h4>
        <p>Choose the colour of the pallete</p>
        <div className="color-picker">
          <ChromePicker color={selectedColor} onChange={handleColorChange} />
        </div>
        <p><strong>Price :</strong> ${((product as any).ProductPrice*1.2).toFixed(1)}</p>

      </div>
      <div className="ReviewContainer">
        <h4>Size</h4>
        <p>Choose the size of the pallete </p>

        <div className="size-container">
            <div className="height">
    <label htmlFor="height">Height:</label>
    <select id="height" name="height" className="wid"  onChange={handleHeightChange}>
      <option value="30">30 cm</option>
      <option value="40">40 cm</option>
      <option value="50">50 cm</option>
      
      {/* Add more options as needed */}
    </select>
    </div>
    <div className="height">
    <label htmlFor="width">Width:</label>
    <select id="widthh" name="widthh" className="wid" onChange={handleWidthChange}>
      <option value="30">30 cm</option>
      <option value="40">40 cm</option>
      <option value="50">50 cm</option>
      {/* Add more options as needed */}
    </select>
    </div>
    <p><strong>Price :</strong> ${(priceforheight).toFixed(1)}</p>

  </div>
        <div className="calendar-container">
          <button className="add-to-cart-button" onClick={handlecart}>Add to Cart</button>
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