import '@nativescript/core/globals';
import '@nativescript/angular/polyfills';
import '@nativescript/zone-js/dist/pre-zone-polyfills';
import 'zone.js';
import '@nativescript/zone-js';
import 'zone.js/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { NgxsModule } from '@ngxs/store';
import { AppState } from '../app/states/app.state';
import { TodoListComponent } from '../app/components/todo-list/todo-list.component';



// A sample Jasmine test
describe("Todo List Component", () => {

  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

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
      fixture = TestBed.createComponent(TodoListComponent);
      component = fixture.componentInstance;
    });

  });

  it('should create the component', () => {

    expect(component).toBeTruthy();

  });
});
