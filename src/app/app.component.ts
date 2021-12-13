import { Component } from '@angular/core';
import { ToDoList } from './classes/TodoList';
import { TodoItem } from './classes/TodoItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  myLists: ToDoList[] = [];

  /**
   * - Método para solicitar nombre de la lista y crearla
   */
  addNewListOnClick(){

    const listName: string | null = prompt("Nombre de la lista");
    this.createNewTodoList(listName);

  }

  /**
   * - Método para solicitar nombre del todo y crearlo
   */
  addNewTodoOnClick(todoListName: string){

    const todoName: string | null = prompt("Nombre del Todo");
    this.addItemToTodoList(todoListName, todoName);

  }

  /**
   * - Método para solicitar el nuevo nombre del todo y editarlo
   */
  editTodoOnClick(listName: string, todoName: string){

    const todoNewName: string | null = prompt("Nuevo nombre del Todo",todoName);
    this.editItemOfTodoList(listName, todoName, todoNewName );

  }

  /**
   * - Método para eliminar un Todo
   */
  deleteTodoOnClick(listName: string, todoName: string){

    this.deleteItemFromTodoList(listName, todoName);

  }

  /**
   * - Método para capturar el valor de checkbox y marcar un Todo completo/incompleto
   */
  completeTodoOnClick(listName: string, todoName: string, event: any){

    this.markTodoAsCompleteIncomplete(listName, todoName, event.target.checked)

  }



  /**
   * - Método para crear una nueva lista de Todos
   */
  createNewTodoList = (listName: string | null ):void=>{

    if(listName == "" || listName == undefined){

        alert(`Se necesita un nombre para la lista.`);
        return;

    }

    if(this.todoListExists(listName)){

        alert(`La lista "${listName}" ya existe.`);
        return;

    }

    const todoList = new ToDoList(listName);

    this.myLists.push(todoList);

  }

  /**
   * - Método para agregar un todo a una lista
   */
  addItemToTodoList = (listName: string, todoName: string | null):void=>{

    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){

      alert(`Se necesita un nombre para la lista y el Todo.`);
      return;

    }

    if(this.todoListExists(listName)){

      const todo = new TodoItem(todoName);
      this.myLists.find(list => list.listName === listName )!.addItem(todo);

    }else{

      alert(`La lista "${listName}" no existe.`);

    }

  }

  /**
   * - Método para editar un Todo con un nuevo nombre
   */
  editItemOfTodoList = (listName: string, todoName: string, todoNewname: string | null, ):void=>{

    if(todoNewname == "" || todoNewname == undefined || todoName == "" || todoName == undefined || listName == "" || listName == undefined){

      alert(`Se necesita un nombre para la lista, el Todo y el nuevo nombre.`);
      return;

    }

    if(this.todoListExists(listName)){

      this.myLists.find(list => list.listName === listName )!.editItem(todoName,todoNewname);

    }else{

      alert(`La lista "${listName}" no existe.`);

    }
  }

  /**
   * - Método para borrar un Todo de una lista
   */
  deleteItemFromTodoList =  (listName: string, todoName: string ):void=>{

    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){

      alert(`Se necesita un nombre para la lista y el Todo.`);
      return;

    }

    if(this.todoListExists(listName)){

      this.myLists.find(list => list.listName === listName )!.removeItem(todoName);

    }else{

      alert(`La lista "${listName}" no existe.`);

    }
  }

  /**
   * - Método para marcar un Todo como completo / incompleto
   */
  markTodoAsCompleteIncomplete = (listName: string, todoName: string, isComplete: boolean):void=>{

    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){

        alert(`Se necesita un nombre para la lista y el Todo.`);
        return;
    }

    if(this.todoListExists(listName)){

        this.myLists.find(list => list.listName === listName )!.markItemAsCompleteIncomplete(todoName, isComplete);

    }else{

        alert(`La lista "${listName}" no existe.`);

    }
  }

  /** Util
   * - Método para validar si ya existe una lista con ese nombre
   */
  todoListExists = (TodoListName: string):boolean => {

    return this.myLists.find(list => list.listName === TodoListName) ? true: false;

  }







}
