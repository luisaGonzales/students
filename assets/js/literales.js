'use strict';
const app = {
    estudiantes: [],
    botonAgregar: undefined,
    botonMostrar: undefined,
    botonTopTecnico: undefined,
    botonTopHSE: undefined,
    resultado: undefined,

    init: function () {
        // Elementos
        app.botonAgregar = $(`#agregar`);
        app.botonMostrar = $(`#mostrar`);
        app.botonTopTecnico = $(`#top-tecnico`);
        app.botonTopHSE = $(`#top-hse`);
        app.resultado = $(`#contenedor-estudiantes`);
        app.setup();
    },
    setup: function () {
        app.botonAgregar.click(app.eventoAgregar);
        app.botonMostrar.click(app.eventoMostrar);
        app.botonTopTecnico.click(app.eventoActualizar);
        app.botonTopHSE.click(app.eventoEmpleables);
    },
    eventoAgregar: function (e) {
        e.preventDefault();
        let estudiante = app.agregarEstudiante();
        app.resultado.html(app.mostrar(estudiante));
    },

    eventoMostrar: function (e) {
        e.preventDefault();
        let estudiantes = app.obtenerListaEstudiantes();
        app.resultado.html(app.mostrarLista(estudiantes));
    },

    eventoActualizar: function (e) {
        e.preventDefault();
        app.estudiantes = app.actualizar(app.estudiantes);
        app.resultado.html(app.mostrarLista(app.estudiantes));
    },

    eventoEmpleables: function (e) {
        e.preventDefault();
        let estudiantes = app.obtenerListaEstudiantes();
        let estudiantesEmpleables = app.empleables(estudiantes);
        app.resultado.html(app.mostrarLista(estudiantesEmpleables));
    },

    obtenerListaEstudiantes: function () {
        return app.estudiantes;
    },
    agregarEstudiante: function () {
        let userNombre = prompt(`¿Cuál es el nombre del estudiante?`);
        let userPuntosTecnicos = parseInt(prompt(`Ingresa el porcentaje técnico`));
        let userPuntosHSE = parseInt(prompt(`Ingresa el porcentaje de habilidades socio-emocionales`));
        let promedio = parseInt(userPuntosTecnicos + userPuntosHSE) / 2;
        let userEstado = 'Activo';

        if (userNombre != "" && userPuntosTecnicos != "" && userPuntosHSE != "") {
            if ((isNaN(userNombre)) && (!isNaN(userPuntosTecnicos)) && (!isNaN(userPuntosHSE))) {
                let estudiante = {
                    nombre: userNombre.charAt(0).toUpperCase() + userNombre.slice(1),
                    puntosTecnicos: userPuntosTecnicos,
                    puntosHSE: userPuntosHSE,
                    estado: userEstado,
                    promedio: promedio
                };
                app.estudiantes.push(estudiante);
                return estudiante;
            } else {
                alert(`No se ha ingresado alguno de los datos correctamente`);
                userNombre = prompt(`¿Cuál es el nombre del estudiante?`);
                userPuntosTecnicos = parseInt(prompt(`Ingresa el porcentaje técnico`));
                userPuntosHSE = parseInt(prompt(`Ingresa el porcentaje de habilidades socio-emocionales`));
                promedio = parseInt(userPuntosTecnicos + userPuntosHSE) / 2;
            }
        } else {
            alert(`No se ha ingresado alguno de los datos`);
            userNombre = prompt(`¿Cuál es el nombre del estudiante?`);
            userPuntosTecnicos = parseInt(prompt(`Ingresa el porcentaje técnico`));
            userPuntosHSE = parseInt(prompt(`Ingresa el porcentaje de habilidades socio-emocionales`));
            promedio = parseInt(userPuntosTecnicos + userPuntosHSE) / 2;
        }
    },
    mostrar: function (estudiante) {
        let resultado = ``;
        if (estudiante != undefined) {
            if (estudiante.nombre != null || estudiante.puntosTecnicos != null || estudiantes.puntosHSE != null) {
                resultado += `<div class='row'>`;
                resultado += `<div class='col m12'>`;
                resultado += `<div class='card teal grey darken-1'>`;
                resultado += `<div class='card-content white-text'>`;
                resultado += `<p><strong>Nombre:</strong> ${ estudiante.nombre} </p>`;
                resultado += `<p><strong>Puntos Técnicos:</strong> ${ estudiante.puntosTecnicos} </p>`;
                resultado += `<p><strong>Puntos HSE:</strong> ${ estudiante.puntosHSE} </p>`;
                resultado += `<p><strong>Estado:</strong> ${ estudiante.estado} </p>`;
                resultado += `</div>`;
                resultado += `</div>`;
                resultado += `</div>`;
                resultado += `</div>`;
            }
        }
        return resultado;
    },
    mostrarLista: function (estudiantes) {
        let resultado = ``;
        resultado += estudiantes.map(app.mostrar);
        return resultado;
    },
    actualizar: function (estudiantes) {
        let lista = app.empleables(estudiantes);
        return lista;
    },
    empleables: function (estudiantes) {
        let filtro = estudiantes.filter(function (estudiante) {
            return estudiante.promedio >= 70;
        });
        return filtro;
    }
}

$(document).ready(app.init);