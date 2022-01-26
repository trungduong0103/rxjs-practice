import { Observable } from "rxjs";

const observable$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  subscriber.next(4);
  // wait 1s and next 5
  setTimeout(() => {
    subscriber.next(5);
    subscriber.complete();
  }, 1000);
});

function subscribeToObservable() {
  console.log("Before subscribe");
  observable$.subscribe({
    next(val) {
      console.log("Got value: ", val);
    },
    complete() {
      console.log("Completed");
    },
  });
  console.log("After subscribe");
}

// subscribeToObservable();

// Before subscribe -> 1 -> 2 -> 3 -> 4 -> After subscribe -> 5 -> Completed
// If subscribe.complete() is outside setTimeout(), 5 will not be logged

function foo() {
  console.log("Call function foo()");
  return 42;
}

// is similar to:
const foo$ = new Observable((subscriber) => {
  console.log("Subscribed to foo$");
  subscriber.next(42);
});

const x = foo.call();
console.log(x);

// is similar to:
foo$.subscribe({
  next(val) {
    console.log(val);
  },
});

// the difference between a function and an observable is that an observable can push many values, synchronously or asynchronously
// while a function can only push a single value synchronously

function bar() {
  console.log("Call function bar()");
  return 42;
  // return 420; // unreachable code
}

const bar$ = new Observable((subscriber) => {
  console.log("Subscribed to bar$");
  for (let i = 0; i < 5; i++) {
    subscriber.next(i);
  }
  setTimeout(() => {
    subscriber.next(5);
  });
});

console.log("Before");
console.log(bar());
console.log("After");

console.log("Before");
bar$.subscribe({
  next(val) {
    console.log(val);
  },
});
console.log("After");

export default function MyObservable() {
  return <>{null}</>;
}
