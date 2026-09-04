// ========================================
// LISTA DE TAREAS
// ========================================

let tasks = [];


// ========================================
// ELEMENTOS DEL HTML
// ========================================

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const mensaje = document.getElementById("mensaje");


// ========================================
// CREAR UNA TAREA
// ========================================

taskForm.addEventListener("submit", function(event) {

    // Evita que la página se recargue
    event.preventDefault();

    // Obtener los datos del formulario
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const deadline = document.getElementById("deadline").value;
    const priority = document.getElementById("priority").value;


    // ========================================
    // VALIDACIÓN
    // ========================================

    if (title === "") {
        mostrarMensaje("El título es obligatorio.");
        return;
    }

    if (description === "") {
        mostrarMensaje("La descripción es obligatoria.");
        return;
    }

    if (deadline === "") {
        mostrarMensaje("La fecha límite es obligatoria.");
        return;
    }


    // ========================================
    // CREAR OBJETO TAREA
    // ========================================

    const nuevaTarea = {

        id: Date.now(),

        title: title,

        description: description,

        completed: false,

        created_at: new Date().toISOString(),

        deadline: deadline,

        priority: priority
    };


    // ========================================
    // GUARDAR TAREA
    // ========================================

    tasks.push(nuevaTarea);


    // Limpiar formulario
    taskForm.reset();


    // Mostrar tareas
    mostrarTareas();


    // Mostrar mensaje
    mostrarMensaje("Tarea creada correctamente.");
});


// ========================================
// MOSTRAR TAREAS
// ========================================

function mostrarTareas() {

    // Limpiar el contenedor
    tasksContainer.innerHTML = "";


    // Si no existen tareas
    if (tasks.length === 0) {

        tasksContainer.innerHTML =
            "<p>No hay tareas registradas.</p>";

        return;
    }


    // Recorrer todas las tareas
    tasks.forEach(function(task) {

        // Crear tarjeta
        const taskCard = document.createElement("div");

        taskCard.classList.add("task-card");


        // Si está completada, agregar clase especial
        if (task.completed) {

            taskCard.classList.add("task-completed");
        }


        // Crear contenido
        taskCard.innerHTML = `

            <h3>${task.title}</h3>

            <p>
                <strong>Descripción:</strong>
                ${task.description}
            </p>

            <p>
                <strong>Fecha límite:</strong>
                ${task.deadline}
            </p>

            <p>
                <strong>Prioridad:</strong>
                ${task.priority}
            </p>

            <p>
                <strong>Estado:</strong>
                ${task.completed ? "Completada" : "Pendiente"}
            </p>

            <div class="task-actions">

                <button
                    class="complete-btn"
                    onclick="completarTarea(${task.id})"
                >
                    ${task.completed ? "Marcar pendiente" : "Completar"}
                </button>

                <button
                    class="delete-btn"
                    onclick="eliminarTarea(${task.id})"
                >
                    Eliminar
                </button>

            </div>
        `;


        // Agregar tarjeta al contenedor
        tasksContainer.appendChild(taskCard);
    });
}


// ========================================
// COMPLETAR TAREA
// ========================================

function completarTarea(id) {

    const task = tasks.find(function(task) {

        return task.id === id;
    });


    if (task) {

        task.completed = !task.completed;
    }


    mostrarTareas();
}


// ========================================
// ELIMINAR TAREA
// ========================================

function eliminarTarea(id) {

    tasks = tasks.filter(function(task) {

        return task.id !== id;
    });


    mostrarTareas();

    mostrarMensaje("Tarea eliminada.");
}


// ========================================
// MOSTRAR MENSAJES
// ========================================

function mostrarMensaje(texto) {

    mensaje.textContent = texto;


    setTimeout(function() {

        mensaje.textContent = "";

    }, 3000);
}


// ========================================
// MOSTRAR TAREAS AL INICIAR
// ========================================

mostrarTareas();