"use client";

import { signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Dropdown } from "flowbite-react";
import { HiUser, HiCog, HiOutlineLogout } from "react-icons/hi";
import { IoTrophy, IoCar } from "react-icons/io5";
import { User } from "next-auth";
import Link from "next/link";
import { useParamsStore } from "@/hooks/useParamsStore";

type Props = {
  user: User;
};

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathName = usePathname();
  const setParams = useParamsStore((state) => state.setParams);
  function setWinner() {
    setParams({ winner: user.username, seller: undefined });
    if (pathName !== "/") {
      router.push("/");
    }
  }
  function setSeller() {
    setParams({ seller: user.username, winner: undefined });
    if (pathName !== "/") {
      router.push("/");
    }
  }

  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={HiUser} onClick={setSeller}>
        My Auctions
      </Dropdown.Item>
      <Dropdown.Item icon={IoTrophy} onClick={setWinner}>
        Auctions Won
      </Dropdown.Item>
      <Dropdown.Item icon={IoCar}>
        <Link href="/auctions/create">Sell My Car</Link>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <Link href="/session">Session (Dev Only)</Link>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        icon={HiOutlineLogout}
        onClick={() => signOut({ callbackUrl: "/" })}
      >
        Sign Out
      </Dropdown.Item>
    </Dropdown>
  );
}
