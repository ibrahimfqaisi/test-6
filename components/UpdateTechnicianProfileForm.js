import { useAuth } from "@/context/auth";
import { useState } from "react"; // Import useState from React
// import { useAuth } from "@/context/auth";
import Header from "./Header"; // Make sure this import is correct

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function UpdateTechnicianProfileForm() {
  const { user, token } = useAuth();
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(token);

  // Define the handleImageChange function outside of handleSubmit
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    setSelectedImage(file); // Store the selected file in state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const updatedFormData = {
      phone: e.target.phone.value,
      email: e.target.email.value,
      location: e.target.location.value,
    };


    formData.append('profession', e.target.profession.value);
    formData.append('description', e.target.description.value);
    formData.append('image', selectedImage);

    try {
      const response = await fetch(`${baseUrl}/api/technician/profileupdate/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        alert("Account Information Updated Successfully!");
      } else {
        // Handle errors
      }
    } catch (error) {
      console.error('Error:', error);
    }

    try {
      const response = await fetch(`${baseUrl}/api/technician/profileupdateInfo/`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData, // Use the FormData object as the request body
      });

      // if (response.ok) {
      //   alert("Account Information Updated Successfully!");
      // } else {
      //   // Handle errors
      // }
    } catch (error) {
      console.error('Error:', error);
    }
  };
if (user){
    
    return (
      <div>
        <Header /> {/* Include your Header component here */}
  
        <form onSubmit={handleSubmit} className="max-w-md p-4 mx-auto mt-4 border rounded-lg shadow-lg">
          <div className="mb-4">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              defaultValue={user.phone}
              placeholder="Change phone number"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={user.email}
              placeholder="Update Email"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={user.location}
              placeholder="Change you location"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Profession</label>
            <input
              type="text"
              id="profession"
              name="profession"
              defaultValue={user.profession}
              placeholder="Change Profession"
              className="w-full p-2 mt-1 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              defaultValue={user.description}
              placeholder="Add Description"
              className="w-full p-2 mt-1 border rounded-lg"
            />
            <div className="mb-4">
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Profile Picture</label>
              <div className="relative rounded-md shadow-sm">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e)}
                  className="sr-only"
                />
                <label
                  htmlFor="image"
                  className="flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md cursor-pointer hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 active:bg-gray-50 active:text-gray-800"
                >
                  Select an Image
                </label>
              </div>
  
            </div>
          </div>
  
          <div className="flex items-center justify-center h-full"> {/* Center the button */}
            <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    );
}
}