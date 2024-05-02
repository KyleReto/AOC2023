#!/bin/bash
cd "$(dirname "$0")"/dist

runner=node

case "$1" in
-d|--dev)
    echo "Running with nodemon"
    runner=nodemon
esac

${runner} main.js
