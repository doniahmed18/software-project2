"use client";
import { useSearchParams } from "next/navigation";

import React, { useState, useEffect } from 'react';
import "./globals.css";
import Navbar from "../GuestNavBar/page";
import FooterComponent from '../Footer/page';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
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
  const [ProductsReview, setProductsReview] = useState<any[]>([]);
  const [product, setProduct] = useState<any[]>([]);
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
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(id);
        const response = await fetch(`http://localhost:4000/products/getGuestProduct/${id}`,{

        });
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const productData = await response.json();
        setProduct(productData);
        console.log("asas" ,productData);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };
const fetchcategoryData = async () => {

};

    fetchData();
    fetchcategoryData();
  }, [id,token]);

  const NavigateToCart = () => {
    window.location.href = "/Cart";
  };
  const handlecart = async () => {
    try {
      console.log("product id: ", id);
      const response = await fetch('http://localhost:4000/cart/editCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ products: [`${id}`, 1] }), 
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
    const newUrl = url.replace(/&token=.*$/, '');
    navigator.clipboard.writeText(newUrl)
      .then(() => {
        alert("URL copied to clipboard!");
      })
      .catch((error) => {
        console.error('Error copying URL to clipboard:', error);
      });
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
                
                        <button className="add-to-cart-button" onClick={handlecart}>Add to Cart</button>
                    </div>
                </div>
            </div>
        ) : (
          <p>No product found</p>
        )}
        <div className="ProductReviews">
  {product && (product as any).ProductsReview && (product as any).ProductsReview.length > 0 ? ( 
    <>

        
    <div className="ProductReviewHeader">
      <h2>Reviews</h2>
     
</div>
      <div className="ReviewContainer">
        {(product as any).ProductsReview.map((review: { id: string, review: string , rating : number }, index: number) => (
          <div key={index} className="Review">
            <p className="ReviewAuthor"> <strong> User:</strong> {(review.id)}</p>
            <p className="ReviewText"> <strong> Review:</strong> {review.review}</p>
            <p className="ProductRating">
  <span><b>Rating : </b></span> 
  <CardRatingStars rating={review.rating} totalStars={5} />
  <span>({review.rating})</span>
</p>

          </div>
        ))}
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