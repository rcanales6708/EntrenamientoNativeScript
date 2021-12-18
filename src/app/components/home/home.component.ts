import { Component, OnInit } from '@angular/core';
import { ToDoList } from '../../classes/TodoList';
import { TodoItem } from '../../classes/TodoItem';
import { AppState } from '../../states/app.state';
import { Dialogs } from "@nativescript/core";
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { GetTodoLists, SetTodoLists } from '../../states/app.actions';

@Component({
  selector: 'ns-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  myLists: ToDoList[] = [];
  newTodoList: string = "";
  @Select(AppState.selectStateData) myLists$ : Observable<any>;

  constructor(private store: Store){}

  ngOnInit(): void {

    this.store.dispatch(new GetTodoLists());

    this.myLists$.subscribe((returnData) => {
      this.myLists = returnData;
    })

  }

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

    this.store.dispatch(new SetTodoLists(this.myLists));

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

        this.store.dispatch(new SetTodoLists(this.myLists));
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

        this.store.dispatch(new SetTodoLists(this.myLists));
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
        this.store.dispatch(new SetTodoLists(this.myLists));

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

        this.store.dispatch(new SetTodoLists(this.myLists));
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

    let options = {
      title: "Error",
      message: errorMessage,
      okButtonText: "OK"
    };

    Dialogs.alert(options).then(() => {
      //console.log("Ok pressed");
    });

  }

}
