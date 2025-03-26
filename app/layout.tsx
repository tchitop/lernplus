'use client';
import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState('student');
 
  // Simulate auth check
  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in (e.g. from localStorage, cookies, etc.)
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loggedIn);
     
      // Get user role
      const role = localStorage.getItem('userRole') || 'student';
      setUserRole(role);
    };
   
    checkAuth();
  }, []);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="de">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex flex-grow relative">
            {isLoggedIn && (
              <Sidebar
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
                userRole={userRole}
              />
            )}
            <div className={`
              flex flex-col flex-grow transition-all duration-300
              ${isLoggedIn && isSidebarOpen ? 'md:ml-64' : 'md:ml-0'}
            `}>
              <main className="flex-grow">
                <div className="container mx-auto px-4 py-8">
                  {children}
                </div>
              </main>
              <Footer />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}