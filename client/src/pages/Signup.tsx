import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import type { AxiosError } from "axios";
import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";
import authImage from "../assets/images/AuthImage.svg";
import { Link } from "react-router-dom";

const Signup = () => {
  const { isDark } = useTheme();
  useTitle("Signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError, error, isSuccess } = useSignup();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      email,
      password,
    });
  };

  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="min-h-screen flex items-center justify-center bg-bgcolor text-textcolor font-poppins"
    >
      <div className="w-[1000px] h-[600px] bg-bgcolor/50 rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT SIDE - IMAGE */}
        <div className="w-1/2 bg-bgcolorless flex flex-col items-center justify-center relative p-10">
          <img
            src={authImage}
            alt="illustration"
            className="w-[300px] mb-6"
          />

          <p className="text-textcolorless text-center text-lg font-medium">
            Join EtherType and
            <br />
            improve your <span className="font-bold">typing speed</span>
          </p>
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-textcolorless mb-8 text-sm">
            Sign up to start improving your typing skills.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-2 border-[#e3cdea] dark:border-[#5f4465] rounded-full px-5 py-3 outline-none"
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-2 border-[#e3cdea] dark:border-[#5f4465] rounded-full px-5 py-3 outline-none"
              required
            />

            <button
              type="submit"
              disabled={isPending}
              className="bg-color1 font-medium cursor-pointer text-white py-3 rounded-full hover:opacity-90 transition"
            >
              {isPending ? "Signing Up..." : "Signup"}
            </button>

            {isSuccess && (
              <p className="text-green-600 text-center text-sm">
                Signup Successful
              </p>
            )}

            {isError && (
              <p className="text-red-600 text-center text-sm">
                {(error as AxiosError<{ message: string }>)?.response?.data
                  ?.message || "Signup failed"}
              </p>
            )}
          </form>
          <div className="mt-6">
              <div className="flex items-center gap-3">
                <div className="h-px bg-gray flex-1" />
                <p className="text-xs text-textcolorless">or continue with</p>
                <div className="h-px bg-gray flex-1" />
              </div>
  
              <div className="flex justify-center gap-4 mt-4">
                <button className="w-10 h-10 rounded-full border border-gray flex items-center justify-center">
                  G
                </button>
                <button className="w-10 h-10 rounded-full border border-gray flex items-center justify-center">
                  A
                </button>
                <button className="w-10 h-10 rounded-full border border-gray flex items-center justify-center">
                  F
                </button>
              </div>
            </div>
  
            <p className="text-sm text-center mt-6">
              Already have an account?{" "}
              <Link to="/login" className="text-color1">
                Login now
              </Link>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;