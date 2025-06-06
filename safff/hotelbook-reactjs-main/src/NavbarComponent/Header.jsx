import { Link } from "react-router-dom";
import logo from "../images/logo.png"
import RoleNav from "./RoleNav";
import "./Header.css"
import Aos from 'aos'
import 'aos/dist/aos.css'
import { useEffect, useState } from "react";


const Header = () => {

   useEffect(()=>{
    Aos.init({duration:2000})
   },[])



   const [searchTerm, setSearchTerm] = useState('');

   const handleSearch = (e) => {
     e.preventDefault();
     // Call API or perform search logic here
     console.log(`Searching for: ${searchTerm}`);
   };

  return (
    <div className="sticky-top bg-dark" >
      <nav className="navbar  navbar-expand-lg bg-transparent "style={{padding:"13px"}}>
        <div className="container-fluid text-color">
       <Link to="/"> <img
            src={logo}
            width="100"
            height="50"
            className="d-inline-block align-top "
            alt=""
          /></Link>  
          {/* <Link to="/" className="navbar-brand">
            <i>
              <button className="btn btn-danger fw-bold py-3 px-4 rounded-1 shadow-sm" role="button">HOLIDAYZzz.com</button>
            </i>
          </Link> */}
          

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className=" navbar-collapse" id="navbarSupportedContent">
            <RoleNav />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
