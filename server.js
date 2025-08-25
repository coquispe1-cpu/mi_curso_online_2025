// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Carpeta pública donde están tus HTML, CSS, imágenes y videos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para tus páginas específicas (opcional)
// Esto permite acceder directamente a cada curso o página
app.get('/curso-especialista-recubrimientos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/curso-especialista-recubrimientos.html'));
});

app.get('/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/registro.html'));
});

app.get('/cursos.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/cursos.html'));
});

// Ruta por defecto: index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
