"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { registerUser } from "@/lib/actions/auth.actions";
import { useAuth } from "@/hooks/useAuth";

/**
 * Register page — connects RegisterForm (view) to registerUser action + auto-login.
 * On success: registers the user, signs them in, and redirects home.
 */
export default function RegisterPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async ({ name, email, password }) => {
    setError(null);
    setIsPending(true);

    const result = await registerUser({ name, email, password });

    if (result?.error) {
      setError(result.error);
      setIsPending(false);
      return;
    }

    // Auto sign-in after successful registration
    const signInResult = await login({ email, password });

    setIsPending(false);

    if (signInResult?.error) {
      // Registration succeeded but sign-in failed — send to login
      router.push("/login");
      return;
    }

    router.push("/");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <RegisterForm
        onSubmit={handleSubmit}
        error={error}
        isPending={isPending}
      />
    </main>
  );
}
