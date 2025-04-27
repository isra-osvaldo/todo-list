const $inputTarea = document.querySelector('#input-tarea')
const $btnAgregarTarea = document.querySelector('#btn-agregarTarea')
const $listaTareas = document.querySelector('#lista-tareas')
const $cuentaTareas = document.querySelector('#cuenta-tareas')
const $cuentaCompletadas = document.querySelector('#cuente-completadas')
const $tbody = document.querySelector('#tbody')

const arrayTareas = [
    {id: Math.floor(Math.random() * 100), nombre: 'Hacer ejercicios', completado: false},
    {id: Math.floor(Math.random() * 100), nombre: 'Estudiar', completado: false},
    {id: Math.floor(Math.random() * 100), nombre: 'Aprender JavaScript', completado: false},
]

const arrayCompleted = []

renderTareas()

$btnAgregarTarea.addEventListener('click', () => {
    if ($inputTarea.value === '') return
    arrayTareas.push({id: Math.floor(Math.random() * 100), nombre: $inputTarea.value, completado: false})
    $inputTarea.value = ''
    renderTareas()
})

const eliminarTarea = (id) => {
    const index = arrayTareas.findIndex(tarea => tarea.id === id) 
    arrayTareas.splice(index, 1) 
    renderTareas()  
}

function changeStatus(id) {
    const task = arrayTareas.find(tarea => tarea.id === id)
    task.completado = !task.completado
    renderTareas()
}


function renderTareas() {
    let html = ''
    arrayTareas.forEach(tarea => {
        html += `<tr class="fila">
                    <td><span class="${tarea.completado ? "text-green tachado" : ""}">${tarea.id}</span> </td>
                    <td class="${tarea.completado ? "text-green tachado" : ""}"><span>${tarea.nombre}</span></td>
                    <td><label class="checkbox-container">
                            <input class="checkbox" onclick="changeStatus(${tarea.id})" type="checkbox" ${tarea.completado ? 'checked' : ''}/>  
                            <span class="checkmark"></span>
                        </label></td>
                    <td><a class="trash" onclick="eliminarTarea(${tarea.id})"><i class="fa-solid fa-xmark fa-lg" style="color: #d10000;font-size: 1.4em;"></i></a></td>
            </tr>`
    })

    $tbody.innerHTML = html
    
    const getCompleted =  arrayTareas.filter(tarea => tarea.completado === true).length
    $cuentaTareas.innerHTML = `<p class="negrita">Total: ${arrayTareas.length}</p>`
    $cuentaCompletadas.innerHTML = `<p class="text-green negrita">Realizadas: ${getCompleted}</p>`

}