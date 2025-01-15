"use client";
import { useEffect, useState } from "react";
import MainContent from "./Components/MainContent";

export default function Home() {
  const [username, setUsername] = useState(null); // Manage username as state

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("currentUser"); // Fetch the username from localStorage
      setUsername(storedUsername); // Update the state with the fetched username
    }
  }, []); // Empty dependency array ensures this runs only once

  // Show MainContent if username exists, otherwise show "Loading..."
  return username ? (
    <MainContent />
  ) : (
    <p>Loading...</p>
  );
}
