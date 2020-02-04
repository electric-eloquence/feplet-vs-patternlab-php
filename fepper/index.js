'use strict';

const Fepper = require('fepper');

const begin = Date.now()
const fepper = new Fepper(__dirname);

fepper.ui.build();

const elapsed = Date.now() - begin;
const used = process.memoryUsage().heapUsed / 1024 / 1024;

console.log(`The build finished in \x1b[32m${elapsed} ms\x1b[0m and used approximately \x1b[32m${Math.round(used * 100) / 100} MB\x1b[0m`);
