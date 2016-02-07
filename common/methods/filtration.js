/**
 * Reaction Filtration Methods
 */

ReactionFiltration.methods = {};

/**
 * filtration/getProductFieldBounds
 * @param {Object} match - optionally match selector for product filtration
 * @return {Object} return object with min and max values of product price or weight
 */
ReactionFiltration.methods.getProductFieldBounds = new ValidatedMethod({
  name: 'ReactionFiltration.methods.getProductFieldBounds',
  validate: new SimpleSchema({
    field: { type: String, allowedValues: ['price', 'weight'] },
    match: { type: Object, optional: true}
  }).validator(),
  run({ field, match }) {
    let pipeline = [];
    if(match) {
      pipeline.push({$match: match});
    }
    pipeline.push({$unwind: '$variants'});
    pipeline.push({$group: {_id: null, max: {$max: `$variants.${field}`}, min: {$min: `$variants.${field}`}}});

    try {
      let bound = ReactionCore.Collections.Products.aggregate(pipeline);
      delete bound[0]['_id'];
      return bound[0];
    } catch (error) {
      return ReactionCore.Log.error("Failed execute filtration/getProductFieldBound with arguments", field, match, error.message);
    }
  }
});