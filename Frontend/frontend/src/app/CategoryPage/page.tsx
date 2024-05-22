"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Link from 'next/link';
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";


const ProductCard = ({ product, isInWishlist ,token, toggleWishlist}: { product: any, isInWishlist: boolean, token : string , toggleWishlist: () => void }) => {
  

  const handlecart = async () => {
    try {
      console.log("product id: ", product._id);
      const response = await fetch('http://localhost:4000/cart/editCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ products: [`${product._id}`, 1] }), 
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
  const handleRent = async () => {
    window.location.href = `/Rent?id=${product._id}&token=${token}`;
  }
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img className='product-image' src={product.ProductImage} alt={product.ProductName} />
        <Link href={`/Product?id=${product._id}&token=${token}`} className="view-product-button">
          View Product
        </Link>
        <button
          className={`add-to-wishlist-button ${isInWishlist ? "selected" : ""}`}
          onClick={toggleWishlist}
        >
          {isInWishlist ? "★" : "☆"}
        </button>
      </div>
      <div className="product-details">
        <h2>{product.ProductName}</h2>
        <p className="price">${product.ProductPrice}</p>{" "}
        <p className="category">{product.ProductCategory}</p>{""}
        <div className="buttons-container">
          <button className="add-to-cart-button" onClick={handlecart}>Add to Cart</button>
          <button className="rent-button" onClick={handleRent}>Rent</button>
        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const categoryname = searchParams.get("categoryname") ?? "";
  const [wishlistData, setWishlistData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch(`http://localhost:4000/products/getCategoryProducts/${categoryname}`, {
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
  }, [token]);

  const filteredProducts = products.filter((toy: any) =>
    toy.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
);
  console.log("token: ", token);
  console.log("products: ", products);

  return (
    <div className="homepage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
    <div className="content">
      { (
        filteredProducts.map((product: any) => (
          <ProductCard 
            key={product.id}
            product={product}
            isInWishlist={false}
            token={token} 
            toggleWishlist={() => ""}          />
        ))
      )}
    </div>
    <FooterComponent /> 

    </div>
);
};

export default HomePage;
