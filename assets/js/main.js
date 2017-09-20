let estudiantes = [];

function init() {
    // Elementos
    let botonAgregar = document.getElementById("agregar");
    let botonMostrar = document.getElementById("mostrar");
    let botonTopTecnico = document.getElementById("top-tecnico");
    let botonTopHSE = document.getElementById("top-hse");
    let resultado = document.getElementById("contenedor-estudiantes");

    // Evento Click - Agregar
    let eventoAgregar = function (e) {
        e.preventDefault();
        let estudiante = agregarEstudiante();
        resultado.innerHTML = mostrar(estudiante);
    };

    let eventoMostrar = function (e) {
        e.preventDefault();
        let estudiantes = obtenerListaEstudiantes();
        resultado.innerHTML = mostrarLista(estudiantes);
    };

    let eventoTopTecnico = function (e) {
        e.preventDefault();
        let estudiantes = obtenerListaEstudiantes();
        let estudiantesActualizacion = actualizar(estudiantes);
        resultado.innerHTML = mostrarLista(estudiantesActualizacion);
    };

    let eventoTopHSE = function (e) {
        e.preventDefault();
        let estudiantes = obtenerListaEstudiantes();
        let estudiantesEmpleables = empleables(estudiantes);
        resultado.innerHTML = mostrarLista(estudiantesEmpleables);
    };

    // Manejadores de eventos
    botonAgregar.addEventListener("click", eventoAgregar);
    botonMostrar.addEventListener("click", eventoMostrar);
    botonTopTecnico.addEventListener("click", eventoTopTecnico);
    botonTopHSE.addEventListener("click", eventoTopHSE);
}
init();

function obtenerListaEstudiantes() {
    return estudiantes;
}

function agregarEstudiante() {
    let userNombre = prompt("¿Cuál es el nombre del estudiante?");
    let userPuntosTecnicos = prompt("Ingresa tus puntos técnicos");
    let userPuntosHSE = prompt("Ingresa tus puntos de habilidades socio-emocionales");
    let userEstado = 'Activo';

    let estudiante = {
        nombre: userNombre,
        puntosTecnicos: userPuntosTecnicos,
        puntosHSE: userPuntosHSE,
        estado: userEstado
    };
    
    estudiantes.push(estudiante);
    return estudiante;
}

function mostrar(estudiante) {
    let resultado = "";
    resultado += "<div class='row'>";
    resultado += "<div class='col m12'>";
    resultado += "<div class='card blue-grey darken-1'>";
    resultado += "<div class='card-content white-text'>";
    resultado += "<p><strong>Nombre:</strong> " + estudiante.nombre + "</p>";
    resultado += "<p><strong>Puntos Técnicos:</strong> " + estudiante.puntosTecnicos + "</p>";
    resultado += "<p><strong>Puntos HSE:</strong> " + estudiante.puntosHSE + "</p>";
    resultado += "<p><strong>Estado:</strong> " + estudiante.estado + "</p>";
    resultado += "</div>";
    resultado += "</div>";
    resultado += "</div>";
    resultado += "</div>";
    return resultado;
}

function mostrarLista(estudiantes) {
    let resultado = "";
    resultado += estudiantes.map(mostrar);
    return resultado;
}

function actualizar(estudiantes) {
    return estudiantes.sort(function (a, b) {
        return (b.puntosTécnicos - a.puntosTécnicos)
    });
}

function empleables(estudiantes) {
    let filtro = estudiantes.filter(function(estudiante){
        return estudiante.puntosTecnicos >= 70;
    });
    return filtro;
}