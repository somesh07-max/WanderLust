// const mongoose = require("mongoose");

// const ListingSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },

//     description: {
//         type: String
//     },

//     image: {
//         type: String,
//         default: "https://unsplash.com/photos/a-colorful-bouquet-of-zinnias-in-a-blue-vase-TnN4MdP0HFk",
//         set: (v) =>
//             v === "" 
//                 ? "https://unsplash.com/photos/a-colorful-bouquet-of-zinnias-in-a-blue-vase-TnN4MdP0HFk"
//                 : v
//     },

//     price: {
//         type: Number,
//         // required:true
//     },

//     location: {
//         type: String
//     },

//     country: {
//         type: String
//     }
// });

// const Listing = mongoose.model("Listing", ListingSchema);

// module.exports = Listing;





const mongoose = require("mongoose");
const Review = require("./review.js");

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb";

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  image: {
    type: String,
    default: DEFAULT_IMAGE,
    set: (v) => (v === "" ? DEFAULT_IMAGE : v),
  },

  price: {
    type: Number,
    required: true,
    // min: 0,
  },

  location: {
    type: String,
    required: true,
  },

  country: {
    type: String,
    required: true,
  },

  reviews:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Review"
    }
  ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
  await Review.deleteMany({_id:{$in:listing.reviews}})
  }
})

module.exports = mongoose.model("Listing", listingSchema);