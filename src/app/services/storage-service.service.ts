import { Injectable } from '@angular/core';
import { ToDoList } from '../classes/TodoList';
import { TodoItem } from '../classes/TodoItem';

@Injectable({
  providedIn: 'root'
})
export class StorageServiceService {

  constructor() { }

  /**
   * - Método para obtener Listas de Todo del Storage
   */
  getTodoLists(): ToDoList[]{

    let myLists : ToDoList[] = [];
    const retrieved = localStorage.getItem('myLists');

    if(retrieved){

      let retrievedLists = JSON.parse(retrieved);
      let todoList: ToDoList;
      let todoItem: TodoItem;

      for (const list of retrievedLists) {
        todoList = new ToDoList(list._listName);

        for (const item of list._items) {
          todoItem = new TodoItem(item._todoName,item._isComplete);
          todoList.items.push(todoItem);
        }
        myLists.push(todoList);
      }

    }

    return myLists;
  }

  /**
   * - Método para guardar Listas de Todo en el Storage
   */
  setTodoLists(myLists : ToDoList[]){

    const toStore :string = JSON.stringify(myLists);
    localStorage.setItem('myLists',toStore);

  }
}
