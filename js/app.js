// ========================================
// LISTA DE TAREAS (caché local de lo que hay en Supabase)
// ========================================

let tasks = [];


// ========================================
// ELEMENTOS DEL HTML
// ========================================

const taskForm = document.getElementById("task-form");
const tasksContainer = document.getElementById("tasks-container");
const mensaje = document.getElementById("mensaje");


// ========================================
// CARGAR TAREAS DESDE SUPABASE
// ========================================

async function cargarTareas() {

    const { data, error } = await supabaseClient
        .from("tasks")
        .select("*")
        .order("created_at", { ascending: true });

    if (error) {
        mostrarMensaje("Error al cargar las tareas.");
        console.error(error);
        return;
    }

    tasks = data;

    mostrarTareas();
}


// ========================================
// CREAR UNA TAREA
// ========================================

taskForm.addEventListener("submit", async function(event) {

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
    // GUARDAR TAREA EN SUPABASE
    // ========================================

    const { error } = await supabaseClient
        .from("tasks")
        .insert([{
            title: title,
            description: description,
            completed: false,
            deadline: deadline,
            priority: priority
        }]);

    if (error) {
        mostrarMensaje("Error al crear la tarea.");
        console.error(error);
        return;
    }


    // Limpiar formulario
    taskForm.reset();


    // Mostrar mensaje
    mostrarMensaje("Tarea creada correctamente.");


    // Recargar tareas desde la base de datos
    await cargarTareas();
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

async function completarTarea(id) {

    const task = tasks.find(function(task) {

        return task.id === id;
    });

    if (!task) {
        return;
    }

    const { error } = await supabaseClient
        .from("tasks")
        .update({ completed: !task.completed })
        .eq("id", id);

    if (error) {
        mostrarMensaje("Error al actualizar la tarea.");
        console.error(error);
        return;
    }

    await cargarTareas();
}


// ========================================
// ELIMINAR TAREA
// ========================================

async function eliminarTarea(id) {

    const { error } = await supabaseClient
        .from("tasks")
        .delete()
        .eq("id", id);

    if (error) {
        mostrarMensaje("Error al eliminar la tarea.");
        console.error(error);
        return;
    }

    mostrarMensaje("Tarea eliminada.");

    await cargarTareas();
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
// CARGAR TAREAS AL INICIAR
// ========================================

cargarTareas();
