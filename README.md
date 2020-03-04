# Feplet (Node.js) vs. Pattern Lab (PHP)

#### Update: 2020 February

This repository is primarily being maintained for the purpose of providing a 
test bed on which to benchmark future versions of Feplet and Fepper. Two of 
Pattern Lab PHP's main dependencies 
<a href="#pattern-lab-php-latest-commits">haven't seen development since early 2018</a>. 
The rest haven't since 2016. In fact, Pattern Lab won't even run in PHP 7.4. On 
the other hand, Fepper's continued purpose is to be aligned with the latest 
developments in frontend technology. In other words, this shouldn't be seen as 
just a stark comparison between two "Atomic Design" systems. The comparison is 
likely irrelevant in this day and age. Nonetheless, the old text of this readme 
will be retained with occasional updates incorporating new information.

### Abstract

On a high level, this is a Node.js vs. PHP comparison. However, this sort of 
comparison never compares apples to apples. Going a bit lower, we can compare 
two applications that, when receiving identical inputs, will return nearly 
identical outputs. We can then concern ourselves with the most basic of 
benchmarks: processing speed and memory consumption. But since we don't know 
how these applications work under the hood, we again cannot perform an even 
comparison of Node.js and PHP.

But what we _can_ try to determine, is when considering what tools to use for 
building a pattern library, processing large amounts of template data:

* Whether to stay within the Node.js runtime environment, and use an obscure 
application for this purpose.

\- or -

* Whether to bring on an additional runtime environment, and all the overhead 
that will incur, primarily because the better known application works in this 
environment.

### Background

<a href="https://github.com/electric-eloquence/feplet" target="_blank">Feplet</a> 
is the Node.js template engine which powers 
<a href="https://fepper.io" target="_blank">Fepper</a>, which implements the 
Pattern Lab UI.

When we refer to the UI, we mean the client-side JavaScript, styles, and markup. 
The UI, being browser-based, is independent of these tests.

