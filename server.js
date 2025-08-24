const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Archivos de datos
const USERS_FILE = path.join(__dirname, 'users.json');
const ASISTENCIA_FILE = path.join(__dirname, 'asistencia.json');
const PAGOS_FILE = path.join(__dirname, 'pagos.json');
const CURSOS_FILE = path.join(__dirname, 'cursos.json'); // Nuevo archivo

// Crear archivos si no existen
if (!fs.existsSync(USERS_FILE)) fs.writeFileSync(USERS_FILE, JSON.stringify([]));
if (!fs.existsSync(ASISTENCIA_FILE)) fs.writeFileSync(ASISTENCIA_FILE, JSON.stringify([]));
if (!fs.existsSync(PAGOS_FILE)) fs.writeFileSync(PAGOS_FILE, JSON.stringify([]));
if (!fs.existsSync(CURSOS_FILE)) fs.writeFileSync(CURSOS_FILE, JSON.stringify([])); // Crea el archivo de cursos

// Cargar el bot administrador
require('./adminBot');

// Registro de usuario
app.post('/api/registro', (req, res) => {
    const { nombre, correo } = req.body;
    if (!nombre || !correo) return res.status(400).json({ error: 'Nombre y correo obligatorios' });
    const usuarios = JSON.parse(fs.readFileSync(USERS_FILE));
    usuarios.push({ nombre, correo, fecha: new Date() });
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));
    res.json({ message: 'Usuario registrado correctamente' });
});

// Control de asistencia
app.post('/api/asistencia', (req, res) => {
    const { correo } = req.body;
    if (!correo) return res.status(400).json({ error: 'Correo obligatorio' });
    let asistencia = JSON.parse(fs.readFileSync(ASISTENCIA_FILE));
    asistencia.push({ correo, fecha: new Date() });
    fs.writeFileSync(ASISTENCIA_FILE, JSON.stringify(asistencia, null, 2));
    res.json({ message: 'Asistencia registrada correctamente' });
});

// Pagos
app.post('/api/pagos', (req, res) => {
    const { correo, metodo } = req.body;
    if (!correo || !metodo) return res.status(400).json({ error: 'Correo y método obligatorios' });
    let pagos = JSON.parse(fs.readFileSync(PAGOS_FILE));
    pagos.push({ correo, metodo, fecha: new Date() });
    fs.writeFileSync(PAGOS_FILE, JSON.stringify(pagos, null, 2));
    res.json({ message: `Pago registrado con éxito (${metodo})` });
});

// NUEVO: API para obtener la lista de cursos
app.get('/api/cursos', (req, res) => {
    const cursos = JSON.parse(fs.readFileSync(CURSOS_FILE));
    res.json(cursos);
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
