"use client";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function EditTask({
  task,
  onClose,
  onDelete,
  onUpdate,
  onComplete,
  onRevert,
  isCompleted,
}) {
    const [taskDetails, setTaskDetails] = useState({
      ...task,
      text: task.text || "",
      notes: task.notes || "",
      dueDate: task.dueDate || null,
      repeat: task.repeat || false,
    });
  

  const [isCalendarOpen, setCalendarOpen] = useState(false);

  // Handle input changes
  const handleInputChange = (field, value) => {
    const updatedTask = { ...taskDetails, [field]: value };
    setTaskDetails(updatedTask);

    if (field === "completed") {
      if (value) {
        if (onComplete) onComplete(updatedTask);
      } else {
        if (onRevert) onRevert(updatedTask);
      }
    } else if (onUpdate) {
      onUpdate(updatedTask);
    }
  };

  // Handle saving the selected date
  const handleSaveDate = (date) => {
    handleInputChange("dueDate", date.toISOString().split("T")[0]);
    setCalendarOpen(false);
  };

  const disabledStyle = {
    color: "lightgray",
    cursor: "not-allowed",
  };

  return (
    <div className="p-6 bg-gray-100 text-black h-screen">
      {/* Task Title */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            checked={taskDetails.completed}
            onChange={(e) =>
              handleInputChange("completed", e.target.checked)
            }
            className="form-checkbox h-5 w-5 text-green-500"
          />
          <input
            type="text"
            value={taskDetails.text}
            onChange={(e) => handleInputChange("text", e.target.value)}
            className="w-[350px] bg-transparent focus:outline-none text-lg font-medium overflow"
            disabled={isCompleted}
            style={isCompleted ? disabledStyle : {}}
          />
        </div>
        <button
          onClick={() =>
            handleInputChange("priority", !taskDetails.priority)
          }
          disabled={isCompleted}
          style={isCompleted ? disabledStyle : {}}
        >
          <img
            src={
              taskDetails.priority
                ? "/images/star-filled.png"
                : "/images/star.png"
            }
            alt="Priority"
            className="w-6 h-6 cursor-pointer"
            style={isCompleted ? disabledStyle : {}}
          />
        </button>
      </div>
      <hr />

      {/* Task Details */}
      <div className="mt-4">
        {/* Add Due Date */}
        <div className="pb-4 border-b">
          <div className="flex items-center">
            <img
              src="/images/calendar.png"
              alt="Add Due Date"
              className="w-5 h-5 mr-4"
              style={isCompleted ? disabledStyle : {}}
            />
            <span
              className="text-gray-600 cursor-pointer"
              onClick={() => setCalendarOpen(!isCalendarOpen)}
              style={isCompleted ? disabledStyle : {}}
            >
              {taskDetails.dueDate || "Add Due Date"}
            </span>
          </div>
          {isCalendarOpen && !isCompleted && (
            <div className="top-10 left-10 z-50 p-10">
              <Calendar
                onChange={(date) => handleSaveDate(date)}
                value={
                  taskDetails.dueDate
                    ? new Date(taskDetails.dueDate)
                    : null
                }
              />
            </div>
          )}
        </div>

        {/* Repeat */}
        <div className="flex items-center py-4 border-b">
          <img
            src={
              taskDetails.repeat
                ? "/images/repeat-one.png"
                : "/images/repeat.png"
            }
            alt="Repeat"
            className="w-5 h-5 mr-4 cursor-pointer"
            onClick={() =>
              handleInputChange("repeat", !taskDetails.repeat)
            }
            style={isCompleted ? disabledStyle : {}}
          />
          <span
            className="text-gray-600 cursor-pointer"
            onClick={() =>
              handleInputChange("repeat", !taskDetails.repeat)
            }
            style={isCompleted ? disabledStyle : {}}
          >
            Repeat
          </span>
        </div>

        {/* Notes */}
        <div className="py-3 border-b">
          <textarea
            placeholder="Add Notes"
            value={taskDetails.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            className="w-full bg-transparent focus:outline-none text-gray-600 resize-none"
            disabled={isCompleted}
            style={isCompleted ? disabledStyle : {}}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={onClose}
          className="text-gray-500"
          disabled={isCompleted}
        >
          <img
            src="/images/cross.png"
            alt="Close"
            className="w-3 h-3"
          />
        </button>
        <span className="text-gray-500 text-sm">Created Today</span>
        <button
          onClick={onDelete}
          className="text-red-500"
          disabled={isCompleted}
          style={isCompleted ? disabledStyle : {}}
        >
          <img
            src="/images/trash.png"
            alt="Delete"
            className="w-5 h-5"
          />
        </button>
      </div>
    </div>
  );
}
