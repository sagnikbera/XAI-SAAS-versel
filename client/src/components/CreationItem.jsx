import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="p-4 max-w-5xl text-sm bg-white border border-gray-200 rounded-lg cursor-pointer shadow-2xl"
    >
      <div className="flex justify-between items-center gap-4">
        <div>
          <h2 className="font-semibold text-slate-700">{item.prompt}</h2>
          <p className="text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        {/* border-[#bfdbfe]  border text-[#1e40af] bg-[#eff6ff] */}
        <button className="bg-[#fff2d3] border border-[#ff8c0a] text-[#a1400b] px-4 py-1 rounded-full">
          {item.type}
        </button>
      </div>
      {expanded && (
        <div>
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="image"
                className="mt-3 w-full max-w-md"
              />
            </div>
          ) : (
            <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
              {/* to display content in proper formate I am using React MarkDown  */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
