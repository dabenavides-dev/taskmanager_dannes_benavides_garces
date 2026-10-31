// TaskManager - Dannes Benavides Garces - DWBG - Act. Integradora 2 - Opción B Custom Events
const STORAGE_KEY = 'tareas_v2_DWBG';
let tareas = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const eventoTareas = new CustomEvent('tareasActualizadas');
document.addEventListener('tareasActualizadas', actualizarDashboard);

const lista = document.getElementById('lista-tareas');
const form = document.getElementById('form-tarea');
const inputTitulo = document.getElementById('titulo');
const inputPrioridad = document.getElementById('prioridad');
const busqueda = document.getElementById('busqueda');
const filtroEstado = document.getElementById('filtro-estado');
const orden = document.getElementById('orden');

function guardarYNotificar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
  document.dispatchEvent(eventoTareas);
  render();
}

function actualizarDashboard() {
  const total = tareas.length;
  const completadas = tareas.filter(t => t.completada).length;
  document.getElementById('dashboard').textContent = `Total: ${total} | Pendientes: ${total - completadas} | Completadas: ${completadas}`;
}

function render() {
  let filtradas = tareas;
  const texto = busqueda.value.toLowerCase();
  if (texto) filtradas = filtradas.filter(t => t.titulo.toLowerCase().includes(texto));
  if (filtroEstado.value === 'Pendientes') filtradas = filtradas.filter(t => !t.completada);
  if (filtroEstado.value === 'Completadas') filtradas = filtradas.filter(t => t.completada);
  if (orden.value === 'prioridad') {
    const peso = { Alta: 3, Media: 2, Baja: 1 };
    filtradas = [...filtradas].sort((a,b) => peso[b.prioridad] - peso[a.prioridad]);
  } else {
    filtradas = [...filtradas].sort((a,b) => new Date(b.fecha) - new Date(a.fecha));
  }
  lista.innerHTML = filtradas.map(t => `
    <li class="${t.completada ? 'done' : ''}">
      <input type="checkbox" ${t.completada ? 'checked' : ''} onchange="toggle(${t.id})">
      <span>${t.titulo} [${t.prioridad}]</span>
      <button onclick="editar(${t.id})">Editar</button>
      <button onclick="eliminar(${t.id})">X</button>
    </li>
  `).join('');
}

form.addEventListener('submit', e => {
  e.preventDefault();
  tareas.push({ id: Date.now(), titulo: inputTitulo.value, completada: false, prioridad: inputPrioridad.value, fecha: new Date().toISOString() });
  inputTitulo.value = '';
  guardarYNotificar();
});

window.toggle = id => { const t = tareas.find(t=>t.id===id); if(t){ t.completada=!t.completada; guardarYNotificar(); } };
window.eliminar = id => { tareas = tareas.filter(t=>t.id!==id); guardarYNotificar(); };
window.editar = id => { const t = tareas.find(t=>t.id===id); const n = prompt('Editar:', t.titulo); if(n){ t.titulo=n; guardarYNotificar(); } };

busqueda.addEventListener('input', render);
filtroEstado.addEventListener('change', render);
orden.addEventListener('change', render);

async function cargarDesdeAPI() {
  if(tareas.length > 0) return;
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
    const data = await res.json();
    tareas = data.map(t => ({ id: Date.now()+t.id, titulo: t.title, completada: t.completed, prioridad: 'Media', fecha: new Date().toISOString() }));
    guardarYNotificar();
  } catch(e){ console.error(e); }
}

cargarDesdeAPI();
render();
actualizarDashboard();