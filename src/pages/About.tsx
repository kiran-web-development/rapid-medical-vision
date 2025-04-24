
import React from 'react';
import Navbar from '@/components/Navbar';
import { Shield, FileSearch, Database } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">About Our Data & Privacy</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-semibold">Data Security</h2>
            </div>
            <p className="text-gray-600">
              Your medical images are encrypted and securely processed. We maintain strict
              privacy standards and ensure your data is protected at all times.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <FileSearch className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-semibold">Analysis Process</h2>
            </div>
            <p className="text-gray-600">
              Our AI system analyzes medical images using advanced machine learning
              algorithms, providing quick and accurate preliminary assessments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-8 h-8 text-primary" />
              <h2 className="text-xl font-semibold">Data Management</h2>
            </div>
            <p className="text-gray-600">
              Images are temporarily processed and not permanently stored. You maintain
              full control over your data, with the ability to delete it at any time.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
          <p className="text-gray-600 leading-relaxed">
            We are committed to maintaining the highest standards of data privacy and security.
            Our platform is designed with privacy-first principles, ensuring that your medical
            information is handled with the utmost care and confidentiality. We comply with
            healthcare data protection regulations and regularly update our security measures
            to protect your information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
