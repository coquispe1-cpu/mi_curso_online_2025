// Importamos los módulos necesarios
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware para servir archivos estáticos desde el directorio actual
app.use(express.static(path.join(__dirname)));

// Middleware para parsear el cuerpo de las solicitudes JSON
app.use(express.json());

// Ruta principal que sirve el archivo index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Nuevo endpoint para manejar el registro de usuarios
app.post('/register', (req, res) => {
    // Obtenemos los datos del cuerpo de la solicitud
    const { curso, nombre, email } = req.body;
    
    // Validamos que todos los campos estén presentes
    if (!curso || !nombre || !email) {
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Aquí iría la lógica para guardar los datos en una base de datos o en un archivo
    console.log('Datos de registro recibidos:', { curso, nombre, email });

    // En una aplicación real, se devolvería una respuesta de éxito solo si el proceso de guardado fue exitoso
    // Por ahora, simulamos una respuesta exitosa
    res.status(200).send('Registro exitoso');
});

// Iniciamos el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
