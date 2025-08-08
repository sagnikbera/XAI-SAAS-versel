import React from "react";
import { FaInfinity, FaAt } from "react-icons/fa";
import { assets } from "./../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-4 px-4 sm:px-16 xl:px-28">
      <img
        src={assets.logo}
        alt="logo"
        className="w-20 sm:w-28 cursor-progress"
        onClick={() => navigate("/")}
      />

      {user ? (
        <span className="scale-200 origin-center m-2 mt-2 px-2"><UserButton/></span>
      ) : (
        <button
          onClick={openSignIn}
          className="flex items-center gap-2 rounded-full text-lg cursor-pointer 
             bg-[var(--pmcol)] text-black px-8 py-2
             font-semibold transition-colors duration-300
             hover:bg-black hover:text-[var(--pmcol)]"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
