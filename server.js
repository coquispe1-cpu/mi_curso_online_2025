const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Configura la ruta estática para que sirva los archivos de la carpeta 'public'
// La ruta es 'public' porque debe estar en el directorio raíz de tu proyecto
app.use(express.static(path.join(__dirname, 'public')));

// Ruta principal para servir index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
