// server.js
const express = require('express');
const path = require('path');
const app = express();

// Carpeta de archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
