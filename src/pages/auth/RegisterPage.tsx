import { motion } from "framer-motion";
import RegistrationForm from "./RegisterForm";

const RegisterPage = () => {
  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-4 bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="flex  w-full max-w-5xl shadow-2xl rounded-2xl overflow-hidden bg-gray-800/80 backdrop-blur-md"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Left Side: Logo with animated background */}
        <motion.div
          className="hidden lg:flex w-1/2 p-12 items-center justify-center 
                      bg-gradient-to-br from-green-300 to-teal-500 
                      relative overflow-hidden"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Soft moving wave animation */}
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 10% 50%, rgba(255,255,255,0.2) 1%, transparent 10%)",
              backgroundSize: "400px 400px",
            }}
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Logo */}
          <motion.div
            className="relative z-10 p-6  bg-white bg-opacity-10 rounded-xl 
                        transform scale-75 backdrop-blur-sm shadow-lg"
            initial={{ scale: 0.8, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotate: 2 }}
          >
            <img src="/mi_logo1.png" alt="Logo" className="w-72" />
          </motion.div>
        </motion.div>

        {/* Right Side: Registration Form */}
        <motion.div
          className="w-full lg:w-1/2 p-10 md:p-16 shadow-xl border border-gray-100 m-5 rounded-xl  
                      bg-gray-900 text-white flex flex-col justify-center"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        >
          {/* Heading Animation */}
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-6 text-center  text-green-400"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Create Your Account
          </motion.h2>



          {/* Form Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <RegistrationForm />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default RegisterPage;
