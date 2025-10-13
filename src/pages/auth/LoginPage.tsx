import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { useState } from "react";

type LoginFormInputs = {
    email: string;
    password: string;
};

const LoginPage = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (data: LoginFormInputs) => {
        setLoading(true);
        setTimeout(() => {
            console.log("Login data:", data);
            setLoading(false);
            alert("Logged in successfully!");
        }, 1500);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-md p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
            >
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-2xl font-semibold text-center text-gray-800 mb-6"
                >
                    Welcome Back 👋
                </motion.h2>

                <motion.form
                    onSubmit={handleSubmit(onSubmit)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="space-y-5"
                >
                    {/* Email */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Email
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Enter a valid email address",
                                },
                            })}
                            placeholder="you@example.com"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.email
                                ? "border-red-500 focus:ring-red-300"
                                : "border-gray-300 focus:ring-blue-300"
                                }`}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block mb-1 text-gray-700 font-medium">
                            Password
                        </label>
                        <motion.input
                            whileFocus={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            })}
                            placeholder="••••••••"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.password
                                ? "border-red-500 focus:ring-red-300"
                                : "border-gray-300 focus:ring-blue-300"
                                }`}
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500 mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Remember Me + Forgot */}
                    <div className="flex items-center justify-between text-sm text-gray-600">
                        <label className="flex items-center gap-2">
                            <input type="checkbox" className="accent-blue-600" />
                            Remember me
                        </label>
                        <button type="button" className="hover:text-blue-600 transition">
                            Forgot password?
                        </button>
                    </div>

                    {/* Submit Button */}
                    <motion.button
                        type="submit"
                        disabled={loading}
                        whileHover={{ scale: loading ? 1 : 1.03 }}
                        whileTap={{ scale: loading ? 1 : 0.98 }}
                        transition={{ duration: 0.15 }}
                        className={`w-full py-2 mt-2 font-semibold rounded-lg text-white transition-colors duration-300 ${loading
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                            }`}
                    >
                        {loading ? "Signing in..." : "Sign In"}
                    </motion.button>


                </motion.form>

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
