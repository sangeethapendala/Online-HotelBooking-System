import { Link } from "react-router-dom";
import LocationNavigator from "../LocationComponent/LocationNavigator";
import HotelCarousel from "./HotelCarousel";
import './style.css';  // Adjust the path as needed

const HotelCard = (hotel) => {
  return (
    <div className="col">
      <div className="flower-card border-none rounded-flower flower-hover custom-bg h-100">
        <div className="flower-img-container">
          <img
            src={"http://localhost:8080/api/hotel/" + "hotel.item.image2"}
            className="flower-img rounded mx-auto d-block m-2"
            alt="img"
            style={{
              maxHeight: "270px",
              maxWidth: "100%",
              width: "auto",
            }}
          />

          <div className="flower-card-body text-flower">
            <h5 className="flower-card-title d-flex justify-content-between">
              <div>
                <b>{hotel.item.name}</b>
              </div>
              <LocationNavigator
                item={{
                  id: hotel.item.location.id,
                  city: hotel.item.location.city,
                }}
              />
            </h5>
            <p className="flower-card-text">{hotel.item.description}</p>
            <p className="text-flower">
              <b>
                <i>Total Room :</i> {hotel.item.totalRoom}
              </b>
            </p>
          </div>
          <div className="flower-card-footer">
            <div className="text-center text-flower">
              <p>
                <span>
                  <h4>Price Per Day : &#8377;{hotel.item.pricePerDay}</h4>
                </span>
              </p>
            </div>
            <div className="d-flex justify-content-center">
              <Link
                to={`/hotel/${hotel.item.id}/location/${hotel.item.location.id}`}
                className="btn flower-bg custom-bg-text"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
