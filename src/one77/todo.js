
import { BehaviorSubject, Subject, isObservable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { scan, map, delay, catchError, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs'; 

// import 'rxjs/add/operator/scan';
// import 'rxjs/add/operator/publishReplay';
// import 'rxjs/add/operator/map';

class Todo {
  constructor(title) {
    this.id = `${+ new Date()}`;
    this.content = title;
    this.isComplete = false;
  }
}


class TodoService {

  constructor() {

    this.update$               = new BehaviorSubject(todos => todos);
    this.create$               = new Subject();
    // this.modify$               = new Subject();
    // this.remove$               = new Subject();
    // this.removeCompleted$      = new Subject();
    this.toggle$               = new Subject();
    // this.toggleAll$            = new Subject();


    // this.createTodo$           = new Subject();
    // this.modifyTodo$           = new Subject();
    // this.removeTodo$           = new Subject();
    // this.removeCompletedTodos$ = new Subject();
    // this.toggleTodo$           = new Subject();
    // this.toggleAllTodos$       = new Subject();


    this.todos$ = this.update$.pipe(
        scan((todos, operation) => operation(todos), [])
      )
  
    this.create$.pipe(
        map(todo => todos => todos.concat(todo))
      )
      .subscribe(this.update$);
    
    // this.modify$.pipe(
    //   map(({ uuid, newTitle }) => todos => {
    //     const targetTodo = todos.find(todo => todo.id === uuid);
    //     targetTodo.title = newTitle;
    //     return todos;
    //   })
    // ).subscribe(this.update$);
    
    // this.remove$
    //     .map(uuid => todos => todos.filter(todo => todo.id !== uuid))
    //     .subscribe(this.update$);
    
    // this.removeCompleted$
    //     .map(() => todos => todos.filter(todo => !todo.completed))
    //     .subscribe(this.update$);
    
    this.toggle$.pipe(
      map(uuid => todos => {
        const targetTodo = todos.find(todo => todo.id === uuid);
        targetTodo.isComplete = !targetTodo.isComplete;
        return todos;
      })
    ).subscribe(this.update$);
    
    // this.toggleAll$
    //     .map(completed => todos => {
    //       todos.forEach(todo => todo.completed = completed);
    //       return todos;
    //     })
    //     .subscribe(this.update$);

    // this.createTodo$
    //     .subscribe(this.create$);
    
    // this.modifyTodo$
    //     .subscribe(this.modify$);
    
    // this.removeTodo$
    //     .subscribe(this.remove$);

    // this.removeCompletedTodos$
    //     .subscribe(this.removeCompleted$);
    
    // this.toggleTodo$
    //     .subscribe(this.toggle$);
    
    // this.toggleAllTodos$
    //     .subscribe(this.toggleAll$);
  }

  add(title) {
    this.create$.next(new Todo(title));
  }

  getRemoteTodos() {
    const status$ = new BehaviorSubject(false);
    const obs$ = ajax.getJSON(`https://api.github.com`).pipe(
      tap(userResponse => console.log('users: ', userResponse)),
      catchError(error => {
        console.log('error: ', error);
        return of(error);
      })
    );
    console.warn('isObservable(obs$)', isObservable(obs$))
    return obs$
  }

  // remove(uuid) {
  //   this.removeTodo$.next(uuid);
  // }

  // removeCompleted() {
  //   this.removeCompletedTodos$.next();
  // }

  toggle(uuid) {
    this.toggle$.next(uuid);
  }

  // toggleAll(completed) {
  //   this.toggleAllTodos$.next(completed);
  // }

  // update(uuid, newTitle) {
  //   this.modifyTodo$.next({ uuid, newTitle });
  // }

  getTodos() {
    return this.todos$
  }
}

export default new TodoService();