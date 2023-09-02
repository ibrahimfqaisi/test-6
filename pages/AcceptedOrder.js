import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { useAuth } from "@/context/auth";
import useResource from "@/Hooks/useResource";
import { useRouter } from "next/router";
import Cookies from "js-cookie"; // Import Cookies
const acceptedorder = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const router = useRouter(); // Initialize the router object
  const { user, setToken } = useAuth();
  const url = urlenv + "/api/technician/techacceptedlist/";
  const { response: data1, error: error1, createResource4 } = useResource(url);
  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const message = {
      body: event.target.message.value,
    };
    createResource4(message, id);
    alert("hi");
    event.target.reset();
  };
  const customerviewhandelr = async (event) => {
    event.preventDefault();
    const namecustomer = event.currentTarget.getAttribute("data-namecustomer");
    router.push({
      pathname: "/userprofileview",
      query: { namecustomer: namecustomer },
    });
  };
  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    const initializeAuthStateFromCookies = async () => {
      if (tokenFromCookie) {
        await setToken(tokenFromCookie);
      }
    };
    if (tokenFromCookie && !user) {
       initializeAuthStateFromCookies()
    }
//     لا تمسحهم لو سمحت 
    // Check if the user is authenticated and their role
    // if (tokenFromCookie) {
    //   if (!user.is_technician) {
    //     router.push("./CustomerOrder"); // Redirect to the technician's home
    //   }
    // } else {
    //   router.push("../");
    // }
  }, [user, router]);
  if (user && user.is_technician) {
    return (
      <div>
        <Header />
        <div className="flex flex-wrap gap-5">
          {data1.map((order) => (
            <div key={order.id} className="w-1/3 p-4 border">
              <img
                src={order.image}
                alt={order.description}
                className="w-full mb-2"
              />
              <h3 className="text-lg font-semibold">{order.description}</h3>
              <p>Go to customer profile : {""}</p>
              <span
                onClick={customerviewhandelr}
                data-namecustomer={order.customer_name.username}
              >
                {order.customer_name.username}
              </span>
              {/* Render comments */}
              <div>
                {order.comments &&
                  order.comments.map((comment) => (
                    <div key={comment.id}>
                      <h3 className="text-lg font-semibold">{`${comment.sender}: ${comment.body}`}</h3>
                      {/* Render other comment properties as needed */}
                    </div>
                  ))}
              </div>

              <p>Technician Type: {order.technician_type}</p>
              {order.eta_arrival_time && (
                <p>Estimated Arrival Time: {order.eta_arrival_time}</p>
              )}

              <form onSubmit={(event) => handleSubmit(event, order.id)}>
                <input
                  type="text"
                  placeholder="Add your message"
                  className="w-full p-2 mt-2 border rounded-md"
                  name="message"
                />
                <button
                  className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md"
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default acceptedorder;
