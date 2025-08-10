import { Eraser, ImageUpIcon, Sparkle } from "lucide-react";
import React, { useState } from "react";

const RemoveBg = () => {
  const [input, setInput] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col  */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <Sparkle className="w-6 text-[#7e22ce]" />
          <h1 className="text-xl font-semibold">Backgrund Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload image</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />
        <p className="text-sm text-gray-500 font-light mt-1">Supports JPG, PNG and other image formats.</p>
        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-l to-[#3b0764] from-[#9333ea] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Eraser className="w-5" />
          Remove Background
        </button>
      </form>
      {/* right col  */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-300 min-h-96 shadow-2xl">
        <div className="lex items-center gap-3">
          <Eraser className="w-5 h-5 text-[#7e22ce]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-[#d8b4fe]">
            <ImageUpIcon className="w-12 h-12" />
            <p className="font-medium text-sm">
              Upload the file and click "Remove Background" to get started...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoveBg;
