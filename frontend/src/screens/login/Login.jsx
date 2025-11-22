import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading('Logging in...');
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, formData);
      toast.dismiss(loadingToast);
      toast.success(response.data.message);
      Cookies.set('token', response.data.token);
      localStorage.setItem('userName', response.data.name);
      navigate('/dashboard');
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error.response?.data?.message || 'An unexpected error occurred.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-[90%] max-w-sm sm:max-w-md p-8 space-y-6 bg-white/30 backdrop-blur-lg rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">Login</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 mt-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full px-3 py-2 mt-1 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-black transition duration-300"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium cursor-pointer text-white bg-black border border-transparent rounded-md shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition duration-300"
            >
              Login
            </button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign Up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
