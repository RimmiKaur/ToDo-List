"use client";
import { useEffect, useState } from "react";
import MainContent from "./Components/MainContent";
import { useRouter } from "next/navigation"; // Correct import for useRouter in app directory

export default function Home() {
  const [username, setUsername] = useState(null); // Manage username as state
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUsername = localStorage.getItem("currentUser"); // Fetch the username from localStorage
      setUsername(storedUsername); // Update the state with the fetched username
      
      // Redirect to login if username doesn't exist
      if (!storedUsername) {
        router.push("/login");
      }
    }
  }, [router]); // Dependency array includes router

  // Show MainContent if username exists, otherwise show "Loading..."
  return username ? (
    <MainContent />
  ) : (
    <p>Loading...</p>
  );
}
