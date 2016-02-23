Package.describe({
  summary: "Reactive filtration of products for Reaction Commerce",
  name: "ramusus:reaction-filtration",
  version: "0.0.4",
  git: "https://github.com/ramusus/reaction-filtration.git"
});

Package.onUse(function (api) {
  api.versionsFrom("METEOR@1.2.1");

  // meteor base packages
  api.use("blaze-html-templates");
  api.use("jquery");

  // add-on packages
  api.use("underscore");
  api.use("reactioncommerce:core@0.12.0");
  api.use("meteorhacks:aggregate@1.3.0");
  api.use("mquandalle:bower@1.5.2_1");
  api.use("tmeasday:publish-counts@0.7.3");
  api.use("mdg:validated-method@1.0.1");
  api.use("aldeed:simple-schema@1.5.3");

  api.addFiles("common/common.js");
  api.addFiles("common/methods/filtration.js");

  api.addFiles("client/bower.json", "client");
  api.addFiles("client/bower/wnumb/wNumb.js", "client");
  api.addFiles("client/bower/nouislider/distribute/nouislider.js", "client");
  api.addFiles("client/bower/nouislider/distribute/nouislider.min.css", "client");

  api.addFiles("client/helpers/filtration.js", "client");
  api.addFiles("client/templates/filters/filters.html", "client");
  api.addFiles("client/templates/filters/filters.js", "client");
  api.addFiles("client/templates/dashboard/dashboard.html", "client");
  api.addFiles("client/templates/dashboard/dashboard.js", "client");
  api.addFiles("client/templates/count/count.html", "client");
  api.addFiles("client/templates/count/count.js", "client");

  api.addFiles("server/register.js", "server");

  api.export("ReactionFiltration");
});
