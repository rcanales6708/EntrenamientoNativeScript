
export class TodoItem{

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
