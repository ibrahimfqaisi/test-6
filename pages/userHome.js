import React, { useEffect } from 'react';
import UserOrderForm from '../components/ElectricianImage';
import ElectricianImage from '../components/UserOrderForm';
import Header from '../components/Header';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/auth';
import Cookies from "js-cookie"; // Import Cookies

const UserHome = () => {
  const { user, setToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const tokenFromCookie = Cookies.get("token");
    const initializeAuthStateFromCookies = async () => {
      const tokenFromCookie = Cookies.get("token");
      if (tokenFromCookie) {
        setToken(tokenFromCookie);
      }
    };
    if (tokenFromCookie && !user ){
      initializeAuthStateFromCookies()
    }
    if (user) {
      if (user.is_technician) {
        router.push('./TechHome'); // Redirect to the technician's home
      }
    }
    else {
      router.push('../');
    }
  }, [user, router, setToken]);

  if (user && !user.is_technician) {
    return (
      <div>
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex w-full max-w-screen-xl p-8 mx-auto">
            <UserOrderForm />
            <ElectricianImage />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default UserHome;
