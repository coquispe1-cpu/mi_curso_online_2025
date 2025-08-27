const express = require('express');
const path = require('path');
const app = express();

// Middleware para JSON
app.use(express.json());

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para procesar el formulario de registro
app.post('/registrar', (req, res) => {
  const { curso, nombre, email } = req.body;
  console.log(`Nuevo registro: ${nombre} (${email}) en el curso: ${curso}`);
  res.send('¡Registro exitoso! Te contactaremos pronto.');
});

// Puerto para Render (usa el puerto asignado o 3000 en local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor funcionando en puerto ${PORT}`));
