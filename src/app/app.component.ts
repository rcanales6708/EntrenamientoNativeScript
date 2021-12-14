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
  newTodoList: string = "";
  errorMessage: string = "";


  /**
   * - Método para solicitar nombre de la lista y crearla
   */
  addNewListOnClick(){

    this.createNewTodoList(this.newTodoList);

    this.newTodoList = "";

  }


  /**
   * - Método para crear una nueva lista de Todos
   */
  createNewTodoList = (listName: string | null ):void=>{

    if(listName == "" || listName == undefined){

      this.showError(`Se necesita un nombre para la lista.`)
      return;

    }

    if(this.todoListExists(listName)){

      this.showError(`La lista "${listName}" ya existe.`);
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

      this.showError(`Se necesita un nombre para el Todo.`);
      return;

    }

    if(this.todoListExists(listName)){

      try {
        const todo = new TodoItem(todoName);
        this.myLists.find(list => list.listName === listName )!.addItem(todo);
      }
      catch(e: any) {
        this.showError(e.message);
      }


    }else{

      this.showError(`La lista "${listName}" no existe.`);

    }

  }

  /**
   * - Método para editar un Todo con un nuevo nombre
   */
  editItemOfTodoList = (listName: string, todoName: string, todoNewname: string | null, ):void=>{

    if(todoNewname == "" || todoNewname == undefined || todoName == "" || todoName == undefined || listName == "" || listName == undefined){

      this.showError(`Se necesita el nuevo nombre.`);
      return;

    }

    if(this.todoListExists(listName)){

      try {
        this.myLists.find(list => list.listName === listName )!.editItem(todoName,todoNewname);
      }
      catch(e: any) {
        this.showError(e.message);
      }

    }else{

      this.showError(`La lista "${listName}" no existe.`);

    }
  }

  /**
   * - Método para borrar un Todo de una lista
   */
  deleteItemFromTodoList =  (listName: string, todoName: string ):void=>{

    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){

      this.showError(`Se necesita un nombre para el Todo.`);
      return;

    }

    if(this.todoListExists(listName)){

      try {
        this.myLists.find(list => list.listName === listName )!.removeItem(todoName);
      }
      catch(e: any) {
        this.showError(e.message);
      }

    }else{

      this.showError(`La lista "${listName}" no existe.`);

    }
  }

  /**
   * - Método para marcar un Todo como completo / incompleto
   */
  markTodoAsCompleteIncomplete = (listName: string, todoName: string, isComplete: boolean):void=>{

    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){

        this.showError(`Se necesita un nombre para el Todo.`);
        return;
    }

    if(this.todoListExists(listName)){

      try {
        this.myLists.find(list => list.listName === listName )!.markItemAsCompleteIncomplete(todoName, isComplete);
      }
      catch(e: any) {
        this.showError(e.message);
      }

    }else{

        this.showError(`La lista "${listName}" no existe.`);

    }
  }

  /** Util
   * - Método para validar si ya existe una lista con ese nombre
   */
  todoListExists = (TodoListName: string):boolean => {

    return this.myLists.find(list => list.listName === TodoListName) ? true: false;

  }

  showError(errorMessage: string){

    this.errorMessage = errorMessage;

    setTimeout(() => {
      this.errorMessage = "";
    }, 3000);

  }


}
