import React from 'react';
import { useNavigate } from "react-router-dom";
import { Pencil, FileText, Code, Users, Video } from 'lucide-react';
import { motion } from 'framer-motion';

const App = () => {
  const navigate = useNavigate();

  const handleSignInClick = () => navigate("/sign-in/");
  const handleSignUpClick = () => navigate("/sign-up/");

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 text-white min-h-screen flex flex-col justify-between">
      <motion.header 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-6 flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-500">
          UniSync
        </h1>
        <div className="flex space-x-4">
          <Button onClick={handleSignInClick} small>Sign In</Button>
          <Button onClick={handleSignUpClick} primary small>Sign Up</Button>
        </div>
      </motion.header>

      <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl sm:text-5xl font-extrabold text-center mb-8"
        >
          Collaborate in Real-Time
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-xl sm:text-2xl text-center mb-12 max-w-3xl"
        >
          A place to meet, draw, write, code, and collaborate - all in one stop.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-12"
        >
          <Feature icon={<Pencil size={24} />} title="Draw Together" />
          <Feature icon={<FileText size={24} />} title="Create Docs" />
          <Feature icon={<Code size={24} />} title="Solve Coding Problems" />
          {/* <Feature icon={<Users size={24} />} title="Team Collaboration" />
          <Feature icon={<Video size={24} />} title="Live Video Chat" /> */}
        </motion.div>
      </main>

      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="p-6 text-center text-gray-400"
      >
        © 2024 UniSync. All rights reserved.
      </motion.footer>
    </div>
  );
};

const Feature = ({ icon, title }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="flex flex-col items-center text-center"
  >
    <motion.div 
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-yellow-400 to-red-500 p-3 rounded-full mb-4"
    >
      {icon}
    </motion.div>
    <h3 className="text-lg font-semibold">{title}</h3>
  </motion.div>
);

const Button = ({ children, onClick, primary, small }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`
      ${small ? 'px-4 py-2 text-sm' : 'px-6 py-3'} 
      rounded-full font-semibold transition duration-300 ease-in-out 
      ${primary
        ? "bg-gradient-to-r from-yellow-400 to-red-500 text-white"
        : "bg-white text-gray-900"
      }
    `}
  >
    {children}
  </motion.button>
);

export default App;