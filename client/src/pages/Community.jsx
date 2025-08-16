import { useUser } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import { Captions, Heart } from "lucide-react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const fetchCreations = async () => {
    try {
      const { data } = await axios.get("/api/user/get-published-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  // Like func
  const imageLikeToggle = async (id) => {
    try {
      const { data } = await axios.post(
        "/api/user/toggle-like-creations",
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="flex-1 h-full flex flex-col gap-4 p-6">
      <div className="flex items-center gap-3">
        <Captions className="w-6 text-[#0e7490]" />
        <h1 className="text-xl font-semibold">Creations</h1>
      </div>

      <div className="h-full w-full rounded-xl overflow-y-auto">
        {loading ? (
          // 🔄 Square Skeleton Loader
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 animate-pulse">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="aspect-square w-full bg-gray-300 rounded-lg"
              ></div>
            ))}
          </div>
        ) : creations.length === 0 ? (
          // 🚫 No creations
          <p className="text-gray-500 mt-6 text-center">
            No published creations found.
          </p>
        ) : (
          // ✅ Show creations
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
            {creations.map((creation, index) => (
              <div key={index} className="relative group w-full aspect-square">
                <img
                  src={creation.content}
                  alt="creation"
                  className="w-full h-full rounded-lg shadow-md object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 flex gap-2 items-end justify-end group-hover:justify-between p-3 group-hover:bg-gradient-to-b from-transparent to-black/90 text-white rounded-lg transition">
                  <p className="text-sm hidden group-hover:block">
                    {creation.prompt}
                  </p>
                  <div className="flex gap-1 items-center">
                    <p>{creation.likes.length}</p>
                    <Heart
                    onClick={imageLikeToggle}
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                        creation.likes.includes(user.id)
                          ? "fill-red-500 text-red-600"
                          : "text-white"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Community;
