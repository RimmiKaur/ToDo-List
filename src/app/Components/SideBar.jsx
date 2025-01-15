"use client";
import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Sidebar({ isOpen, tasks, completedTasks }) {
  const totalTasks = tasks.length + completedTasks.length;
  const pendingTasks = tasks.length;
  const completed = completedTasks.length;

  const data = {
    datasets: [
      {
        data: [pendingTasks, completed], // Pending and Done tasks
        backgroundColor: ["#66BB6A", "#388E3C"], // Colors for each section
        hoverBackgroundColor: ["#81C784", "#4CAF50"], // Hover colors
      },
    ],
  };

 

  return (
    <div
      className={`fixed top-13 left-0 h-full text-black shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full" 
      } `}
      style={{
        width: isOpen ? (window.innerWidth < 768 ? "w-full" : "14rem") : "0",
        overflowY: "auto", // Enable vertical scrolling

      }}    >
      <div className="relative bg-white">
        {/* Profile Section */}
        <div className="absolute md:left-12 left-24 top-[-7%] md:top-[-9%] flex flex-col items-center p-4">
        <img
            src="/images/avatar.png"
            alt="Profile"
            className="w-20 h-20 rounded-full mb-2"
          />
          <h2 className="text-md font-semibold">Hey, ABCD</h2>
        </div>

        <div className="bg-green-100 pt-16 mt-[22%]">
          {/* Chart Section */}
          

          {/* Navigation Links */}
          <nav className="bg-white m-3 p-2">
            <ul>
              <li className="flex items-center gap-4 p-2 rounded-md hover:bg-gray-100">
                <img src="/images/task.png" alt="All Tasks" className="w-5 h-5" />
                <span>All Tasks</span>
              </li>
              <li className="flex items-center gap-4 p-2 rounded bg-green-200 hover:bg-green-100 cursor-pointer">
                <img src="/images/calendar.png" alt="Today" className="w-5 h-5" />
                <span>Today</span>
              </li>
              <li className="flex items-center gap-4 p-2 rounded hover:bg-green-100 cursor-pointer">
                <img src="/images/star.png" alt="Important" className="w-5 h-5" />
                <span>Important</span>
              </li>
              <li className="flex items-center gap-4 p-2 rounded hover:bg-green-100 cursor-pointer">
                <img src="/images/planned.png" alt="Planned" className="w-5 h-5" />
                <span>Planned</span>
              </li>
              <li className="flex items-center gap-4 p-2 rounded hover:bg-green-100 cursor-pointer">
                <img
                  src="/images/assigned-to-me.png"
                  alt="Assigned to Me"
                  className="w-5 h-5"
                />
                <span>Assigned to Me</span>
              </li>
            </ul>
          </nav>

          {/* Add List Section */}
          <div className="mt-3 p-1 m-3 bg-white ">
            <button className="flex items-center gap-4 w-full p-2 rounded hover:bg-green-100">
              <img src="/images/add.png" alt="Add List" className="w-5 h-5" />
              <span>Add List</span>
            </button>
          </div>

          <div className="bg-white p-4 m-3 rounded-lg shadow-md h-full">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Today Tasks</h3>
              <img src="/images/help.png" alt="Info" className="w-4 h-4" />
            </div>
            <Doughnut data={data} />
            <div className="flex justify-center mt-4">
              <span className="flex items-center gap-2 text-sm">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#4CAF50" }}
                ></span>
                Pending
              </span>
              <span className="flex items-center gap-2 text-sm ml-4">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: "#1B5E20" }}
                ></span>
                Done
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
