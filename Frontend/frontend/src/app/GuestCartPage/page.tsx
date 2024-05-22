"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Navbar from "../GuestNavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn, faTrash } from "@fortawesome/free-solid-svg-icons";

const Cart: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [productinfo, setProductInfo] = useState<any[]>([]);
  const [productdata, setProductData] = useState<any[]>([]);
  const [coupon, setCoupon] = useState("");
  const searchParams = useSearchParams();
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const [wishlistData, setWishlistData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [discountedTotalPrice, setDiscountedTotalPrice] = useState<number | null>(null);
  const [couponApplied, setCouponApplied] = useState(false);

  const handleDelete = (id: string) => {
    console.log("called");
    console.log(id);
    if (!token) {
      // If no token, remove item from local storage
      const storedProducts = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedProducts = storedProducts.filter((product: { id: string }) => product.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedProducts));
      setProducts(updatedProducts);
      window.location.reload();
    }
  };

  const handlecoupon = async () => {
    try {
      const response = await fetch(`http://localhost:4000/coupon/getCoupon/${coupon}`, {
        method: 'GET',
        headers: {
          Authorization: `${token}`
        }
      });
      const responseData = await response.json();
      if (responseData.statusCode === 500) {
        alert("Coupon is wrong");
      } else {
        if (!couponApplied) {
          const discountPercentage = responseData.value;
          let totalPrice: number = Number(calculateTotalPrice());
          const discountAmount = totalPrice * (discountPercentage / 100);
          totalPrice -= discountAmount;
          totalPrice = Number(totalPrice.toFixed(2));
          setDiscountedTotalPrice(totalPrice);
          setCouponApplied(true);
        } else {
          alert("You have already applied a coupon");
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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

  const calculateTotalforcustomizationPrice = () => {
    let totalPrice = 0;
    productdata.forEach((product) => {
      if (product.type === 'Customization') {
        let price = product.ProductPrice;
        if (product.color) {
          price *= 1.3;
        }
        if (product.height === '40') {
          price *= 1.2;
        } else if (product.height === '50') {
          price *= 1.5;
        }
        switch (product.material) {
          case 'Wood':
            price *= 1.3;
            break;
          case 'Stainless steel':
            price *= 1.5;
            break;
          default:
            break;
        }
        totalPrice += price * product.quantity;
      }
    });
    return totalPrice.toFixed(2);
  };

  const calculateTotalPrice = () => {
    let purchaseTotal = 0;
    let rentTotal = 0;
    let customizationTotal = 0;
    productdata.forEach((product) => {
      if (product.type === 'purchase') {
        purchaseTotal += product.ProductPrice * product.quantity;
      } else if (product.type === 'rent') {
        const days = (new Date(product.enddate).getTime() - new Date(product.startdate).getTime()) / (1000 * 60 * 60 * 24);
        rentTotal += days * (product.ProductPrice / 300);
      } else if (product.type === 'Customization') {
        customizationTotal += Number(calculateTotalforcustomizationPrice());
      }
    });
    return (purchaseTotal + rentTotal + customizationTotal).toFixed(2);
  };

  useEffect(() => {
    if (!token) {
      const storedProducts = JSON.parse(localStorage.getItem("cart") || "[]");
      console.log(storedProducts,"sddd");

      setProducts(storedProducts);
      setLoading(false);
      // Fetch product information from local storage
      const productInfoRequests = storedProducts.map((product: any) =>
        fetch(`http://localhost:4000/products/getGuestProduct/${product.id}`, {
        
        })
      );

      Promise.all(productInfoRequests)
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((productInfoData) => {
          setProductInfo(productInfoData);
          const combinedData = productInfoData.map((info, index) => ({
            ...info,
            quantity: parseInt(storedProducts[index].quantity),
            startdate: storedProducts[index].startdate,
            enddate: storedProducts[index].enddate,
            type: storedProducts[index].type,
            color: storedProducts[index].color,
            height: storedProducts[index].height,
            width: storedProducts[index].width,
            material: storedProducts[index].material
          }));
          setProductData(combinedData);
        })
        .catch((error) => {
          console.error("Error fetching product info:", error);
        });
    } 
  }, [token]);
console.log("productdata",productdata)
const calculateRentTotal = (product: any) => {
        const days = Number(((((new Date(product.enddate).getTime() - new Date(product.startdate).getTime()) / (1000 * 60 * 60 * 24)))*(product.ProductPrice / 300)).toFixed(1));
     
        return days;
    };
  
    const handlelogin = async () => {
      console.log("clicked");
        window.location.href = `/Login`;
      }
  return (
    <div className="CartPage">
    <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
  <header></header>
  <nav></nav>
  {!isLoading && (
    <main className='cartmain'>
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
          {productdata.map((product: any) => (
            <tr key={product._id} className="items">
              <td>
              {product.type === 'rent' && (
                <div className="product">
                  <img src={product.ProductImage} alt={product.ProductName} className="product-img" />
                  <div className="product-info">
                    <p className="product-name">{product.ProductName}</p>
                    <p className="product-price">{product.ProductPrice} $</p>
                    <p className="product-category">Specifications :{product.ProductSpecifications}</p>
                  </div>
                </div>
                   )}
                                   {product.type === 'purchase' && (
                <div className="product">
                  <img src={product.ProductImage} alt={product.ProductName} className="product-img" />
                  <div className="product-info">
                    <p className="product-name">{product.ProductName}</p>
                    <p className="product-price">{product.ProductPrice} $</p>
                    <p className="product-category">Specifications :{product.ProductSpecifications}</p>
                  </div>
                </div>
                   )}
                {product.type === 'Customization' && (
                           <div className="product">
                           <img src={product.ProductImage} alt={product.ProductName} className="product-img" />
                           <div className="product-info">
                             <p className="product-name">{product.ProductName}</p>
                             <p className="product-price">{product.ProductPrice} $</p>
                             <p className="product-category">Specifications :{product.ProductSpecifications}</p>
                             <p className="product-category">Material :{product.material}</p>

                             <div className="product-categoryss" style={{ backgroundColor: product.color, width: '20px', height: '20px' }}></div>

                             <p className="product-category">Size :{product.width}X{product.height}</p>

                           </div>
                         </div>
        )}
              </td>
              
              <td>
              {product.type === 'rent' && (
          <div className="renttqutt">
            <div className="startend">
              <div className="start">
            <p className="dates"> <strong>Start Date: </strong>{new Date(product.startdate).toLocaleDateString()}</p>
            <p className="dates"><strong>End Date:</strong> {new Date(product.enddate).toLocaleDateString()}</p>
            </div>
            <button className="dell" onClick={() => handleDelete(product._id)}><FontAwesomeIcon icon={faTrash} /></button>
            </div>
          </div>
        )}
         {product.type === 'purchase' && (
            <div className="quantity">
            <button className="btn-minus" onClick={() => updateQuantity(product._id, Math.max(1, product.quantity - 1))}>-</button>
            <p>{product.quantity}</p>
            <button className="btn-plus" onClick={() => updateQuantity(product._id, product.quantity + 1)}>+</button>
            <button className="del" onClick={() => handleDelete(product._id)}><FontAwesomeIcon icon={faTrash} /></button>

          </div>
        )}
            {product.type === 'Customization' && (
            <div className="quantity">
            <button className="btn-minus" onClick={() => updateQuantity(product._id, Math.max(1, product.quantity - 1))}>-</button>
            <p>{product.quantity}</p>
            <button className="btn-plus" onClick={() => updateQuantity(product._id, product.quantity + 1)}>+</button>
            <button className="del" onClick={() => handleDelete(product._id)}><FontAwesomeIcon icon={faTrash} /></button>

          </div>
        )}
              
              </td>
              <td>
              {product.type === 'purchase' && (
                <p className="total">{product.ProductPrice * product.quantity} $</p>
                 )}
           {product.type === 'rent' && (
<p className="total">
{
    calculateRentTotal(product)
} $
</p>
)}
            {product.type === 'Customization' && (
                <p className="total">{calculateTotalforcustomizationPrice()} $</p>
                 )}

              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <div className="checkout">
      <div className="total-price">
      <p>Total: {discountedTotalPrice !== null ? discountedTotalPrice : calculateTotalPrice()} $</p>
      </div>

      <input type="text" placeholder="Enter Coupon Code" className="coupon"  onChange={(e) => setCoupon(e.target.value)}/>
      <button className="applybtn" type="button" onClick={handlecoupon}>Apply</button>

        <button className="checkoutbtn" type="button" onClick={handlelogin}>Login To Checkout <FontAwesomeIcon icon={faSignIn}></FontAwesomeIcon></button>

      </div>
    </main>
  )}
  <FooterComponent />
</div>
  );
};

export default Cart;
