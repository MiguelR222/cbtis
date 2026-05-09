import { NextResponse } from "next/server";
import pool from "@/lib/db";

const CREATE_USERS_TABLE = `
  CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255)        NOT NULL,
    email       VARCHAR(255)        UNIQUE NOT NULL,
    password    VARCHAR(255)        NOT NULL,
    created_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP           DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  )
`;

export async function GET() {
  try {
    await pool.execute(CREATE_USERS_TABLE);
    return NextResponse.json({ ok: true, message: "Table 'users' is ready" });
  } catch (err) {
    return NextResponse.json(
      { ok: false, message: err.message },
      { status: 500 },
    );
  }
}
