import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToDoList } from './classes/TodoList';
import { setupTodoLists } from './test-data/setup-test-data';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app:AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents()
      .then(()=>{
        fixture = TestBed.createComponent(AppComponent);
        app = fixture.componentInstance;
        app.myLists = setupTodoLists();
      });;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should create a Todo List',()=>{

    app.createNewTodoList("Tareas de edificio");

    expect(app.myLists.length).toBe(3);

  });

  it('should add a Todo to a List',()=>{

    app.addItemToTodoList("Tareas de Casa","Aspirar");

    expect(app.myLists[0].items.length).toBe(3);
    expect(app.myLists[1].items.length).toBe(2);

    app.addItemToTodoList("Tareas de Oficina","Presentar Proyecto");

    expect(app.myLists[1].items.length).toBe(3);

  });

  it('should edit a Todo from a List',()=>{

    app.editItemOfTodoList("Tareas de Casa","Barrer","Aspirar");

    expect(app.myLists[0].items[0].todoName).toBe("Aspirar");

    app.editItemOfTodoList("Tareas de Oficina","Ir A Reunion","Presentar Proyecto");

    expect(app.myLists[1].items[1].todoName).toBe("Presentar Proyecto");

  });

  it('should delete a Todo from a List',()=>{

    app.deleteItemFromTodoList("Tareas de Casa","Barrer");

    expect(app.myLists[0].items.length).toBe(1);

    app.deleteItemFromTodoList("Tareas de Casa","Trapear");

    expect(app.myLists[0].items.length).toBe(0);

    app.deleteItemFromTodoList("Tareas de Oficina","Ir A Reunion");

    expect(app.myLists[1].items.length).toBe(1);

  });

  it('should mark Todo as complete / incomplete',()=>{

    app.markTodoAsCompleteIncomplete("Tareas de Casa","Barrer",false);

    expect(app.myLists[0].items[0].isComplete).toBeFalse();

    app.markTodoAsCompleteIncomplete("Tareas de Casa","Trapear",true);

    expect(app.myLists[0].items[1].isComplete).toBeTrue();

    app.markTodoAsCompleteIncomplete("Tareas de Oficina","Ir A Reunion",false);

    expect(app.myLists[1].items[0].isComplete).toBeFalse();

  });



});
