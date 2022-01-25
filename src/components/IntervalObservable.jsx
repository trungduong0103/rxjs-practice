import { Observable } from "rxjs";

const interval$ = new Observable((subscriber) => {
  let s = 0;
  const id = setInterval(() => {
    if (s === 5) {
      subscriber.complete();
      clearInterval(id);
    }
    subscriber.next(s++);
  }, 1000);
});

interval$.subscribe({
  next(e) {
    console.log(`${e} seconds have passed`);
  },
  complete(e) {
    console.log(`Interval has stopped`);
  },
});
