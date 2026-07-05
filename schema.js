const Joi = require("joi");

module.exports.ListingSchema = Joi.object({
    Listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(0).required(),
        country: Joi.string().required(),
        location: Joi.string().required(),
        image: Joi.string().allow("", null)
    }).required()
});


module.exports.ReviewSchema = Joi.object({
    review:Joi.object({
        rating:Joi.number().required(),
        comment:Joi.string().required(),
    }).required()
})
