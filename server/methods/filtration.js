/**
 * Reaction Filtration Methods
 */

let Products = ReactionCore.Collections.Products;

Meteor.methods({
  /**
   * filtration/getProductPriceBounds
   * @param {Object} match - optionally match selector for product filtration
   * @return {Object} return object with min and max values of product price
   */
  "filtration/getProductPriceBound": function (match) {
    check(match, Match.Optional(Object));
    let pipeline = [];
    if(match) {
      pipeline.push({$match: match});
    }
    pipeline.push({$unwind: '$variants'});
    pipeline.push({$group: {_id: null, max: {$max: "$variants.price"}, min: {$min: "$variants.price"}}});

    try {
      let bound = Products.aggregate(pipeline);
      delete bound[0]['_id'];
      return bound[0];
    } catch (error) {
      return ReactionCore.Log.error("Failed execute filtration/getProductPriceBound", error.message);
    }
  },
  /**
   * filtration/getProductWeightBounds
   * @param {Object} match - optionally match selector for product filtration
   * @return {Object} return object with min and max values of product weight
   */
  "filtration/getProductWeightBound": function (match) {
    check(match, Match.Optional(Object));
    let pipeline = [];
    if(match) {
      pipeline.push({$match: match});
    }
    pipeline.push({$unwind: '$variants'});
    pipeline.push({$group: {_id: null, max: {$max: "$variants.weight"}, min: {$min: "$variants.weight"}}});

    try {
      let bound = Products.aggregate(pipeline);
      delete bound[0]['_id'];
      return bound[0];
    } catch (error) {
      return ReactionCore.Log.error("Failed execute filtration/getProductWeightBound", error.message);
    }
  }
});
