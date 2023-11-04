// Dejo establecido campos iniciales para que se muestre mejor el desafío 
const tareas = [
    { id: 1, descripcion: "Tarea 1", completada: false },
    { id: 2, descripcion: "Tarea 2", completada: false },
    { id: 3, descripcion: "Tarea 3", completada: false }
];

// RESUMEN DE LAS TAREAS:
function mostrarResumen() {
    const totalTareas = tareas.length; // Calculo la longitud de las tareas totales
    const totalCompletadas = tareas.filter(tarea => tarea.completada).length; // Filtro las tareas completadas con .filter
    const resumen = document.querySelector('.resumen'); //tomo la clase resumen del html para agregar el total tareas y completadas con el .innerHTML
    resumen.innerHTML = `
        <p>Total de tareas: ${totalTareas}</p>
        <p>Tareas completadas: ${totalCompletadas}</p>
    `;
}

// LISTA DE TAREAS:
function mostrarListaTareas() {
    const listaTareas = document.querySelector('.tareas'); //tomo la clase tareas del html para mostrar el listado
    listaTareas.innerHTML = ''; // Limpio la lista temporal para luego agregar las tareas actualizadas
    tareas.forEach(tarea => { //Recorro cada tarea de mis tareas
        const tareaElement = document.createElement('div'); //creo un div por cada tarea que encuentro 
        tareaElement.innerHTML = ` 
            <p>${tarea.descripcion}</p>
            <button onclick="borrarTarea(${tarea.id})">Borrar</button>
            <label>
                <input type="checkbox" ${tarea.completada ? 'checked' : ''} onchange="marcarComoCompletada(${tarea.id})">
                ${tarea.completada ? 'Completa' : 'Pendiente'}
            </label>
        `; // con lo anterior:
            //creo un p con la descripción de la tarea
            //creo un botón que borra el elemento tarea de mis tareas
            // creo un checkbox que cambia la propiedad "completada" entre false y true, siendo posible altenarlas
        listaTareas.appendChild(tareaElement); //agrego la tarea dentro de la lista actualizada.
    });
}

// FUNCION NUEVA TAREA
function agregarTarea(descripcion) {
    const nuevaTarea = {
        id: tareas.length + 1, //agrego el ID correlativo
        descripcion: descripcion, // la descripción que define el usuario
        completada: false // estado inicial predeterminado
    };
    tareas.push(nuevaTarea); //metodo para agregar elemento al final del arreglo
    mostrarResumen(); //actualizamos resumen
    mostrarListaTareas(); //actualizamos lista de tareas
}

// FUNCION BORRAR TAREA
function borrarTarea(id) { // Declaro la funcion borrar tomando como argumento el "id"
    const indice = tareas.findIndex(tarea => tarea.id === id);
    // Utilizo método "findIndex" para buscar el id seleccionado dentro de cada elemento "tarea" en el arreglo "tareas". Guarda -1 si no lo encuentra

    if (indice !== -1) { // Valido si se encontro el "id"
        tareas.splice(indice, 1); // Utilizo el método "splice" para eliminar un solo elemento del arreglo "tareas" en la posición "indice".
        mostrarResumen(); // actualizo resumen
        mostrarListaTareas(); // actualizo lista tareas
    }
}

// Función para marcar una tarea como completada
function marcarComoCompletada(id) {
    const tarea = tareas.find(tarea => tarea.id === id); //Busco con find el input id y lo asigno a tarea
    if (tarea) { // valido si tarea encontro un el input id
        tarea.completada = !tarea.completada; //dado que encontro el valor, invierte el valor de completada entre true y false
        mostrarResumen(); //actualizo resumen
        mostrarListaTareas(); //actualizo lista tareas
    }
}

// Event listener para el botón de agregar tarea
document.getElementById('agregarTarea').addEventListener('click', () => { //activa el id agregartarea al hacer clic
    const descripcion = document.getElementById('descripcionTarea').value; //asigno el input de descripcion al dato descripcion
    if (descripcion.trim() !== '') { //valido los espacios en blanco
        agregarTarea(descripcion); //si no esta blanco, se crea la tarea
        document.getElementById('descripcionTarea').value = ''; //dejo el campo del html de descripcion en blanco para una nueva tarea
    }
});

// actualizamos el resumen y la lista de tareas
mostrarResumen();
mostrarListaTareas();
