import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await signup(email, password, name);

      // Show success toast
      toast.success(
        <div className="flex items-center">
          <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
          Signed up successfully, login to continue.
        </div>,
        {
          position: 'top-center',
          style: {
            backgroundColor: '#4CAF50', // Green background
            color: '#ffffff',
            fontWeight: 'bold',
          },
        }
      );

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">Create an Account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder:text-gray-300 border-2 border-transparent focus:border-accent outline-none transition"
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder:text-gray-300 border-2 border-transparent focus:border-accent outline-none transition"
              disabled={loading}
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder:text-gray-300 border-2 border-transparent focus:border-accent outline-none transition"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Already have an account?{' '}
          <Link to="/login" className="text-accent hover:text-accent-hover">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
