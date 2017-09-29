'use strict';

class App {
    constructor() {
        this.estudiantes = [];
        this.botonAgregar = undefined;
        this.botonMostrar = undefined;
        this.botonTopTecnico = undefined;
        this.botonTopHSE = undefined;
        this.resultado = undefined
    }
    init() {
        // Elementos
        this.botonAgregar = $(`#agregar`);
        this.botonMostrar = $(`#mostrar`);
        this.botonTopTecnico = $(`#top-tecnico`);
        this.botonTopHSE = $(`#top-hse`);
        this.resultado = $(`#contenedor-estudiantes`);
        this.setup();
    }
    setup() {
        this.botonAgregar.click(() => {
                this.eventoAgregar();
            }
        );
        this.botonMostrar.click((e) => {
            this.eventoMostrar()
        });
        this.botonTopTecnico.click((e) => {
            this.eventoActualizar()
        });
        this.botonTopHSE.click((e) => {
            this.eventoEmpleables()
        });
    }
    eventoAgregar() {
        let estudiante = this.agregarEstudiante();
        console.log("cualquiera");
        this.resultado.html(this.mostrar(estudiante));
    }
    eventoMostrar() {

        let estudiantes = this.obtenerListaEstudiantes();
        this.resultado.html(this.mostrarLista(estudiantes));
    }

    eventoActualizar() {
        this.estudiantes = this.actualizar(this.estudiantes);
        this.resultado.html(this.mostrarLista(this.estudiantes));
    }
    eventoEmpleables() {

        let estudiantes = this.obtenerListaEstudiantes();
        let estudiantesEmpleables = this.empleables(estudiantes);
        this.resultado.html(this.mostrarLista(estudiantesEmpleables));
    }

    obtenerListaEstudiantes() {
        return this.estudiantes;
    }
    agregarEstudiante() {
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
                this.estudiantes.push(estudiante);
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
    }
    mostrar(estudiante) {
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
    }
    mostrarLista(estudiantes) {
        let resultado = ``;
        resultado += estudiantes.map(this.mostrar);
        return resultado;
    }
    actualizar(estudiantes) {
        let lista = this.empleables(estudiantes);
        return lista;
    }
    empleables(estudiantes) {
        let filtro = estudiantes.filter(function (estudiante) {
            return estudiante.promedio >= 70;
        });
        return filtro;
    }
}

$(document).ready(() => {
    let app = new App();
    app.init();
});