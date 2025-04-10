// Elementos del DOM
const botonClick = document.getElementById("botonClick");
const marcador = document.getElementById("marcador");
const mensajePerdiste = document.getElementById("mensajePerdiste");
const mensajeGanaste = document.getElementById("mensajeGanaste");
const botonReset = document.getElementById("botonReset");
const contadorSegundos = document.getElementById("contadorSegundos");

// Variables del juego
let contadorClics = 0;
let tiempoInicio;
let tiempoIntervalo;
let segundos = 0;
let juegoTerminado = false;

// Configuración del juego
const OBJETIVO_CLICS = 100;
const TIEMPO_LIMITE = 17;
const TIEMPO_AMARILLO = 10;
const TIEMPO_ROJO = 15;

// Inicialización del juego
function inicializarJuego() {
    // Mostrar elementos necesarios
    marcador.style.display = "block";
    botonClick.style.display = "block";
    contadorSegundos.style.display = "block";
    
    // Ocultar elementos no necesarios
    mensajePerdiste.style.display = "none";
    mensajeGanaste.style.display = "none";
    botonReset.style.display = "none";

    // Reiniciar variables
    contadorClics = 0;
    segundos = 0;
    juegoTerminado = false;
    
    // Actualizar interfaz
    marcador.textContent = "0";
    contadorSegundos.textContent = "0s";
    contadorSegundos.className = "absolute top-4 right-4 orbitron text-4xl font-bold text-cyan-400";
}

// Función para iniciar el contador de tiempo
function iniciarContador() {
    tiempoInicio = new Date().getTime();
    tiempoIntervalo = setInterval(() => {
        if (juegoTerminado) return;
        
        segundos++;
        contadorSegundos.textContent = `${segundos}s`;
        
        // Cambiar color según el tiempo
        if (segundos >= TIEMPO_ROJO) {
            contadorSegundos.className = "absolute top-4 right-4 orbitron text-4xl font-bold text-red-500 countdown-animation";
        } else if (segundos >= TIEMPO_AMARILLO) {
            contadorSegundos.className = "absolute top-4 right-4 orbitron text-4xl font-bold text-yellow-500";
        }

        // Verificar si se acabó el tiempo
        if (segundos >= TIEMPO_LIMITE) {
            perder();
        }
    }, 1000);
}

// Función para manejar el clic del botón
botonClick.addEventListener("click", () => {
    if (juegoTerminado) return;
    
    // Iniciar contador en el primer clic
    if (contadorClics === 0) {
        iniciarContador();
    }

    contadorClics++;
    marcador.textContent = contadorClics;
    
    // Efecto visual al hacer clic
    botonClick.classList.remove('pulse-animation');
    void botonClick.offsetWidth; // Trigger reflow
    botonClick.classList.add('pulse-animation');

    // Verificar victoria
    if (contadorClics >= OBJETIVO_CLICS && segundos <= TIEMPO_LIMITE) {
        ganar();
    }
});

// Función para manejar la victoria
function ganar() {
    juegoTerminado = true;
    clearInterval(tiempoIntervalo);
    
    // Redirigir a la página de resultados con parámetros
    setTimeout(() => {
        window.location.href = `/Starclicker-app/result.html?resultado=victoria&clics=${contadorClics}&tiempo=${segundos}`;
    }, 1000);
}

// Función para manejar la derrota
function perder() {
    juegoTerminado = true;
    clearInterval(tiempoIntervalo);
    
    // Redirigir a la página de resultados con parámetros
    setTimeout(() => {
        window.location.href = `/Starclicker-app/result.html?resultado=derrota&clics=${contadorClics}&tiempo=${segundos}`;
    }, 1000);
}

// Función para reiniciar el juego
botonReset.addEventListener("click", () => {
    clearInterval(tiempoIntervalo);
    inicializarJuego();
});

// Inicializar el juego al cargar la página
window.addEventListener('load', inicializarJuego);

// Prevenir el uso de atajos de teclado o clics automáticos
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey || e.altKey || e.metaKey) {
        e.preventDefault();
    }
});

// Deshabilitar el menú contextual
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});
