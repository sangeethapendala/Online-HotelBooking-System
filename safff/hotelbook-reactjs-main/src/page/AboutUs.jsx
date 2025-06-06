import React, { useEffect } from "react";
// import Aboutus from "../images/Aboutus.jpeg"
import { Link } from "react-router-dom";
import "./About.css"
import Aos from 'aos'
import "aos/dist/aos.css"

const AboutUs = () => {
  useEffect(()=>{
    Aos.init({duration:2000})
  },[])
  
  return (
   <>
<section class="about-us" data-aos="fade-down">
  <div class="container">
    <div class="row">
      <div class="col-md-6">
        <h2>About Us</h2>
        <p>Founded in 1996 in Amsterdam, HolidayZzz.com has grown from a small Dutch start-up to one of the world’s leading digital travel companies. Part of Booking Holdings Inc. (NASDAQ: BKNG), Holiday.com’s mission is to make it easier for everyone to experience the world.</p>
        <p>By investing in technology that takes the friction out of travel, HolidayZzz.com seamlessly connects millions of travelers to memorable experiences, a variety of transportation options, and incredible places to stay – from homes to hotels, and much more. As one of the world’s largest travel marketplaces for both established brands and entrepreneurs of all sizes, Holiday.com enables properties around the world to reach a global audience and grow their businesses.</p>
       <Link to="/"><button class="btn btn-primary">Learn More</button></Link>
      </div>
      {/* <div class="col-md-6">
        <img src={Aboutus} alt="Image" className="img-fluid" />
      </div> */}
    </div>
  </div>
</section>
   </>
  );
};

export default AboutUs;
