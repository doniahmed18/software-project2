"use client";
import React, { useState, useEffect } from 'react';
import "./globals.css";
import { useSearchParams } from "next/navigation";
import Link from 'next/link';
import Navbar from './GuestNavBar/page';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import slideImages from './slideshow.json';
import FooterComponent from './Footer/page';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import { get } from 'http';
function LoginPopup({ onClose }: { onClose: () => void }) {
  return (
    <div className="popupmain">
      <div className="popuplogin-inner">
        <h2>Alert !</h2>
        <FontAwesomeIcon icon={faRightToBracket} className="faRightToBracket-icon" />
        <p>You need to be logged in first </p>
        <button className="close-btn" onClick={onClose}>Go to login</button>
      </div>
    </div>
  );
}
const ProductCard = ({ product }: { product: any }) => {
  const [isWishlistSelected, setWishlistSelected] = useState(false);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const [showLoginPopup, setshowLoginPopup] = useState(false);
  const toggleWishlist = () => {
    setWishlistSelected(!isWishlistSelected);
  };
  const NavigateTologin = () => {
    setshowLoginPopup(true);
  }
  const closeLoginPopup = () => {
    setshowLoginPopup(false);
    window.location.href = '/login';
};

  return (
    <div className="mostsellingproduct-card">
      <div className="product-image-container">
        <img className='product-image' src={product.TopOffersImage} alt={product.TopOffersName} />
        <Link href={`/guestproduct/${product._id}`} className="view-product-button">
  View Product
</Link>
        
      </div>
      <div className="product-details">
        <h2>{product.TopOffersName}</h2>
        <p>{product.category}</p>
        <p className="price">${product.TopOffersPrice}</p>{" "}
        <p className="category">{product.TopOffersCategory}</p>{""}
        <div className="offerval">
        <p className="category">{product.TopOffersDiscount}</p>{""}
        <p className="category">{product.TopOffersPeriod}</p>{""}
        </div>


        {showLoginPopup && <LoginPopup onClose={closeLoginPopup} />}
      </div>
      
    </div>
  );
};


const FirstPage = () => {
  const [products, setProducts] = useState([]);
  const [slideshow,setslideshow] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";   
    useEffect(() => {
      fetch("http://localhost:4000/topOffers/getGuestTopOffers", {
       
      })
        .then((res) => {
          if (res.status === 401) {
            console.log("Unauthorized");
            window.location.href = "/Login";
            return [];
          }
          if(!res.ok) {
            console.error("Error fetching data");
            return [];
          }
          return res.json();
        })
        .then((data) => {
          console.log(data);
  
          setProducts(data);
  
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError(error);
          setLoading(false);
        });
    },[] ); // Add token to dependency array to re-fetch data when token changes


  return (
    <div className="firstpage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
      <div className="firstpage-content">
       <div className="slide-container" id='slide-container'>
       <Slide >
        {slideImages.map((slideImage) => (
            <Link href={`/guestcategory/${slideImage.catid}` } style={{ textDecoration: 'none' }}>
            <div className="each-slide-effect" key={slideImage.id}>
              <div style={{ 'backgroundImage': `url(${slideImage.Image})` }}>
              </div>
            </div>
          </Link>
        ))}

        </Slide>
        </div>
        <section id='about-us-section'>
        <h1>
            <span>P</span>
            <span>A</span>
            <span>L</span>
            <span>L</span>
            <span>E </span>
            <span>T </span>
            <span>S </span>
            <span> </span>
            <span>P</span>
            <span>A</span>
            <span>R</span>
            <span>A </span>
            <span>D </span>
            <span>I</span>
            <span>S </span>
            <span>E </span>

        </h1>

<p><span className='welcome'>Welcome</span> to <span className="storename">Pallets Paradise</span>, your ultimate online destination for all your pallet needs! Step into a world of versatility where functionality meets durability. Our carefully curated collection features a diverse range of plastic, wooden, and stainless steel pallets, each designed to cater to your specific requirements. From heavy-duty industrial use to light and versatile options for everyday needs, Pallet Paradise has something for everyone.

Whether you're looking to buy or rent pallets, we have you covered. Our selection includes pallets of various sizes, shapes, and materials, ensuring that you find the perfect solution for your shipping, storage, or organizational needs. With our commitment to quality and customer satisfaction, you can trust Pallet Paradise to deliver reliable products that meet the highest standards.

Explore our comprehensive inventory and discover the perfect pallet solution for your business or personal projects. Experience the convenience of shopping online with fast shipping and hassle-free returns. Join us at Pallet Paradise and unlock a world of endless possibilities for your logistical needs.






</p>
</section>

 <h2> Top Offers </h2>
 <div className="mostselling-container-wrapper">
 <div className="mostselling-container">

        {products.map((toy: any) => (
          <ProductCard key={toy._id} product={toy} />
        ))}
            <div className="exploremore-container">
      <ul>
        <li>
          <a href="/GuestPage" className="animated-arrow">
            <span className="main">
              <span className="text">Explore More</span>
              <span className="the-arrow -right">
                <span className="shaft"></span>
              </span>
            </span>
            <span className="the-arrow -left">
              <span className="shaft"></span>
            </span>
          </a>
        </li>
      </ul>
    </div>
      </div>
 </div>
 </div>
 <FooterComponent /> 

    </div>
  );
};

export default FirstPage;