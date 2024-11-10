import LegalAI from '../assets/LegalAI.png'
import { useAuth0 } from "@auth0/auth0-react";

import { useState } from "react";

const Navbar = () => {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Toggle the menu on mobile view
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 w-full fixed top-0 left-0 z-50">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-semibold text-blue-600">
          <a href="/">Law_Link</a>
        </div>

        {/* Navbar Links (desktop view) */}
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-gray-700 hover:text-blue-600">
            Home
          </a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">
            About
          </a>
          <a href="/form" className="text-gray-700 hover:text-blue-600">
            Services
          </a>
          <a href="/contact" className="text-gray-700 hover:text-blue-600">
            Contact
          </a>
        </div>

        {/* Login Button */}
        <div className="hidden md:flex">
          <button
            onClick={() => loginWithRedirect()}
            className="inline-block rounded h-10 w-25 px-4 bg-blue-600 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
          >
            Log in / Sign Up
          </button>
          {isAuthenticated && (
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="inline-block rounded h-10 w-25 px-4 bg-red-600 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring"
            >
              Log Out
            </button>
          )}
        </div>

        {/* Hamburger Menu (Mobile view) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu (Conditional rendering) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 space-y-4">
          <a
            href="/"
            className="block text-black hover:text-blue-600 px-6 py-2"
          >
            Home
          </a>
          <a
            href="/about"
            className="block text-black hover:text-blue-600 px-6 py-2"
          >
            About
          </a>
          <a
            href="/form"
            className="block text-black hover:text-blue-600 px-6 py-2"
          >
            Services
          </a>
          <a
            href="/contact"
            className="block text-black hover:text-blue-600 px-6 py-2"
          >
            Contact
          </a>
          <a
            href="/login"
            className="block text-white bg-blue-600 px-6 mx-5 py-2 rounded-md hover:bg-blue-700 text-center"
          >
            Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;