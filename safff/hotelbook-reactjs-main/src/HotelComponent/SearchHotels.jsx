import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchHotels = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHotels = async () => {
      if (searchTerm!== '') {
        setLoading(true);
        try {
          // Make API call to retrieve hotels

          const retrieveAllHotels = async () => {
            const response = await axios.get("http://localhost:8080/api/hotel/fetch");
        
            return response.data;
          };
          const response = await fetch('http://localhost:8080/api/hotel/fetch'); // Replace with your API endpoint
          const data = await response.json();
          setHotels(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchHotels();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <h1>Search hotels</h1>
      <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search hotels" />
      {loading? (
        <p>Loading...</p>
      ) : (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.id}>{hotel.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchHotels;