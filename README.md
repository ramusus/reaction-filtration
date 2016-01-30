Reaction Filtration [![Build Status](https://travis-ci.org/ramusus/reaction-filtration.png?branch=master)](https://travis-ci.org/ramusus/reaction-filtration)
===================

This package lets you do reactive filtration of the products on the main page in Reaction Commerce 

Installation
------------

    meteor add ramusus:reaction-filtration

**Important** Right now Reaction Core doesn't support integration with this package out of the box. It's necessary to do some changes.
I opened 
[this Pull Request](https://github.com/reactioncommerce/reaction/pull/743) to show how to integrate it with latest 
development branch of Reaction Core. You can merge it to you local installation or do these additions by hands in 
[2 files only](https://github.com/reactioncommerce/reaction/pull/743/files). 

Screenshots
-----------

![Filters](https://s3.amazonaws.com/f.cl.ly/items/1R3V3C1y1N1M270q0w1l/Image%202016-01-30%20at%209.22.31%20PM.png?v=05350742)

Features
--------

* Open filters by link in right-side bar (for now only for admins);
* filtration by title, pageTitle and description;
* filtration by price using range slider with autocalculated min and max values;
* filtration by weight using range slider with autocalculated min and max values;
* filtration by tag with autocomplete;
* filtration by detail using combination name + value;
* filtration by visibility (only for admins);

You are welcome to submit any issues or ideas [here](https://github.com/ramusus/reaction-filtration/issues/)
