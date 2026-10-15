
import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({
    mensaje: "¡Bienvenido a Tyta!",
    descripcion: "Tranqui, yo te aviso."
  });
});

app.listen(PORT, () => {
  console.log(`Servidor de Tyta escuchando en http://localhost:${PORT}`);
});
