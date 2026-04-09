/* joi ka schema or listings.js mai mongoose ka schema clash nahi krenge kyunki =>
    
Joi => request ane se pehle check krta hai, backend validation(user input), fast fail
mongoose => Database mai save krte time check krta hai, db validation, final safety */

const Joi = require("joi");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    location: Joi.string().required(),
    country: Joi.string().required(),
    price: Joi.number().required().min(0),
    category: Joi.string()
      .valid(
        "trending",
        "rooms",
        "iconic-cities",
        "mountains",
        "castles",
        "arctic",
        "beaches",
        "camping",
        "farms",
        "breakfast",
      )
      .required(),
    image: Joi.object({
      url: Joi.string().allow("", null),
      filename: Joi.string().allow("", null),
    }).default({}),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }).required(),
});
