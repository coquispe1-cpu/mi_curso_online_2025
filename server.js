const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Esta línea le dice a Express que sirva archivos estáticos desde la carpeta 'src/public'
app.use(express.static(path.join(__dirname, 'src', 'public')));

// Esta ruta manejará las solicitudes a la página de inicio y enviará 'index.html'
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});
