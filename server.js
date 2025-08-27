// main.rs

// Importar los módulos necesarios de Axum, Tokio y Serde.
// Axum es el framework web, Tokio es el runtime asíncrono,
// Serde se usa para serializar y deserializar JSON.
use axum::{
    extract::{self, State},
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use std::{net::SocketAddr, sync::Arc};
use tokio::sync::Mutex;

// Definir una estructura para el cuerpo de la solicitud de registro.
// Los campos 'curso', 'nombre', y 'email' se deserializarán
// automáticamente del JSON entrante.
#[derive(Deserialize, Debug)]
struct Registro {
    curso: String,
    nombre: String,
    email: String,
}

// Definir una estructura para el estado de la aplicación.
// En este caso, usaremos un "state" para simular una base de datos de registros.
// Arc<Mutex<Vec<Registro>>> permite que los datos se compartan de forma segura
// entre hilos asíncronos.
struct AppState {
    registros: Mutex<Vec<Registro>>,
}

// Handler para la ruta principal GET.
// Esta función responde con "¡Hola, mundo desde Rust!" para simular un
// 'index.html' simple, ya que Rust no sirve archivos estáticos por defecto
// de la misma manera que Express.js con `express.static`.
// La forma idiomática de servir archivos estáticos en Rust es con librerías dedicadas.
async fn root_handler() -> &'static str {
    "¡Hola, mundo desde Rust!"
}

// Handler para la ruta de registro POST.
// `Json<Registro>` extrae y deserializa automáticamente el cuerpo JSON de la
// solicitud en nuestra estructura `Registro`.
// `State<Arc<AppState>>` nos da acceso al estado de la aplicación para
// almacenar el nuevo registro.
async fn registrar_handler(
    State(app_state): State<Arc<AppState>>,
    extract::Json(registro): extract::Json<Registro>,
) -> String {
    // Bloquear el Mutex para obtener acceso exclusivo a los registros.
    let mut registros_lock = app_state.registros.lock().await;
    // Agregar el nuevo registro al vector.
    registros_lock.push(registro);
    // Imprimir el nuevo registro en la consola.
    println!(
        "Nuevo registro: {} ({}) en el curso: {}",
        registros_lock.last().unwrap().nombre,
        registros_lock.last().unwrap().email,
        registros_lock.last().unwrap().curso
    );
    // Devolver una respuesta exitosa.
    String::from("¡Registro exitoso! Te contactaremos pronto.")
}

// Función principal del servidor.
// #[tokio::main] es un macro que configura el runtime asíncrono de Tokio.
#[tokio::main]
async fn main() {
    // Crear una instancia del estado de la aplicación, envuelta en Arc para
    // poder compartirla entre los handlers.
    let app_state = Arc::new(AppState {
        registros: Mutex::new(Vec::new()),
    });

    // Definir las rutas del servidor.
    // .route("/", get(root_handler)) mapea la ruta GET '/' a `root_handler`.
    // .route("/registrar", post(registrar_handler)) mapea la ruta POST '/registrar' a `registrar_handler`.
    // .with_state(app_state) inyecta el estado de la aplicación en todas las rutas.
    let app = Router::new()
        .route("/", get(root_handler))
        .route("/registrar", post(registrar_handler))
        .with_state(app_state);

    // Definir la dirección y el puerto del servidor.
    // En Rust, la dirección y el puerto se definen explícitamente.
    // Axum se encarga de manejar la lógica del puerto de forma similar a Express.js,
    // pero aquí la definimos manualmente para mayor claridad.
    let addr = SocketAddr::from(([127, 0, 0, 1], 3000));
    println!("Servidor funcionando en puerto {}", addr.port());

    // Iniciar el servidor Axum.
    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
