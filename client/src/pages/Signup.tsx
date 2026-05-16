import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import type { AxiosError } from "axios";
const Signup = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-[400px] flex flex-col gap-4"
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
          className="bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
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
