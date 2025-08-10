import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import {
  Eraser,
  FileText,
  Hash,
  House,
  Image,
  LogOut,
  Scissors,
  SquarePen,
  Users,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  {
    to: "/ai",
    label: "Dashboard",
    Icon: House,
  },
  {
    to: "/ai/write-article",
    label: "Write Article",
    Icon: SquarePen,
  },
  {
    to: "/ai/blog-title",
    label: "Blog Titles",
    Icon: Hash,
  },
  {
    to: "/ai/generate-images",
    label: "Generate Images",
    Icon: Image,
  },
  {
    to: "/ai/remove-background",
    label: "Remove Background",
    Icon: Eraser,
  },
  {
    to: "/ai/remove-object",
    label: "Remove Object",
    Icon: Scissors,
  },
  {
    to: "/ai/review-resume",
    label: "Review Resume",
    Icon: FileText,
  },
  {
    to: "/ai/community",
    label: "Community",
    Icon: Users,
  },
];

const SideBar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();

  return (
    <div
      className={`w-60 shadow-[8px_0_12px_-2px_rgba(0,0,0,0.2)] bg-[#f5f5f4] backdrop-blur-md border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 transform
    ${sidebar ? "translate-x-0" : "max-sm:-translate-x-full"} 
    transition-all duration-300 ease-in-out z-50`}
    >
      <div className="my-7 w-full">
        <img
          src={user.imageUrl}
          alt="user avatar"
          className="w-13 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center">{user.fullName}</h1>
        <div className="px-6 mt-5 text-sm text-gray-700 font-medium">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/ai"}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive
                    ? "bg-gradient-to-r to-[#ff7300] from-[#461904] text-white"
                    : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : ""}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between bg-[#fed7aa]">
        <div
          onClick={openUserProfile}
          className="flex gap-2 items-center cursor-pointer"
        >
          <img src={user.imageUrl} className="w-8 rounded-full" alt="" />
          <div>
            <h1 className="text-sm font-medium">{user.fullName}</h1>
            <p className="text-xs text-gray-600">
              <Protect plan="freedom" fallback="Free">
                Freedom
              </Protect>{" "}
              Plan
            </p>
          </div>
        </div>
        <LogOut
          onClick={signOut}
          className="text-red-600 w-4.5 hover:text-gray-700 transition cursor-pointer"
        />
      </div>
    </div>
  );
};

export default SideBar;
