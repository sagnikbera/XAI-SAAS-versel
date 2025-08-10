import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div>
      <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-20">
        <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-gray-500/30 pb-6">
          <div className="md:max-w-96">
            <img className="h-9" src={assets.logo} alt="logo" />
            <p className="mt-6 text-sm">
              Experience the power of AI with XAI. <br />
              Transform your content creation with our suite of premium AI
              tools. Write articles, generate images, and enhance your workflow.{" "}
              <br />
              <span className="flex items-center flex-wrap gap-2 font-semibold text-lg mt-4">
                Made with ❤️ by
                <a
                  href="https://www.linkedin.com/in/sagnik-bera/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-blue-700 hover:text-blue-500 transition-colors duration-300"
                >
                  Sagnik
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-linkedin-icon lucide-linkedin bg-blue-300 rounded-md p-1"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect width="4" height="12" x="2" y="9" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </span>
            </p>
          </div>
          <div className="flex-1 flex items-start md:justify-end gap-20">
            <div>
              <h2 className="font-semibold mb-5 text-gray-800">XAI</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About us</a>
                </li>
                <li>
                  <a href="#">Contact us</a>
                </li>
                <li>
                  <a href="#">Privacy policy</a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 mb-5">
                Subscribe to our newsletter
              </h2>
              <div className="text-sm space-y-2">
                <p>Stay Updated With Us.</p>
                <div className="flex items-center gap-2 pt-4">
                  <input
                    className="border border-gray-500/30 placeholder-gray-500 focus:ring-2 ring-indigo-600 outline-none w-full max-w-64 h-9 rounded px-2 shadow-xl"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <button className="bg-[var(--pmcol)] w-24 h-9 text-black font-semibold rounded cursor-pointer hover:bg-black hover:text-[var(--pmcol)]">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="pt-4 text-center text-xs md:text-sm pb-5">
          Copyright 2025 © <a href="https://prebuiltui.com">XAI</a>. All Right
          Reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
