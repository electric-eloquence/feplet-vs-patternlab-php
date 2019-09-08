'use strict';

const Fepper = require('fepper');
const fepper = new Fepper(__dirname);
const start = Date.now();

fepper.ui.build();

const stop = Date.now();
const elapsed = stop - start;

console.log(`Finished build after ${elapsed/1000} s.`);
