const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'indice.html'));
});

// Rutas estáticas
app.get('/cursos', (req, res) => {
  res.sendFile(path.join(__dirname, 'cursos.html'));
});
app.get('/certificados', (req, res) => {
  res.sendFile(path.join(__dirname, 'certificados.html'));
});
app.get('/acerca-de', (req, res) => {
  res.sendFile(path.join(__dirname, 'acerca-de.html'));
});
app.get('/contactanos', (req, res) => {
  res.sendFile(path.join(__dirname, 'contactanos.html'));
});

// Aula virtual placeholder
app.get('/aula/:curso', (req, res) => {
  const curso = req.params.curso;
  res.send(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Aula - ${curso}</title>
        <link rel="stylesheet" href="/estilo.css">
      </head>
      <body>
        <nav style="position:fixed;top:12px;left:12px;right:12px;">
          <a href="/cursos.html" style="color:#fff">← Volver</a>
        </nav>
        <div style="max-width:1100px;margin:96px auto;padding:20px">
          <h1 style="color:var(--accent)">Aula: ${curso}</h1>
          <p style="color:var(--muted)">Bot instructor activo. Escribe tu pregunta abajo para comenzar.</p>

          <div class="bot-window">
            <div class="messages" id="messages">
              <div class="m
