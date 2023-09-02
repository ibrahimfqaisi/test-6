import React, { useEffect } from 'react';

import { useRouter } from 'next/router'; // Import the useRouter hook

import Header from '../components/Header';
import useResource from '@/Hooks/useResource';
import { useAuth } from '@/context/auth';

const UserProfile = () => {
  const { user } = useAuth();
  const urlenv = process.env.NEXT_PUBLIC_URL;
  const router = useRouter(); // Initialize the router object
  const { namecustomer } = router.query;
  const url = user ? urlenv + `/api/customer/profile/${namecustomer}/`: null;
  const { response: data1, error: error1, isLoading } = useResource(url);
  
  useEffect(() => {
    // Check if the user is authenticated and their role
    if ( !namecustomer ) {
     
     
      router.push('../'); 
    }
  }, [user, router]);

  if (user ) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />

        <div className="max-w-2xl p-6 mx-auto">
          {data1 && (
            <div className="p-6 bg-white rounded-lg shadow-lg">
              <h1 className="mb-2 text-2xl font-semibold text-center">{data1.username}</h1>
              <p className="mb-4 text-center text-gray-600">Email: {data1.email}</p>
              <p className="mb-4 text-center text-gray-600">Phone: {data1.phone}</p>
              <p className="mb-4 text-center text-gray-600">Location: {data1.location}</p>
              <p className="mb-4 text-center text-gray-600">Is Customer: {data1.is_customer ? "Yes" : "No"}</p>
              <p className="text-center text-gray-600">Number of Orders: {data1.num_orders}</p>
            </div>
          )}
        </div>
      </div>
    );
  } 
};

export default UserProfile;
