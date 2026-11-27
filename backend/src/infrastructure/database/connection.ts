import dotenv from "dotenv";
import { Pool } from "pg";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
//filerurl:obtiene la ubicación del archivo actual.
// dirname: obtiene su carpeta.
const currentDir = dirname(fileURLToPath(import.meta.url));

//calcula la ruta hasta el .env de la raíz.
dotenv.config({
  path: resolve(currentDir, "../../../../.env"),
});

//crea pool que mantiene un conjunto de conexiones disponibles para que el backend pueda consultar PostgreSQL
// sin tener que abrir y cerrar una conexión manualmente para cada consulta.
export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  database: process.env.PGDATABASE,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
});
