const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Ruta para verificar estado del servidor
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Rutas para términos y privacidad
app.get('/terminos', (req, res) => {
    res.send('<h1>Términos y Condiciones</h1><p>Estos son los términos y condiciones de Mi Curso en Línea.</p>');
});

app.get('/privacidad', (req, res) => {
    res.send('<h1>Política de Privacidad</h1><p>Esta es la política de privacidad de Mi Curso en Línea.</p>');
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
