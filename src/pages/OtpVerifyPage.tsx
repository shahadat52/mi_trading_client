/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { useNavigate, useParams } from "react-router";
import { useOtpVerifyMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
import type { TRES } from "../interfaces/apiResponse";
import Loading from "../components/Loading";

const OtpVerification: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
    const [timer, setTimer] = useState(300); // 5 মিনিট = 300 সেকেন্ড
    const [resendActive, setResendActive] = useState(false);
    const path = useParams();
    const [verifyOtp] = useOtpVerifyMutation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Countdown timer
    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => setTimer(prev => prev - 1), 1000);
            return () => clearInterval(countdown);
        } else {
            setResendActive(true);
        }
    }, [timer]);

    // OTP input handle
    const handleChange = (value: string, index: number) => {
        if (/^[0-9]?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto focus next input
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (value && nextInput) (nextInput as HTMLInputElement).focus();
        }
    };

    const handleResend = () => {
        navigate("/login");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const sendOtp = otp.join("");
        const res: TRES | any = await verifyOtp({ otp: sendOtp, phone: path.id });

        if (res?.data?.success) {
            const token = res?.data?.data?.accessToken;
            const user = jwtDecode(token);
            if (token) {
                dispatch(setUser({ user, token }));
                setLoading(false);
                navigate("/");
            }
        }
        if (res?.error) {
            setLoading(false);
            alert(`${res?.error?.data?.message}`);
        }
    };

    // Timer কে mm:ss ফরম্যাটে দেখানো
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md text-center"
            >
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-indigo-100 rounded-full">
                        <FiMail className="text-indigo-600 text-3xl" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">OTP Verification</h2>
                <p className="text-gray-500 mb-6 text-sm">
                    We’ve sent a 6-digit verification code to your email.
                </p>

                <div className="flex justify-center gap-3 mb-6">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            id={`otp-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleChange(e.target.value, index)}
                            className="w-8 h-8 text-center border border-gray-300 rounded-xl text-lg font-semibold text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        />
                    ))}
                </div>

                <button
                    onClick={handleSubmit}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-xl transition shadow-md"
                >
                    {loading ? <Loading></Loading> : "Verify OTP"}
                </button>

                <div className="mt-6 text-sm text-gray-500">
                    {resendActive ? (
                        <button
                            onClick={handleResend}
                            className="text-indigo-600 font-semibold hover:underline"
                        >
                            Resend Code
                        </button>
                    ) : (
                        <p>
                            Resend available in{" "}
                            <span className="font-medium text-indigo-600">{formatTime(timer)}</span>
                        </p>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default OtpVerification;
