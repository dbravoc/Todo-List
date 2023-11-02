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
    resumen.innerHTML = ` // d
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
function borrarTarea(id) { // Declaración de la función que toma un argumento "id"
    const indice = tareas.findIndex(tarea => tarea.id === id);
    // Utiliza el método "findIndex" para buscar la tarea en el arreglo "tareas" cuyo "id" coincida con el valor pasado como "id". "indice" almacenará el índice de la tarea en el arreglo, o -1 si no se encuentra.

    if (indice !== -1) { // Comprueba si se encontró una tarea (es decir, si "indice" no es igual a -1).
        tareas.splice(indice, 1);
        // Utiliza el método "splice" para eliminar un elemento del arreglo "tareas" en la posición "indice". El segundo argumento, en este caso, es 1, lo que significa que se eliminará solo un elemento.
        mostrarResumen(); // Llama a la función "mostrarResumen" para actualizar el resumen de tareas.
        mostrarListaTareas(); // Llama a la función "mostrarListaTareas" para actualizar la lista de tareas en la página.
    }
}
// HASTA AQUI VOOOOOY QUEDA MODIFICAR EL ANTERIOR JEJE

// Función para marcar una tarea como completada
function marcarComoCompletada(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.completada = !tarea.completada;
        mostrarResumen();
        mostrarListaTareas();
    }
}

// Event listener para el botón de agregar tarea
document.getElementById('agregarTarea').addEventListener('click', () => {
    const descripcion = document.getElementById('descripcionTarea').value;
    if (descripcion.trim() !== '') {
        agregarTarea(descripcion);
        document.getElementById('descripcionTarea').value = '';
    }
});

// Llama a las funciones iniciales
mostrarResumen();
mostrarListaTareas();
