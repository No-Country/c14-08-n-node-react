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
        <div className="my-[24px] grid grid-cols-4  gap-[32px] max-md:grid-cols-2 max-xs:grid-cols-1 ">
          {lawyerDashboardItems.map((item, i) => (
            <Link key={i} href={item.href}>
              <div className="rounded-[10px] border border-gray-700 px-[12px] py-[100px] text-center">
                {item.label}
              </div>
            </Link>
          ))}
        </div>
        <Link href="/" onClick={logout} className="cursor-pointer text-[16px]">
          Cerrar sesión
        </Link>
      </div>
    </div>
  );
};

export default LawyerDashboard;
