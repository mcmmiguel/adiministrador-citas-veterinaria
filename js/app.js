// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita];
        console.log(this.citas);
    }
}

class UI {
    imprimirAlerta(mensaje, tipo){
        // Crear div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo Error
        if(tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de Error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        // Quitar la alerta después de 3 seg
        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }

    imprimirCitas({citas}) {
        this.limpiarHTML()
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
            
            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class = "font-weight-bolder">Propietario: </span> ${propietario}
            `;
            
            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class = "font-weight-bolder">Teléfono: </span> ${telefono}
            `;
           
            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class = "font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class = "font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class = "font-weight-bolder">Síntomas: </span> ${sintomas}
            `;

            // Agregar los parrafos al divCitas
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);

            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);


        })
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();

// Datos de usuario
const citaObj = { //Recuerda tener atrbiuto name en el elemento Input con el mismo nombre que las propiedades
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}


//Registro de Eventos
eventListeners();
function eventListeners(){
    mascotaInput.addEventListener('input', datosCita);
    propietarioInput.addEventListener('input', datosCita);
    telefonoInput.addEventListener('input', datosCita);
    fechaInput.addEventListener('input', datosCita);
    horaInput.addEventListener('input', datosCita);
    sintomasInput.addEventListener('input', datosCita);

    formulario.addEventListener('submit', nuevaCita);
}


// Agrega datos ingresados al Objeto de Cita
function datosCita(e) {
    citaObj[e.target.name] = e.target.value; //Accedemos a la propiedad con el mismo valor el name del input y le asignamos el valor ingresado
}

// Valida y agrega una nueva cita a la clase de citas
function nuevaCita(e) {
    e.preventDefault();

    // Extraer la información del objeto de cita 
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    // Generar un ID unico
    citaObj.id = Date.now();

    // Creando una nueva cita 
    administrarCitas.agregarCita({...citaObj});  //se manda como argumento una copia del objeto para que al agregar nuevas citas no seas todas iguales a esta última

    // Reiniciar el Objeto para la validación
    reiniciarObjeto();

    // Reiniciar el formulario 
    formulario.reset();  //Esto no reinicia el objeto, solo los inputs

    //Mostrar el HTML
    ui.imprimirCitas(administrarCitas);


}

function reiniciarObjeto () {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';

    console.log(citaObj);
}