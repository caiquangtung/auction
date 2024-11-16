'use client';

import { signOut } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { Dropdown } from 'flowbite-react';
import { HiUser, HiCog, HiOutlineLogout } from 'react-icons/hi';
import { IoTrophy, IoCar } from 'react-icons/io5';
import { User } from 'next-auth';

type Props = {
  user: User
};  

export default function UserActions({ user }: Props) {
  const router = useRouter();
  const pathName = usePathname();

  return (
    <Dropdown inline label={`Welcome ${user.name}`}>
      <Dropdown.Item icon={HiUser}>
        <a href="/">My Auctions</a>
      </Dropdown.Item>
      <Dropdown.Item icon={IoTrophy}>
        <a href="/">Auctions Won</a>
      </Dropdown.Item>
      <Dropdown.Item icon={IoCar}>
        <a href="/">Sell My Car</a>
      </Dropdown.Item>
      <Dropdown.Item icon={HiCog}>
        <a href="/session">Session (Dev Only)</a>
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item icon={HiOutlineLogout} onClick={() => signOut({ callbackUrl: '/' })}>
        Sign Out
      </Dropdown.Item>
    </Dropdown>
  );
}   
