import { useState, useEffect } from "react";
import { BehaviorSubject } from "rxjs";

import "../App.css";

export default function MyBehaviorSubject() {
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
    <div>
      <h3>Observable Input</h3>
      <h3>You've entered: {inputText}</h3>
      <input
        style={{ height: 20, padding: 5 }}
        onChange={handleSubjectChange}
        // onFocus={(e) => e.target.value}
        placeholder="Enter something"
      />
    </div>
  );
}
