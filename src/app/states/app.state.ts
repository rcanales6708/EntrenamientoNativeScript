import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { SetTodoLists, GetTodoLists } from '../actions/app.action';
import { StorageServiceService } from '../services/storage-service.service';
import { ToDoList } from '../classes/TodoList';

export class TodoListsStateModel {
  todoLists: any
}

@State<TodoListsStateModel>({
  name: 'appstate',
  defaults: {
    todoLists: []
  }
})

@Injectable()
export class AppState {

  constructor (private storageService: StorageServiceService){}

  @Selector()
  static selectStateData(state:TodoListsStateModel){
    return state.todoLists;
  }

  /**
   * - Método para actualizar el STATE desde el storage
   */
  @Action(GetTodoLists)
  getDataFromState(ctx: StateContext<TodoListsStateModel>) {

    const myLists: ToDoList[] = this.storageService.getTodoLists();

    const state= ctx.getState();
    ctx.setState({
      ...state,
      todoLists : myLists
    })

    return myLists;
  }

  /**
   * - Método para actualizar el storage y actualizar el STATE
   */
  @Action(SetTodoLists)
  addDataToState(ctx: StateContext<TodoListsStateModel>, { payload }: SetTodoLists) {

    this.storageService.setTodoLists(payload);

    const state=ctx.getState();
    ctx.patchState({
      ...state,
      todoLists: payload
    })


  }



}








