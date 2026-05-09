"use client";

import { signIn, signOut } from "next-auth/react";

export function useAuth() {
  const login = async ({ email, password }) => {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return result; // { error, ok, status, url }
  };

  const logout = () => signOut({ callbackUrl: "/" });

  return { login, logout };
}
