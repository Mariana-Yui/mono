import chalk from 'chalk';
import open from 'open';
import { combineLatest, from, interval, map, scheduled, take, withLatestFrom, zip } from 'rxjs';

const demo = [
  (prefix) => {
    console.log(
      chalk.green(`程式${prefix}: combineLatest`),
      chalk.blue('\n它會取得各個 observable 最後送出的值，再輸出成一個值'),
    );
    const source = interval(500).pipe(take(3));
    const newest = interval(300).pipe(take(6));
    const example = combineLatest([source, newest], (x, y) => x + y).subscribe({
      next: console.log,
      complete: () => console.log('complete'),
      error: console.log,
    });
  },
  (prefix) => {
    console.log(
      chalk.green(`程式${prefix}: zip`),
      chalk.blue(
        '\nzip 會取每個 observable 相同順位的元素並傳入 callback，也就是說每個 observable 的第 n 個元素會一起被傳入 callback',
      ),
    );
    const source = interval(500).pipe(take(3));
    const newest = interval(300).pipe(take(6));
    const example = zip([source, newest], (x, y) => x + y).subscribe({
      next: console.log,
      complete: () => console.log('complete'),
      error: console.log,
    });
  },
  (prefix) => {
    console.log(
      chalk.green(`程式${prefix}: withLastestFrom`),
      chalk.blue(
        '\nwithLatestFrom 運作方式跟 combineLatest 有點像，只是他有主從的關係，只有在主要的 observable 送出新的值且次要的 observable 有送出过值时時，才會執行 callback',
      ),
    );
    const main = zip([from('hello'), interval(500)], (x, y) => x);
    const some = zip([from([0, 1, 0, 0, 0, 1]), interval(300)], (x, y) => x);
    const example = main
      .pipe(
        withLatestFrom(some),
        map(([x, y]) => {
          console.log(x, y);

          return y === 1 ? x.toUpperCase() : x;
        }),
      )
      .subscribe({
        next: console.log,
        complete: () => console.log('complete'),
        error: console.log,
      });
  },
  async (prefix) => {
    console.log(chalk.green(`程式${prefix}: 实现腾讯视频播放器悬浮及拖拽`));
    await open('https://codesandbox.io/s/rxjsshi-xian-bo-fang-qi-xuan-fu-tuo-zhuai-iovrpq');
  },
];

const index = process.argv[2] || 0;

demo[index](index);
