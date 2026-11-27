import { pool } from "../src/infrastructure/database/connection.ts";

try {
  const result = await pool.query(
    "SELECT current_database() AS database, current_user AS usuario",
  );

  console.log("Conexión exitosa:", result.rows[0]);
} catch (error) {
  console.error("Error de conexión:", error);
} finally {
  await pool.end();
}
