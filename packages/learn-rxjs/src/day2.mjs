/* eslint-disable no-unused-vars */
import { concatAll, filter, first, fromEvent, interval, map, Observable, of } from 'rxjs';
import { JSDOM } from 'jsdom';
import open from 'open';

const demo = [
  (prefix) => {
    const source = interval(1000).pipe(map((x) => x + 3));
    source.subscribe((value) => console.log(prefix, 'A:' + value));
  },
  (prefix) => {
    const source = interval(1000).pipe(filter((x) => x % 2 === 0));
    source.subscribe((value) => console.log(prefix, 'A:' + value));
  },
  (prefix) => {
    const {
      window: { document },
    } = new JSDOM(`<!DOCTYPE html><button>Hello world</button>`);
    const btn = document.querySelector('button');
    const source = fromEvent(btn, 'click')
      .pipe(map((e) => of(1, 2, 3)))
      .pipe(concatAll());

    source.subscribe({
      next: (value) => console.log(value),
      error: (err) => console.log('Error:' + err),
      complete: () => console.log('complete'),
    });

    btn.click();
  },
  (prefix) => {
    const source$ = new Observable((observer) => {
      observer.next(1);
    });
    const source = interval(1000)
      .pipe(map((x) => x * 3))
      .pipe(first())
      // .pipe(take(4))
      .subscribe(console.log);

    setTimeout(() => {
      source$.subscribe();
    }, 3000);
  },
  async (prefix) => {
    await open('https://codesandbox.io/s/nervous-wind-rt7zo2');
  },
];

const index = Number(process.argv[2]) || 0;

demo[index](index);
