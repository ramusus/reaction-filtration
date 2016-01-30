/**
 * Filtration dashboard helpers
 */

Template.filtrationDashboardControls.events({
  "click [data-event-action=showFiltrationOptions]": () => {
    ReactionCore.showActionView({
      label: "Filters",
      i18nKey: "filtration.filtersLabel",
      template: "filtrationFilters"
    });
  }
});
