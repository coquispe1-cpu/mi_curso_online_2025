const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Esta línea de código es la clave para solucionar el error
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Ruta principal para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
