import { useState, useRef, useEffect } from "react";
import { BehaviorSubject, fromEvent, Observable } from "rxjs";

import "../App.css";

const observable = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);

  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
});

// console.log("Before subcribe");
// observable.subscribe({
//   next(value) {
//     console.log("Got value: ", value);
//   },
//   error(err) {
//     console.log("Got error: ", err);
//   },
//   complete() {
//     console.log("Observable completed!");
//   },
// });
// console.log("After subscribe");

export default function MyObservable() {
  const [inputText, setInputText] = useState("");
  const [inputSubject$] = useState(() => new BehaviorSubject(""));

  function handleSubjectChange(e) {
    inputSubject$.next(e.target.value);
  }

  useEffect(() => {
    const subscription = inputSubject$.subscribe(setInputText);
    return () => {
      subscription.unsubscribe();
    };
  }, [inputSubject$]);

  return (
    <>
      <h3>Observable Input</h3>
      <h3>You've entered: {inputText}</h3>
      <input
        style={{ height: 20, padding: 5 }}
        onChange={handleSubjectChange}
        // onFocus={(e) => e.target.value}
        placeholder="Enter something"
      />
    </>
  );
}
