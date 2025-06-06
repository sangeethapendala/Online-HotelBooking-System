import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const GetAllLocations = () => {
  const [locations, setLocations] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const retrieveAllLocations = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/location/fetch"
    );
    return response.data;
  };

  useEffect(() => {
    const getAllLocations = async () => {
      const allLocations = await retrieveAllLocations();
      if (allLocations) {
        setLocations(allLocations.locations);
      }
    };

    getAllLocations();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="dropdown">
      <button
        className="btn btn-success fw-bold py-3 px-4 rounded-1 shadow-sm dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        aria-haspopup="true"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        Manage Locations
      </button>
      <div
        className={`dropdown-menu ${isOpen ? 'show' : ''}`}
        aria-labelledby="dropdownMenuButton"
      >
        <Link
          to="/home/all/hotel/location"
          className="dropdown-item"
        >
          All Locations
        </Link>
        {locations.map((location) => (
          <Link
            key={location.id}
            to={`/home/hotel/location/${location.id}/${location.city}`}
            className="dropdown-item"
          >
            {location.city}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GetAllLocations;
