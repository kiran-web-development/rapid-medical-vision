
import React from 'react';
import Navbar from '@/components/Navbar';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="font-semibold">Email</h2>
              <p className="text-gray-600">support@aihealth.com</p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="font-semibold">Phone</h2>
              <p className="text-gray-600">(555) 123-4567</p>
            </div>
            <div className="text-center">
              <MapPin className="w-12 h-12 mx-auto text-primary mb-4" />
              <h2 className="font-semibold">Address</h2>
              <p className="text-gray-600">123 AI Street, Tech City</p>
            </div>
          </div>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input 
                type="text" 
                id="name" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input 
                type="email" 
                id="email" 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea 
                id="message" 
                rows={4} 
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                placeholder="Your message..."
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
