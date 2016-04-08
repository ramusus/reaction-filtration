ReactionCore.registerPackage({
  label: "Filtration",
  name: "filtration",
  icon: "fa fa-filter",
  autoEnable: true,
  settings: {},
  registry: [{
    provides: "dashboard",
    label: "Filtration",
    description: "Filtration for products in Reaction Commerce",
    icon: "fa fa-filter",
    cycle: 3,
    container: "core"
  }, {
    provides: "settings",
    template: "filtrationFilters",
    label: "Filters",
    icon: "fa fa-filter",
    container: "tag"
  }, {
    provides: "settings",
    template: "filtrationFilters",
    label: "Filters",
    icon: "fa fa-filter",
    container: "index"
  }]
});
