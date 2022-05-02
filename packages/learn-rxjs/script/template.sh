#! /bin/bash
cd $(pwd)/packages/learn-rxjs/src

# touch day$1.mjs; 可以不创建, > 会自动创建

cat >day$1.mjs <<EOF
import chalk from 'chalk';

const demo = [
  (prefix) => {
    console.log(chalk.green('程式' + prefix + ': '));
  }
];

const index = process.argv[2] || 0;
demo[index](index);
EOF
