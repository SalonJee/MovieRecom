import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out!');
      navigate('/login'); // Navigate to login page after logout
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-primary/95 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-accent">
            MovieRec
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center ml-auto space-x-8">
            <Link to="/about" className="text-white hover:text-accent transition">
              About
            </Link>
            <Link to="/contact" className="text-white hover:text-accent transition">
              Contact
            </Link>
            {currentUser && (
              <span className="text-white">
                {currentUser.displayName} {/* Display name or email */}
              </span>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <button
            className="text-white " // Hide button on larger screens
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-secondary" // Hide on larger screens
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/about"
                className="block px-3 py-2 text-white hover:bg-accent rounded-md"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="block px-3 py-2 text-white hover:bg-accent rounded-md"
              >
                Contact
              </Link>
              <Link
                to="/settings"
                className="block px-3 py-2 text-white hover:bg-accent rounded-md"
              >
                Settings
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 text-white hover:bg-accent rounded-md"
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-3 py-2 text-white hover:bg-accent rounded-md"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
