// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const USERS_FILE = path.join(__dirname, 'users.json');
const PAGOS_FILE = path.join(__dirname, 'pagos.json');
const MENSAJES_FILE = path.join(__dirname, 'mensajes.json');

function leerArchivo(filePath) {
    try {
        return fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf-8')) : [];
    } catch (e) {
        console.error(`Error al leer ${filePath}:`, e);
        return [];
    }
}

function guardarArchivo(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (e) {
        console.error(`Error al guardar en ${filePath}:`, e);
    }
}

// Registro de usuarios
app.post('/registro', (req, res) => {
    const { nombre, email, curso } = req.body;
    const usuarios = leerArchivo(USERS_FILE);
    usuarios.push({ nombre, email, curso });
    guardarArchivo(USERS_FILE, usuarios);
    res.redirect(`/cursos.html`);
});

// Pagos
app.post('/pago', (req, res) => {
    const { email, curso } = req.body;
    const pagos = leerArchivo(PAGOS_FILE);
    pagos.push({ email, curso, fecha: new Date() });
    guardarArchivo(PAGOS_FILE, pagos);
    res.redirect(`/aulas-virtuales.html?curso=${curso}`);
});

// Contacto
app.post('/enviar', (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Faltan campos obligatorios.' });
    }
    const mensajes = leerArchivo(MENSAJES_FILE);
    mensajes.push({ name, email, message, date: new Date().toISOString() });
    guardarArchivo(MENSAJES_FILE, mensajes);
    res.status(200).json({ status: 'success', message: 'Mensaje recibido con éxito.' });
});

app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
