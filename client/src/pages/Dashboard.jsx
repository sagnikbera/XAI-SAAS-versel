import React, { useEffect, useState } from "react";
import { Gem, Sparkle } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creation, setCreation] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });
      if (data.success) {
        setCreation(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* 🔹 Skeleton for cards */}
        {loading ? (
          <>
            <div className="w-72 h-24 bg-gray-300 rounded-xl animate-pulse"></div>
            <div className="w-72 h-24 bg-gray-300 rounded-xl animate-pulse"></div>
          </>
        ) : (
          <>
            {/* Total creation card */}
            <div className="flex justify-between items-center w-72 p-4 px-6 bg-white shadow-xl rounded-xl border border-[#ffe1a5]">
              <div className="text-slate-600">
                <p className="text-sm">Total Creations</p>
                <h2 className="text-xl font-semibold">{creation.length}</h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br to-[#662203] from-[#ff7300] text-white flex justify-center items-center">
                <Sparkle className="w-5 text-white" />
              </div>
            </div>

            {/* Active Plan Card */}
            <div className="flex justify-between items-center w-72 p-4 px-6 bg-white shadow-xl rounded-xl border border-[#ffe1a5]">
              <div className="text-slate-600">
                <p className="text-sm">Active Plan</p>
                <h2 className="text-xl font-semibold">
                  <Protect plan="freedom" fallback="free">
                    Freedom{" "}
                    <span className="text-sm font-medium">(*premium)</span>
                  </Protect>
                </h2>
              </div>
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br to-[#ff7300] from-[#662203] text-white flex justify-center items-center">
                <Gem className="w-5 text-white" />
              </div>
            </div>
          </>
        )}
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creation</p>

        {loading ? (
          // 🔹 Skeleton list for recent creations
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-full h-24 bg-gray-300 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        ) : creation.length > 0 ? (
          creation.map((item) => <CreationItem key={item.id} item={item} />)
        ) : (
          <p className="text-sm text-gray-500">No creations yet.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
