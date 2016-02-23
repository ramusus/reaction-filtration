/**
 * Filtration dashboard helpers
 */

Template.filtrationDashboardControls.events({
  "click [data-event-action=showFiltrationOptions]": () => {
    ReactionCore.showActionView({
      name: "filtration",
      template: "filtrationFilters"
    });
  }
});
