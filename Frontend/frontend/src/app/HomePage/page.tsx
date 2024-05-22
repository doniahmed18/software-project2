"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Link from 'next/link';
import Navbar from "../NavBar/page";
import FooterComponent from "../Footer/page";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faHeart as fasHeart } from "@fortawesome/free-regular-svg-icons";



const TopOffersCard = ({ product, isInWishlist ,isInFavItems,token,CArtDAta, toggleWishlist ,toggleFavItems}: { product: any, isInWishlist: boolean,isInFavItems:boolean, token : string ,CArtDAta: any, toggleWishlist: () => void ,toggleFavItems :() => void}) => {
  

  const handlecart = async () => {
    try {
      if (CArtDAta.some((item: any) => item.id === product._id)) {
        console.log("Product is already in the cart");
        alert("Product is already in the cart")
        return;
      }
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
  const handlewishlist = async () => {
    try {
      console.log("product id: ", product._id);
      const response = await fetch('http://localhost:4000/Wishlist/editWishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ products: [`${product._id}`] }), 
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
  const handlecustomize = async () => {
    window.location.href = `/Customize?id=${product._id}&token=${token}`;
  }
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img className='product-image' src={product.TopOffersImage} alt={product.TopOffersName} />
        <Link href={`/Product?id=${product._id}&token=${token}`} className="view-product-button">
          View Product
        </Link>
        <div className="Actionns">
        <button
  className={`add-to-favitems-button ${isInFavItems ? "selected" : ""}`}
  onClick={toggleFavItems}
>
<FontAwesomeIcon icon={isInFavItems ? faHeart : fasHeart } style={{ color: "white" }} />
</button>
        <button
          className={`add-to-wishlist-button ${isInWishlist ? "selected" : ""}`}
          onClick={toggleWishlist}
        >
          {isInWishlist ? "★" : "☆"}
        </button>
        </div>
      </div>
      <div className="product-details">
        <h2>{product.TopOffersName}</h2>
        <p className="price">${product.TopOffersPrice}</p>{" "}
        <p className="category">{product.TopOffersCategory}</p>{""}
        <div className="offerval">
        <p className="category">{product.TopOffersDiscount}</p>{""}
        <p className="category">{product.TopOffersPeriod}</p>{""}
        </div>
        <div className="buttons-container">
          <button className="add-to-cart-button" onClick={handlecart}>Add to Cart</button>
          <button className="rent-button" onClick={handleRent}>Rent</button>
          <button className="rent-button" onClick={handlecustomize}>Customize</button>

        </div>
      </div>
    </div>
  );
};

//////////////////////////////////////////////

const ProductCard = ({ product, isInWishlist ,isInFavItems,token,CArtDAta, toggleWishlist ,toggleFavItems}: { product: any, isInWishlist: boolean,isInFavItems:boolean, token : string ,CArtDAta:any, toggleWishlist: () => void ,toggleFavItems :() => void}) => {
  
 
  const handlecart = async () => {
    try {
      if (CArtDAta.some((item: any) => item.id === product._id)) {
        console.log("Product is already in the cart");
        alert("Product is already in the cart")
        return;
      }
      console.log("product id: ", product._id);

      const response = await fetch('http://localhost:4000/cart/editCart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ products: [`${product._id}`, 1,"purchase"] }), 
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
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };
  const handlewishlist = async () => {
    try {
      console.log("product id: ", product._id);
      const response = await fetch('http://localhost:4000/Wishlist/editWishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        },
        body: JSON.stringify({ products: [`${product._id}`] }), 
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
  const handlecustomize = async () => {
    window.location.href = `/Customize?id=${product._id}&token=${token}`;
  }
  return (
    <div className="product-card">
      <div className="product-image-container">
        <img className='product-image' src={product.ProductImage} alt={product.ProductName} />
        <Link href={`/Product?id=${product._id}&token=${token}`} className="view-product-button">
          View Product
        </Link>
        <div className="Actionns">
        <button
  className={`add-to-favitems-button ${isInFavItems ? "selected" : ""}`}
  onClick={toggleFavItems}
>
<FontAwesomeIcon icon={isInFavItems ? faHeart : fasHeart } style={{ color: "white" }} />
</button>
        <button
          className={`add-to-wishlist-button ${isInWishlist ? "selected" : ""}`}
          onClick={toggleWishlist}
        >
          {isInWishlist ? "★" : "☆"}
        </button>
        </div>
      </div>
      <div className="product-details">
        <h2>{product.ProductName}</h2>
        <p className="price">${product.ProductPrice}</p>{" "}
        <p className="category">{product.ProductCategory}</p>{""}
        <div className="buttons-container">
          <button className="add-to-cart-button" onClick={handlecart}>Add to cart</button>
          <button className="rent-button" onClick={handleRent}>Rent</button>
          <button className="rent-button" onClick={handlecustomize}>Customize</button>

        </div>
      </div>
    </div>
  );
};


const HomePage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [TopOffers, setTopOffers] = useState([]);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = searchParams.get("token") ?? "";
  const [wishlistData, setWishlistData] = useState<string[]>([]);
  const [CArtDAta, setCArtDAta] = useState<string[]>([]);
  const [FavItemsData, setFavItemsData] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [guestcart, setGuestCart] = useState<any[]>([]);
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("storedCart",storedCart);
    setGuestCart(storedCart);
  }, []);
  console.log(guestcart)
 
  useEffect(() => {
    fetch("http://localhost:4000/Wishlist/getWishlist", {
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
        console.log(data);
        setWishlistData(data.products); // Set the wishlist data
      })
      .catch((error) => {
        console.error("Error fetching wishlist data:", error);
      });
  }, [token]);
  useEffect(() => {
    fetch("http://localhost:4000/cart/getCart", {
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
        console.log(data);
        setCArtDAta(data.products); // Set the wishlist data
      })
      .catch((error) => {
        console.error("Error fetching setCArtDAta data:", error);
      });
  }, [token]);
  useEffect(() => {
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
        console.log(data);
        setFavItemsData(data.products); // Set the wishlist data
      })
      .catch((error) => {
        console.error("Error fetching wishlist data:", error);
      });
  }, [token]);
  useEffect(() => {
    fetch("http://localhost:4000/topOffers/getTopOffers", {
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

        setTopOffers(data);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      });
  }, [token]);
console.log("favitems: ", FavItemsData);
  useEffect(() => {
    fetch("http://localhost:4000/products/getProducts", {
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
  useEffect(() => {
    const postGuestCartToUserCart = async () => {
      try {
        const cartResponse = await fetch("http://localhost:4000/cart/getCart", {
          headers: {
            Authorization: `${token}`,
          },
        });
  
        if (cartResponse.status === 401) {
          console.log("Unauthorized");
          window.location.href = "/Login";
          return;
        }
  
        if (!cartResponse.ok) {
          console.log("An error occurred");
          return;
        }
  
        const cartData = await cartResponse.json();
        console.log(cartData);
        const cartinsideguestt = cartData.products;
  
        for (let i = 0; i < guestcart.length; i++) {
          const item = guestcart[i];
          console.log(item);
          console.log("p");
          console.log(item.id, "aaa");
  
          let isInCart = false;
  
          if (item.type === "purchase") {
            isInCart = cartinsideguestt.some((cartItem: any) => cartItem.id === item.id);

            if (isInCart) {
              console.log("Product is already in the cart");
              guestcart.shift();
              i--; // Adjust index after removing the item
              continue;
            }
  
            const response = await fetch('http://localhost:4000/cart/editCart', {
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
  
            if (response.ok) {
              console.log(`Product with ID ${item.id} sent successfully.`);
              guestcart.shift();
              i--; // Adjust index after removing the item
              if (guestcart.length === 0) {
                localStorage.removeItem("cart");
                console.log("Guest cart emptied successfully.");
              }
            } else {
              console.error(`Failed to send product with ID ${item.id}.`);
              break;
            }
          } else if (item.type === "Customization") {
            isInCart = cartinsideguestt.some((cartItem : any) => cartItem.id === item.id);
  
            if (isInCart) {
              console.log("Product is already in the cart");
              guestcart.shift();
              i--; // Adjust index after removing the item
              continue;
            }
  
            const response = await fetch('http://localhost:4000/cart/editcustomizeCart', {
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
  
            if (response.ok) {
              console.log(`Product with ID ${item.id} sent successfully.`);
              guestcart.shift();
              i--; // Adjust index after removing the item
              if (guestcart.length === 0) {
                localStorage.removeItem("cart");
                console.log("Guest cart emptied successfully.");
              }
            } else {
              console.error(`Failed to send product with ID ${item.id}.`);
              break;
            }
          } else if (item.type === "rent") {
            isInCart = cartinsideguestt.some((cartItem : any) => cartItem.id === item.id);
  
            if (isInCart) {
              console.log("Product is already in the cart");
              guestcart.shift();
              i--; // Adjust index after removing the item
              continue;
            }
  
            const response = await fetch('http://localhost:4000/cart/editrentCart', {
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
  
            if (response.ok) {
              console.log(`Product with ID ${item.id} sent successfully.`);
              guestcart.shift();
              i--; // Adjust index after removing the item
              if (guestcart.length === 0) {
                localStorage.removeItem("cart");
                console.log("Guest cart emptied successfully.");
              }
            } else {
              console.error(`Failed to send product with ID ${item.id}.`);
              break;
            }
          }
        }
      } catch (error) {
        console.error('Error posting guest cart to user cart:', error);
      }
    };
  
    postGuestCartToUserCart();
  }, [guestcart, token]);
  
  const filteredTopOffers = TopOffers.filter((toy: any) =>
    toy.TopOffersName.toLowerCase().includes(searchQuery.toLowerCase())
);
  const filteredProducts = products.filter((toy: any) =>
    toy.ProductName.toLowerCase().includes(searchQuery.toLowerCase())
);
  console.log("token: ", token);
  console.log("products: ", products);
  const toggleWishlist = async (productId: string) => {
    try {
      console.log("productId: ", productId);
      const isInWishlist = wishlistData.some((item: any) => item.id === productId);
      console.log("isInWishlist: ", isInWishlist);
      if (isInWishlist) {
        // Remove the product from the wishlist
        try {
          const response = await fetch(`http://localhost:4000/Wishlist/deleteWishlist/${productId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `${token}`
            }
          });
          if (response.status === 200) {
            // Update the wishlistData state to remove the productId
            setWishlistData(wishlistData.filter(id => id !== productId));
            window.location.reload();
          }
        } catch (error) {
          console.error('Error removing product from wishlist:', error);
        }
      } else {
        // Add the product to the wishlist
        try {
          const response = await fetch('http://localhost:4000/Wishlist/editWishlist', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            },
            body: JSON.stringify({ products: [`${productId}`] }), 
          });
          if (response.ok) {
            // Update the wishlistData state to add the productId
            setWishlistData([...wishlistData, productId]);
            window.location.reload();
          }
        } catch (error) {
          console.error('Error adding product to wishlist:', error);
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };
  const toggleFavItems = async (productId: string) => {
    try {
      console.log("productId: ", productId);
      const isInFavItems = FavItemsData.some((item: any) => item.id === productId);
      console.log("isInFavItems: ", isInFavItems);
      if (isInFavItems) {
        // Remove the product from the wishlist
        try {
          const response = await fetch(`http://localhost:4000/FavItems/deleteFavItems/${productId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `${token}`
            }
          });
          if (response.status === 200) {
            // Update the wishlistData state to remove the productId
            setFavItemsData(FavItemsData.filter(id => id !== productId));
            window.location.reload();
          }
        } catch (error) {
          console.error('Error removing product from wishlist:', error);
        }
      } else {
        // Add the product to the wishlist
        try {
          const response = await fetch('http://localhost:4000/FavItems/editFavItems', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `${token}`
            },
            body: JSON.stringify({ products: [`${productId}`] }), 
          });
          if (response.ok) {
            // Update the wishlistData state to add the productId
            setFavItemsData([...FavItemsData, productId]);
            window.location.reload();
          }
        } catch (error) {
          console.error('Error adding product to FavItemsData:', error);
        }
      }
    } catch (error) {
      console.error('Error toggling FavItemsData:', error);
    }
  };
  return (
    <div className="homepage">
      <Navbar setSearchQuery={setSearchQuery} isLoggedIn={false} token={token} />
      <div className="mostselling">
    <h2> Top Offers</h2>
 <div className="mostselling-container-wrapper">
 <div className="mostselling-container">

        {filteredTopOffers.map((product: any) => (
           <TopOffersCard 
           key={product.id}
           product={product}
           isInWishlist={wishlistData.some((item: any) => item.id === product._id)}
           isInFavItems={FavItemsData.some((item: any) => item.id === product._id)}  // Check if product is in wishlist
           token={token} 
           CArtDAta={CArtDAta}
           toggleWishlist={() => toggleWishlist(product._id)} 
           toggleFavItems={() => toggleFavItems(product._id)} 
                 />
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
    <div className="content">

      { (
        filteredProducts.map((product: any) => (
          <ProductCard 
            key={product.id}
            product={product}
            isInWishlist={wishlistData.some((item: any) => item.id === product._id)}
            isInFavItems={FavItemsData.some((item: any) => item.id === product._id)}  // Check if product is in wishlist
            token={token} 
            CArtDAta={CArtDAta}
            toggleWishlist={() => toggleWishlist(product._id)} 
            toggleFavItems={() => toggleFavItems(product._id)} 
                  />
        ))
      )}
    </div>
    <FooterComponent /> 

    </div>
);
};

export default HomePage;
