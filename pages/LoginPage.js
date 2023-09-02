import React from 'react';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import Link from 'next/link';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/router';

const LoginPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  // If user is logged in, automatically redirect to the desired page
  if (user) {
    // You can specify the path you want to redirect to
    router.push('../'); // Replace '../' with the desired path
    return null; // You can return null or any loading indicator here
  }

  // If user is not logged in, show the login form
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;