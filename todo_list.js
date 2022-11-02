/*Busca el valor del LocalStorage y si no lo encuentra, lo crea*/
let todoList = JSON.parse(localStorage.getItem("todoList"));
if (todoList === null) {
  let crearArchivo = [{ id: 0, cliente: "", fecha: "", check: "dontUse" }];
  localStorage.setItem("todoList", JSON.stringify(crearArchivo));
}

let id = todoList.length;

/*Agrega la información del LocalStorage mediante una tabla*/
const addTable = () => {
  document.getElementById("zonaFormulario").innerHTML = ``;
  let lista = document.getElementById("lista");

  lista.innerHTML = ``;
  for (let i = 0; i < todoList.length; i++) {
    if (todoList[i].check === "dontUse") {

    } else if (todoList[i].check === true) {

      let fila = document.createElement("tr");
      fila.innerHTML = `
          <td id="table_check" class="has-text-centered">${todoList[i].cliente}</td>
          <td id="table_check" class="has-text-centered">${todoList[i].fecha}</td>
          <td id="table_check" class="has-text-centered"><img src="img/button_check.png" alt="button_check"></td>
          <td class="has-text-centered"><button onclick="eliminarObjeto(${todoList[i].id})"><img src="img/delete.png" alt="delete"></button></button></td>`;
      lista.appendChild(fila);
    } else {

      let fila = document.createElement("tr");
      fila.innerHTML = `
          <td id="${todoList[i].id}" class="has-text-centered">${todoList[i].cliente}</td>
          <td id="${todoList[i].id}" class="has-text-centered">${todoList[i].fecha}</td>
          <td class="has-text-centered"><button onclick="check(${todoList[i].id})"><img src="img/button_unchecked.png" alt="button_unchecked"></button></td>
          <td class="has-text-centered"><button onclick="eliminarObjeto(${todoList[i].id})"><img src="img/delete.png" alt="delete"></button></td>`;
      lista.appendChild(fila);
    }
  }
};

/*Agrega al LocalStorage una tarea mas y luego ejecuta de nuevo la función addTable*/
const addTodo = (nombre, fecha) => {
  id++;
  todoList.push({ id: id, cliente: nombre, fecha: fecha, check: false });
  localStorage.setItem("todoList", JSON.stringify(todoList));
  addTable();
};

/*Elimina la información del LocalStorage y elimina la tabla*/
const eliminar = () => {
  id = 0;
  todoList = [];
  localStorage.setItem("todoList", JSON.stringify(todoList));
  addTable();
};

/*Se ejecuta cuando el usuario marca una tarea como "realizada" y cambia el estilo de esa acción*/
const check = (id) => {
  document.getElementById(id).id = "table_check";
  document.getElementById(id).id = "table_check";

  for (let i = 0; i < todoList.length; i++) {
    if (id === todoList[i].id) {
      todoList[i].check = true;
      localStorage.setItem("todoList", JSON.stringify(todoList));
      addTable();
    }
  }
  /*itemCheck = todoList.map((e) => {
    if(e.id === id){
      e.check = true
    }
  })*/
};

/*Elimina solo la tarea que marco el usuario, no toda la información*/
const eliminarObjeto = (id) => {
  for (let i = 0; i < todoList.length; i++) {
    if (id === todoList[i].id) {
      todoList.splice(i, 1);
      localStorage.setItem("todoList", JSON.stringify(todoList));
      addTable();
    }
  }
};

addTable();
