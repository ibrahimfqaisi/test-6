import useResource from '@/Hooks/useResource';
import { useRouter } from 'next/router';

export default function TechRegForm() {
  const { createResource2 } = useResource();
  const router = useRouter();

  const handleRegisterSubmit = async (event) => {
    event.preventDefault();
    const newCustomer = {
      username: event.target.username.value,
      email: event.target.email.value,
      password: event.target.password.value,
      password2: event.target.password2.value,
    };

    try {
      await createResource2(newCustomer);
      router.push('/LoginPage');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleRegisterSubmit} className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <label className="block mb-2 text-black">
        Username:
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          required
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <label className="block mb-2 text-black">
        Email:
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <label className="block mb-2 text-black">
        Password:
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          required
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <label className="block mb-2 text-black">
        Confirm Password:
        <input
          type="password"
          name="password2"
          placeholder="Confirm your password"
          required
          className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </label>
      <button
        type="submit"
        className="w-full p-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        Register
      </button>
    </form>
  );
}
