document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-tarea');
  const input = document.getElementById('input-tarea');
  const lista = document.getElementById('lista-tareas');

  let tareas = JSON.parse(localStorage.getItem('tareas')) || [];

  function guardarTareas() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }

  function crearElementoTarea(texto, completada = false) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = texto;
    if (completada) span.classList.add('completed');

    // Toggle completada
    span.addEventListener('click', () => {
      span.classList.toggle('completed');
      const index = tareas.findIndex(t => t.texto === texto);
      if (index !== -1) {
        tareas[index].completada = !tareas[index].completada;
        guardarTareas();
      }
    });

    // Botón eliminar con tooltip
    const botonEliminar = document.createElement('button');
    botonEliminar.classList.add('tooltip');
    botonEliminar.innerHTML = '❌';

    const textoTooltip = document.createElement('span');
    textoTooltip.classList.add('tooltiptext');
    textoTooltip.textContent = 'Eliminar esta tarea';
    botonEliminar.appendChild(textoTooltip);

    botonEliminar.addEventListener('click', () => {
      li.remove();
      tareas = tareas.filter(t => t.texto !== texto);
      guardarTareas();
    });

    li.appendChild(span);
    li.appendChild(botonEliminar);
    lista.appendChild(li);
  }
  

  tareas.forEach(t => crearElementoTarea(t.texto, t.completada));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const texto = input.value.trim();
    if (texto === '') return;

    crearElementoTarea(texto);
    tareas.push({ texto, completada: false });
    guardarTareas();
    input.value = '';
  });
});
// btn deletar todo
document.getElementById('btn-eliminar-todo').addEventListener('click', () => {
  if (confirm('¿Estás seguro de que quieres eliminar todas las tareas?')) {
    localStorage.removeItem('tareas');
    document.getElementById('lista-tareas').innerHTML = '';
  }
});

