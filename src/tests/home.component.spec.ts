import '@nativescript/core/globals';
import '@nativescript/angular/polyfills';
import '@nativescript/zone-js/dist/pre-zone-polyfills';
import 'zone.js';
import '@nativescript/zone-js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from '../app/components/home/home.component';
import { NgxsModule, Store } from '@ngxs/store';
import { AppState } from '../app/states/app.state';
import { setupTodoLists } from '../app/test-data/setup-test-data';


import { NativeScriptTestingModule } from '@nativescript/angular/testing';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

TestBed.initTestEnvironment(NativeScriptTestingModule, platformBrowserDynamicTesting());



// A sample Jasmine test
describe("Home Component", () => {

  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: Store;
  let appState: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
      ],
      imports: [
        RouterTestingModule,
        NgxsModule.forRoot([AppState])
      ],
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(HomeComponent);
      component = fixture.componentInstance;
      component.myLists = setupTodoLists();
      //fixture.detectChanges();
    });

    store = TestBed.inject(Store);
  });

  it('should create the component', () => {

    expect(component).toBeTruthy();

  });

  it('should create a Todo List',()=>{

    component.createNewTodoList("Tareas de edificio");

    expect(component.myLists.length).toBe(3);
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists.length).toBe(3);

  });

  it('should add a Todo to a List',()=>{

    component.addItemToTodoList("Tareas de Casa","Aspirar");

    expect(component.myLists[0].items.length).toBe(3);
    expect(component.myLists[1].items.length).toBe(2);
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[0].items.length).toBe(3);
    expect(appState.todoLists[1].items.length).toBe(2);

    component.addItemToTodoList("Tareas de Oficina","Presentar Proyecto");

    expect(component.myLists[1].items.length).toBe(3);
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[1].items.length).toBe(3);

  });

  it('should edit a Todo from a List',()=>{

    component.editItemOfTodoList("Tareas de Casa","Barrer","Aspirar");


    expect(component.myLists[0].items[0].todoName).toBe("Aspirar");
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[0].items[0].todoName).toBe("Aspirar");

    component.editItemOfTodoList("Tareas de Oficina","Ir A Reunion","Presentar Proyecto");

    expect(component.myLists[1].items[1].todoName).toBe("Presentar Proyecto");
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[1].items[1].todoName).toBe("Presentar Proyecto");

  });

  it('should delete a Todo from a List',()=>{

    component.deleteItemFromTodoList("Tareas de Casa","Barrer");

    expect(component.myLists[0].items.length).toBe(1);
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[0].items.length).toBe(1);

    component.deleteItemFromTodoList("Tareas de Casa","Trapear");

    expect(component.myLists[0].items.length).toBe(0);
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[0].items.length).toBe(0);

    component.deleteItemFromTodoList("Tareas de Oficina","Ir A Reunion");

    expect(component.myLists[1].items.length).toBe(1);
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[1].items.length).toBe(1);

  });

  it('should mark Todo as complete / incomplete',()=>{

    component.markTodoAsCompleteIncomplete("Tareas de Casa","Barrer",false);

    expect(component.myLists[0].items[0].isComplete).toBeFalse();
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[0].items[0].isComplete).toBeFalse();

    component.markTodoAsCompleteIncomplete("Tareas de Casa","Trapear",true);

    expect(component.myLists[0].items[1].isComplete).toBeTrue();
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[0].items[1].isComplete).toBeTrue();

    component.markTodoAsCompleteIncomplete("Tareas de Oficina","Ir A Reunion",false);

    expect(component.myLists[1].items[0].isComplete).toBeFalse();
    appState = store.selectSnapshot(state => state.appstate);
    expect(appState.todoLists[1].items[0].isComplete).toBeFalse();

  });


});
