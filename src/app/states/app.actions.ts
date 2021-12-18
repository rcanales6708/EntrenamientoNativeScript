
/**
* - Clase para obtener Todos de STATE
*/
export class GetTodoLists {
  static readonly type = '[TodoLists] Fetch';
}

/**
* - Clase para setear Todos en STATE
*/
export class SetTodoLists {
  static readonly type = '[TodoLists] Set';
  constructor(public payload: any){}
}
