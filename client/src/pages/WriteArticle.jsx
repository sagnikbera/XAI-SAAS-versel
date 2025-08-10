import { Edit, FilePenLine, Sparkle } from "lucide-react";
import React, { useState } from "react";

const WriteArticle = () => {
  const articleLength = [
    {
      length: 800,
      text: "Sort (500-800 words)",
    },
    {
      length: 1200,
      text: "Medium (800-1200 words)",
    },
    {
      length: 1600,
      text: "Long (1200+ words)",
    },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
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
        <button className="w-full flex justify-center items-center gap-2 bg-gradient-to-l to-[#451a03] from-[#facc15] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer">
          <Edit className="w-5" />
          Generate Article
        </button>
      </form>
      {/* right col  */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-300 min-h-96 max-h-[600px] shadow-2xl">
        <div className="lex items-center gap-3">
          <Edit className="w-5 h-5 text-[#ca8a04]" />
          <h1 className="text-xl font-semibold">Generated article</h1>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="text-sm flex flex-col items-center gap-5 text-[#facc15]">
            <FilePenLine className="w-12 h-12" />
            <p className="font-medium text-sm">
              Enter a topic and click "Generate Article" to get started...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WriteArticle;
