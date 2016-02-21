Reaction Filtration [![Build Status](https://travis-ci.org/ramusus/reaction-filtration.png?branch=master)](https://travis-ci.org/ramusus/reaction-filtration)
===================

This package lets you do reactive Filtration of the products on the main page in Reaction Commerce 

Installation
------------

    meteor add ramusus:reaction-filtration

**Important** Right now Reaction Core doesn't support integration with this package out of the box. It's necessary to do 
slight changes. I opened this [Pull Request](https://github.com/reactioncommerce/reaction/pull/743) 
to show how to integrate it with latest development 0.12 version of Reaction Core. You can merge it to you local 
installation. You can check what changes are necessary 
[here](https://github.com/reactioncommerce/reaction/pull/743/files).

To enable link "Show filters" in right-side bar, it's required to remove all shops from database. They will be
created again by inner logic of Reaction with updated layout with this link. It will appear in the bottom of right-side bar
on index and product tag pages.

Screenshots
-----------

![Filters](https://s3.amazonaws.com/f.cl.ly/items/1R3V3C1y1N1M270q0w1l/Image%202016-01-30%20at%209.22.31%20PM.png?v=05350742)

Features
--------

* Open filters by link in right-side bar (for link visible now only for admins);
* Show how many **filtered products** are visible on the page / total on the server;
* Working both on index and product tag pages;
* Filtration by title, pageTitle and description (search functionality);
* Filtration by price using range slider with autocalculated min and max values;
* Filtration by weight using range slider with autocalculated min and max values;
* Filtration by tag with autocomplete (only on index page);
* Filtration by detail using combination name + value;
* Filtration by visibility (only for admins);
* All strings supports i18n; 

You are welcome to submit any issues or ideas [here](https://github.com/ramusus/reaction-filtration/issues/)
