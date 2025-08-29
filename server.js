const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const USERS_FILE = path.join(__dirname, 'users.json');
const PAGOS_FILE = path.join(__dirname, 'pagos.json');

function leerArchivo(filePath) {
  return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath)) : [];
}

function guardarArchivo(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Registro
app.post('/registro', (req, res) => {
  const { nombre, email, curso } = req.body;
  const usuarios = leerArchivo(USERS_FILE);
  usuarios.push({ nombre, email, curso });
  guardarArchivo(USERS_FILE, usuarios);
  res.redirect(`/pago.html?curso=${curso}`);
});

// Pago
app.post('/pago', (req, res) => {
  const { email, curso } = req.body;
  const pagos = leerArchivo(PAGOS_FILE);
  pagos.push({ email, curso, fecha: new Date() });
  guardarArchivo(PAGOS_FILE, pagos);
  res.redirect(`/aulas-virtuales.html?curso=${curso}`);
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
