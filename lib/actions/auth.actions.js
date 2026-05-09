"use server";

import pool from "@/lib/db";
import { saltAndHashPassword } from "@/utils/password";

export async function registerUser({ name, email, password }) {
  const [existing] = await pool.execute(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  if (existing.length > 0) {
    return { error: "An account with that email already exists." };
  }

  const hashed = await saltAndHashPassword(password);

  await pool.execute(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, hashed],
  );

  return { success: true };
}