To compile and render the markup which will be displayed by the UI, we need a 
runtime environment on the file system. Those opting to stay in the Pattern Lab 
ecosystem (i.e. not opting for Fepper, or similar independent application) will 
find that the PHP version provides the best Pattern Lab experience. A Node.js 
version of Pattern Lab exists, but its functionality is too limited for power 
usage. 
(<a href="#pattern-lab-node">More on that later</a>, if you're interested.)

Given that frontend developers and coding designers are certain to work in 
JavaScript (and probably Node.js), it is reasonable to assume that they don't 
automatically want to bring on another runtime environment. They'd generally 
need a drive of curiosity or a mandate to expand beyond Node.js for a given 
project. We're only concerned with what could impart the mandate:

* The Node.js application isn't up to the task.
* The Node.js application is too slow.
* The Node.js application consumes too much memory.

### Versions

* <a href="https://github.com/electric-eloquence/fepper" target="_blank">Fepper (main project)</a>:
  0.13.2
* <a href="https://github.com/electric-eloquence/fepper-npm" target="_blank">Fepper-NPM</a>:
  0.34.5
* <a href="https://github.com/electric-eloquence/feplet" target="_blank">Feplet</a>:
  1.2.0
* Pattern Lab: 2.0.0
* Node.js: 12.14.1
* NPM: 6.13.4
* PHP: 7.3.14
* Composer: 1.9.2

Fepper-NPM and Feplet are dependencies of Fepper. They are parts of the whole.

### System

* MacBook Pro (Retina, 15-inch, Mid 2015)
* Intel Core i7-4980HQ @ 2.80GHz
* 16 GB 1600 MHz DDR3
* macOS Catalina 10.15.3 Host OS
* VirtualBox 6.1.2 r135662
* Ubuntu 18.04.3 LTS Bionic Guest OS

### Tests

This Feplet/Fepper vs. Pattern Lab comparison really just tests their abilities 
at compiling and rendering templates—lots of them. At heart, this is really just 
a template engine benchmark test.

The templates to be compiled and rendered are in the `source` directory under 
each respective application. These directories are identical. They each contain 
300 template files, and 77 JSON data files.

### Benchmarks

Averages of ten runs:

#### Feplet/Fepper

* Time: 5.4513 sec
* Memory: 89.067 MB

#### Pattern Lab PHP

* Time: 8.75 sec
* Memory: 312 MB

### Analysis

PHP 7 is fast—almost always faster than Node.js at synchronous brute 
calculation. This can be verified by a quick Internet search. We do not wish to
tangentially replicate or cite those tests, but if we're wrong about this, 
<a href="https://github.com/electric-eloquence/feplet-vs-patternlab-php/issues" target="_blank">
please post an issue</a> citing the appropriate correction.

However, developers generally do not choose Node.js for speed alone, and 
particularly not for speed at synchronous brute calculation. But templating _is_ 
purely synchronous, and is effectively brute calculation. Fortunately for those 
wishing to stay in Node.js, Fepper is reliably faster than Pattern Lab PHP.

However, there is a strong case to Pattern Lab having name recognition. This 
adds to PHP's already strong case based on its synchronous performance, not to 
mention its ubiquity.

But understand the overhead you'll take on if you go the PHP route. You will 
need to access Pattern Lab's API through your OS's shell. Windows? Mac? Linux? 
Other Unix-like? Then, you will most likely execute those shell commands in a 
Node.js task runner via gulp, npm scripts, etc. Even if cross-platform and 
cross-language shell execution is not a problem, it is nowhere near as seamless 
and extensible as requiring a JS module from within Node, and configuring, even 
extending, your instances as you see fit.

There are also unexpected consequences of installing PHP in the first place. 
These tests were conducted in Ubuntu. These commands were used for the install:

```shell
sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.3
```

We did indeed get PHP 7.3.14, but we also got Apache2. Not only that, Apache2 
was running and listening on port 80!

### Do It Yourself

```shell
cd fepper
npm install # only need to do this once.
npm start
cd ../patternlab-php-2.0.0
composer install # only need to do this once.
php core/console --generate --patternsonly
```

### Footnotes

#### Pattern Lab Node

A version of Pattern Lab exists for Node.js, but it isn't up to the task for 
these tests. Trying to build the following will result in an infinite loop:

##### source/\_patterns/04-pages/page.mustache:

```handlebars
{{> templates-node(full: true) }}
```

##### source/\_patterns/03-templates/node.mustache:

```handlebars
{{# full }}
  {{> organisms-full }}
{{/ full }}

{{# teaser }}
  {{> organisms-teaser }}
{{/ teaser }}
```

##### source/\_patterns/02-organisms/full.mustache:

```handlebars
FULL CONTENT

{{> templates-node(teaser: true) }}
```

##### source/\_patterns/02-organisms/teaser.mustache:

```handlebars
TEASER CONTENT
```

```shell
cd ../patternlab-node-3.0
npm install # only need to do this once.
npm run pl:build
# ctrl+c to stop infinite loop.
```

This isn't an edge case, nor should it be forbidden. Drupal, for example, 
recurses through templates in this circular manner. A full Drupal node view can 
include teasers of other nodes. Feplet and Pattern Lab PHP also respect the 
conditions that determine which recursion paths to take and not take.

Alternate template engines can be plugged into Pattern Lab Node, but don't 
expect the first few tries with them to work as intended. Furthermore, there is 
little to no documentation for such usage.

Ineffective use of tools like Pattern Lab invariably leads to questions like, 
"What is the payoff for all this increased upfront cost?" No, "Atomic Design" 
and "Prototyping" are not payoffs—one is a methodology, and the other is 
increased upfront cost!

#### As of 2020 February:

##### Pattern Lab PHP latest commits:

<a href="https://github.com/pattern-lab/patternlab-php" target="_blank">https://github.com/pattern-lab/patternlab-php</a>: 2016 Jul  
<a href="https://github.com/pattern-lab/patternlab-php-core" target="_blank">https://github.com/pattern-lab/patternlab-php-core</a>: 2018 Feb  
<a href="https://github.com/pattern-lab/patternengine-php-mustache" target="_blank">https://github.com/pattern-lab/patternengine-php-mustache</a>: 2016 Jun  
<a href="https://github.com/pattern-lab/styleguidekit-mustache-default" target="_blank">https://github.com/pattern-lab/styleguidekit-mustache-default</a>: 2018 Jan  
<a href="https://github.com/pattern-lab/plugin-php-reload" target="_blank">https://github.com/pattern-lab/plugin-php-reload</a>: 2016 Jul  

#### Also: <a href="https://github.com/electric-eloquence/template-engine-benchoff" target="_blank">Feplet vs. Handlebars</a>

#### Thanks for Visiting!

All tools used in this test (with the exception of Apple and Intel products) are 
Open Source.
