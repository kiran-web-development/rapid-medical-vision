
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // In a real application, this would handle logout logic
    // For now, we'll just redirect to the home page after a delay
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <Navbar />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4">Logging Out</h1>
          <p className="mb-4">You have been successfully logged out.</p>
          <p className="text-gray-600">Redirecting to home page...</p>
        </div>
      </div>
    </div>
  );
};

export default Logout;
