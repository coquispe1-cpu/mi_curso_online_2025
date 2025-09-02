// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
const { Pool } = require('pg'); // PostgreSQL

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Conexión a PostgreSQL (Render te da DATABASE_URL en variables de entorno)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // necesario para Render
});

// Inicializar tablas si no existen
(async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre TEXT,
        email TEXT,
        curso TEXT
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pagos (
        id SERIAL PRIMARY KEY,
        email TEXT,
        curso TEXT,
        fecha TIMESTAMP DEFAULT NOW()
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS mensajes (
        id SERIAL PRIMARY KEY,
        name TEXT,
        email TEXT,
        message TEXT,
        date TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log("✅ Tablas listas en PostgreSQL");
  } catch (err) {
    console.error("❌ Error creando tablas:", err);
  }
})();

// Rutas
app.post('/registro', async (req, res) => {
  const { nombre, email, curso } = req.body;
  try {
    await pool.query(
      "INSERT INTO usuarios (nombre, email, curso) VALUES ($1, $2, $3)",
      [nombre, email, curso]
    );
    res.redirect(`/pago.html?curso=${curso}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el registro");
  }
});

app.post('/pago', async (req, res) => {
  const { email, curso } = req.body;
  try {
    await pool.query(
      "INSERT INTO pagos (email, curso) VALUES ($1, $2)",
      [email, curso]
    );
    res.redirect(`/aulas-virtuales.html?curso=${curso}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error en el pago");
  }
});

app.post('/enviar', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }
  try {
    await pool.query(
      "INSERT INTO mensajes (name, email, message) VALUES ($1, $2, $3)",
      [name, email, message]
    );
    res.status(200).json({ status: "success", message: "Mensaje recibido con éxito." });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error guardando mensaje");
  }
});

// Inicia servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
