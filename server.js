const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Archivo donde guardaremos los usuarios
const USERS_FILE = path.join(__dirname, 'users.json');

// Crear el archivo si no existe
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// API para registrar usuario
app.post('/api/registro', (req, res) => {
    const { nombre, correo } = req.body;
    if (!nombre || !correo) {
        return res.status(400).json({ error: 'Nombre y correo son obligatorios' });
    }

    const usuarios = JSON.parse(fs.readFileSync(USERS_FILE));
    usuarios.push({ nombre, correo, fecha: new Date() });
    fs.writeFileSync(USERS_FILE, JSON.stringify(usuarios, null, 2));

    res.json({ message: 'Usuario registrado correctamente' });
});

// API para marcar asistencia
app.post('/api/asistencia', (req, res) => {
    const { correo } = req.body;
    if (!correo) return res.status(400).json({ error: 'Correo es obligatorio' });

    const asistenciaFile = path.join(__dirname, 'asistencia.json');
    let asistencia = [];
    if (fs.existsSync(asistenciaFile)) {
        asistencia = JSON.parse(fs.readFileSync(asistenciaFile));
    }

    asistencia.push({ correo, fecha: new Date() });
    fs.writeFileSync(asistenciaFile, JSON.stringify(asistencia, null, 2));

    res.json({ message: 'Asistencia registrada correctamente' });
});

app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
require('./adminBot');

