"use strict";
/**Clases */
class TodoItem {
    constructor(todoName, isComplete = false) {
        this._todoName = todoName;
        this._isComplete = isComplete;
    }
    get todoName() {
        return this._todoName;
    }
    set todoName(todoName) {
        this._todoName = todoName;
    }
    get isComplete() {
        return this._isComplete;
    }
    set isComplete(isComplete) {
        this._isComplete = isComplete;
    }
}
class ToDoList {
    constructor(listName) {
        this._listName = listName;
        this._items = [];
    }
    get listName() {
        return this._listName;
    }
    set listName(value) {
        this._listName = value;
    }
    printItems() {
        if (this._items.length == 0) {
            console.log('La lista está vacía.');
            return;
        }
        this._items.forEach(item => {
            console.log(`Todo: ${item.todoName} - Estado: ${item.isComplete ? "Completo" : "Pendiente"}`);
        });
    }
    addItem(newItem) {
        if (this._items.find(item => item.todoName === newItem.todoName)) {
            console.log(`El todo "${newItem.todoName}" ya existe en la lista "${this._listName}"`);
        }
        else {
            this._items.push(newItem);
            console.log(`Se agregó "${newItem.todoName}" a la lista "${this._listName}"`);
        }
    }
    editItem(todoName, todoNewName) {
        if (this._items.find(item => item.todoName === todoNewName)) {
            console.log(`El todo "${todoNewName}" ya existe en la lista "${this._listName}"`);
            return;
        }
        const item = this._items.find(item => item.todoName === todoName);
        if (item) {
            item.todoName = todoNewName;
            console.log(`Se actualizó "${todoName}" a "${todoNewName}" en la lista "${this._listName}"`);
        }
        else {
            console.log(`El todo "${todoName}" no existe en la lista "${this._listName}"`);
        }
    }
    markItemAsComplete(todoName) {
        const item = this._items.find(item => item.todoName === todoName);
        if (item) {
            item.isComplete = true;
            console.log(`El Todo "${todoName}" de la lista "${this._listName}" esta completo!`);
        }
        else {
            console.log(`El todo "${todoName}" no existe en la lista "${this._listName}"`);
        }
    }
    removeItem(todoName) {
        const index = this._items.findIndex(item => item.todoName === todoName);
        if (index > -1) {
            this._items.splice(index, 1);
            console.log(`Se borró "${todoName}" de la lista "${this._listName}"`);
        }
        else {
            console.log(`El todo "${todoName}" no existe en la lista "${this._listName}"`);
        }
    }
}
console.log('main');
const myLists = [];
/**Funciones principales */
const createNewTodoList = (listName) => {
    if (listName == "" || listName == undefined) {
        console.log(`Se necesita un nombre para la lista.`);
        return;
    }
    if (todoListExists(listName)) {
        console.log(`La lista "${listName}" ya existe.`);
        return;
    }
    const todoList = new ToDoList(listName);
    myLists.push(todoList);
    console.log(`Se creó un Todo List con nombre: "${listName}"`);
};
const addItemToTodoList = (todoName, listName) => {
    if (todoName == "" || todoName == undefined || listName == "" || listName == undefined) {
        console.log(`Se necesita un nombre para la lista y el Todo.`);
        return;
    }
    if (todoListExists(listName)) {
        const todo = new TodoItem(todoName);
        myLists.find(list => list.listName === listName).addItem(todo);
    }
    else {
        console.log(`La lista "${listName}" no existe.`);
    }
};
const editItemOfTodoList = (todoName, todoNewname, listName) => {
    if (todoNewname == "" || todoNewname == undefined || todoName == "" || todoName == undefined || listName == "" || listName == undefined) {
        console.log(`Se necesita un nombre para la lista, el Todo y el nuevo nombre.`);
        return;
    }
    if (todoListExists(listName)) {
        myLists.find(list => list.listName === listName).editItem(todoName, todoNewname);
    }
    else {
        console.log(`La lista "${listName}" no existe.`);
    }
};
const deleteItemFromTodoList = (todoName, listName) => {
    if (todoName == "" || todoName == undefined || listName == "" || listName == undefined) {
        console.log(`Se necesita un nombre para la lista y el Todo.`);
        return;
    }
    if (todoListExists(listName)) {
        myLists.find(list => list.listName === listName).removeItem(todoName);
    }
    else {
        console.log(`La lista "${listName}" no existe.`);
    }
};
const markTodoAsComplete = (todoName, listName) => {
    if (todoName == "" || todoName == undefined || listName == "" || listName == undefined) {
        console.log(`Se necesita un nombre para la lista y el Todo.`);
        return;
    }
    if (todoListExists(listName)) {
        myLists.find(list => list.listName === listName).markItemAsComplete(todoName);
    }
    else {
        console.log(`La lista "${listName}" no existe.`);
    }
};
const viewTodoList = (listName) => {
    if (listName == "" || listName == undefined) {
        console.log(`Se necesita un nuombre para la lista.`);
        return;
    }
    if (todoListExists(listName)) {
        myLists.find(list => list.listName === listName).printItems();
    }
    else {
        console.log(`La lista "${listName}" no existe.`);
    }
};
const viewMyLists = () => {
    if (myLists.length == 0)
        console.log("Aun no hay Listas de Todo");
    myLists.forEach(todoList => {
        console.log(`- ${todoList.listName}`);
    });
};
/**Utilitarios */
const todoListExists = (TodoListName) => {
    return myLists.find(list => list.listName === TodoListName) ? true : false;
};
//# sourceMappingURL=main.js.map