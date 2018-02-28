# Feplet (Node.js) vs. Pattern Lab (PHP)

On a high level, this is a Node.js vs. PHP comparison. However, this sort of 
comparison never compares apples to apples. Going a bit lower, we can compare 
two applications that, when receiving identical inputs, will return nearly 
identical outputs. We can then concern ourselves with only the most basic of 
benchmarks: processing speed and memory consumption. But since we don't know 
how these applications work under the hood, we again, cannot do an even 
comparison of Node.js and PHP.

But what we _can_ try to determine, is when considering what tools to use for 
building a pattern library, processing large amounts of template data:

* Whether to stay within the Node.js runtime environment, and use an obscure 
application for this purpose.

\- OR -

* Whether to bring on an additional runtime environment, and all the overhead 
that will encur, primarily because the better known application works in this 
environment.

### Background

<a href="https://github.com/electric-eloquence/feplet" target="_blank">Feplet</a> 
is the Node.js template engine which powers 
<a href="http://fepper.io" target="_blank">Fepper</a>, which implements the 
Pattern Lab UI. The Pattern Lab UI cannot receive enough acolades and 
superlatives for its utility at the tasks of organizing reusable markup 
patterns, and making them accessible to developers and designers. When we refer 
to the UI, we mean the client-side JavaScript, styles, and markup. The UI is 
independent of these tests.

To compile and render the markup which will be displayed by the UI, we need a 
runtime environment on the file system. Those opting to stay in the Pattern Lab 
ecosystem (i.e. not opting for Fepper, or similar independent application) will 
find that the PHP version provides the best Pattern Lab experience. A Node.js 
version of Pattern Lab exists, but its functionality is too limited for power 
usage. (More on that later, if you're interested.)

Given that frontend developers and coding designers are certain to work in 
JavaScript (and probably Node.js), it is reasonable to assume that they don't 
automatically want to bring on another runtime environment. They'd generally 
need a mandate or a drive of curiosity to expand beyond Node.js for a given 
project. We're only concerned with what could impart the mandate:

* The Node.js application isn't up to the task
* The Node.js application is too slow
* The Node.js application consumes too much memory 

### Versions

* <a href="https://github.com/electric-eloquence/fepper" target="_blank">Fepper (main project)</a>:
  0.4.2
* <a href="https://github.com/electric-eloquence/fepper-npm" target="_blank">Fepper-NPM</a>:
  0.25.5
* <a href="https://github.com/electric-eloquence/feplet" target="_blank">Feplet</a>:
  0.1.1
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
at compiling and rendering templates — lots of them. At heart, this is really 
just a template engine benchmark test. Pattern Lab for PHP brilliantly extends 
Mustache functionality, and is the sole source of inspiration for Feplet. 

The templates to be compiled and rendered are in the `source` directory under 
each respective application. These directories are identical. They each contain 
270 template files, and 77 JSON data files.

Building the Pattern Lab UI doesn't consume much time or resources in these 
tests, and can basically be ignored.

### Benchmarks

Averages of ten runs:

#### Feplet/Fepper

* Time: 2.149 sec
* Memory: 36.301 MB

#### Pattern Lab 1.0.0 for PHP 5.6.33

* Time: 2.969 sec
* Memory: 67.5 MB

#### Pattern Lab 1.1.0 for PHP 5.6.33

* Time: 3.005 sec
* Memory: 67.5 MB

#### Pattern Lab 2.0.0 for PHP 5.6.33

* Time: 6.132 sec
* Memory: 67.7MB

#### Pattern Lab 1.0.0 for PHP 7.2.2

* Time: 1.204 sec
* Memory: 65.55 MB

#### Pattern Lab 1.1.0 for PHP 7.2.2

* Time: 1.238 sec
* Memory: 65.64 MB

#### Pattern Lab 2.0.0 for PHP 7.2.2

* Time: 1.151 sec
* Memory: 59.97 MB

### Analysis

When compared against PHP 5.6.33, Node.js performs admirably. This is generally 
true for synchronous brute calculation tests, and can be verified by the top 
Internet search results in older benchmark tests. This is not the case against 
PHP 7.2.2, and PHP >= 7 in general. However, developers generally do not choose 
Node.js for speed alone.

But compiling and rendering templates is purely synchronous, and is effectively 
brute calculations. There is indeed a strong case to bring on the PHP >= 7 
runtime environment, so developers can use Pattern Lab, even if they need to 
couple that with an already existing Node.js stack.

But understand the overhead you'll take on if you go this route. Assuming you 
access the Pattern Lab API through Node.js, this API is exposed via your OS's 
shell. (Windows? Mac? Linux? Other Unix-like?) You will need to make shell 
calls in Node.js. Even if cross-platform shell calls are not a problem, it is 
nowhere near as snug a fit as directly requiring a JS module, and configuring 
your instances as you see fit.

There are also unexpected consequences of installing PHP in the first place. 
These tests were conducted in Ubuntu. These commands were used for the install:

```bash
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php5.6
```

We did indeed get PHP 5.6.33 (and PHP 7.2.2 on another virtual machine), but we 
also got Apache2. Not only that, Apache2 was running and listening on port 80.

### Do It Yourself

```bash
cd fepper
npm install # Only need to do this once.
node node_modules/fepper/index.js ui:build
cd ../patternlab-php-1.0.0
php core/builder.php --generate
cd ../patternlab-php-1.1.0
php core/builder.php --generate
cd ../patternlab-php-2.0.0
php core/console --generate

# To output the memory used by Fepper, set "debug": true in patternlab-config.json.
# Do not leave "debug": true while running speed tests, as this will slow things
# down considerably.
```

### Footnotes

Feplet and Fepper are independent of Pattern Lab, organizationally and socially. 
Feplet and Fepper implement the inventions of others, and hopefully add enough 
original functionality to be considered something more than just copies of the 
originals.
