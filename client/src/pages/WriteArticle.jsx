import { Edit, FilePenLine, Sparkle } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Sort (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setContent(""); // clear old content while loading
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        { prompt, length: selectedLength.length },
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
      {/* left col */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <Sparkle className="w-6 text-[#ca8a04]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Article Topic</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="Write the topic here...."
          required
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span
              onClick={() => setSelectedLength(item)}
              key={index}
              className={`text-xs cursor-pointer rounded-full p-1 px-2 ${
                selectedLength.text === item.text
                  ? "bg-[#fef08a] border border-[#854d0e] text-[#78350f] font-medium"
                  : "text-gray-500 border border-gray-300"
              }`}
            >
              {item.text}
            </span>
          ))}
        </div>
        <br />
        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-l to-[#451a03] from-[#facc15] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Edit className="w-5" />
          )}
          Generate Article
        </button>
      </form>

      {/* right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[700px] shadow-2xl">
        <div className="flex items-center gap-3">
          <Edit className="w-5 h-5 text-[#ca8a04]" />
          <h1 className="text-xl font-semibold">Generated article</h1>
        </div>

        {/* Skeleton loader */}
        {loading ? (
          // ✅ Structured skeleton loader
          <div className="mt-4 space-y-4 animate-pulse">
            {/* Big Heading */}
            <div className="h-6 bg-gray-200 rounded w-5/6"></div>

            {/* Subheading */}
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>

            {/* Paragraph lines */}
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              <div className="h-3 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        ) : !content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-[#facc15]">
              <FilePenLine className="w-12 h-12" />
              <p className="font-medium text-sm">
                Enter a topic and click "Generate Article" to get started...
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-slate-600">
            <Markdown className="reset-tw">{content}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriteArticle;
