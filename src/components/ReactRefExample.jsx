import { useRef, useState } from "react";

export default function RefExample() {
  const [count, setCount] = useState(0);
  const myRef = useRef(0);

  function changeMyRef() {
    myRef.current = myRef.current + 1;
  }

  return (
    <div>
      <h3>useState: {count}</h3>
      <h3>useRef: {myRef.current}</h3>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
      <button onClick={changeMyRef}>Increase ref!</button>
    </div>
  );
}
