/**Clases */
class TodoItem{
    private _todoName: string;
    private _isComplete: boolean;

    constructor(todoName: string, isComplete:boolean = false){
        this._todoName = todoName;
        this._isComplete = isComplete;
    }

    public get todoName(): string{
        return this._todoName;
    }
    public set todoName(todoName:string){
        this._todoName = todoName;
    }
    public get isComplete(): boolean{
        return this._isComplete;
    }
    public set isComplete(isComplete:boolean){
        this._isComplete = isComplete;
    }
}
class ToDoList{
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

    public printItems(){
        if(this._items.length == 0){
            console.log('La lista está vacía.');
            return;
        }
        this._items.forEach(item=>{
            console.log(`Todo: ${item.todoName} - Estado: ${item.isComplete ? "Completo":"Pendiente"}`);
        });
    }
    public addItem(newItem: TodoItem){
        if(this._items.find(item => item.todoName === newItem.todoName)){
            console.log(`El todo "${newItem.todoName}" ya existe en la lista "${this._listName}"`);
        }else{
            this._items.push(newItem);
            console.log(`Se agregó "${newItem.todoName}" a la lista "${this._listName}"`);
        }
    }
    public editItem(todoName:string, todoNewName: string){

        if(this._items.find(item => item.todoName === todoNewName)){
            console.log(`El todo "${todoNewName}" ya existe en la lista "${this._listName}"`);  
            return;
        }

        const item = this._items.find(item => item.todoName === todoName);

        if (item) {
            item.todoName = todoNewName;
            console.log(`Se actualizó "${todoName}" a "${todoNewName}" en la lista "${this._listName}"`)
                     
        }else{
            console.log(`El todo "${todoName}" no existe en la lista "${this._listName}"`);               
        }
        
    }
    public markItemAsComplete(todoName:string){

        const item = this._items.find(item => item.todoName === todoName);
        if(item){
            item.isComplete = true;
            console.log(`El Todo "${todoName}" de la lista "${this._listName}" esta completo!`)
        }else{
            console.log(`El todo "${todoName}" no existe en la lista "${this._listName}"`);
        }

    }
    public removeItem(todoName:string){

        const index = this._items.findIndex(item => item.todoName === todoName);
        if (index > -1) {
            this._items.splice(index, 1);
            console.log(`Se borró "${todoName}" de la lista "${this._listName}"`)
        }else{
            console.log(`El todo "${todoName}" no existe en la lista "${this._listName}"`);
        }
        
    }
    
}


console.log('main');
const myLists: ToDoList[] = [];

/**Funciones principales */
const createNewTodoList = (listName: string):void=>{
    if(listName == "" || listName == undefined){
        console.log(`Se necesita un nombre para la lista.`);
        return;
    }
    
    if(todoListExists(listName)){
        console.log(`La lista "${listName}" ya existe.`);
        return;
    }
    const todoList = new ToDoList(listName);
    myLists.push(todoList);
    console.log(`Se creó un Todo List con nombre: "${listName}"`);

}
const addItemToTodoList = (todoName: string, listName: string):void=>{
    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){
        console.log(`Se necesita un nombre para la lista y el Todo.`);
        return;
    }

    if(todoListExists(listName)){
        const todo = new TodoItem(todoName);
        myLists.find(list => list.listName === listName )!.addItem(todo);
    }else{
        console.log(`La lista "${listName}" no existe.`);
    }
    
}
const editItemOfTodoList = (todoName: string, todoNewname: string, listName: string):void=>{
    if(todoNewname == "" || todoNewname == undefined || todoName == "" || todoName == undefined || listName == "" || listName == undefined){
        console.log(`Se necesita un nombre para la lista, el Todo y el nuevo nombre.`);
        return;
    }

    if(todoListExists(listName)){
        myLists.find(list => list.listName === listName )!.editItem(todoName,todoNewname);
    }else{
        console.log(`La lista "${listName}" no existe.`);
    }    
}
const deleteItemFromTodoList =  (todoName: string, listName: string):void=>{
    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){
        console.log(`Se necesita un nombre para la lista y el Todo.`);
        return;
    }

    if(todoListExists(listName)){
        myLists.find(list => list.listName === listName )!.removeItem(todoName);
    }else{
        console.log(`La lista "${listName}" no existe.`);
    }
}
const markTodoAsComplete = (todoName: string, listName: string):void=>{
    if(todoName == "" || todoName == undefined || listName == "" || listName == undefined){
        console.log(`Se necesita un nombre para la lista y el Todo.`);
        return;
    }

    if(todoListExists(listName)){
        myLists.find(list => list.listName === listName )!.markItemAsComplete(todoName);
    }else{
        console.log(`La lista "${listName}" no existe.`);
    }
}
const viewTodoList = (listName: string):void=>{
    if(listName == "" || listName == undefined){
        console.log(`Se necesita un nuombre para la lista.`);
        return;
    }
    
    if(todoListExists(listName)){

        myLists.find(list => list.listName === listName )!.printItems();

    }else{
        
        console.log(`La lista "${listName}" no existe.`);
    }
}
const viewMyLists = ():void=>{
    if(myLists.length == 0)
        console.log("Aun no hay Listas de Todo");
    myLists.forEach(todoList=>{
        console.log(`- ${todoList.listName}`);
    })
}



/**Utilitarios */
const todoListExists = (TodoListName: string):boolean => {

    return myLists.find(list => list.listName === TodoListName) ? true: false;

}