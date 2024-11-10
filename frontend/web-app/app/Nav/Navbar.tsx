"use client";
import React from "react";
import { FaCar } from "react-icons/fa";
import Search from "./Search";
import Logo from "./Logo";
export default function NavBar() {
  return (
    <header className="flex justify-between items-center p-5 bg-white text-gray-800 shadow-md sticky top-0 z-50">
        <Logo />
      <Search />
      <div>Login</div>
    </header>
  );
}
