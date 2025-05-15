document.addEventListener('DOMContentLoaded', () => {
 const form = document.getElementById('form-tarea');
 const input = document.getElementById('input-tarea');
 const lista = document.getElementById('lista-tareas');
 form.addEventListener('submit', (e) => {
 e.preventDefault();
 const texto = input.value.trim();
 if (texto === '') return;
 const li = document.createElement('li');
 const span = document.createElement('span');
 span.textContent = texto;
 // Evento para marcar como completada
 span.addEventListener('click', () => {
 span.classList.toggle('completed');
 });
 // Botón de eliminar
 const botonEliminar = document.createElement('button');
 botonEliminar.textContent = ' ';
 botonEliminar.addEventListener('click', () => {
 li.remove();
 });
 li.appendChild(span);
 li.appendChild(botonEliminar);
 lista.appendChild(li);
 input.value = '';
 });
});




