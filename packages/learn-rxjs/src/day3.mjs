import chalk from 'chalk';
import { concat, interval, last, merge, of, skip, startWith, take, takeLast } from 'rxjs';

const demo = [
  (prefix) => {
    console.log(chalk.green(`程式${prefix}: skip`));
    const source = interval(1000).pipe(skip(3)).subscribe(console.log);
  },
  (prefix) => {
    console.log(chalk.green(`程式${prefix}: takeLast`));
    const source = interval(1000).pipe(take(6)).pipe(takeLast(2)).subscribe(console.log);
  },
  (prefix) => {
    console.log(chalk.bgBlue(`程式${prefix}: last/takeLast(1)`));
    const source = interval(1000).pipe(take(6)).pipe(last()).subscribe(console.log);
  },
  (prefix) => {
    console.log(chalk.blue(`程式${prefix}: concat\n和concatAll一样, 需要先等前一个observable完成才会继续下一个`));
    const source = interval(1000).pipe(take(3));
    const source1 = of(3);
    const source2 = of(4, 5, 6);
    const example = concat(source, source1, source2).subscribe({
      next: console.log,
      complete: () => console.log('complete'),
      error: console.log,
    });
  },
  (prefix) => {
    console.log(chalk.green(`程式${prefix}: startWith`));
    const source = interval(1000).pipe(take(3)).pipe(startWith(0)).subscribe(console.log);
  },
  (prefix) => {
    console.log(
      chalk.green(`程式${prefix}: merge`),
      chalk.blue('\n和concat不同的是, merge是并行处理多个observable, concat是串行处理'),
    );
    const source = interval(500).pipe(take(3));
    const source2 = interval(300).pipe(take(6));
    const source$ = merge(source, source2).subscribe(console.log);
  },
];

const index = process.argv[2] || 0;

demo[index](index);
