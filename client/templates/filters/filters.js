Template.filtrationFilters.onCreated(function () {
  let self = this;
  self.autorun(function () {
    ReactionFiltration.reset();
  });
});

Template.filtrationFilters.onRendered(function () {

  Meteor.call("filtration/getProductPriceBound", function (error, result) {
    let currency = ReactionCore.Locale.shopCurrency;
    let space = currency.format[2] === ' ' ? '&nbsp;' : '';
    let wnumbSettings = currency.format[1] === "v" ? {'postfix': space + currency.symbol} : {'prefix': currency.symbol + space};
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
      ReactionFiltration.update('price', {'min': 1 * values[0], 'max': 1 * values[1]});
    });
  });

  Meteor.call("filtration/getProductWeightBound", function (error, result) {
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
      ReactionFiltration.update('weight', {'min': 1 * values[0], 'max': 1 * values[1]});
    })
  });

});

Template.filtrationFilters.events({
  "keyup #query": _.throttle((event) => {
    const value = event.target.value;
    const name = event.target.id;
    if (value != '') {
      ReactionFiltration.update(name, value);
    } else {
      ReactionFiltration.remove(name);
    }
  }, 500),
  "keyup #detail_value,keyup #detail_name": _.throttle(() => {
    const name = 'details';
    const key = $('#detail_name').val();
    const value = $('#detail_value').val();
    if (key != '' && value != '') {
      ReactionFiltration.update(name, {key: key, value: value});
    } else {
      ReactionFiltration.remove(name);
    }
  }, 500),
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
      select: function (event, ui) {
        $(this).val(ui.item.value).trigger('keyup');
      }
    });
  },
  "keyup #tag": (event) => {
    const name = 'tag';
    let tag = ReactionCore.Collections.Tags.findOne({name: event.target.value});
    if (tag) {
      ReactionFiltration.update(name, tag._id);
    } else {
      ReactionFiltration.remove(name);
    }
  },
  "change #visibility": (event) => {
    const value = event.target.value;
    const name = event.target.id;
    if (value != '') {
      ReactionFiltration.update(name, !!(1 * value));
    } else {
      ReactionFiltration.remove(name);
    }
  }
});
