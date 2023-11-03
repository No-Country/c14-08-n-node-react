"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaXmark, FaArrowRightLong } from "react-icons/fa6";

import { useAuthStore } from "@/store/auth";
import { navLinks } from "@/constants";

const Nav = () => {
  const { authIsReady, isAuthenticated, profile } = useAuthStore(
    (state) => state,
  );

  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <header className="w-full bg-gray-700">
      <div className="nav-container flex-between px-[20px] py-[20px]">
        <Link href="/" className="font-semibold text-white">
          LegalHub
        </Link>
        <nav>
          {authIsReady && (
            <>
              <ul className="flex gap-8 font-semibold text-white max-md:hidden">
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
                      href={`${
                        profile.client ? "/cliente/perfil" : "/abogado/panel"
                      }`}
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
              <div className="md:hidden">
                <FaBars
                  onClick={() => setModalIsOpen(true)}
                  color="white"
                  className="cursor-pointer"
                />
              </div>

              {modalIsOpen && (
                <div
                  onClick={() => setModalIsOpen(false)}
                  className="glass fixed left-0 top-0 z-40 flex h-screen min-w-full justify-end"
                >
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex h-full w-[70vw] flex-col bg-white px-[30px] py-[20px]"
                  >
                    <ul className="flex flex-col gap-[10px]">
                      {!isAuthenticated ? (
                        <>
                          {navLinks.map((link) => (
                            <li key={link.label}>
                              <Link
                                onClick={() => setModalIsOpen(false)}
                                className="flex items-center justify-between"
                                href={link.href}
                              >
                                {link.label}
                                <FaArrowRightLong />
                              </Link>
                            </li>
                          ))}
                        </>
                      ) : (
                        <li>
                          <Link
                            href={`${
                              profile.client
                                ? "/cliente/perfil"
                                : "/abogado/panel"
                            }`}
                            className="flex items-center justify-between  capitalize"
                          >
                            <div className="flex items-center gap-[12px]">
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
                            </div>
                            <FaArrowRightLong />
                          </Link>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Nav;
