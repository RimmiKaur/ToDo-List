"use client";
import { Provider } from "react-redux";
import store from "./redux/store"; 
import "./globals.css";



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ToDo App</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"/>

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter bg-gray-100 text-black">
        {/* Wrap your app in the Redux Provider */}
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
