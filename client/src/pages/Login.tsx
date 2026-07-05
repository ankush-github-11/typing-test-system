import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import type { AxiosError } from "axios";
import { useTheme } from "../context/useTheme";
import { useTitle } from "../hooks/useTitle";
import { Link, useNavigate } from "react-router-dom";
import authImage from "../assets/images/AuthImage.svg";
import { useMe } from "../hooks/useMe";

const Login = () => {
  const { isDark } = useTheme();
  useTitle("Login");
  const navigate = useNavigate();
  const { data: user, isLoading } = useMe();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const { mutate, isPending, isError, error, isSuccess } = useLogin();
  
  if (!isLoading && user) {
    navigate("/");
    return null;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <div
      data-theme={isDark ? "dark" : ""}
      className="min-h-screen flex items-center justify-center bg-bgcolor text-textcolor font-poppins"
    >
      <div className="w-[1000px] h-[600px] bg-bgcolor/50 rounded-2xl shadow-lg flex overflow-hidden">

        {/* LEFT SIDE - FORM */}
        <div className="w-1/2 p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-textcolorless mb-8 text-sm">
            Test your typing speed and accuracy with EtherType.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Username"
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
              className="border-2 border-[#e3cdea] dark:border-[#5f4465] rounded-full px-5 py-3 outline-none focus:border-2 focus:border-violet-500"
              required
            />

            {/* <div className="flex justify-end text-sm text-gray-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div> */}

            <button
              type="submit"
              disabled={isPending}
              className="bg-color1 font-medium cursor-pointer text-white py-3 rounded-full hover:opacity-90 transition"
            >
              {isPending ? "Logging In..." : "Login"}
            </button>

            {isSuccess && (
              <p className="text-green-600 text-center text-sm">
                Login Successful
              </p>
            )}

            {isError && (
              <p className="text-red-600 text-center text-sm">
                {(error as AxiosError<{ message: string }>)?.response?.data
                  ?.message || "Login failed"}
              </p>
            )}
          </form>

          {/* SOCIAL LOGIN */}
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
            Not a member?{" "}
            <Link to="/signup" className="text-color1">
              Signup now
            </Link>
          </p>
        </div>

        {/* RIGHT SIDE - IMAGE */}
        <div className="w-1/2 bg-bgcolorless flex flex-col items-center justify-center relative p-10">
          <img
            height={300}
            width={300}
            src={authImage}
            alt="illustration"
            className="w-[300px] mb-6"
          />

          <p className="text-textcolorless text-center text-lg font-medium">
            Increase your WPM
            <br />
            with <span className="font-bold">EtherType</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;