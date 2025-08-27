// server.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware: Servir archivos estáticos (CSS, JS, imágenes, videos)
app.use(express.static(path.join(__dirname, 'public')));

// ====== RUTAS DEFINIDAS ======
const rutas = [
  { url: '/', archivo: 'index.html' },
  { url: '/cursos', archivo: 'cursos.html' },
  { url: '/aulas-virtuales', archivo: 'aulas-virtuales.html' },
  { url: '/registro', archivo: 'registro.html' },
  { url: '/contactanos', archivo: 'contactanos.html' },
  { url: '/computacion-en-la-nube', archivo: 'computacion-en-la-nube.html' },
  { url: '/curso-especialista-recubrimientos', archivo: 'curso-especialista-recubrimientos.html' }
];

rutas.forEach(r => {
  app.get(r.url, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', r.archivo));
  });
});

// ====== CUALQUIER OTRA RUTA: INDEX ======
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ====== INICIAR SERVIDOR ======
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
