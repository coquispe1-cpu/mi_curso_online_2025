// Importamos los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path'); // Para rutas absolutas

// Creamos una nueva instancia de la aplicación Express
const app = express();
const port = process.env.PORT || 3000; // Usa la variable de entorno si existe

// Middlewares para procesar las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// RUTA PARA EL REGISTRO
app.post('/register', (req, res) => {
    const { curso, nombre, email } = req.body;

    if (!curso || !nombre || !email) {
        // Validación básica de datos
        return res.status(400).send('Todos los campos son obligatorios.');
    }

    // Aquí puedes agregar la lógica para guardar los datos en una base de datos
    console.log('Datos de registro recibidos:');
    console.log(`Curso: ${curso}`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Email: ${email}`);

    // Respuesta al cliente
    res.status(200).send(`¡Registro exitoso para ${nombre} en el curso de ${curso}!`);
});

// Enviar index.html como página principal (opcional)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
