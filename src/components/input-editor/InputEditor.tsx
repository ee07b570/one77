import React, { ChangeEvent } from 'react';
import { BehaviorSubject, Observable, merge, of, empty } from 'rxjs';
import { filter, map, withLatestFrom, tap } from 'rxjs/operators';
import { useObservable, useEventCallback } from 'rxjs-hooks';

import TodoService from "../../one77/todo.js";

const input$ = new BehaviorSubject('');
const updateQuery = (value: string) => { input$.next(value) }


// interface EditorProps {
//   value: string,
//   onInputChange: (value: string) => void
// }


const InputEditor = () => {
  const input = useObservable(() => input$, '')
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    updateQuery(value);
  }

  const [keyboardCB] = useEventCallback(
    (event$: any) =>
      event$.pipe(
        filter((event: any) =>  event.keyCode === 13),
        withLatestFrom(input$),
        filter((value: any) => {
          const [_, input] = value;
          return input !== '';
        }),
        tap((value: any) => {
          console.log('the value', value)
          const [_, input] = value;
          TodoService.add(input);
          updateQuery('');
        })
      )
  )

  return (
    <div>
      <input onChange={handleInputChange} onKeyDown={keyboardCB} value={input} />
      {/* <button onClick={clickCB}>确认添加</button> */}
    </div>
  );
}

export default InputEditor;
