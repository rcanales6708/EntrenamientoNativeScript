import { ToDoList } from '../classes/TodoList';
import { TodoItem } from '../classes/TodoItem';

export function setupTodoLists() : ToDoList[] {

  let todoItem : TodoItem;
  let todoList: ToDoList;
  let todoLists: ToDoList[]=[];

  todoList = new ToDoList("Tareas de Casa");
  todoItem = new TodoItem("Barrer", true);
  todoList.items.push(todoItem);
  todoItem = new TodoItem("Trapear");
  todoList.items.push(todoItem);

  todoLists.push(todoList);

  todoList = new ToDoList("Tareas de Oficina");
  todoItem = new TodoItem("Generar Reportes");
  todoList.items.push(todoItem);
  todoItem = new TodoItem("Ir A Reunion", true);
  todoList.items.push(todoItem);

  todoLists.push(todoList);

  return todoLists;

}
