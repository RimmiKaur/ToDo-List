"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import NavigationBar from "./NavigationBar";
import Sidebar from "./SideBar";
import EditTask from "./EditTask";
import { useTheme } from "../context/ThemeContext";

export default function MainContent() {
  const { isAuthenticated } = useSelector((state) => state.auth); // Get authentication state and username from Redux
  const router = useRouter();

  const [isSidebarOpen, setSidebarOpen] = useState(true); // Sidebar state
  const [tasks, setTasks] = useState([]); // List of incomplete tasks
  const [completedTasks, setCompletedTasks] = useState([]); // List of completed tasks
  const [newTask, setNewTask] = useState(""); // New task input
  const [inputError, setInputError] = useState(""); // Error for empty task input
  const [iconsDisabled, setIconsDisabled] = useState(true); // Disable icons until a task is added
  const [selectedTask, setSelectedTask] = useState(null); // Task being edited
  const [isGridView, setIsGridView] = useState(false); // Toggle for grid view
  const [username, setUsername] = useState(null);
    const { theme, toggleTheme } = useTheme();

  const getImageURL = (basePath) =>
    theme === "dark" ? `${basePath}-white.png` : `${basePath}.png`;


  // Redirect to login if the user is not authenticated
  useEffect(() => {
    var storedUsername;
    if (typeof window !== "undefined") {
         storedUsername = localStorage.getItem("currentUser");
        setUsername(storedUsername || null);
      }

    if (!isAuthenticated && !storedUsername) {
      router.push("/login");
    }
    else {
      setUsername(storedUsername);
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    
    if (username) {
      const userTasksKey = `${username}-tasks`;
      const userCompletedTasksKey = `${username}-completedTasks`;

      const savedTasks = JSON.parse(localStorage.getItem(userTasksKey)) || [];
      const savedCompletedTasks =
        JSON.parse(localStorage.getItem(userCompletedTasksKey)) || [];

      console.log("sdcsdcdsc", savedTasks);

      setTasks(savedTasks);
      setCompletedTasks(savedCompletedTasks);
    }
  }, [username]);

  // Save tasks to local storage whenever they change
  useEffect(() => {
    if (username) {
      const userTasksKey = `${username}-tasks`;
      const userCompletedTasksKey = `${username}-completedTasks`;

      if (tasks.length === 0 && completedTasks.length===0) {
        const userTasksKey = `${username}-tasks`;
        const userCompletedTasksKey = `${username}-completedTasks`;

        const savedTasks = JSON.parse(localStorage.getItem(userTasksKey)) || [];
        const savedCompletedTasks =
        JSON.parse(localStorage.getItem(userCompletedTasksKey)) || [];
        localStorage.setItem(userTasksKey, JSON.stringify(savedTasks));
        localStorage.setItem(userCompletedTasksKey, JSON.stringify(savedCompletedTasks));

        return;
      }

      localStorage.setItem(userTasksKey, JSON.stringify(tasks));
      localStorage.setItem(userCompletedTasksKey, JSON.stringify(completedTasks));
    }
  }, [tasks, completedTasks, username]);

  // Add a new task
  const handleAddTask = () => {
    if (!newTask.trim()) {
      setInputError("Task cannot be empty!"); // Show error for empty input
      return;
    }

    const todayDate = new Date().toISOString().split("T")[0];
    const addedTask = {
      id: Date.now(), // Use current timestamp as unique ID
      text: newTask,
      completed: false,
      priority: false,
      dueDate: todayDate,
    };

    // Add the new task to the list of tasks
    setTasks((prevTasks) => [...prevTasks, addedTask]);
    setNewTask(""); // Clear input field
    setIconsDisabled(false); // Enable icons
  };

  // Toggle task priority
  const handleTogglePriority = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, priority: !task.priority } : task
      )
    );
    setCompletedTasks((prevCompleted) =>
      prevCompleted.map((task) =>
        task.id === taskId ? { ...task, priority: !task.priority } : task
      )
    );
  };

  // Mark a task as completed
  const handleCompleteTask = (completedTask) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== completedTask.id)
    );
    setCompletedTasks((prevCompleted) => [
      ...prevCompleted,
      { ...completedTask, completed: true },
    ]);
    console.log(completedTask, "efwefefewfewf");
    localStorage.setItem(`${username}-completedTasks`, JSON.stringify(completedTasks));
    setSelectedTask(null);
  };

  // Revert a completed task to incomplete
  const handleRevertTask = (revertedTask) => {
    setCompletedTasks((prevCompleted) =>
      prevCompleted.filter((task) => task.id !== revertedTask.id)
    );
    setTasks((prevTasks) => [
      ...prevTasks,
      { ...revertedTask, completed: false },
    ]);
    setSelectedTask(null);
  };

  // Update a task in the list
  const handleUpdateTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    setCompletedTasks((prevCompleted) =>
      prevCompleted.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      )
    );
  };





  const handleIconClick = (iconType) => {
    if (iconsDisabled) return; // Prevent action if icons are disabled

    const defaultTask = {
      id: null, // No specific task associated
      text: newTask, // Default task text
      completed: false,
      priority: false,
      dueDate: null,
      notes: "",
      repeat: false,
      iconType, // Store which icon triggered the action
    };

    setSelectedTask(defaultTask); // Open EditTask with default values
  };


  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    setCompletedTasks((prevCompleted) =>
      prevCompleted.filter((task) => task.id !== id)
    );
    setSelectedTask(null);
  };

  const handleCloseEdit = () => setSelectedTask(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewTask(value);
    setIconsDisabled(!value.trim());
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  const handleOpenEditTask = (task) => {
    setSelectedTask(task);
    if (window.innerWidth < 768) {
      setSidebarOpen(false); // Close the sidebar in mobile mode
    }
  };

  return (
    <>
      <NavigationBar
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
        setIsGridView={setIsGridView}
      />


      <div className={`pt-[3%]    ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>

        <div className="flex ">
          {/* Sidebar */}
          {isSidebarOpen && <Sidebar
            isOpen={isSidebarOpen}
            tasks={tasks}
            completedTasks={completedTasks}
          />}
          <div className="flex relative w-full h-[100vh]">
            <div
              className={`transition-all duration-300 ${selectedTask
                ? isSidebarOpen && window.innerWidth >= 769
                  ? "xl:w-[51%] xl:ml-[15%]  md:block hidden" // Sidebar open: hidden on mobile
                  : "xl:w-[51%] xl:ml-auto "
                : isSidebarOpen
                  ? "xl:w-[84%] xl:ml-[15%] w-[80%] md:ml-[28%] md:block hidden" // Sidebar open: hidden on mobile
                  : "w-full"
                }`}
            >
              <div className={`p-6 w-full h-[100vh] ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`} >
                <div className="flex">
                  <p className={`text-sm ${theme === "dark" ? " text-white" : "text-gray-500"} text-gray-500 p-2`}>ToDo</p>
                  <img src="/images/caret-down.png" alt="down" />
                </div>
                <hr />
                <div
                  className={`p-5 `}
                  style={ theme ==='dark' ? {
                    backgroundColor: '#2F3630',
                  }:

                  {
                    background:
                      "linear-gradient(0deg, rgba(53, 121, 55, 0.1), rgba(208, 255, 210, 0.1))",
                    
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <input
                      type="text"
                      value={newTask}
                      onChange={handleInputChange}
                      placeholder="Add a task"
                      className={`bg-transparent border-0 px-4 py-2 rounded w-full focus:outline-none focus:ring-0 ${inputError ? "border-red-500 focus:border-red-500" : ""
                        }`}
                    />

                  </div>
                  {inputError && <p className="text-red-500 text-sm">{inputError}</p>}

                  <div className="flex items-center gap-4 px-2 text-gray-500">
                    <img
                      src={getImageURL("/images/bell")}
                      alt="Notification"
                      className={`w-5 h-5 ${iconsDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                        }`}
                      onClick={() => handleIconClick("notification")}
                    />
                    <img
                      src={getImageURL("/images/repeat")}
                      alt="Repeat"
                      className={`w-5 h-5 ${iconsDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                        }`}
                      onClick={() => handleIconClick("repeat")}
                    />
                    <img
                      src={getImageURL("/images/calendar")}
                      alt="Calendar"
                      className={`w-5 h-5 ${iconsDisabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                        }`}
                      onClick={() => handleIconClick("calendar")}
                    />
                    <button
                      onClick={handleAddTask}
                      className="bg-green-200 ml-auto md:text-md text-sm px-4 py-2 rounded text-green-700 hover:bg-green-300"
                    >
                      ADD TASK
                    </button>
                  </div>

                </div>

                <div
                  className={`${isGridView ? "grid md:grid-cols-2 gap-4 pt-2" : "flex flex-col gap-2"
                    }`}
                >
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start justify-between p-4  ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"} hover:shadow-md  ${isGridView ? "border border-black" : "border-b-2 border-white"
                        }`}
                      onDoubleClick={() => setSelectedTask(task)}
                      style={{
                        minHeight: "4rem", // Ensure consistent minimum height
                        display: "flex", // Ensure proper layout
                        alignItems: "center", // Vertically center the checkbox and text
                        flexWrap: "wrap", // Allow text to wrap
                      }}
                      title="Double-click to edit"
                    >
                      <div className="flex items-start gap-4 flex-1">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          className="form-checkbox h-6 w-6 text-green-500"
                          onChange={() => handleCompleteTask(task)}
                          style={{
                            flexShrink: 0, // Prevent checkbox from resizing
                          }}
                        />
                        {/* Task Text */}
                        <span
                          className="text-sm "
                          style={{
                            wordBreak: "break-word", // Break long words
                            lineHeight: "1.5", // Increase line height for better readability
                          }}
                        >
                          {task.text}
                        </span>
                      </div>
                      {/* Priority Button */}
                      <button
                        onClick={() => handleTogglePriority(task.id)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={getImageURL(task.priority
                              ? "/images/star-filled"
                              : "/images/star")
                          }
                          alt="Priority"
                          className="w-6 h-6 cursor-pointer"
                        />
                      </button>
                    </div>
                  ))}
                </div>




                <div style={{ display: isGridView ? "none" : "block" }  } className={`${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>
                  <h2 className={`text-lg font-semibold mt-8  ${theme === "dark" ? "bg-dark text-light" : "bg-light text-dark"}`}>Completed Tasks</h2>
                  {completedTasks.length<1 ?
                  <p className="text-sm ml-4 text-gray-500">No completed tasks</p>
                  :
                  
                  completedTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-start justify-between p-4  ${isGridView ? "border border-black" : "border-b-2 border-white"}  hover:shadow-md  `}
                      onDoubleClick={() => setSelectedTask(task)}
                      style={{
                        minHeight: "4rem", // Consistent height for all items
                        display: "flex", // Use flex for layout
                        alignItems: "center", // Vertically align items
                        flexWrap: "wrap", // Wrap text if necessary
                      }}
                      title="Double-click to edit" >
                      {/* Task Details */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Checkbox */}
                        <input
                          type="checkbox"
                          className="form-checkbox h-6 w-6 text-green-500"
                          checked
                          onChange={() => handleRevertTask(task)}
                          style={{
                            flexShrink: 0, // Prevent resizing of checkbox
                          }}
                        />
                        {/* Task Text */}
                        <span
                          className="line-through text-sm"
                          style={{
                            wordBreak: "break-word", // Break long words
                            lineHeight: "1.5", // Better readability for multi-line text
                          }}
                        >
                          {task.text}
                        </span>
                      </div>
                      {/* Priority Icon */}
                      <button
                        onClick={() => handleTogglePriority(task.id)}
                        className="flex-shrink-0"
                      >
                        <img
                          src={
                            getImageURL(task.priority
                              ? "/images/star-filled"
                              : "/images/star")
                          }
                          alt="Priority"
                          className="w-6 h-6 cursor-pointer"
                        />
                      </button>
                    </div>
                  ))
                  }
                
                </div>

              </div>
            </div>

            {selectedTask && (
              <div className={`fixed ${window.innerWidth < 769
                ? "top-0 left-0 w-full h-full z-50 bg-gray-100"
                : "right-0 top-13 w-1/3 h-full bg-gray-100 shadow-lg z-10"
                }`}>
                <EditTask
                  task={selectedTask}
                  onClose={handleCloseEdit}
                  onDelete={() => handleDeleteTask(selectedTask.id)}
                  onUpdate={handleUpdateTask}
                  onComplete={handleCompleteTask}
                  onRevert={handleRevertTask}
                  isCompleted={completedTasks.some(
                    (task) => task.id === selectedTask.id
                  )}
                />
              </div>
            )}
          </div>
        </div>

      </div>



    </>
  );
}