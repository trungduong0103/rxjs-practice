import { useRef, useState } from "react";

export default function RefExample() {
  const [count, setCount] = useState(0);
  const myRef = useRef(0);

  function changeMyRef() {
    myRef.current = myRef.current + 1;
  }

  return (
    <>
      <h1>useState: {count}</h1>
      <h1>useRef: {myRef.current}</h1>
      <button onClick={() => setCount(count + 1)}>Click me!</button>
      <button onClick={changeMyRef}>Increase ref!</button>
    </>
  );
}
