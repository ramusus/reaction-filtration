Template.filtrationFilters.onRendered(function () {
  const instance = Template.instance();
  const currency = ReactionCore.Locale.shopCurrency;
  const priceSlider = instance.$(".priceSlider").get(0);
  const weightSlider = instance.$(".weightSlider").get(0);

  ReactionFiltration.methods.getProductFieldBounds.call({field: "price"}, (error, result) => {
    const space = currency.format[2] === " " ? "&nbsp;" : "";
    const wnumbSettings = currency.format[1] === "v" ?
      {postfix: space + currency.symbol} : {prefix: currency.symbol + space};
    const wnumb = wNumb(wnumbSettings);
    noUiSlider.create(priceSlider, {
      start: [result.min, result.max],
      tooltips: [wnumb, wnumb],
      connect: true,
      step: 1,
      margin: 1,
      range: result
    });
    priceSlider.noUiSlider.on("change", (values) => {
      ReactionFiltration.update("price", {min: 1 * values[0], max: 1 * values[1]});
    });
  });

  ReactionFiltration.methods.getProductFieldBounds.call({field: "weight"}, (error, result) => {
    noUiSlider.create(weightSlider, {
      start: [result.min, result.max],
      tooltips: [wNumb({}), wNumb({})],
      connect: true,
      step: 1,
      margin: 1,
      range: result
    });
    weightSlider.noUiSlider.on("change", (values) => {
      ReactionFiltration.update("weight", {min: 1 * values[0], max: 1 * values[1]});
    })
  });

  this.autorun(function () {
    // call after every changing url - reset filtration and form
    ReactionRouter.watchPathChange();
    ReactionFiltration.reset();
    instance.$("#query").val("");
    instance.$("#tag").val("");
    instance.$("#detail_value").val("");
    instance.$("#detail_name").val("");
    instance.$("#visibility").select("");
    if (priceSlider.noUiSlider) {
      priceSlider.noUiSlider.set([0, 99999999]);
    }
    if (weightSlider.noUiSlider) {
      weightSlider.noUiSlider.set([0, 99999999]);
    }
  });

});

Template.filtrationFilters.helpers({
  shops() {
    return ReactionCore.Collections.Shops.find({});
  },
  tagNotSelected() {
    return !ReactionRouter.getParam("slug");
  }
});

Template.filtrationFilters.events({
  "keyup #query": _.throttle((event) => {
    const value = event.target.value;
    const name = event.target.id;
    if (value != "") {
      ReactionFiltration.update(name, value);
    } else {
      ReactionFiltration.remove(name);
    }
  }, 500),
  "keyup #detail_value,keyup #detail_name": _.throttle(() => {
    const name = "details";
    const key = $("#detail_name").val();
    const value = $("#detail_value").val();
    if (key != "" && value != "") {
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
        const slug = getSlug(request.term);
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
        $(this).val(ui.item.value).trigger("keyup");
      }
    });
  },
  "keyup #tag": (event) => {
    const name = "tag";
    const tag = ReactionCore.Collections.Tags.findOne({name: event.target.value});
    if (tag) {
      ReactionFiltration.update(name, tag._id);
    } else {
      ReactionFiltration.remove(name);
    }
  },
  "change #visibility": (event) => {
    const value = event.target.value;
    const name = event.target.id;
    if (value != "") {
      ReactionFiltration.update(name, !!(1 * value));
    } else {
      ReactionFiltration.remove(name);
    }
  }
});
