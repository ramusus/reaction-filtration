/**
 * Methods for updating reactive session variables for ProductsGrid template
 */

_.extend(ReactionFiltration, {
  update: (name, value) => {
    let selector = Session.get('productFilters');
    selector[name] = value;
    Session.set('productFilters', selector);
    Session.set("productScrollLimit", ITEMS_INCREMENT);
  },
  remove: (name) => {
    let selector = Session.get('productFilters');
    delete selector[name];
    Session.set('productFilters', selector);
    Session.set("productScrollLimit", ITEMS_INCREMENT);
  },
  reset: () => {
    Session.set('productFilters', {});
  }
});
