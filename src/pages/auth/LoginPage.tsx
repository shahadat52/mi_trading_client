import { motion } from "framer-motion";
import LoginForm from "./LoginForm";



const LoginPage = () => {


    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-800 via-gray-800 to-gray-900 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md p-8 bg-gray-900 rounded-2xl shadow-xl border border-gray-100"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-2xl font-semibold text-center text-gray-100 mb-6"
                >
                    Welcome Back 👋
                </motion.h2>

                <motion.h2
                    className="text-3xl md:text-4xl font-bold mb-6 text-center text-green-400"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                >
                    Sign In
                </motion.h2>

                {/* Form Animation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.6 }}
                >
                    <LoginForm />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center text-sm text-gray-600 mt-5"
                >
                    Don’t have an account?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Sign Up
                    </a>
                </motion.p>
            </motion.div>
        </div>
    );
};

export default LoginPage;
