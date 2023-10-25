"use client";

// import { useEffect } from "react";

import { useAuthStore } from "@/store/auth";
// import { useStore } from "@/store/store";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // useStore();
  useAuthStore();

  return <>{children}</>;
};

export default AuthProvider;
