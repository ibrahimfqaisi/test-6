import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/auth';

const LoginForm = () => {
  const { login } = useAuth();

  const handleLogin =async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      await login(username, password);
      router.push('/LoginPage');
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-8 bg-white rounded-lg shadow-md w-96">
        <h2 className="mb-4 text-2xl font-semibold">Log In</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-600">Username</label>
            <input
              className="w-full p-2 text-black border rounded-md"
              type="text"
              placeholder="Enter your username"
              name="username"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-semibold text-gray-600">Password</label>
            <input
              className="w-full p-2 text-black border rounded-md"
              type="password"
              placeholder="Enter your password"
              name="password"
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-black">Don't have an account?</p>
        <div className="flex justify-between">
          <Link href="/TechRegPage" legacyBehavior>
            <a className="p-2 mr-1 text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none wider whitespace-nowrap">
              Register as Technician
            </a>
          </Link>
          <Link href="/UserRegPage" legacyBehavior>
            <a className="p-2 ml-1 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none wider whitespace-nowrap">
              Register as customer
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
