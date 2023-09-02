import Header from '../components/Header';
import useResource from '@/Hooks/useResource';

import { useAuth } from '@/context/auth';
import React, { useEffect, useState } from 'react'; // Import useState
import { useRouter } from 'next/router'; // Import the useRouter hook
import Cookies from "js-cookie"; // Import Cookies
import Link from 'next/link'; // Import Link

const TechProfile = () => {
  const { user, setToken } = useAuth();
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const url = user ? `${urlenv}/api/technician/profile/${user.username}/` : null;
  const { response: data1, error: error1 } = useResource(url);
  
  const router = useRouter(); // Initialize the router object

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
    //     لا تحمسحهم لو سمحت 

    // Check if the user is authenticated and their role
    // if (tokenFromCookie) {
    //   if (!user.is_technician) {
    //     router.push('./userprofile'); // Redirect to the technician's home
    //   } 
    // } else {
    //   router.push('../'); 
    // }
  }, [user, router]);

  if (user && user.is_technician) {
    return (
      
      <div className="min-h-screen bg-gray-100">
        <Header />
        <div className="max-w-2xl p-6 mx-auto">
          {data1 && data1.user && (
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <img src={data1.image} alt="User Avatar" className="w-32 h-32 mx-auto mb-4 rounded-full" />
              <h1 className="mb-2 text-2xl font-semibold text-center">{data1.user.username}</h1>
              <p className="mb-4 text-center text-gray-600">Profession: {data1.profession}</p>
              <p className="mb-4 text-gray-600">Description: {data1.description}</p>
              <p className="text-gray-600">Average Rating: {data1.average_rating}</p>
              <Link href="/UpdateTechnicianProfile">
                      <button className="text-black cursor-pointer">Edit Profie</button>
                    </Link>
              <div className="mt-4">
                <h2 className="text-xl font-semibold">Feedback:</h2>
                <ul>
                  {data1.feedback_list.map((feedback, index) => (
                    <li key={index}>{feedback}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {error1 && (
            <div className="text-red-500">Error loading profile data: {error1.message}</div>
          )}
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default TechProfile;
