import { concatMap, from, Observable } from 'rxjs';
import { spawn } from 'child_process';

const loadImgByRx = (url) => {
  return new Observable((observer) => {
    console.log('img.src:' + url);

    setTimeout(() => {
      observer.next(url);
      observer.complete();
    }, 500);
  });
};

const imgUrls = Array.from(Array(15)).map(
  (v, i) => `https://qian-img.tenpay.com/mb/v4/img/group_task/mission_complished_pop/img_${i}.png`,
);

const source = from(imgUrls)
  .pipe(concatMap((v) => loadImgByRx(v)))
  .subscribe({
    next: (url) => console.log('complete:' + url),
    complete: () => console.log('芜湖'),
    error: console.log,
  });

export default source;
