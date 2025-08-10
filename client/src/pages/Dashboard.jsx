import React, { useEffect, useState } from "react";
import { dummyCreationData } from "../assets/assets";
import { Gem, Sparkle } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";

const Dashboard = () => {
  const [creation, setCreation] = useState([]);
  const getDashboardData = async () => {
    setCreation(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* Total creation card  */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-[white] shadow-xl rounded-xl border border-[#ffe1a5]">
          <div className="text-slate-600">
            <p className="text-sm">Total Creations</p>
            <h2 className="text-xl font-semibold">{creation.length}</h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br to-[#662203] from-[#ff7300] text-white flex justify-center items-center">
            <Sparkle className="w-5 text-white" />
          </div>
        </div>

        {/* Active Plan Card  */}
        <div className="flex justify-between items-center w-72 p-4 px-6 bg-[white] shadow-xl rounded-xl border border-[#ffe1a5]">
          <div className="text-slate-600">
            <p className="text-sm">Active Plan</p>
            <h2 className="text-xl font-semibold">
              <Protect plan="freedom" fallback="free">
                Freedom <span className="text-sm font-medium">(*premium)</span>
              </Protect>
            </h2>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br to-[#ff7300] from-[#662203] text-white flex justify-center items-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="mt-6 mb-4">Recent Creation</p>
        {creation.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
