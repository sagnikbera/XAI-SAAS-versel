import { ImagePlay, Images, Sparkle } from "lucide-react";
import React, { useState } from "react";
//for back
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

// backend url
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const GenerateImg = () => {
  const imageStyle = [
    "Realistic",
    "Ghibli style",
    "Anime style",
    "Cartoon style",
    "Fantasy style",
    "Realistic style",
    "3D style",
    "Portrait style",
  ];

  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);

  // back start
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const prompt = `Generate an Image of ${input} in the style ${selectedStyle}`;

      const { data } = await axios.post(
        "/api/ai/generate-image",
        { prompt, publish },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col  */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <Sparkle className="w-6 text-[#166534]" />
          <h1 className="text-xl font-semibold">AI Image Generator</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Describe Your Image</p>

        <textarea
          onChange={(e) => setInput(e.target.value)}
          value={input}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Describe what you want to see in the image...."
          required
        />

        <p className="mt-4 text-sm font-medium">Style</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {imageStyle.map((item) => (
            <span
              onClick={() => setSelectedStyle(item)}
              key={item}
              className={`text-xs cursor-pointer rounded-full p-1 px-2 ${
                selectedStyle === item
                  ? "bg-[#bef264] border border-[#4d7c0f] text-[#365314] font-medium"
                  : "text-gray-500 border border-gray-300"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
        {/* Toogle Button  */}
        <div className="my-6 flex items-center gap-2">
          <label className="relative cursor-pointer">
            <input
              type="checkbox"
              onChange={(e) => setPublish(e.target.checked)}
              checked={publish}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-[#d9f99d] rounded-full peer-checked:bg-[#4d7c0f] transition border border-[#65a30d]"></div>
            <span className="absolute left-1 top-1 w-3 h-3 bg-[#4d7c0f] rounded-full transition peer-checked:bg-white peer-checked:translate-x-4 "></span>
          </label>
          <p className="text-sm">Make this Image public.</p>
        </div>

        <br />

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-l to-[#1a2e05] from-[#65a30d] text-white px-4 py-2 mt-2 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <ImagePlay className="w-5" />
          )}
          Generate Image
        </button>
      </form>
      {/* right col  */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-300 min-h-96 shadow-2xl">
        <div className="lex items-center gap-3">
          <ImagePlay className="w-5 h-5 text-[#166534]" />
          <h1 className="text-xl font-semibold">Generated Image</h1>
        </div>

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-[#a3e635]">
              <Images className="w-12 h-12" />
              <p className="font-medium text-sm">
                Enter a topic and click "Generate Image" to get started...
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full mt-3">
            <img
              src={content}
              alt="generated-image"
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateImg;
