import pool from "@/lib/db";
import { verifyPassword } from "@/utils/password";

/**
 * Looks up a user by email and verifies their password.
 * Returns the user object (without the hash) on success, or null on failure.
 *
 * @param {string} email
 * @param {string} plainPassword - the raw password from the login form
 * @returns {Promise<object|null>}
 */
export async function getUserFromDb(email, plainPassword) {
  const [rows] = await pool.query(
    "SELECT * FROM users WHERE email = ? LIMIT 1",
    [email],
  );

  if (rows.length === 0) return null;

  const user = rows[0];
  const isValid = await verifyPassword(plainPassword, user.password);

  if (!isValid) return null;

  // Never return the password hash to NextAuth
  const { password: _removed, ...safeUser } = user;
  return safeUser;
}
