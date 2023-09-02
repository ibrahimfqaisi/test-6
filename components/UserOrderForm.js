import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from "@/context/auth"
const UserOrderForm = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const urlenv = process.env.NEXT_PUBLIC_URL
  const auth = useAuth();
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    const token = auth.token;
    formData.append("description", event.target.description.value);
    formData.append("location", event.target.location.value);
    formData.append("technician_type", event.target.TechnicianType.value);
    formData.append("image", selectedImage);
    formData.append("address", event.target.address.value);
    
    const config = {
      headers: {
          Authorization: `Bearer ${token}`,
      },
  };
    const url=urlenv+'/createorder/'
    const data=await axios.post(url ,formData,config)
    alert("created successfully !")
    event.target.reset();
  };

  return (
    <form className="w-1/2 p-4 border-r" onSubmit={handleOrderSubmit}>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-600">Description</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter order description"
          name="description"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-600">Location</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter order location"
          name="location"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-600">Technician Type</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter technician type"
          name="TechnicianType"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-600">Image</label>
        <input
          className="w-full p-2 border rounded-md"
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          name="image"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold text-gray-600">Address</label>
        <input
          className="w-full p-2 border rounded-md"
          type="text"
          placeholder="Enter address"
          name="address"
        />
      </div>
      <button
        type="submit" 
        className="w-full p-2 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Create Order
      </button>
    </form>
  );
};

export default UserOrderForm;