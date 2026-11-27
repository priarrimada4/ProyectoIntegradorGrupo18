import { describe, it, expect } from "vitest";
import { pool } from "../../../src/infrastructure/database/connection.ts";

describe("Database Connection", () => {
  it("debe conectarse correctamente a PostgreSQL", async () => {
    const result = await pool.query(
      "SELECT current_database() AS database, current_user AS usuario",
    );

    expect(result.rows.length).toBe(1);
    expect(result.rows[0].database).toBe("tyta");
    expect(result.rows[0].usuario).toBe("tyta_user");
  });
});
