import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';
import axios from 'axios'
const customerOrder = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL
  const url = urlenv + '/api/customer/myorders/';
  const { response: data1, error: error1, createResource4, deleteResource, updateResource, updaterating, updaterating2 } = useResource(url);
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const message = {
      body: event.target.message.value,
    };
    createResource4(message, id);
    alert("hi");
    event.target.reset();
  };
  const router = useRouter();
  const { user } = useAuth();
  const auth = useAuth();
  const handleDeleteOrder = (orderId) => {
    deleteResource(orderId);
  };
  const [showModal, setShowModal] = useState(false);
  const [showModalrate, setShowModalrate] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderIdrating, setSelectedOrderIdrating] = useState(null);

  const handleUpdateClick1 = (orderId) => {
    setSelectedOrderId(orderId); // Store the selected order ID
    setShowModal(true); // Open the modal
  };

  useEffect(() => {
    // Check if the user is authenticated and their role
    if (user) {
      if (user.is_technician) {
        router.push('./AcceptedOrder'); // Redirect to the technician's home
      }
    }
    else {
      router.push('../');
    }
  }, [user, router]);



  const tecnicianViewHandler= async (event)=>{
    event.preventDefault();
    const nametechnitian= event.currentTarget.getAttribute("TechnicianName");
    router.push({
      pathname:"/techprofileview",
      query:{nametechnitian:nametechnitian}
    })
  }

  ///////////////rate////////////////

  const handleRateOrder = (orderId) => {
    updaterating(orderId); // Store the selected order ID
    setSelectedOrderIdrating(orderId)
    setShowModalrate(true); // Open the modal
  };

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState('');

  const handleInputChangerating = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input field's name
    if (name === 'feedback') {
      setFeedback(value);
    } else if (name === 'rating') {
      setRating(value);
    }
  };

  const handleUpdateClickrating = () => {
    console.log("Feedback:", feedback);
    console.log("id:", selectedOrderIdrating);

    console.log("Rating:", rating);

    // Check if both feedback and rating are non-empty before proceeding
    if (feedback && rating) {
      // Call updaterating2 with feedback and rating values and orderId
      updaterating2(selectedOrderIdrating, feedback, rating);

      // Close the modal if needed
      setShowModalrate(false);
      alert("hi");
    } else {
      alert("no");
    }
  };


  ///////////////update////////////////

  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    console.log(file)
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
    const url = urlenv + `/updateorder/${selectedOrderId}/`
    try {
      console.log(111111111);
      const data = await axios.put(url, formData, config);
      setShowModal(false);
      console.log(2222222222);
      alert("updated successfully !");
      event.target.reset();
    } catch (error) {
      console.error("Error:", error);

    }


  };



  ///////////////JSX////////////////


  if (user && !user.is_technician) {
    return (
      <div className="relative">
        <Header />
        {showModal ? (
          <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
            <form className="w-1/2 p-4 bg-white rounded-md" onSubmit={handleOrderSubmit}>
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
                className="px-4 py-2 text-white bg-blue-500 rounded-md"
              // onClick={() => handleUpdateClick()} // Pass the order.id here
              >
                Update
              </button>
              <button
                className="px-4 py-2 text-white bg-red-500 rounded-md"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </form>
          </div>
        ) : null}
        {showModalrate ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="p-8 bg-white rounded-lg shadow-lg">
              <label className="block mb-2">
                Feedback:
                <input
                  type="text"
                  name="feedback"
                  onChange={handleInputChangerating}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block mb-2">
                Rating:
                <input
                  type="number"
                  name="rating"
                  onChange={handleInputChangerating}
                  className="block w-full p-2 border border-gray-300 rounded-md"
                />
              </label>

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-blue-500 rounded-md"
                  onClick={() => handleUpdateClickrating()}
                >
                  send
                </button>
                <button
                  className="px-4 py-2 text-white bg-red-500 rounded-md"
                  onClick={() => setShowModalrate(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        ) : null}


        <div className="bg-red">
          <div className="pb-2 mb-8 border-b">Accepted Orders</div> {/* Category title */}
          <div className="flex flex-wrap gap-5">
            {data1.map(order => (
              order.state_is_ongoing && (
                <div key={order.id} className="w-1/3 p-4 border">
                  {/* Card content */}
                  <img src={order.image} alt={order.description} className="w-full mb-2" />
                  <h3 className="text-lg font-semibold">{order.description}</h3>
                  <p>Technician Name: {order.technician_name.username}</p>
                  <p>
                      Go to Technician Profile:{" "} 
                    </p>
                    <span
                    onClick={tecnicianViewHandler} 
                    TechnicianName={order.technician_name.username} >
                      {order.technician_name.username}
                    </span>
                  <p>Technician Type: {order.technician_type}</p>
                  <p>Address: {order.address}</p>
                  <p>Creation Timestamp: {order.created_at}</p>
                  {order.eta_arrival_time && (
                    <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
                  )}
                  
                  <div>
                    {order.comments &&
                      order.comments.map((comment) => (
                        <div key={comment.id}>
                          <h3 className="text-lg font-semibold">{`${comment.sender}: ${comment.body}`}</h3>
                          {/* Render other comment properties as needed */}
                        </div>
                      ))}
                  </div>
                  <form onSubmit={event => handleSubmit(event, order.id)}>
                    <input
                      type="text"
                      placeholder="Add your message"
                      className="w-full p-2 mt-2 border rounded-md"
                      name="message"
                    />
                    <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md" type="submit">
                      Send
                    </button>
                  </form>
                  <div className="flex justify-between mt-4">
                    <button onClick={() => handleDeleteOrder(order.id)} className="px-4 py-2 text-white bg-red-500 rounded-md">Delete</button>
                    <button onClick={() => handleRateOrder(order.id)} className="px-4 py-2 text-white bg-green-500 rounded-md">Done</button>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        <div className="mt-8 bg-red">
          <div className="pb-2 mb-8 border-b">Panding order</div> {/* Category title */}
          <div className="flex flex-wrap gap-5">
            {data1.map(order => (
              !order.state_is_ongoing && (
                <div key={order.id} className="w-1/3 p-4 border">

                  {/* Card content */}
                  <img src={order.image} alt={order.description} className="w-full mb-2" />
                  <h3 className="text-lg font-semibold">{order.description}</h3>
                  <p>Technician Type: {order.technician_type}</p>
                  <p>Address: {order.address}</p>
                  <p>Creation Timestamp: {order.created_at}</p>
                  {order.eta_arrival_time && (
                    <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
                  )}
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="px-4 py-2 text-white bg-red-500 rounded-md"
                    >
                      Delete
                    </button>
                    <div>
                      <button
                        type="button"
                        className="px-4 py-2 text-white bg-blue-500 rounded-md"
                        onClick={() => handleUpdateClick1(order.id)}
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>


              )


            ))}
          </div>
        </div>
      </div>
    )
  };
}
export default customerOrder;