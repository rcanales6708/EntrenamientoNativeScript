import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { ToDoList } from '../../classes/TodoList';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todoList : ToDoList = new ToDoList("");
  @Output() addTodoEvent = new EventEmitter<any>();
  @Output() deleteTodoEvent = new EventEmitter<any>();
  @Output() editTodoEvent = new EventEmitter<any>();
  @Output() completeTodoEvent = new EventEmitter<any>();

  constructor() { }

  newTodo: string = "";

  editedTodo: string = "";
  todoToEdit: string =  "";

  ngOnInit(): void {
  }

  /**
   * - Método para emitir un evento de creacion de Todo
   */
  addNewTodoOnClick() {

    this.addTodoEvent.emit({
      listName: this.todoList.listName,
      todoName: this.newTodo
    });

    this.newTodo = "";

  }

  /**
   * - Método para emitir un evento para borrar un todo
   */
  deleteTodoOnClick(todoName: string){

    this.deleteTodoEvent.emit({
      listName: this.todoList.listName,
      todoName: todoName
    });

  }

  /**
   * - Método para abrir el input editor de Todo
   */
  openEdit(toEdit: string){
    this.todoToEdit = toEdit;
    this.editedTodo = this.todoToEdit;
  }

  /**
   * - Método para emitir un evento de editar Todo
   */
  editTodoOnClick(){

    this.editTodoEvent.emit({
      listName: this.todoList.listName,
      todoName: this.todoToEdit,
      newName: this.editedTodo
    });

    this.todoToEdit = "";
    this.editedTodo = "";

  }

  /**
   * - Método para emitir un evento de Todo completo/incompleto
   */
  completeTodoOnClick(todoName: string, event: any){

    this.completeTodoEvent.emit({
      listName: this.todoList.listName,
      todoName: todoName,
      isComplete: event.target.checked
    });

  }

}
