const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

/*maan lo user logged in nahi hai or new listing bana raha hai fir apan usse log in karate 
  hai lekin fir ham /listings(home page par ajate hai), hame user ko convenience dene hai
  toh ham usse log in ke baad wahi layenge jaha woh tha */

module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.user);
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create a listing!");
    return res.redirect("/login");
  }
  next();
};

/* ab normally aesa hona chiye jaisa apan ne socha but passport interfere krta hai, woh
 login hone ke baad session ko reset kr deta hai toh apan ne jo redirectUrl save kiya tha 
 woh delete hojayega, isko counter krne ke liye ham apne req.session.redirectUrl ko locals 
 ke andar save krate hai or locals aese variables hai jo har jageh access hote hai */

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

/* ek or middleware banyenge authorization ke liye yeh check krega jo listing ko edit ya 
delete kr raha hai woh us listing ka owner hai ya nahi */

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You dont have permission to edit");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

/* ek or middleware banyenge authorization ke liye yeh check krega jo reviews ko edit ya 
delete kr raha hai woh us review ka owner hai ya nahi */

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

/* yeh function user ke data ko (joi) ke madad se check or validate krta hai, agar galat
hua toh error throw krega or route ruk jayega or agar sahi hua toh (next) aage bhej dega. */

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// ab same ham same reviews ke liye krenge jo hamne listings ke liye kra tha upar

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};
