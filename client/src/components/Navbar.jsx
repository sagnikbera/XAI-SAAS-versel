import React from "react";
import { FaInfinity, FaAt } from "react-icons/fa";
import { assets } from "./../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-2 px-4 sm:px-16 xl:px-28">
      <img
        src={assets.logo}
        alt="logo"
        className="w-28 sm:w-36 cursor-progress"
        onClick={() => navigate("/")}
      />

      <button
        className="flex items-center gap-2 rounded-full text-lg cursor-pointer 
             bg-[var(--pmcol)] text-black px-8 py-2
             font-semibold transition-colors duration-300
             hover:bg-black hover:text-[var(--pmcol)]"
      >
        <span>Get Started</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Navbar;
