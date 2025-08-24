const fs = require('fs');
const path = require('path');
const USERS_FILE = path.join(__dirname, 'users.json');
const ASISTENCIA_FILE = path.join(__dirname, 'asistencia.json');
const PAGOS_FILE = path.join(__dirname, 'pagos.json');

function leerArchivo(filePath) {
    if (!fs.existsSync(filePath)) return [];
    return JSON.parse(fs.readFileSync(filePath));
}

function botAdmin() {
    const usuarios = leerArchivo(USERS_FILE);
    const asistencia = leerArchivo(ASISTENCIA_FILE);
    const pagos = leerArchivo(PAGOS_FILE);

    console.log('--- REPORTE DEL CURSO ---');
    console.log(`Usuarios registrados: ${usuarios.length}`);
    console.log(`Asistencias marcadas: ${asistencia.length}`);
    console.log(`Pagos realizados: ${pagos.length}`);

    if (usuarios.length === 0) console.log('⚠️ No hay usuarios registrados.');
    if (asistencia.length < usuarios.length) console.log('⚠️ Algunos usuarios no marcaron asistencia.');
    if (pagos.length < usuarios.length) console.log('⚠️ Algunos usuarios no han realizado pagos.');

    console.log('--- FIN DEL REPORTE ---\n');
}

setInterval(botAdmin, 60000);
console.log('Bot Administrador iniciado. Revisando registros cada 60 segundos...');
