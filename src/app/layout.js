'use client'
import { Provider } from "react-redux";
import "./globals.css";
import { josefinSans } from "./ui/fonts";
import store from "../redux/store";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefinSans.className} antialiased`}>
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
