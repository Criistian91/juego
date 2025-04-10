
const tablero = document.getElementById("tablero");
const botonTurno = document.getElementById("turnoBtn");
const costoConquista = {
    agua: 1,
    comida: 1,
    energia: 1
};

let turno = 1;
let conquistasRestantes = 2;

let recursos = {
    agua: 2,
    comida: 2,
    energia: 2
};

const aguaSpan = document.getElementById("agua");
const comidaSpan = document.getElementById("comida");
const energiaSpan = document.getElementById("energia");

const tiposRecurso = ["agua", "comida", "energia"];
const iconos = {
    agua: "💧",
    comida: "🌾",
    energia: "⚡"
};

const eventos = [
    { nombre: "🌧️ Lluvia abundante", descripcion: "+2 agua", efecto: () => recursos.agua += 2 },
    { nombre: "☀️ Sequía", descripcion: "-1 comida", efecto: () => recursos.comida = Math.max(0, recursos.comida - 1) },
    { nombre: "⚡ Tormenta eléctrica", descripcion: "-1 energía", efecto: () => recursos.energia = Math.max(0, recursos.energia - 1) },
    { nombre: "🌱 Buena cosecha", descripcion: "+2 comida", efecto: () => recursos.comida += 2 },
    { nombre: "🚫 Fallo técnico", descripcion: "-2 energía", efecto: () => recursos.energia = Math.max(0, recursos.energia - 2) }
];

const estadoGuardado = JSON.parse(localStorage.getItem("estadoJuego"));

for (let i = 0; i < 25; i++) {
    const celda = document.createElement("div");
    celda.className = "celda";

    let tipo = tiposRecurso[Math.floor(Math.random() * tiposRecurso.length)];

    if (estadoGuardado && estadoGuardado.celdas[i]) {
        tipo = estadoGuardado.celdas[i].recurso;
        if (estadoGuardado.celdas[i].conquistada) celda.classList.add("conquistada");
        if (estadoGuardado.celdas[i].enemiga) {
            celda.classList.add("enemiga");
            celda.textContent = iconos[tipo] + " 🔻";
        } else {
            celda.textContent = iconos[tipo];
        }
    } else {
        celda.textContent = iconos[tipo];
    }

    celda.dataset.recurso = tipo;

    celda.addEventListener("click", function conquistar() {
        if (celda.classList.contains("conquistada") || celda.classList.contains("enemiga")) return;

        if (conquistasRestantes <= 0) {
            alert("Ya usaste tus 2 intentos de conquista en este turno.");
            return;
        }

        const puedeConquistar = Object.entries(costoConquista).every(([recurso, cantidad]) =>
            recursos[recurso] >= cantidad
        );

        if (!puedeConquistar) {
            alert("No tenés suficientes recursos para conquistar esta celda.");
            return;
        }

        Object.entries(costoConquista).forEach(([recurso, cantidad]) => {
            recursos[recurso] -= cantidad;
        });

        celda.classList.add("conquistada");

        const tipo = celda.dataset.recurso;
        recursos[tipo]++;
        actualizarContador();

        conquistasRestantes--;
    });

    tablero.appendChild(celda);
}

function actualizarContador() {
    aguaSpan.textContent = recursos.agua;
    comidaSpan.textContent = recursos.comida;
    energiaSpan.textContent = recursos.energia;
}

botonTurno.addEventListener("click", () => {
    turno++;
    conquistasRestantes = 2;

    const evento = eventos[Math.floor(Math.random() * eventos.length)];
    evento.efecto();

    const celdasConquistadas = document.querySelectorAll(".celda.conquistada");
    celdasConquistadas.forEach(celda => {
        const tipo = celda.dataset.recurso;
        recursos[tipo]++;
    });

    const celdasDisponibles = Array.from(document.querySelectorAll(".celda:not(.conquistada):not(.enemiga)"));
    if (celdasDisponibles.length > 0) {
        const celdaEnemiga = celdasDisponibles[Math.floor(Math.random() * celdasDisponibles.length)];
        celdaEnemiga.classList.add("enemiga");
        celdaEnemiga.textContent += " 🔻";
    }

    actualizarContador();

    const lista = document.getElementById("eventos-lista");
    const nuevoEvento = document.createElement("li");
    nuevoEvento.textContent = `Turno ${turno}: ${evento.nombre} → ${evento.descripcion}`;
    lista.prepend(nuevoEvento);

    verificarResultado();
    guardarProgreso();
});

function verificarResultado() {
    const totalCeldas = document.querySelectorAll(".celda").length;
    const conquistadas = document.querySelectorAll(".celda.conquistada").length;
    const enemigas = document.querySelectorAll(".celda.enemiga").length;
    const libres = totalCeldas - conquistadas - enemigas;

    const porcentajeJugador = (conquistadas / totalCeldas) * 100;
    const porcentajeEnemigo = (enemigas / totalCeldas) * 100;

    if (porcentajeJugador > 60 || porcentajeEnemigo > 40 || libres === 0) {
        localStorage.removeItem("estadoJuego");

        if (porcentajeJugador > 60) {
            mostrarResultadoFinal("🏆 ¡Victoria!", "Conquistaste más del 60% del territorio.");
        } else if (porcentajeEnemigo > 40) {
            mostrarResultadoFinal("💀 Derrota", "El enemigo conquistó más del 40% del territorio.");
        } else {
            mostrarResultadoFinal("⚔️ Empate", "No hay más territorios disponibles.");
        }
    }
}

function mostrarResultadoFinal(titulo, mensaje) {
    const modal = document.getElementById("modal-final");
    const tituloModal = document.getElementById("modal-titulo");
    const mensajeModal = document.getElementById("modal-mensaje");

    tituloModal.textContent = titulo;
    mensajeModal.textContent = mensaje;
    modal.classList.remove("oculto");

    botonTurno.disabled = true;
    document.querySelectorAll(".celda").forEach(celda => celda.style.pointerEvents = "none");
}

function guardarProgreso() {
    const estado = {
        turno,
        recursos,
        conquistasRestantes,
        celdas: []
    };

    document.querySelectorAll(".celda").forEach(celda => {
        estado.celdas.push({
            conquistada: celda.classList.contains("conquistada"),
            enemiga: celda.classList.contains("enemiga"),
            recurso: celda.dataset.recurso
        });
    });

    localStorage.setItem("estadoJuego", JSON.stringify(estado));
}

function reiniciarJuego() {
    localStorage.removeItem("estadoJuego");
    location.reload();
}

if (estadoGuardado) {
    turno = estadoGuardado.turno;
    recursos = estadoGuardado.recursos;
    conquistasRestantes = estadoGuardado.conquistasRestantes;
    actualizarContador();
}
