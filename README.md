Reaction Filtration [![Build Status](https://travis-ci.org/ramusus/reaction-filtration.png?branch=master)](https://travis-ci.org/ramusus/reaction-filtration)
===================

This package lets you do reactive filtration of the products on the index and tag pages in Reaction Commerce 

Installation
------------

    meteor add ramusus:reaction-filtration

**Important** Right now Reaction Core doesn't support integration with this package out of the box. It's necessary to do 
slight changes. I opened this [Pull Request](https://github.com/reactioncommerce/reaction/pull/963) 
to show how to integrate it with latest development 0.12 version of Reaction Core. You can merge it to you local 
installation. You can check what changes are necessary 
[here](https://github.com/reactioncommerce/reaction/pull/963/files).

Screencast
----------

![Filters]()

Features
--------

* Open filters by link in right-side bar (link visible now only for admins);
* Show how many **filtered products** are visible on the page / total on the server;
* Working both on index and product tag pages;
* Filtration by title, pageTitle and description (search functionality);
* Filtration by price using range slider with autocalculated min and max values;
* Filtration by weight using range slider with autocalculated min and max values;
* Filtration by tag with autocomplete (only on index page);
* Filtration by detail using combination name + value;
* Filtration by visibility (only for admins);
* All strings supports i18n; 

In plans
--------

* Change URL with filtraion parameters
* Settings show/hide filters in dashboard

You are welcome to submit any issues or ideas [here](https://github.com/ramusus/reaction-filtration/issues/)
