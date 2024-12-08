import { motion } from 'framer-motion';

const MovieCard = ({ movie }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative rounded-lg overflow-hidden shadow-lg"
    >
      <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-[400px] object-cover"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent
                 flex flex-col justify-end p-4 text-white"
      >
        <h3 className="text-xl font-bold">{movie.title}</h3>
        <div className="flex items-center mt-2">
          <span className="text-yellow-400">★</span>
          <span className="ml-1">{movie.rating}</span>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MovieCard;