"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Link from 'next/link';
import Navbar from "../GuestNavBar/page";
import FooterComponent from "../Footer/page";


const ProductCard = ({ product, isInWishlist ,token, handleCart}: { product: any, isInWishlist: boolean, token : string , handleCart: (product: any) => void }) => {
  
  const handleAddToCart = () => {
    handleCart({ id: product._id, name: product.TopOffersName, image: product.TopOffersImage, price: product.TopOffersPrice, quantity: 1,type:"purchase" });
  };
  const handleRent = async () => {
    window.location.href = `/GuestRent?id=${product._id}`;
  }
  const handlecustomize = async () => {
    window.location.href = `/GuestCustomization?id=${product._id}`;
  }
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img className='product-image' src={product.ProductImage} alt={product.ProductName} />
        <Link href={`/GuestProduct?id=${product._id}`} className="view-product-button">
          View Product
        </Link>

      </div>
      <div className="product-details">
        <h2>{product.ProductName}</h2>
        <p className="price">${product.ProductPrice}</p>{" "}
        <p className="category">{product.ProductCategory}</p>{""}
        <div className="buttons-container">
          <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
          <button className="rent-button" onClick={handleRent}>Rent</button>
          <button className="rent-button" onClick={handlecustomize}>Customize</button>


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
  const [cart, setCart] = useState<any[]>([]);

  const token = searchParams.get("token") ?? "";
  const categoryname = searchParams.get("categoryname") ?? "";
  const [wishlistData, setWishlistData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);
  const handleCart = (product: any) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
      let updatedCart;
      if (existingProduct) {
        updatedCart = prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prevCart, product];
      }
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      console.log(updatedCart);
      return updatedCart;
    });
  };
  useEffect(() => {
    fetch(`http://localhost:4000/products/getGuestCategoryProducts/${categoryname}`, {

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
            handleCart = {handleCart}
                     />
        ))
      )}
    </div>
    <FooterComponent /> 

    </div>
);
};

export default HomePage;
