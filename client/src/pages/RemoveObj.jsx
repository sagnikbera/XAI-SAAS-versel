import { ImageMinus, Scissors, Sparkle } from "lucide-react";
import React, { useState } from "react";
//for back
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObj = () => {
  const [input, setInput] = useState("");
  const [object, setObject] = useState("");

  // back start
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (object.split(" ").length > 1) {
        return toast.error("Please Enter Only One Object Name");
      }

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", object);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
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

  //  download func
  const downloadImage = async () => {
    try {
      const response = await fetch(content);
      const blob = await response.blob();

      // create a temporary link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Object-removed-image.png"; // file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // free up memory
      window.URL.revokeObjectURL(url);
    } catch (error) {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* left col  */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200 shadow-xl"
      >
        <div className="flex items-center gap-3">
          <Sparkle className="w-6 text-[#1e40af]" />
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>
        <p className="mt-6 text-sm font-medium">Upload image</p>

        <input
          onChange={(e) => setInput(e.target.files[0])}
          type="file"
          accept="image/*"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600"
          required
        />
        <p className="text-sm text-gray-500 font-light mt-1">
          Supports JPG, PNG and other image formats.
        </p>

        <p className="mt-6 text-sm font-medium">Describe Your Object</p>

        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
          placeholder="e.g. - watch or spoon , Only Single object name"
          required
        />

        <button
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-l to-[#172554] from-[#2563eb] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}
          Remove Object
        </button>
      </form>
      {/* right col  */}
      {/* right col  */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-300 min-h-96 shadow-2xl">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#1e40af]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {loading ? (
          // 🔹 Skeleton Loader
          <div className="flex-1 flex flex-col items-center justify-center mt-6 gap-4">
            <div className="w-full aspect-square bg-gray-200 animate-pulse rounded-md"></div>
            <div className="w-[50%] h-10 bg-gray-200 animate-pulse rounded-lg"></div>
          </div>
        ) : !content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-[#93c5fd]">
              <ImageMinus className="w-12 h-12" />
              <p className="font-medium text-sm text-center w-[80%]">
                Upload the file, describe the object and click "Remove Object"
                to get started...
              </p>
            </div>
          </div>
        ) : (
          <div className="h-full mt-3 flex flex-col items-center">
            <img
              src={content}
              alt="processed-image"
              className="w-full h-full object-contain rounded-md"
            />

            {/* Download button */}
            <button
              onClick={downloadImage}
              className="w-[50%] px-4 py-2 bg-gradient-to-l to-[#3b0764] from-[#9333ea] text-white rounded-lg text-sm shadow-lg hover:opacity-90 transition mt-3"
            >
              Download Image
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveObj;
