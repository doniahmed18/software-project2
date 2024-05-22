"Use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./globals.css";
import Link from 'next/link';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { faBars } from '@fortawesome/free-solid-svg-icons';
import logo from '../Pics/logo4.png';
import { faCartShopping, faStar } from "@fortawesome/free-solid-svg-icons";
import { faRegistered } from "@fortawesome/free-solid-svg-icons/faRegistered";

const GuestNavBar = ({ isLoggedIn, setSearchQuery ,token }: { isLoggedIn: boolean, setSearchQuery: Function ,token :string}) => {
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
                                    <Link href={`/GuestCategoryPage?categoryname=${category.name}`}>
                                        {category.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
   <Link
    href={"/Login"}
  >
    <FontAwesomeIcon icon={faUser} className="profile-icon" />
  </Link>
  <Link
    href={"/SignUp"}
  >
    <FontAwesomeIcon icon={faRegistered} className="profile-icon" />
  </Link>

  <Link className="guestt"
    href={"/GuestPage"}
  >
    Continue as guest
  </Link>
  <Link
    href={"/GuestCartPage"}
  >
    <FontAwesomeIcon icon={faCartShopping} className="profile-icon" />
  </Link>
 

</div>

    </nav>
  );
};

export default GuestNavBar;