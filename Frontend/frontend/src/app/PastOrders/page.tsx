"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const PastOrders: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [productinfo, setProductInfo] = useState<any[]>([]);
  const [productdata, setProductData] = useState<any[]>([]);
  const [productArray, setProductArray] = useState<any[]>([]);
  const [combinedArray, setcombinedArray] = useState<any[]>([]);

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
        const response = await fetch(`http://localhost:4000/cart/deleteCart/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `${token}`
            }
        });
        console.log(response.status);
        if (response.status === 200) {
          setProducts(products.filter((product: { id: string }) => product.id !== id));
          window.location.reload();

        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    
  }
  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity === 0) {
      handleDelete(productId);
    } else {
      setProductData(productdata.map(product => {
        if (product._id === productId) {
          return { ...product, quantity: newQuantity };
        }
        return product;
      }));
    }
  };
  

  const calculateTotalPrice = () => {
    return productdata.reduce((total, product) => total + (product.ProductPrice * product.quantity), 0);
  };
  
  useEffect(() => {
    fetch("http://localhost:4000/Order/getOrder", {
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
        console.log("data:", data);
        setProducts(data); 
  
        const productArray = data.map((order: any) => order.products); 
        console.log("productArray: ", productArray);
  
        const flattenedProductArray = productArray.flat();
        console.log("flattenedProductArray: ", flattenedProductArray);
        setProductArray(flattenedProductArray);
  
        const productInfoRequests = flattenedProductArray.map((productInfo: any) => {
          const productId = productInfo[0]; 
          const quantity = productInfo[1];
          console.log("productId: ", productId);
          return fetch(`http://localhost:4000/products/getProduct/${productId}`, {
            headers: {
              Authorization: `${token}`,
            },
          })
            .then((res) => res.json())
            .then((productData) => ({
              ...productData,
              quantity: quantity,
            }));
        });
  
        Promise.all(productInfoRequests)
        .then((productInfoData) => {
          console.log("Product Info Data: ", productInfoData);
          setProductData(productInfoData); 
  
          // Combine order info and product info into an array of objects
          const combinedDataArray = data.map((order: any) => {
            const productInfos = order.products.map(([productId, quantity]: any) => {
              const productInfo = productInfoData.find((info: any) => info._id === productId);
              return {
                ...productInfo,
                quantity: quantity
              };
            });
          
            return {
              orderInfo: order,
              productInfos: productInfos
            };
          });
          
  
          console.log("Combined Data:", combinedDataArray);
          setcombinedArray(combinedDataArray);
        })
        .catch((error) => {
          console.error("Error fetching product info:", error);
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      })
      .finally(() => setLoading(false));
  }, [token]);
  
  
  
  
  
  console.log("combinedArray: ", combinedArray);

 console.log("productdata: ", productdata); 
console.log("productinfos: ", productinfo);
  console.log("token: ", token);
  console.log("products: ", products);

  return (
    <div className="CartPage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
    <header></header>
    <nav></nav>
    {!isLoading && (
      <main className='cartmain'>
        <h1 className="title">Past Orders</h1>
        <table>
          <thead className="table-header">
            <tr>
              <th>Order Id</th>
              <th>Item</th>
              <th>Order Info</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
  {combinedArray.map((data: any, index: number) => (
    <tr key={index} className="items">
      <td>{data.orderInfo._id}</td> {/* Display Order Id */}
      <td>
      <div className="product">
        {data.productInfos && data.productInfos.map((product: any, idx: number) => (
          <div key={idx} className="inproduct">
            <img src={product.ProductImage} alt={product.ProductName} className="product-img" />
            <div className="product-info">
              <p className="product-name">{product.ProductName}</p>
              <p className="product-price">{product.ProductPrice} $</p>
              <p className="product-category">{product.ProductSpecifications}</p>
                <p className="product-quantity">Quantity: {product.quantity}</p>
            </div>
          </div>
        ))}
        </div>
      </td>
      <td>
        <div className="product-info">
          <p> <strong> Address:</strong> {data.orderInfo.Address}</p>
          <p><strong>Date: </strong> {data.orderInfo.Date}</p>
          <p><strong>Payment:</strong> {data.orderInfo.Payment}</p>
          <p><strong>Status:</strong> {data.orderInfo.Status}</p>
          <p><strong>Total Price:</strong> {data.orderInfo.TotalPrice} $</p>
        </div>
      </td>
      <td>
  <div className="product">
    {data.productInfos && (
      <div>
        <p className="total">
          {data.productInfos.reduce(
            (total :number, product :any) =>
              total + product.ProductPrice * parseInt(product.quantity),
            0
          )} $
        </p>
      </div>
    )}
  </div>
</td>


    </tr>
  ))}
</tbody>
        </table>
       
        <div className="checkout">
        <div className="total-price">
          <p>Total: {calculateTotalPrice()} $</p>
        </div>
        </div>
      </main>
    )}
    <FooterComponent />
  </div>
);
}

export default PastOrders;
