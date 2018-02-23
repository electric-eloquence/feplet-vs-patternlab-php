# Template Engine Comparison

This currently only compares 
<a href="https://github.com/electric-eloquence/feplet#readme" target="_blank">Feplet</a> 
to Handlebars. More template engines can be considered, so please 
<a href="https://github.com/electric-eloquence/template-engine-comparison/issues" target="_blank">make suggestions</a>. 
They need to meet the following criteria at a minimum:

* Render tags that are nested within tags flagging true boolean conditions
* Render tags that are nested within tags that loop through arrays of data
* Compile partials with data passed to them by parameters from the including tag
* Be written in JavaScript

### Some Background

Feplet aims to extend Mustache, but without changing the existing syntax. 
In other words, Mustache code can be dropped into Feplet without modification. 
The extending functionality resembles other, more powerful engines, but as of 
this writing, no suggestion has been made for a JavaScript template engine that 
can accept Mustache code without modification, and extend it with the ability to 
submit data parameters to partials.

### Why Not Abandon Mustache?

Mustache brands itself as being "logic-less," but it in fact more closely 
resembles pure formal logic. It tests the most basic conditions: Is a value 
truthy or falsy? Is a value a set containing members? When true conditions have 
been drilled down to a printable value, print that value.

Of course, there's more to Mustache than just that, but the bells and whistles 
do not significantly weigh or slow Mustache down.

If a simpler set of rules (and a syntax to implement those rules) has been 
invented, 
<a href="https://github.com/electric-eloquence/template-engine-comparison/issues" target="_blank"> 
please comment on what that is</a>. 
In the meantime, Feplet will not abandon Mustache.

### Versions

The latest as of this writing, February, 2018:

* Feplet: 0.1.1
* Handlebars: 4.0.11

### Bundle Sizes

The minified all-in-one scripts for browser consumption:

* Feplet: 22K
* Handlebars: 74K

### Tests

The engines need to compile and render patterns grouped within 5 pattern types:

* pages
* templates
* components
* compounds
* elements

The engines start reading from within the `pages` type, and recursively include 
partials from each successive pattern type. The first test has five patterns per 
pattern type. The second test has six. The third test has seven. These tests 
don't just include partials from top down. There are some blocks which include 
partials from pattern types higher up, which in turn continue the downward 
course of inclusion. Without parameterized logic, this circular path would 
result in infinite loops. The engines correctly submit and process the logic 
that keeps execution finite.

A fourth test consists of just downward inclusions, with no conditional logic. 
There are twenty patterns per pattern type in this test.

### Hardware

* MacBook Pro (Retina, 15-inch, Mid 2015)
* Intel Core i7-4980HQ @ 2.80GHz
* 16 GB 1600 MHz DDR3
* macOS Sierra 10.12.6

### Benchmarks

Averages of ten runs:

#### 5 patterns per pattern type

* Feplet: 0.575 sec
* Handlebars: 1.272 sec

#### 6 patterns per pattern type

* Feplet: 1.541 sec
* Handlebars: 3.793 sec

#### 7 patterns per pattern type

* Feplet: 4.044 sec
* Handlebars: 10.734 sec

#### No conditional logic

* Feplet: 0.437 sec
* Handlebars: 0.579 sec

### Do It Yourself

```bash
$ npm install
$ node feplet/run-5.js
$ node handlebars/run-5.js
$ node feplet/run-6.js
$ node handlebars/run-6.js
$ node feplet/run-7.js
$ node handlebars/run-7.js
$ node feplet/run-no-cond.js
$ node handlebars/run-no-cond.js
```
