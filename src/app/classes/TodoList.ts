import { TodoItem } from "./TodoItem";

export class ToDoList{

  private _items: TodoItem[];
  private _listName: string;

  constructor(listName:string){

    this._listName = listName;
    this._items = [];

  }

  public get listName(): string {

    return this._listName;

  }
  public set listName(value: string) {

    this._listName = value;

  }

  public get items(): TodoItem[] {

    return this._items;

  }
  public set items(items: TodoItem[]) {

    this._items = items;

  }

  public addItem(newItem: TodoItem){

    if(this._items.find(item => item.todoName === newItem.todoName)){

      throw new Error(`El todo "${newItem.todoName}" ya existe en la lista "${this._listName}"`);

    }else{

      this._items.push(newItem);

    }
  }

  public editItem(todoName:string, todoNewName: string){

    if(this._items.find(item => item.todoName === todoNewName)){

      throw new Error(`El todo "${todoNewName}" ya existe en la lista "${this._listName}"`);
      return;

    }

    const item = this._items.find(item => item.todoName === todoName);

    if (item) {

      item.todoName = todoNewName;

    }else{

      throw new Error(`El todo "${todoName}" no existe en la lista "${this._listName}"`);

    }

  }

  public markItemAsCompleteIncomplete(todoName:string, complete: boolean){

    const item = this._items.find(item => item.todoName === todoName);
    if(item){

      item.isComplete = complete;

    }else{

      throw new Error(`El todo "${todoName}" no existe en la lista "${this._listName}"`);

    }

  }

  public removeItem(todoName:string){

    const index = this._items.findIndex(item => item.todoName === todoName);

    if (index > -1) {

      this._items.splice(index, 1);

    }else{

      throw new Error(`El todo "${todoName}" no existe en la lista "${this._listName}"`);

    }

  }

}
