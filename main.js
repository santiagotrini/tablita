const persons = JSON.parse(localStorage.getItem('persons')) || [];
updateTable();

function handleSubmit(event) {
  event.preventDefault();
  let nombre    = event.target.nombre.value;
  let apellido  = event.target.apellido.value;
  let edad      = event.target.edad.value;
  let n         = persons.length;
  let id        = !n ? 1 : (persons[n-1].id + 1);
  let newPerson = { id, nombre, apellido, edad };
  persons.push(newPerson);
  localStorage.setItem('persons', JSON.stringify(persons));
  updateTable();
  event.target.reset();
}

function handleClick(event) {
  // falta hacer esta funcion 
  // y probablemente dos mas, una para borrar y una para editar filas
  if (event.target.tagName == 'DIV') return; // clickeo el div, no hacemos nada
  let icon;
  if (event.target.tagName == 'BUTTON')
    icon = event.target.children[0];
  else {
    icon = event.target;
    let id = icon.dataset.personId;
    if (icon.classList.contains('fa-trash'))
      deleteRow(id);
    else 
      editRow(id);
  }
}

function updateTable() {
  let tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  for (let person of persons)
    tbody.append(createRow(person));
}

function createRow(person) {
  let tr = document.createElement('tr');
  let id;
  for (let key in person) {
    let td = document.createElement('td');
    td.textContent = person[key];
    tr.append(td);
  }
  let acciones = document.createElement('td');
  acciones.append(createButtons(person.id));
  tr.append(acciones);
  return tr;
}

function createButtons(id) {
  let div  = document.createElement('div');
  let btnd = document.createElement('button');
  let btne = document.createElement('button');
  let icnd = document.createElement('i');
  let icne = document.createElement('i');
  icnd.dataset.personId = id;
  icne.dataset.personId = id;
  icnd.classList.add('fa-solid', 'fa-trash');
  icne.classList.add('fa-solid', 'fa-pencil');
  btnd.append(icnd);
  btne.append(icne);
  div.append(btnd, btne);
  div.onclick = handleClick;
  return div;
}
