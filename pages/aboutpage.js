import Header from '../components/Header';
import { useRouter } from 'next/router'; // Import the useRouter hook
import { useAuth } from '@/context/auth';
import Cookies from "js-cookie"; // Import Cookies
import React, { useEffect } from 'react';

const teamMembers = [
    {
        name: 'Ibrahem ',
        major: 'Full stack developer',
        image: '/images/ibrahem.jpg',
    },
    {
        name: 'Sakher',
        major: 'Full stack developer',
        image: '/images/sakher.jpg',
    },
    {
        name: 'Malik',
        major: 'Full stack developer',
        image: '/images/malik.jpg',
    },
    {
        name: 'Bayan',
        major: 'Full stack developer',
        image: '/images/bayan.jpg',
    },
    {
        name: 'sajeda',
        major: 'Full stack developer',
        image: '/images/saj.jpg',
    },
    {
        name: 'Wallaw',
        major: 'Full stack developer',
        image: '/images/wallaw.jpg',
    },
];
const AboutPage = () => {
    const router = useRouter();
    const { user, setToken } = useAuth();
    useEffect(() => {
        const tokenFromCookie = Cookies.get("token");
        const initializeAuthStateFromCookies = async () => {
          const tokenFromCookie = Cookies.get("token");
          if (tokenFromCookie) {
            setToken(tokenFromCookie);
          }
        };
        if (tokenFromCookie && !user) {
          initializeAuthStateFromCookies()
        }
      }, [user, router]);
    return (
        <div>
            <Header />
                <div className="max-w-6xl px-4 py-8 mx-auto">
                    <h1 className="mb-4 text-3xl font-semibold">Who we are ?</h1>
                    <p className="mb-8 text-black-300">
                        Welcome to our Technician Agent website , your hassle-free solution for household repairs and maintenance. We understand that things can break unexpectedly, and that's where we come in. Our platform seamlessly connects you with skilled technicians who are ready to tackle any issue in your home. Here's how it works:
                        <br>
                        </br>
                        <strong>Easy Booking:</strong> With a few clicks, you can request a technician to fix the problem at your convenience. Whether it's a leaky faucet, electrical glitch, or appliance malfunction, we've got you covered.
                        <br />
                        <br />
                        <strong>Swift Response:</strong> Our network of certified technicians ensures a quick response to your service request. We understand the urgency of repairs and strive to schedule your service promptly.
                        <br />
                        <br />
                        <strong>Expert Technicians:</strong> Rest assured, your repairs will be handled by experienced professionals. Our technicians are skilled in various trades, ensuring that your issues are resolved effectively and efficiently.
                        <br />
                        <br />
                        Our technicians undergo background checks, and your information is kept confidential.
                        At our Technician Agent website, we believe in making repairs stress-free and convenient. Whether it's a minor fix or a major repair, trust us to connect you with reliable technicians who can restore your home's functionality. Experience the ease of getting things fixed with our Technician Agent website.
                    </p>
                    <div className="grid grid-cols-6 gap-20 justify-items-center">
                        {teamMembers.map((member, index) => (
                            <div key={index} className="text-center">
                                <div className="relative w-32 h-32 mx-auto mb-4 overflow-hidden rounded-full">
                                    <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                                </div>
                                <h3 className="text-lg font-semibold">{member.name}</h3>
                                <p className="text-black-500">{member.major}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            );
};
            export default AboutPage;