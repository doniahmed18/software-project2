"Use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faHeart, faHome, faStar, faUser } from "@fortawesome/free-solid-svg-icons";
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = ({ isLoggedIn, setSearchQuery ,token }: { isLoggedIn: boolean, setSearchQuery: Function ,token :string}) => {
    const searchParams = useSearchParams();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearchChange = (event:any) => {
    setSearchTerm(event.target.value);
    setSearchQuery(event.target.value);
  };
  const categories = [
    { id: 1, name: "Plastic Pallets" },
    { id: 2, name: "Wood Pallets" },
    { id: 3, name: "Stainless steel Pallets" },
   
    // Add more categories as needed
];

  

  return (
    <nav className="navbar">
      {/* Mobile Menu */}
      <div
        className="formobile"
        onMouseEnter={() => setDropdownVisible(true)}
        onMouseLeave={() => setDropdownVisible(false)}
      >
        <FontAwesomeIcon icon={faBars} className="mobileinnav" />
        Menu
        {dropdownVisible && categories && (
          <ul className="dropdown-menuu">
            <li>
              <Link
               // href ={isLoggedIn ? "/profile" : "/login"}
               href={`/Profile?token=${token}`}
              >
                <FontAwesomeIcon icon={faUser} className="profile-icon" />
              </Link>
            </li>
            <li>
              <Link
                href={`/Cart?token=${token}`}
              >
                <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
              </Link>
            </li>
            <li>
              <Link
                href={`/Wishlist?token=${token}`}
              >
                <FontAwesomeIcon icon={faStar} className="wishlist-icon" />
              </Link>
              <Link
                href={`/HomePage?token=${token}`}
              >
                <FontAwesomeIcon icon={faHome} className="home-icon" />
              </Link>
            </li>

          </ul>
        )}
      </div>



      {/* Desktop Menu */}
      <div className="nav-items">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      {/* Category Dropdown */}
  <div className="category-dropdown">
                    <button className="dropdown-toggle" onClick={() => setDropdownVisible(!dropdownVisible)}>Categories <FontAwesomeIcon icon={faBars} /></button>
                    {dropdownVisible && (
                        <ul className="dropdown-menu">
                            {categories.map((category: any) => (
                                <li key={category.id}>
                                    <Link href={`/CategoryPage?categoryname=${category.name}&token=${token}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
        <Link
         // href={isLoggedIn ? "/profile" : "/login"}
         href={`/Profile?token=${token}`}
        >
          <FontAwesomeIcon icon={faUser} className="profile-icon" />
        </Link>

        <Link
          href={`/cart?token=${token}`}
        >
          <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
        </Link>

        <Link
          href={`/Wishlist?token=${token}`}
        >
          <FontAwesomeIcon icon={faStar} className="wishlist-icon" />
        </Link>

        <Link
          href={`/FavItems?token=${token}`}
        >
          <FontAwesomeIcon icon={faHeart} className="heart-icon" />
        </Link>
        <Link
                href={`/HomePage?token=${token}`}
              >
                <FontAwesomeIcon icon={faHome} className="home-icon" />
              </Link>
      </div>
    </nav>
  );
};

export default Navbar;