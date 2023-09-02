import React, { useEffect } from 'react';
import Header from '../components/Header';
import useResource from '@/Hooks/useResource';
import { useRouter } from 'next/router'; // Import the useRouter hook
import { useAuth } from '@/context/auth';
import Cookies from "js-cookie"; // Import Cookies

const TechHome = () => {
  const urlenv = process.env.NEXT_PUBLIC_URL
  const { user, setToken } = useAuth();
  const router = useRouter();
  const url = urlenv + '/api/technician/hometechnician/';
  const { response: data1, error: error1, createResource3 } = useResource(url);

  const handleSubmit = async (event, id) => {
    event.preventDefault();
    const arrivalTime = {
      eta_arrival_time: event.target.eta_arrival_time.value,
    };
    createResource3(arrivalTime, id);
    alert('hi');
  };
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
    if (user) {
      if (!user.is_technician) {
        router.push('./userHome'); // Redirect to the technician's home
      }
    }
    else {
      router.push('../');
    }
  }, [user, router]);
  if (user) {
    if (user.is_technician) {
      return (

        <div>
          <Header />
          <div className="gap-5 flex-c">
            {data1.map(order => (
              <div key={order.id} className="w-1/3 p-4 border">
                <img src={order.image} alt={order.description} className="w-full mb-2" />
                <h2 className="text-lg font-semibold">{order.description}</h2>
                <p>Technician Type: {order.technician_type}</p>
                {order.eta_arrival_time && <p>ETA Arrival Time: {order.eta_arrival_time}</p>}

                <form onSubmit={event => handleSubmit(event, order.id)}>
                  <input
                    type="datetime-local"
                    placeholder="Arrival Time"
                    className="w-full p-2 mt-2 border rounded-md"
                    name="eta_arrival_time"
                    required
                  />
                  <button className="px-4 py-2 mt-2 text-white bg-blue-500 rounded-md" type="submit">
                    Accept
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      );
    };
  }
}

export default TechHome;
