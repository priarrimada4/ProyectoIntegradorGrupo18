import app from "./app.ts";

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor de Tyta escuchando en http://localhost:${PORT}`);
});
