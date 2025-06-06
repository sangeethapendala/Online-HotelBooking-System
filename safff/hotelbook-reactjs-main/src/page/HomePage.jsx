import Carousel from "./Carousel";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import HotelCard from "../HotelComponent/HotelCard";
import Footer from "./Footer";
import Aos from "aos";
import 'aos/dist/aos.css';
import "./home.css";  // Import your CSS file

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const { locationId } = useParams();

  useEffect(() => {
    const getAllHotels = async () => {
      const allHotels = await retrieveAllHotels();
      if (allHotels) {
        setHotels(allHotels.hotels);
      }
    };

    const getProductsByLocation = async () => {
      const allHotels = await retrieveProductsByLocation();
      if (allHotels) {
        setHotels(allHotels.hotels);
      }
    };

    if (locationId == null) {
      getAllHotels();
    } else {
      getProductsByLocation();
    }
  }, [locationId]);

  const retrieveAllHotels = async () => {
    const response = await axios.get("http://localhost:8080/api/hotel/fetch");
    return response.data;
  };

  const retrieveProductsByLocation = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/hotel/location?locationId=" + locationId
    );
    return response.data;
  };

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <div className="homepage-container mb-2">
      <div className="carousel-section p-3">
        <Carousel />
      </div>
      <div className="tree-container mt-2 mb-5">
        {hotels.map((hotel, index) => (
          <div className={`tree-box tree-box-${index % 3}`} data-aos="fade-up" key={hotel.id}>
            <HotelCard item={hotel} />
          </div>
        ))}
      </div>
      <hr />
      <Footer />
    </div>
  );
};

export default HomePage;
