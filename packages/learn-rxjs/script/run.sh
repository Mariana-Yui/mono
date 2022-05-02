#! /bin/bash
prefixSrc="$(pwd)/packages/learn-rxjs/src/$1.mjs"

index=$2

node $prefixSrc $index
