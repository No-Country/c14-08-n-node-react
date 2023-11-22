"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/store/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth, loadProfile } = useAuthStore((state) => state);
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    (async () => {
      await loadProfile();
      setAuth();
    })();
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
