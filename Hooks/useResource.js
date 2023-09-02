import { useAuth } from "@/context/auth"
import useSWR from 'swr'

export default function useResource(urll) {
  const urlenv = process.env.NEXT_PUBLIC_URL
  
  const { token } = useAuth();
  const { data, error, mutate } = useSWR([urll, token], fetchResource);

  function config() {
      return {
          headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token
          },
      };
  }

  async function fetchResource(cacheKey) {
      const [url, access] = cacheKey;
      if (!access) {
          return;
      }
      try {
          const response = await fetch(url, config());
          const jsonResponse = await response.json();
          return jsonResponse;
      } catch (error) {
          console.error('Error fetching resource:', error);
          throw error;
      }
  }

  async function updateResource(id, updatedData) {
    const urlUpdate = urlenv + "/updateorder/";
    const updateUrl = `${urlUpdate}${id}/`;
    if (!token) {
      return;
    }
    try {
      const options = config();
      options.method = "PUT";
      // const response = await axios.put(updateUrl, updatedData, config);
      options.body= JSON.stringify(updatedData)
      await fetch(updateUrl,options); // Optionally return the updated data or response
      mutate();
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  }   

  async function updaterating(id) {
    const urlUpdate = urlenv + `/api/customer/ordersdone/${id}/`;
    if (!token) {
      return;
    }
    try {
      const options = config();
      options.method = "PUT";
      await fetch(urlUpdate,options); 
      mutate();
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  } 
  
  
  async function updaterating2(id,feedback, rating) {
    const urlUpdate = urlenv + `/api/customer/feedback/${id}/`;

    if (!token) {
      return;
    }
    try {
      const options = config();
      options.method = "PUT";
      options.body = JSON.stringify({
        feedback: feedback,
        rating: rating,
      });
      await fetch(urlUpdate,options); 
      mutate();
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  } 

    function config1() {
      return {
          headers: {
              "Content-Type": "application/json",
              
          },


      }
  }
  async function deleteResource(id) {
    const urldelete = urlenv+"/api/customer/deletorders/";
    const deleteUrl = urldelete + id;
    if (!token) {
      return;
    }
    try {
      const options = config();
      options.method = "DELETE";
      await fetch(deleteUrl, options);
      mutate();
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error; // Propagate the error for further handling
    }
  }

    async function createResource1(newTechnician) {
        const urlpost = urlenv+'/api/technician/signup/';
        try {
          const options = config1();
          options.method = 'POST';
          options.body = JSON.stringify(newTechnician);
          const response = await fetch(urlpost, options);
          console.log(response.status)
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      

        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }

      async function createResource2(newTechnician) {
        const urlpost = urlenv+'/api/customer/signup/';
        try {
          const options = config1();
          options.method = 'POST';
          options.body = JSON.stringify(newTechnician);
          const response = await fetch(urlpost, options);
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      
          // You can handle success here if needed
        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }

      async function createResource3(arrivalTime,order_id) {
        const urlpost = urlenv+`/acceptorder/${order_id}/`;
        try {
          const options = config();
          options.method = 'POST';
          options.body = JSON.stringify(arrivalTime);
          const response = await fetch(urlpost, options);
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      
          // You can handle success here if needed
        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }
      async function createResource5(arrivalTime,order_id) {
        const urlpost = urlenv+`/acceptorder/${order_id}/`;
        try {
          const options = config();
          options.method = 'POST';
          options.body = JSON.stringify(arrivalTime);
          const response = await fetch(urlpost, options);
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      
          // You can handle success here if needed
        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }

      async function createResource4(message,order_id) {
        const urlpost = urlenv+`/api/orders/comment/${order_id}/`;
        try {
          const options = config();
          options.method = 'POST';
          options.body = JSON.stringify(message);
          const response = await fetch(urlpost, options);
      
          if (!response.ok) {
            const responseBody = await response.text();
            console.error('Failed to register technician. Server response:', responseBody);
            throw new Error('Failed to register technician');
          }
      
          // You can handle success here if needed
        } catch (error) {
          console.error('Error creating resource:', error);
          throw error;
        }
      }

      // async function createResource4(message,order_id) {
      //   const urlpost = urlenv+`/api/orders/comment/${order_id}/`;
      //   try {
      //     const options = config();
      //     options.method = 'POST';
      //     options.body = JSON.stringify(message);
      //     const response = await fetch(urlpost, options);
      
      //     if (!response.ok) {
      //       const responseBody = await response.text();
      //       console.error('Failed to register technician. Server response:', responseBody);
      //       throw new Error('Failed to register technician');
      //     }
      
      //     // You can handle success here if needed
      //   } catch (error) {
      //     console.error('Error creating resource:', error);
      //     throw error;
      //   }
      // }

    async function errorHandler(err) {
        console.error(err)
        if (err) {
          console.log(err)
          }
          logout()
        }

    return {
        response : data || [],
        deleteResource,
        createResource1,
        createResource2,
        createResource3,
        createResource4,
        updateResource,
        updaterating,
        updaterating2,
        createResource5

    }
}