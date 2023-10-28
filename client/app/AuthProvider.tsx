"use client";

import { useState, useEffect } from "react";

import { useAuthStore } from "@/store/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setAuth } = useAuthStore((state) => state);
  useEffect(() => {
    useAuthStore.persist.rehydrate();
    setAuth();
  }, []);
  return <>{children}</>;
};

export default AuthProvider;
