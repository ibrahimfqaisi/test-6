import React from 'react';
import { useRouter } from 'next/router';
import UserRegForm from   '../components/UserRegForm'
import Header from '../components/Header';
const UserRegPage = () => {
  const router = useRouter();


  return (
    <div>
      <Header />
      <h1>Register as a customer</h1>
      <UserRegForm  />

    </div>
  );
};

export default UserRegPage;