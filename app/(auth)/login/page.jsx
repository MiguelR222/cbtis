"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginForm } from "@/components/auth/LoginForm";
import { useAuth } from "@/hooks/useAuth";

/**
 * Login page — connects LoginForm (view) to useAuth (logic).
 * Handles error state and redirects on success.
 */
export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async ({ email, password }) => {
    setError(null);
    setIsPending(true);

    const result = await login({ email, password });

    setIsPending(false);

    if (result?.error) {
      setError("Invalid email or password. Please try again.");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <LoginForm onSubmit={handleSubmit} error={error} isPending={isPending} />
    </main>
  );
}
