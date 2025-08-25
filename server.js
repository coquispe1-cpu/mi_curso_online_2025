const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 10000;

// Servir archivos desde la raíz del proyecto
app.use(express.static(__dirname));

// Aula virtual placeholder
app.get('/aula/:curso', (req, res) => {
  const curso = req.params.curso;
  res.send(`
    <!doctype html><html lang="es"><head>
      <meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Aula - ${curso}</title>
      <link rel="stylesheet" href="/estilo.css">
    </head><body>
      <nav style="position:fixed;top:12px;left:12px;right:12px;">
        <a href="/cursos.html" style="color:#fff">← Volver</a>
      </nav>
      <div style="max-width:1100px;margin:96px auto;padding:20px">
        <h1 style="color:var(--accent)">Aula: ${curso}</h1>
        <p style="color:var(--muted)">Bot instructor activo. Escribe tu pregunta abajo para comenzar.</p>

        <div class="bot-window">
          <div class="messages" id="messages">
            <div class="msg bot">Hola, soy tu asistente. ¿En qué puedo ayudarte hoy?</div>
          </div>
          <div class="bot-input">
            <input id="botInput" placeholder="Escribe tu pregunta..."/>
            <button class="btn" id="sendBtn">Enviar</button>
          </div>
          <div class="note small">Esta es una simulación de aula con un bot. En producción conectaremos la IA real.</div>
        </div>
      </div>

      <script>
        const messages = document.getElementById('messages');
        document.getElementById('sendBtn').addEventListener('click', async () => {
          const input = document.getElementById('botInput');
          const text = input.value.trim();
          if(!text) return;
          const u = document.createElement('div'); u.className='msg user'; u.innerText = text; messages.appendChild(u);
          input.value='';
          const b = document.createElement('div'); b.className='msg bot'; b.innerText = 'Procesando...';
          messages.appendChild(b);
          setTimeout(()=>{
            b.innerText = 'Respuesta del bot: excelente pregunta — en breve lo explico.';
            messages.scrollTop = messages.scrollHeight;
          }, 900);
        });
      </script>
    </body></html>
  `);
});

app.listen(PORT, () => console.log('Servidor iniciado en puerto', PORT));
