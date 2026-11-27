import "dotenv/config";
import { Pool } from "pg";
//crea pool que mantiene un conjunto de conexiones disponibles para que el backend pueda consultar PostgreSQL
// sin tener que abrir y cerrar una conexión manualmente para cada consulta.
export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
