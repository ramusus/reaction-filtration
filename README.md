Reaction Filtration [![Build Status](https://travis-ci.org/ramusus/reaction-filtration.png?branch=master)](https://travis-ci.org/ramusus/reaction-filtration)
===================

This package lets you do reactive Filtration of the products on the main page in Reaction Commerce 

Installation
------------

    meteor add ramusus:reaction-filtration

**Important** Right now Reaction Core doesn't support integration with this package out of the box. It's necessary to do 
2 small additions. I opened this 
[Pull Request](https://github.com/reactioncommerce/reaction/pull/743) to show how to integrate it with latest 
development branch of Reaction Core. You can merge it to you local installation or do these additions by hands in 
[2 files only](https://github.com/reactioncommerce/reaction/pull/743/files). 

Screenshots
-----------

![Filters](https://s3.amazonaws.com/f.cl.ly/items/1R3V3C1y1N1M270q0w1l/Image%202016-01-30%20at%209.22.31%20PM.png?v=05350742)

Features
--------

* Open filters by link in right-side bar (for now only for admins);
* Show how many filtered products on the page / total on the server;
* Filtration by title, pageTitle and description;
* Filtration by price using range slider with autocalculated min and max values;
* Filtration by weight using range slider with autocalculated min and max values;
* Filtration by tag with autocomplete;
* Filtration by detail using combination name + value;
* Filtration by visibility (only for admins);
* All strings supports i18n; 

You are welcome to submit any issues or ideas [here](https://github.com/ramusus/reaction-filtration/issues/)
