import React from "react";

export default function log({ goto }) {
  return (
    <div>
      <form className="bg-gray-200 w-full max-w-md md:max-w-2xl px-6 sm:px-10 py-10 rounded-lg shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-center">Sign In</h1>
        <h3 className="text-center text-gray-500">
          Use your email and password to sign in
        </h3>
        <input
          className="w-full p-3 border rounded"
          type="email"
          name="email"
          placeholder="Enter Your Email"
        />
        <input
          className="w-full p-3 border rounded"
          type="password"
          name="password"
          placeholder="Enter Your Password"
        />
        <h5 className="text-red-500 text-left cursor-pointer hover:underline text-sm">
          Forgot Password?
        </h5>
        <button className="w-full py-2 rounded bg-red-800 text-white transition">
          LOGIN
        </button>
        <p className="text-center text-sm sm:text-base">
          Don't have an account?{" "}
          <span
            className="text-blue-500 cursor-pointer hover:underline"
            onClick={goto}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  );
}
