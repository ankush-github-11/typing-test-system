import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import type { AxiosError } from "axios";
import { useTheme } from '../context/useTheme';
import { useTitle } from "../hooks/useTitle";

const Signup = () => {
  const { isDark } = useTheme();
  useTitle("Settings");
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
    <div data-theme={isDark ? 'dark' : ''} className="font-poppins bg-bgcolor text-textcolor min-h-screen flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-bgcolorless text-textcolor p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center">Signup</h1>

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
          {isPending ? "Signing Up..." : "Signup"}
        </button>

        {isSuccess && (
          <p className="text-green-600 text-center">Signup Successful</p>
        )}

        {isError && (
          <p className="text-red-600 text-center">
            {(error as AxiosError<{ message: string }>)?.response?.data
              ?.message || "Signup failed"}
          </p>
        )}
      </form>
    </div>
  );
};

export default Signup;
