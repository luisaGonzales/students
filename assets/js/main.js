'use strict';
let estudiantes = [];

function init() {
    // Elementos
    let botonAgregar = $("#agregar");
    let botonMostrar = $("#mostrar");
    let botonTopTecnico = $("#top-tecnico");
    let botonTopHSE = $("#top-hse");
    let resultado = $("#contenedor-estudiantes");
    

    // Evento Click - Agregar
    let eventoAgregar = function (e) {
        e.preventDefault();
        let estudiante = agregarEstudiante();
        resultado.html(mostrar(estudiante));
    };

    let eventoMostrar = function (e) {
        e.preventDefault();
        let estudiantes = obtenerListaEstudiantes();
        resultado.html(mostrarLista(estudiantes));
    };

    let eventoActualizar = function (e) {
        e.preventDefault();
        estudiantes = actualizar(estudiantes);
        resultado.html(mostrarLista(estudiantes));
    };

    let eventoEmpleables = function (e) {
        e.preventDefault();
        let estudiantes = obtenerListaEstudiantes();
        let estudiantesEmpleables = empleables(estudiantes);
        resultado.html(mostrarLista(estudiantesEmpleables));
    };

    // Manejadores de eventos
    botonAgregar.click(eventoAgregar);
    botonMostrar.click(eventoMostrar);
    botonTopTecnico.click(eventoActualizar);
    botonTopHSE.click(eventoEmpleables);
}
init(estudiantes);

function obtenerListaEstudiantes() {
    return estudiantes;
}

function agregarEstudiante() {
    let userNombre = prompt("¿Cuál es el nombre del estudiante?");
    let userPuntosTecnicos = parseInt(prompt("Ingresa el porcentaje técnico"));
    let userPuntosHSE = parseInt(prompt("Ingresa el porcentaje de habilidades socio-emocionales"));
    let userEstado = 'Activo';
    let promedio = parseInt(userPuntosTecnicos + userPuntosHSE)/2;

    let estudiante = {
        nombre: userNombre.charAt(0).toUpperCase() + userNombre.slice(1),
        puntosTecnicos: userPuntosTecnicos,
        puntosHSE: userPuntosHSE,
        estado: userEstado,
        promedio : promedio
    };
    
    estudiantes.push(estudiante);
    return estudiante;
}

function mostrar(estudiante) {
    let resultado = "";
    resultado += "<div class='row'>";
    resultado += "<div class='col m12'>";
    resultado += "<div class='card teal grey darken-1'>";
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
    let lista = empleables(estudiantes);
    return lista;
}

function empleables(estudiantes) {
    let filtro = estudiantes.filter(function(estudiante){
        return estudiante.promedio >= 70;
    });
    return filtro;
}