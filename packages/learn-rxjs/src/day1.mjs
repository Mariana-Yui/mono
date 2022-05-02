import { BehaviorSubject, interval, Observable, publish, refCount, ReplaySubject, Subject, take } from 'rxjs';

const demo = [
  /** 初次 */
  (prefix) => {
    const myObservable = new Observable((observer) => {
      observer.next('foo');
      setTimeout(() => observer.next('bar'), 1000);
    });

    const subscription = myObservable.subscribe((x) => console.log(prefix, x));

    subscription.unsubscribe();
  },

  /** 单播, 每个abserver是独立的 */
  (prefix) => {
    const source = interval(1000).pipe(take(3));

    source.subscribe((value) => console.log(prefix, 'A:' + value));

    setTimeout(() => {
      source.subscribe((value) => console.log(prefix, 'B:' + value));
    }, 1000);
  },

  /** Subject 后订阅的从当前值开始获取 */
  (prefix) => {
    const source = interval(1000).pipe(take(3));
    const subject = new Subject();

    source.subscribe(subject);

    subject.subscribe((value) => console.log(prefix, 'A:' + value));

    setTimeout(() => {
      subject.subscribe((value) => console.log(prefix, 'B:' + value));
    }, 1000);
  },

  /** BehaviorSubject 后订阅的获取终态 */
  (prefix) => {
    const subject = new BehaviorSubject(0); // 传入初始值
    subject.subscribe((value) => console.log(prefix, 'A:' + value));

    subject.next(1);
    subject.next(2);

    setTimeout(() => {
      subject.subscribe((value) => console.log(prefix, 'B:' + value));
    }, 1000);
  },

  /** RelaySubject 重放终态前多少次的值, 默认是重放所有值也就是和单播一样的效果 */
  (prefix) => {
    const subject = new ReplaySubject(2);
    subject.next(1);
    subject.next(2);
    subject.next(3);
    subject.subscribe((value) => console.log(prefix, 'A: ' + value));

    subject.next(4);
    subject.next(5);
    subject.subscribe((value) => console.log(prefix, 'B: ' + value));
  },

  /** 热播 publish需要connect触发 */
  (prefix) => {
    const source = interval(1000).pipe(take(3), publish());
    source.subscribe((value) => console.log(prefix, 'A:' + value));
    setTimeout(() => {
      source.subscribe((value) => console.log(prefix, 'B:' + value));
    }, 2000);
    source.connect();
  },

  /** refCount 自动挡 从第一次订阅开始自动connect(), 支持取消订阅 */
  (prefix) => {
    const source = interval(1000).pipe(take(3));
    const example = source.pipe(publish(), refCount());
    setTimeout(() => {
      example.subscribe((value) => console.log(prefix, 'A:' + value));
      setTimeout(() => {
        example.subscribe((value) => console.log(prefix, 'B:' + value));
      }, 1000);
    }, 2000);
  },
];

const runIndex = Number(process.argv[2]) || 0;

demo[runIndex](runIndex);
