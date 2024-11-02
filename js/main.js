// Variables y configuración inicial
const preguntas = [
    {
        pregunta: "¿En qué año fue fundado el Club Atlético River Plate?",
        opciones: ["1901", "1908", "1910", "1912"],
        correcta: 0
    },
    {
        pregunta: "¿Qué jugador de Boca hizo el recordado gol con el festejo de la 'gallinita'?",
        opciones: ["Martín Palermo", "Carlos Tevez", "Diego Maradona", "Juan Román Riquelme"],
        correcta: 1
    },
    {
        pregunta: "¿En qué fecha se jugó la final de la Copa Libertadores en Madrid?",
        opciones: ["09/12/18", "12/09/18", "10/12/18", "09/11/18"],
        correcta: 0
    },
    {
        pregunta: "¿Cuántas Copas Libertadores ha ganado Boca Juniors?",
        opciones: ["5", "6", "7", "8"],
        correcta: 1
    },
    {
        pregunta: "¿En qué año ganó River Plate su primera Copa Libertadores?",
        opciones: ["1986", "1975", "1996", "2000"],
        correcta: 0
    },
    {
        pregunta: "¿Quién fue el entrenador de Boca en el periodo 2003-2004?",
        opciones: ["Alfio Basile", "Carlos Bianchi", "Miguel Russo", "Mauricio Macri"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál es el apodo de los hinchas de River Plate?",
        opciones: ["Xeneizes", "Gallinas", "Diablos", "Piratas"],
        correcta: 1
    },
    {
        pregunta: "¿Qué equipo tiene más títulos de liga en Argentina?",
        opciones: ["River Plate", "Boca Juniors", "Independiente", "San Lorenzo"],
        correcta: 1
    },
    {
        pregunta: "¿Cuál de estos jugadores es ídolo de Boca Juniors?",
        opciones: ["Norberto Alonso", "Juan Román Riquelme", "Enzo Francescoli", "Hernán Crespo"],
        correcta: 1
    },
    {
        pregunta: "¿Qué estadio tiene mayor capacidad de público?",
        opciones: ["El Monumental", "La Bombonera", "Libertadores de América", "José Amalfitani"],
        correcta: 0
    },
    {
        pregunta: "¿Quién fue el entrenador de Boca Juniors en la final de la Copa Libertadores 2018?",
        opciones: ["Sebastián Battaglia", "Hugo Ibarra", "Rodolfo Arruabarrena", "Guillermo Barros Schelotto"],
        correcta: 3
    },
    {
        pregunta: "¿En qué año se disputó el famoso superclásico del 'Ramirazo' en La Bombonera?",
        opciones: ["2013", "2015", "2014", "2012"],
        correcta: 2
    }
];
let preguntaActual = 0;
let puntaje = 0;
const highScore = localStorage.getItem('highScore') || 0;
document.getElementById('high-score').textContent = highScore;

// Clase Quiz
class Quiz {
    constructor(preguntas) {
        this.preguntas = _.shuffle(preguntas); // Usamos lodash para mezclar las preguntas
    }

    obtenerPreguntaActual() {
        return this.preguntas[preguntaActual];
    }

    verificarRespuesta(opcion) {
        const esCorrecto = opcion === this.obtenerPreguntaActual().correcta;
        if (esCorrecto) puntaje++;
        return esCorrecto;
    }

    avanzarPregunta() {
        preguntaActual++;
        if (preguntaActual >= this.preguntas.length) {
            this.finalizarQuiz();
        } else {
            mostrarPregunta();
        }
    }

    finalizarQuiz() {
        alert(`¡Quiz finalizado! Puntaje final: ${puntaje}`);
        if (puntaje > highScore) {
            localStorage.setItem('highScore', puntaje);
            document.getElementById('high-score').textContent = puntaje;
        }
        reiniciarQuiz();
    }
}

// Función para mostrar pregunta
const mostrarPregunta = () => {
    const pregunta = quiz.obtenerPreguntaActual();
    const container = document.getElementById('question-container');
    container.innerHTML = `
        <h2>${pregunta.pregunta}</h2>
        ${pregunta.opciones.map((opcion, index) => `
            <div class="option" data-index="${index}">${opcion}</div>
        `).join('')}
    `;
    document.querySelectorAll('.option').forEach(op => {
        op.addEventListener('click', manejarClickOpcion);
    });
    document.getElementById('next-button').style.display = 'none';
};

// Manejar clic en una opción
const manejarClickOpcion = (event) => {
    const opcionSeleccionada = event.target.dataset.index;
    const esCorrecta = quiz.verificarRespuesta(Number(opcionSeleccionada));
    event.target.classList.add(esCorrecta ? 'correct' : 'wrong');
    document.querySelectorAll('.option').forEach(op => op.removeEventListener('click', manejarClickOpcion));
    document.getElementById('next-button').style.display = 'block';
};

// Manejar botón "Siguiente Pregunta"
document.getElementById('next-button').addEventListener('click', () => {
    quiz.avanzarPregunta();
});

// Reiniciar el quiz
const reiniciarQuiz = () => {
    preguntaActual = 0;
    puntaje = 0;
    quiz.preguntas = _.shuffle(quiz.preguntas);
    mostrarPregunta();
};

// Inicialización del quiz
const quiz = new Quiz(preguntas);
mostrarPregunta();
