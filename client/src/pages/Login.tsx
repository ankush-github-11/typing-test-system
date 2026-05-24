import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import type { AxiosError } from "axios";
import { useTheme } from '../context/useTheme';
import { useTitle } from "../hooks/useTitle";

const Login = () => {
  const { isDark } = useTheme();
  useTitle("Settings");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, isError, error, isSuccess } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    mutate({
      email,
      password,
    });
  };

  return (
    <div data-theme={isDark ? 'dark' : ''} className="font-poppins min-h-screen flex items-center justify-center bg-bgcolor text-textcolor">
      <form
        onSubmit={handleSubmit}
        className="bg-bgcolorless text-textcolor p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-3 rounded-lg outline-none"
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-3 rounded-lg outline-none"
          required
        />

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white py-3 rounded-lg hover:opacity-90 transition cursor-pointer"
        >
          {isPending ? "Logging In..." : "Login"}
        </button>

        {isSuccess && (
          <p className="text-green-600 text-center">
            Login Successful
          </p>
        )}

        {isError && (
          <p className="text-red-600 text-center">
            {(error as AxiosError<{ message: string }>)?.response?.data
              ?.message || "Login failed"}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;