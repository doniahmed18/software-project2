"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [productinfo, setProductInfo] = useState<any[]>([]);
  const [productdata, setProductData] = useState<any[]>([]);
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true)
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const [wishlistData, setWishlistData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (id: string) => {
    
    try {
        console.log("called");
        console.log(id);
        const response = await fetch(`http://localhost:4000/FavItems/deleteFavItems/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${token}`
            }
        });
        console.log(response.status);
        if (response.status === 200) {
          setProducts(prevProducts => prevProducts.filter((product: { id: string }) => product.id !== id));
          window.location.reload();

        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
  }
  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/FavItems/getFavItems", {
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
        const { products } = data; // Access the products array correctly
        setProducts(data); // Update the products state with the products array
                 console.log("efdsfsdf" ,data.products)
        const productInfoRequests = products.map((product: any) => // Map directly over products array
          fetch(`http://localhost:4000/products/getProduct/${product.id}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
        );
  
        Promise.all(productInfoRequests)
          .then((responses) => Promise.all(responses.map((res) => res.json())))
          .then((productInfoData) => {
            console.log("Product Info Data: ", productInfoData);
            setProductData(productInfoData);
          })
          .catch((error) => {
            console.error("Error fetching product info:", error);
          })
          .finally(() => setLoading(false));
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [token]);
  
  
  
 console.log("productdata: ", productdata); 
console.log("productinfos: ", productinfo);
  console.log("token: ", token);
  console.log("products: ", products);
  console.log("products:products ", products);

  return (
    <div className="CartPage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
    <header></header>
    <nav></nav>
    {!isLoading && (
      <main className='cartmain'>
        <h1 className="title">Your Favorite Items</h1>
        <table>
          <thead className="table-header">
            <tr>
              <th>Item</th>
              <th>Action</th>

            </tr>
          </thead>
          <tbody>
            {productdata.map((product: any) => (
              <tr key={product._id} className="items">
                <td>
                  <div className="product">
                    <img src={product.ProductImage} alt={product.ProductName} className="product-img" />
                    <div className="product-info">
                      <p className="product-name">{product.ProductName}</p>
                      <p className="product-price">{product.ProductPrice} $</p>
                      <p className="product-category">{product.ProductSpecifications}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <button className="del" onClick={() => handleDelete(product._id)}><FontAwesomeIcon icon={faTrash} /></button>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
       
     
      </main>
    )}
    <FooterComponent />
  </div>
);
}

export default Cart;
