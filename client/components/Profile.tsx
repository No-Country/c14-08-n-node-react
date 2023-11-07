"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

import { useAuthStore } from "@/store/auth";
import { Spinner } from ".";

const Profile = () => {
  const router = useRouter();

  const { profile, logout, authIsReady } = useAuthStore((state) => state);
  const { name, lastName } = profile;

  // const handleLogout = () => {
  //   logout();
  //   router.push("/");
  // };

  return (
    <div className="relative min-h-screen lg:bg-gray-400">
      {!authIsReady && (
        <Spinner className="absolute bottom-0 left-0 right-0 top-0 m-auto" />
      )}
      {authIsReady && (
        <div className="main-container flex flex-col items-center py-[40px]">
          <div className="h-[118px] w-[118px] rounded-full bg-gray-700" />
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
            {/* <li className="cursor-pointer rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Pagos realizados
          </li>
          <li className="cursor-pointer rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Historial de tramites
          </li>
          <li className="cursor-pointer rounded-[10px] border border-gray-700 bg-white py-[22px] text-center text-[16px]">
            Configuraciones
          </li> */}
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
