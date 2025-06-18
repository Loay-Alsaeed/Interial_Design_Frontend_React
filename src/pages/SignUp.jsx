import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MdOutlineMailOutline } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { FaUserEdit, FaPhoneAlt } from "react-icons/fa";
import axios from 'axios';


export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
 
  
  
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    // Check if baseURL is defined
    if (!baseURL) {
      console.error('REACT_APP_BASE_URL is not defined');
      return;
    } else {
      console.log('Base URL:', baseURL);
    }

    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Validate inputs
    console.log('Registering with:', { name, email, phone, password });
    

    try {
      const response = await axios.post(`${baseURL}/api/auth/register`, {
        name,
        email,
        phone,
        password
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201 || response.data.token) {
        console.log('Registration successful:', response.data);
        navigate('/login'); // Redirect to login page after successful registration
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
      navigate('/'); 
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 w-full">
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Create an account</h2>
            <p className="mt-2 text-gray-600">Join our community of interior design enthusiasts</p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <div className="mt-1 relative">
                <FaUserEdit className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
              <div className="mt-1 relative">
                <MdOutlineMailOutline className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="mt-1 relative">
                <FaPhoneAlt className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="(+20) 123 456 7890"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 relative">
                <TbLockPassword className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 focus:outline-none focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
