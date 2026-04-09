const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },

  description: {
    type: String,
    required: true,
    minlength: 1,
  },

  image: {
    url: String,
    filename: String,
  },

  price: {
    type: Number,
    required: true,
    min: 0,
    minlength: 1,
  },

  location: {
    type: String,
    required: true,
    minlength: 1,
  },

  country: {
    type: String,
    required: true,
    minlength: 1,
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  category: {
    type: String,
    enum: [
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
    ],
    required: true,
  },
});

// man lo listing hi delete krdi but reviews reh jaynge uske liye ek middleware banyenge

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
