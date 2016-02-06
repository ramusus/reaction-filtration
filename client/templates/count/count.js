Template.productsCount.helpers({
  "total": () => {
    return Counts.get("Products");
  },
  "limit": () => {
    return Math.min(Session.get('productScrollLimit'), Counts.get("Products"));
  }
});
