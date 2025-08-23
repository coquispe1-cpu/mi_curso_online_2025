const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configura la ruta estática para servir los archivos de la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Inicia el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
