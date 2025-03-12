// src/components/Header.tsx
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-white text-center">
          TaskMaster
        </h1>
        <p className="text-white text-center mt-2 opacity-90">
          Organize your life, one task at a time
        </p>
      </div>
    </header>
  );
};

export default Header;