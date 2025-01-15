"use client";

import { useRouter } from "next/navigation"; // Use from next/navigation
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice"; // Ensure logout is correctly imported

export default function NavigationBar({ toggleSidebar, setIsGridView }) {
  const [isGridViewActive, setGridViewActive] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch the current username from Redux state

  const handleGridViewToggle = () => {
    setGridViewActive((prev) => !prev); // Toggle local grid view state
    setIsGridView((prev) => !prev); // Notify MainContent about the change
  };

  const handleLogout = () => {
    localStorage.setItem("currentUser", JSON.stringify(null));


    dispatch(logout()); // Update Redux state
    router.push("/login"); // Redirect to login
  };

  return (
    <div className="relative">
      <div className="min-w-full fixed top-0 left-0 bg-white z-10">
        <div className="flex items-center justify-between w-full max-w-[1344px] mx-auto px-4 py-2 bg-white md:px-8">
          {/* Left Section - Hamburger and Logo */}
          <div className="flex items-center">
            <img
              src="/images/menu.png"
              alt="Menu"
              className="w-6 h-6 cursor-pointer "
              onClick={toggleSidebar}
            />
            <img
              src="/images/logo.png"
              alt="DoIt Logo"
              className="w-16 h-auto ml-2 md:w-20"
            />
          </div>

          {/* Right Section - Icons and Logout */}
          <div className="flex items-center gap-4">
            <img
              src="/images/search.png"
              alt="Search"
              className="w-5 h-5 cursor-pointer hidden md:block"
            />
            <img
              src={isGridViewActive ? "/images/list.png" : "/images/grid.png"}
              alt={isGridViewActive ? "List View" : "Grid View"}
              className="w-5 h-5 cursor-pointer"
              onClick={handleGridViewToggle}
            />
            <img
              src="/images/moon.png"
              alt="Dark Mode"
              className="w-5 h-5 cursor-pointer hidden md:block"
            />
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 text-sm md:text-base"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
