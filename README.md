# Feplet (Node.js) vs. Pattern Lab (PHP)

On a high level, this is a Node.js vs. PHP comparison. However, this sort of 
comparison never compares apples to apples. Going a bit lower, we can compare 
two projects that, when receiving identical inputs, will return nearly identical 
outputs. We can then concern ourselves with only the most basic of benchmarks: 
processing speed and memory consumption.

### Background

Feplet is the template engine which powers 
<a href="https://github.com/electric-eloquence/fepper#readme" target="_blank">Fepper, a frontend prototyper</a>, 
which implements the Pattern Lab UI. The Pattern Lab UI cannot receive enough 
acolades and superlatives for its utility at the tasks of organizing reusable 
markup patterns, and making them accessible to developers and designers.

However, those wishing to stay in the Pattern Lab ecosystem will find that its 
runtime environment is best implemented with the PHP version of Pattern Lab. A 
Node.js version of Pattern Lab exists, but its functionality is too limited for 
power usage. (More on that later, if you're interested.)

Given that frontend developers and coding designers are certain to work in 
JavaScript (and probably Node.js), it is reasonable to assume that they'd want 
to stay within that ecosystem, unless there's a mandate or a drive of curiosity 
to venture beyond it. We're only concerned with what could impart the mandate:

* The Node.js version isn't up to the task
* The Node.js version is too slow
* The Node.js version consumes too much memory 

### Versions

* Fepper (main project): 0.4.2
* Fepper-NPM: 0.25.5
* Feplet: 0.1.1
* Pattern Lab: 1.0.0
* Pattern Lab: 1.1.0
* Pattern Lab: 2.0.0
* Node.js: 8.9.4
* PHP: 5.6.33
* PHP: 7.2.2 

Fepper-NPM and Feplet are dependencies of Fepper. They are parts of the whole.

The three Pattern Lab versions are independent entities and will be tested 
separately as such.

PHP will also be tested separately for versions 5.6.33 and 7.2.2, for each 
version of Pattern Lab.

### System

* MacBook Pro (Retina, 15-inch, Mid 2015)
* Intel Core i7-4980HQ @ 2.80GHz
* 16 GB 1600 MHz DDR3
* macOS Sierra 10.12.6 Host OS
* VirtualBox 5.1.30 r118389
* Ubuntu 14.04.5 LTS Trusty Guest OS

### Tests

This Feplet/Fepper vs. Pattern Lab comparison really just tests their abilities 
at compiling and rendering templates — lots of them.

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
npm install
node feplet/run-5.js
node handlebars/run-5.js
node feplet/run-6.js
node handlebars/run-6.js
node feplet/run-7.js
node handlebars/run-7.js
node feplet/run-no-cond.js
node handlebars/run-no-cond.js
```

Feplet and Fepper are independent of Pattern Lab, organizationally and socially. 
Feplet and Fepper implement the inventions of others, and hopefully add enough 
original functionality to be considered something more than just copies of the 
originals.
