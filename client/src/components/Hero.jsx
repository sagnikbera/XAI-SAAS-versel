import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Hero = () => {
    const navigate = useNavigate();

  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-cover bg-no-repeat min-h-screen"
      style={{ backgroundImage: `url(${assets.gradientBackground})` }}
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold x-auto leading-[1.2]">
          Create amazing content <br /> with{" "}
          <span className="text-[var(--pmcol)]">AI</span> tools
        </h1>
        <p className="mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-gray-600">
          Transform you workflow with{" "}
          <span className="font-semibold">AI tools</span>,{" "}
          <span className="font-semibold">Write Articles</span> ,{" "}
          <span className="font-semibold">Generate Images</span>,{" "}
          <span className="font-semibold">Remove Background</span> ,{" "}
          <span className="font-semibold">Remove Object</span> etc.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
        onClick={() => navigate('/ai')}
        className="bg-[var(--pmcol)] font-semibold text-black px-10 py-3 rounded-lg hover:bg-black hover:text-[var(--pmcol)] hover:scale-102 active:scale-95 transition cursor-pointer"
        >Start Creating Now</button>
        <a href="https://www.youtube.com/watch?v=K93tzq4WQoE" target="_blank" rel="noopener noreferrer">
        <button
        className="bg-white px-10 font-semibold py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor-pointer hover:text-white hover:bg-black"
        >Watch Demo</button>
        </a>
      </div>
      <div className="flex items-center gap-4 mt-8 mx-auto text-gray-600">
        <img src={assets.user_group} alt="" className="h-8"/> Trasted by many people.
      </div>
    </div>
  );
};

export default Hero;
