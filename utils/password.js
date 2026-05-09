import bcrypt from "bcryptjs";

const SALT_ROUNDS = 12;

/**
 * Hashes a plain-text password.
 * Use this when CREATING a user (registration).
 */
export async function saltAndHashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compares a plain-text password against a stored hash.
 * Use this when VERIFYING a user (login).
 */
export async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}
