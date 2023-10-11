import Link from "next/link";

import { navLinks } from "@/constants";

const Nav = () => {
  return (
    <header className="w-full bg-gray-700">
      <div className="nav-container flex-between px-[20px] py-[20px]">
        <Link href="/" className="font-semibold text-white">
          LegalHub
        </Link>
        <nav className="max-md:hidden">
          <ul className="flex gap-8 font-semibold text-white">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Nav;
