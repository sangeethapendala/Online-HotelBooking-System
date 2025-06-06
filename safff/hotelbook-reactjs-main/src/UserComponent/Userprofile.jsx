import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userId = 2; // Replace with actual user ID

    axios.get(`http://localhost:8080/api/user/id?userId=${userId}`)
      .then(response => {
        setUser(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching profile data:', error);
        setError('Error fetching profile data');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-5xl text-white font-bold mb-10 ">User Profile</h2>
      <div className="grid gap-5 border-2 shadow-lg rounded-md border-orange-500 p-5">
        <div>
          <label className="block text-xl font-medium text-white">First Name :</label>
          <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{user.firstName}</p>
        </div>
        <div>
          <label className="block text-xl font-medium text-white">Last Name :</label>
          <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{user.lastName}</p>
        </div>
        <div>
          <label className="block text-xl font-medium text-white">Contact Number : </label>
          <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{user.contact}</p>
        </div>
        <div>
          <label className="block text-xl font-medium text-white">City : </label>
          <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{user.city}</p>
        </div>
        <div>
          <label className="block text-xl font-medium text-white">State : </label>
          <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{user.state}</p>
        </div>
        <div>
          <label className="block text-xl font-medium text-white">Pincode : </label>
          <p className="mt-1 block w-full border-gray-300 rounded-md shadow-sm">{user.pincode}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
