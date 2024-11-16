import React from "react";
import Search from "./Search";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import UserActions from "./UserActions";
import { getCurrentUser } from "../actions/authActions";

export default async function NavBar() {
  const user = await getCurrentUser();
  return (
    <header className="flex justify-between items-center p-5 bg-white text-gray-800 shadow-md sticky top-0 z-50">
      <Logo />
      <Search />
      {user ? <UserActions user = {user} /> : <LoginButton />}
    </header>
  );
}
