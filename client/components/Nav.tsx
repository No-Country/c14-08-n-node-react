"use client";

import Link from "next/link";

import { useAuthStore } from "@/store/auth";
import { navLinks } from "@/constants";

const Nav = () => {
  const { authIsReady, isAuthenticated, profile } = useAuthStore(
    (state) => state,
  );

  return (
    <header className="w-full bg-gray-700">
      <div className="nav-container flex-between px-[20px] py-[20px]">
        <Link href="/" className="font-semibold text-white">
          LegalHub
        </Link>
        <nav className="max-md:hidden">
          {authIsReady && (
            <ul className="flex gap-8 font-semibold text-white">
              {!isAuthenticated ? (
                <>
                  {navLinks.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </>
              ) : (
                <li>
                  <Link
                    href="/perfil"
                    className="flex items-center gap-[12px] capitalize"
                  >
                    {profile.name}
                    <div className="flex-center h-[25px] w-[25px] overflow-hidden rounded-full bg-[#c4cce0]">
                      {profile.client ? (
                        <>
                          {profile.client && (
                            <img
                              src={profile.client[0].imagen}
                              alt="profile image"
                            />
                          )}
                        </>
                      ) : (
                        <>
                          {profile.lawyer && (
                            <img
                              src={profile.lawyer[0].imagen}
                              alt="profile image"
                            />
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                </li>
              )}
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
