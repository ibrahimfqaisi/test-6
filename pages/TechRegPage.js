// pages/TechRegPage.js
import React from 'react';
import Header from '../components/Header';
import TechRegForm from '../components/TechRegForm';

const TechRegPage = () => {
  return (
    <div>
      <Header />
      <h1>Register as Technician</h1>
      <TechRegForm />
    </div>
  );
};

export default TechRegPage;
