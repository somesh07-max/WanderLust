const express = require("express");
const WrapAsync = require("../utils/wrapAsync.js");
const {ListingSchema} = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");
const router = express.Router();
const Listing = require("../models/Listing.js")





const  validateListing = (req,res,next)=>{
    let {error}= ListingSchema.validate(req.body);

    if (error) {
        let errormsg =error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errormsg);
    }
    else{
        next();
    }
    // console.log(result);
}

router.get("/", WrapAsync(async (req,res)=>{
  let allListings = await  Listing.find({});

  res.render("Listings/index.ejs",{allListings});
}))


// 
router.get("/new",(req,res)=>{
    res.render("Listings/new.ejs");
})

router.post("/",validateListing, WrapAsync(async (req, res) => {

    const newListing = new Listing(req.body.Listing);
    
    await newListing.save();
    req.flash("success","New Listing has been created");
    res.redirect("/Listings");
}));



//edit route
//update route
router.get("/:id/edit", WrapAsync(async (req,res)=>{
    let {id} = req.params;
    let list= await Listing.findById(id);
    res.render("Listings/edit.ejs",{list});
}))



router.put("/:id",validateListing ,WrapAsync(async(req,res)=>{
        console.log(req.body);
        if(!req.body.Listing){
                throw new ExpressError(500,"Listing object is not present")
        }
     let {id} = req.params;
    await  Listing.findByIdAndUpdate(id,req.body.Listing);
    req.flash("success","Listing has been updated");
     res.redirect(`/Listings` );
}))




// show route
router.get("/:id", WrapAsync(async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id).populate("reviews");

    if (!list) {
        req.flash("error", "Listing does not exist!!");
        return res.redirect("/Listings");
    }

    res.render("Listings/show.ejs", { list });
}));




//delete route

router.delete("/:id",async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","Listing has been deleted");
    res.redirect("/Listings");
})

module.exports = router;














// app.get("/Listings", WrapAsync(async (req,res)=>{
//   let allListings = await  Listing.find({});

//   res.render("Listings/index.ejs",{allListings});
// }))


// app.get("/Listings/new",(req,res)=>{
//     res.render("Listings/new.ejs");
// })


// // show route
// app.get("/Listings/:id",WrapAsync(async (req,res)=>{
//     let {id}= req.params;
//     let list = await Listing.findById(id).populate("reviews");

//     res.render("Listings/show.ejs",{list});
// }))


// app.post("/Listings",validateListing, WrapAsync(async (req, res) => {

//     const newListing = new Listing(req.body.listing);

//     await newListing.save();

//     res.redirect("/Listings");
// }));
// app.get("/Listings/:id/edit", WrapAsync(async (req,res)=>{
//     let {id} = req.params;
//     let list= await Listing.findById(id);
//     res.render("Listings/edit.ejs",{list});
// }))

// app.put("/Listings/:id",validateListing ,WrapAsync(async(req,res)=>{
//         console.log(req.body);
//         if(!req.body.Listing){
//                 throw new ExpressError(500,"Listing object is not present")
//         }
//      let {id} = req.params;
//     await  Listing.findByIdAndUpdate(id,req.body.Listing);
//      res.redirect(`/Listings` );
// }))

// app.delete("/Listings/:id",async (req,res)=>{
//     let {id} = req.params;
//     await Listing.findByIdAndDelete(id);
//     res.redirect("/Listings");
// })

