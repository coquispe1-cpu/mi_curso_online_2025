// Importamos los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');

// Creamos una nueva instancia de la aplicación Express
const app = express();
const port = 3000; // Elige el puerto que quieras, 3000 es el estándar

// Middlewares para procesar las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Sirve archivos estáticos desde la carpeta 'public'
// Si tu index.html y otros archivos están en la raíz, puedes usar:
// app.use(express.static(__dirname));
// Pero es una buena práctica usar una carpeta 'public'
app.use(express.static('public'));

// RUTA PARA EL REGISTRO
// El front-end (index.html) envía una solicitud POST a /register
app.post('/register', (req, res) => {
    // Extraemos los datos del cuerpo de la solicitud (req.body)
    const { curso, nombre, email } = req.body;

    // Aquí iría la lógica para guardar los datos en una base de datos
    // o enviarlos a un servicio de email.
    // Por ahora, solo mostraremos los datos en la consola del servidor
    // y enviaremos una respuesta al cliente.

    console.log('Datos de registro recibidos:');
    console.log(`Curso: ${curso}`);
    console.log(`Nombre: ${nombre}`);
    console.log(`Email: ${email}`);

    // Enviamos una respuesta exitosa de vuelta al cliente (la página web)
    // El front-end recibirá este mensaje y lo mostrará al usuario
    res.status(200).send(`¡Registro exitoso para ${nombre} en el curso de ${curso}!`);
});

// Iniciamos el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
