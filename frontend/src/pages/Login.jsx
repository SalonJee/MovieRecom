import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      await login(formData.email, formData.password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-secondary">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-lg shadow-xl"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder:text-gray-300
                       border-2 border-transparent focus:border-accent outline-none transition"
              disabled={loading}
            />
          </div>
          
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-3 bg-white/20 rounded-lg text-white placeholder:text-gray-300
                       border-2 border-transparent focus:border-accent outline-none transition"
              disabled={loading}
            />
          </div>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.02 }}
            whileTap={{ scale: loading ? 1 : 0.98 }}
            className="w-full py-3 bg-accent hover:bg-accent-hover text-white rounded-lg
                     font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            type="submit"
            disabled={loading}
          >
            {loading ? <LoadingSpinner /> : 'Sign In'}
          </motion.button>
        </form>

        <p className="mt-6 text-center text-gray-300">
          Don't have an account?{' '}
          <Link to="/signup" className="text-accent hover:text-accent-hover">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Login;