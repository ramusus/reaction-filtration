Template.filtrationFilters.onCreated(function() {
  let self = this;
  self.autorun(function () {
    Session.set('filtration-selector', {});
  });
});

Template.filtrationFilters.onRendered(function() {

  Meteor.call("filtration/getProductPriceBound", function(error, result) {
    let currency = ReactionCore.Locale.shopCurrency;
    let space = currency.format[2] === ' ' ? '&nbsp;' : '';
    let wnumbSettings = currency.format[1] === "v" ? {'postfix': space + currency.symbol} :
                                                     {'prefix': currency.symbol + space}
    let wnumb = wNumb(wnumbSettings);
    let priceSlider = $('.priceSlider').get(0);
    noUiSlider.create(priceSlider, {
      start: [result['min'], result['max']],
      tooltips: [wnumb, wnumb],
      connect: true,
      step: 1,
      margin: 1,
      range: result
    });
    priceSlider.noUiSlider.on('change', (values) => {
      let selector = Session.get('filtration-selector');
      selector['price'] = {variants: {$elemMatch: {price: {$gte: 1*values[0], $lte: 1*values[1]}}}};
      Session.set('filtration-selector', selector);
    });
  });

  Meteor.call("filtration/getProductWeightBound", function(error, result) {
    let weightSlider = $('.weightSlider').get(0);
    noUiSlider.create(weightSlider, {
      start: [result['min'], result['max']],
      tooltips: [wNumb({}), wNumb({})],
      connect: true,
      step: 1,
      margin: 1,
      range: result
    });
    weightSlider.noUiSlider.on('change', (values) => {
      let selector = Session.get('filtration-selector');
      selector['weight'] = {variants: {$elemMatch: {weight: {$gte: 1*values[0], $lte: 1*values[1]}}}};
      Session.set('filtration-selector', selector);
    })
  });

});

Template.filtrationFilters.events({
  "keyup #query": (event) => {
    const value = event.target.value;
    const name = event.target.id;
    let selector = Session.get('filtration-selector');
    if(value != '') {
      let cond = {$regex: value, $options: 'i'};
      selector[name] = {$or: [{'title': cond}, {'pageTitle': cond}, {'description': cond}]};
    } else {
      delete selector[name];
    }
    Session.set('filtration-selector', selector);
  },
  "keyup #detail_value,keyup #detail_name": (event) => {
    const name = 'details';
    const key = $('#detail_name').val();
    const value = $('#detail_value').val();
    let selector = Session.get('filtration-selector');
    if(key != '' && value != '') {
      selector[name] = {metafields: {$elemMatch: {key: {$regex: key, $options: 'i'},
                                                  value: {$regex: value, $options: 'i'}}}};
    } else {
      delete selector[name];
    }
    Session.set('filtration-selector', selector);
  },
  "click #tag": (event) => {
    return $(event.currentTarget).autocomplete({
      delay: 0,
      autoFocus: true,
      source: function (request, response) {
        let datums = [];
        let slug = getSlug(request.term);
        ReactionCore.Collections.Tags.find({
          slug: new RegExp(slug, "i")
        }).forEach(function (tag) {
          return datums.push({
            label: tag.name
          });
        });
        return response(datums);
      },
      select: function(event, ui) {
        $(this).val(ui.item.value).trigger('keyup');
      }
    });
  },
  "keyup #tag": (event) => {
    const name = 'tag';
    let selector = Session.get('filtration-selector');
    let tag = ReactionCore.Collections.Tags.findOne({
      name: event.target.value
    });
    if(tag) {
      selector[name] = {'hashtags': {$in: [tag._id]}};
    } else {
      delete selector[name];
    }
    Session.set('filtration-selector', selector);
  },
  "change #visibility": (event) => {
    const value = event.target.value;
    const name = event.target.id;
    let selector = Session.get('filtration-selector');
    if(value != '') {
      selector[name] = {'isVisible': !!(1 * value)};
    } else {
      delete selector[name];
    }
    Session.set('filtration-selector', selector);
  }
});
