import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-200">
      <Header />
      <main className="pt-16 md:pt-20">
        <Outlet /> {/* 👈 renders the active child route */}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
