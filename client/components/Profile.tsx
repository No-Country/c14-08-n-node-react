"use client";

import React, { useState, useLayoutEffect, useRef } from "react";

import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import { FaPen } from "react-icons/fa6";

import { useAuthStore } from "@/store/auth";
import { Spinner } from ".";

import { checkAuth } from "@/utils/checkAuth";
import { ClassNames } from "@emotion/react";

const Profile = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { profile, logout, authIsReady, updateClientImage } = useAuthStore(
    (state) => state,
  );
  const { name, lastName } = profile;

  useLayoutEffect(() => {
    const redirect = checkAuth(pathname.split("/")[1]);

    if (redirect.length > 0) {
      router.push(redirect);
    }
  }, []);

  const [selectedProfileImage, setSelectedProfileImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClickInput = () => {
    inputRef.current?.click();
  };

  const handleImageSelect = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & { files: FileList };

    if (target.files[0]) {
      setSelectedProfileImage(URL.createObjectURL(target.files[0]));

      if (profile.client) {
        updateClientImage(URL.createObjectURL(target.files[0]));
      }
    }
  };

  return (
    <div className="relative min-h-screen lg:bg-gray-400">
      {!authIsReady && (
        <Spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto" />
      )}
      {authIsReady && (
        <div className="main-container flex flex-col items-center py-[40px]">
          <div
            className="flex-center hover:bg- hover: group relative h-[118px] w-[118px] cursor-pointer overflow-hidden rounded-full bg-gray-700"
            onClick={handleClickInput}
          >
            <input
              ref={inputRef}
              id="selectImage"
              hidden
              type="file"
              onChange={handleImageSelect}
            />
            <FaPen
              color="white"
              className="invisible absolute z-20 group-hover:visible"
            />
            <div className="invisible absolute inset-0 z-10 bg-black opacity-70 group-hover:visible"></div>
            {(selectedProfileImage || profile?.client?.imagen) && (
              <img
                src={selectedProfileImage || profile?.client?.imagen}
                className="absolute inset-0 h-full w-full"
              />
            )}
          </div>
          <p className="mt-[10px] text-[16px] font-bold">{`${
            profile.lawyer ? "Abogado" : "Cliente"
          }`}</p>
          <p className="mt-[5px] text-[25px] capitalize">{`${name} ${lastName}`}</p>
          <ul className="mt-[20px] flex w-full max-w-[350px] flex-col gap-[5px]">
            <li className="cursor-pointer rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
              Mis datos
            </li>
            <li>
              <Link href="/cliente/turnos">
                <div className="cursor-pointer rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
                  Mis turnos pendientes
                </div>
              </Link>
            </li>
            <li className="my-[22px] inline-flex justify-center">
              <Link
                href="/"
                onClick={logout}
                className="cursor-pointer text-[16px]"
              >
                Cerrar sesión
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Profile;
