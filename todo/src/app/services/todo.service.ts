import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  todos: Todo[];

  constructor() {
    this.todos = [
      {
        id: '111',
        title: 'Take Class',
        isComplete: false,
        date: new Date(),
      },
      {
        id: '222',
        title: 'Take Lesson',
        isComplete: true,
        date: new Date(),
      },
      {
        id: '333',
        title: 'Take Part',
        isComplete: false,
        date: new Date(),
      },
    ];
  }

  getTodos(): Observable<Todo[]> {
    return of(this.todos);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  changeStatus(todo: Todo): void {
    this.todos.map((singleTodo) => {
      if (singleTodo.id === todo.id) {
        todo.isComplete = !todo.isComplete;
      }
    });
  }

  deleteTodo(todo: Todo): void {
    const indexOfTodo = this.todos.findIndex(
      (currentObj) => currentObj.id === todo.id
    );

    this.todos.splice(indexOfTodo, 1);
  }
}
