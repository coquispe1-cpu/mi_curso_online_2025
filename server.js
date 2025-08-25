const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Carpeta pública
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de aulas virtuales (placeholder)
app.get('/aula/:curso', (req, res) => {
  const curso = req.params.curso;
  res.send(`
    <!doctype html>
    <html lang="es">
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
        <title>Aula - ${curso}</title>
        <link rel="stylesheet" href="/style.css">
      </head>
      <body>
        <nav><a href="/cursos.html">← Volver a Cursos</a></nav>
        <div class="aula-container">
          <h1>Aula: ${curso}</h1>
          <p>Esta es una simulación de aula virtual.</p>
        </div>
      </body>
    </html>
  `);
});

// Iniciar servidor
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
