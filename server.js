// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Carpeta pública donde están tus HTML, CSS, imágenes y videos
app.use(express.static(path.join(__dirname, 'public')));

// ====== RUTAS PARA TUS PÁGINAS ======

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Cursos
app.get('/cursos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/cursos.html'));
});

// Aula virtual
app.get('/aulas_virtuales', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/aulas_virtuales.html'));
});

// Registro
app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/registro.html'));
});

// Contáctanos
app.get('/contactanos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/contactanos.html'));
});

// Curso especial
app.get('/curso-especialista-recubrimientos', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/curso-especialista-recubrimientos.html'));
});

// ====== CUALQUIER OTRA RUTA: DEVUELVE INDEX ======
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
