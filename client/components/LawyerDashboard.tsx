"use client";

import Link from "next/link";

import { useAuthStore } from "@/store/auth";

import { lawyerDashboardItems } from "@/constants";

const LawyerDashboard = () => {
  const { profile, logout } = useAuthStore((state) => state);
  const { name, lastName } = profile;

  return (
    <div className="main-container flex-center min-h-screen">
      <div className="flex flex-col items-center py-[100px]">
        <div className="h-[118px] w-[118px] rounded-full bg-gray-700" />
        <p className="mt-[10px] text-[16px] font-bold">{`${
          profile.lawyer ? "Abogado" : "Cliente"
        }`}</p>
        <p className="mt-[5px] text-[25px] capitalize">{`${name} ${lastName}`}</p>
        <ul className="mt-[20px] flex w-full max-w-[350px] flex-col gap-[5px]">
          {lawyerDashboardItems.map((item, i) => (
            <li key={i}>
              <Link href={item.href}>
                <div className="cursor-pointer rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
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
    </div>
  );
};

export default LawyerDashboard;
