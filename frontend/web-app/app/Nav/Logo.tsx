"use client";
import React from "react";
import { FaCar } from "react-icons/fa"; 
import { usePathname, useRouter } from "next/navigation";

export default function Logo() {

  const router = useRouter();
  const pathName = usePathname();
  const doReset = () => {
    if (pathName !== '/') {
      router.push('/');
    }
  };
  return (
    <div onClick={doReset} className="cursor-pointer flex items-center gap-2 text-3xl font-semibold text-red-500">
      <FaCar size={28}  />
      <div>Carsties Auctions</div>
    </div>
  );
};


