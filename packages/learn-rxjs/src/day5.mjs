import chalk from 'chalk';
import { from, interval, map, scan, take, zip } from 'rxjs';

const demo = [
  (prefix) => {
    console.log(chalk.green(`程式${prefix}: scan`), chalk.blue('scan 其實就是 Observable 版本的 reduce 只是命名不同'));
    const arr = [1, 2, 3, 4];
    const source = from(arr)
      .pipe(scan((origin, next) => origin + next, 0))
      .subscribe(console.log);
  },
  (prefix) => {
    console.log(chalk.green(`程式${prefix}: scan 2`));
    const source = zip([from('hello'), interval(600)])
      .pipe(map(([x, y]) => x))
      .pipe(scan((prev, next) => prev + next, ''))
      .subscribe(console.log);
  },
];

const index = process.argv[2] || 0;
demo[index](index);
