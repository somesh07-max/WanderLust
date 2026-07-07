const express = require("express");
const WrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {ReviewSchema}=require("../schema.js")
const Review = require("../models/review.js")
const Listing = require("../models/Listing.js")
const router = express.Router({mergeParams:true});


const validateReview = (req, res, next) => {
    const { error } = ReviewSchema.validate(req.body);

    if (error) {
        let errormsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400, errormsg);
    }

    next();
};


router.post("/",validateReview,WrapAsync(async(req,res)=>{
    const {id}=req.params;
    let List = await Listing.findById(id);
    let newReview = new Review(req.body.review);

    List.reviews.push(newReview);
    let result = await newReview.save();
    await List.save();
    console.log(result);
    console.log(List.reviews);
    req.flash("success","New review has been created");
    res.redirect(`/Listings/${id}`);
}))


router.delete("/:reviewId",WrapAsync(async(req,res)=>{
    let {id,reviewId}=req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
   await Review.findByIdAndDelete(reviewId);


   res.redirect(`/Listings/${id}`);

}))

module.exports = router