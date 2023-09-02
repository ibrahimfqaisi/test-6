import { useAuth } from "@/context/auth";
import Header from "./Header";

const baseUrl = process.env.NEXT_PUBLIC_URL;

export default function UpdateCustomerProfileForm() {
  const { user, token } = useAuth();
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      phone: e.target.phone.value,
      email: e.target.email.value,
      location: e.target.location.value,
    };

    try {
      const response = await fetch(`${baseUrl}/api/customer/profileupdate/`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        alert("Account Information Updated Successfuly!");
      } else {
        // Handle errors
      }
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
              placeholder="Update Email"
              defaultValue={user.email}
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