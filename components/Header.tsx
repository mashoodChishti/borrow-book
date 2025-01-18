import Link from "next/link";
import React from "react";

import Image from "next/image";
import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href={"/"} className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          alt="BorrowBook Logo"
          width={40}
          height={40}
        />
        BorrowBook
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
            className="mb-10"
          >
            <Button className="text-black">Logout</Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
