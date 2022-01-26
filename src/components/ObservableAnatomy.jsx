import { Observable } from "rxjs";
import { useEffect, useState, useRef } from "react";

// Observable creation + execution + disposal

const observable$ = new Observable((subscriber) => {
  let count = 0;
  const interval = setInterval(() => {
    if (count === 5) {
      subscriber.complete();
    }
    count += 1;
    subscriber.next(`Hi, value is: ${count}`);
  }, 1000);

  return function unsubscribe() {
    clearInterval(interval);
    subscriber.complete();
  };
});

const fetchObservable$ = new Observable((subscriber) => {
  fetch("https://jsonplaceholder.typicode.com/todos/1")
    .then((response) => response.json())
    .then((json) => {
      subscriber.next(json);
      subscriber.complete();
    });
});

const disposableObservable$ = new Observable(function subscribe(subscriber) {
  const interval = setInterval(() => {
    fetch("https://jsonplaceholder.typicode.com/todos/1")
      .then((response) => response.json())
      .then((json) => {
        subscriber.next(json);
      });
  }, 1000);

  return function unsubscribe() {
    console.log("Observable disposed");
    clearInterval(interval);
  };
});

// Observable subscription

// const observer1 = observable$.subscribe({
//   next(val) {
//     console.log("Observer 1 got value: ", val);
//   },
//   complete() {
//     console.log("---> Observer 1 completed");
//   },
// });

// const observer2 = observable$.subscribe({
//   next(val) {
//     console.log("Observer 2 got value: ", val);
//   },
//   complete() {
//     console.log("---> Observer 2 completed");
//   },
// });

// const fetchSubscription = fetchObservable$.subscribe({
//   next(val) {
//     console.log(val);
//   },
//   complete() {
//     console.log("Fetch subscription complete");
//   },
// });

// const disposableSubscription = disposableObservable$.subscribe({
//   next(val) {
//     console.log(val);
//   },
// });

async function fetchTodo(todoId) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${todoId}`
  );
  if (response.ok) {
    const jsoned = await response.json();
    return jsoned;
  } else {
    const { status, statusText } = response;
    throw new Error({ status, statusText });
  }
}

const stoppableObservable$ = new Observable(function subscribe(subscriber) {
  let num = 1;
  const interval = setInterval(async () => {
    try {
      const todo = await fetchTodo(num);
      subscriber.next(todo);
      num++;
    } catch (err) {
      console.error(err);
      subscriber.error(err);
    }
  }, 2000);

  return function unsubscribe() {
    clearInterval(interval);
  };
});

function useWatchObservable(observable$) {
  const sourceRef$ = useRef(observable$).current;
  const [state, updateState] = useState({ data: undefined, error: undefined });
  const [unsubscribe, setUnsubscribe] = useState(false);
  const subscription$ = useRef(undefined);

  useEffect(() => {
    subscription$.current = sourceRef$.subscribe({
      next: (val) => updateState((prevState) => ({ ...prevState, data: val })),
      error: (error) =>
        updateState((prevState) => ({ ...prevState, error: error })),
    });

    if (unsubscribe) {
      subscription$.current.unsubscribe();
    }

    return () => subscription$.current.unsubscribe();

    // sourceRef$ is a ref
  }, [sourceRef$, unsubscribe]);

  return [state.data, state.error, () => setUnsubscribe(true)];
}

export default function ObservableAnatomy() {
  console.log("Re-rendered");
  const [observerIsRunning, setObserverIsRunning] = useState(true);
  // const [result, setResult] = useState(undefined);
  // const [errorResult, setErrorResult] = useState(undefined);
  
  // observable execution is exclusive to each observer, which mean unsubscribe() only takes effect for the observer that calls it
  const [data, error, unsubscribe] = useWatchObservable(stoppableObservable$);

  // no subscription() -> runs forever
  const [otherData] = useWatchObservable(stoppableObservable$);

  function signalObservableStopped() {
    setObserverIsRunning(false);
    unsubscribe();
  }

  // useEffect(() => {
  //   const subscription = stoppableObservable$.subscribe({
  //     next(val) {
  //       setResult(val);
  //     },
  //     error(val) {
  //       setErrorResult(val);
  //     },
  //   });

  //   if (!observerIsRunning) {
  //     subscription.unsubscribe();
  //   }

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [observerIsRunning]);

  return (
    <div>
      <p>
        Is observable sending notifications: {observerIsRunning ? "Yes" : "No"}
      </p>
      <p>This can be stopped: {JSON.stringify(data)}</p>
      <p>This cannot be stopped: {JSON.stringify(otherData)}</p>
      <p style={{ color: "red", fontWeight: 500 }}>
        {error && `Error: ${JSON.stringify(error)}`}
      </p>
      <button onClick={signalObservableStopped}>Stop Observer</button>
    </div>
  );
}
