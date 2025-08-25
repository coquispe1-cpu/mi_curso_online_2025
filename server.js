// server.js
const express = require('express');
const path = require('path');
const app = express();

// Puerto (Render usará process.env.PORT)
const PORT = process.env.PORT || 3000;

// Carpeta pública donde está tu HTML, CSS y videos
app.use(express.static(path.join(__dirname, '../public')));

// Redirige todas las rutas a index.html (opcional)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
