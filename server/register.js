/*
 * register filtration components as reaction packages
 */

ReactionCore.registerPackage({
  label: "Filtration",
  name: "filtration",
  autoEnable: true,
  settings: {
    url: ""
  },
  registry: [{
    provides: "dashboard",
    label: "Filtration",
    description: "Filtration for products in Reaction Commerce",
    icon: "fa fa-filter",
    cycle: 3,
    container: "dashboard"
  }]
});
