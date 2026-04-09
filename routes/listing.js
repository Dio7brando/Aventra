const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require("multer"); // yeh hamare new form se ayi uploaded image ko save krta hai
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

// Search option route =>
router.get(
  "/search",
  wrapAsync(async (req, res) => {
    let { q } = req.query;

    const listings = await Listing.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { location: { $regex: q, $options: "i" } },
        { country: { $regex: q, $options: "i" } },
        { category: { $regex: q, $options: "i" } },
      ],
    });
    if (listings.length === 0) {
      req.flash("error", "No such destination found!");
      return res.redirect("/listings");
    }

    res.render("listings/index.ejs", { allListings: listings });
  }),
);

router
  .route("/")
  .get(wrapAsync(listingController.index)) // Index route
  .post(
    // create route
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );

// new route =>
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) // show route
  .put(
    // update route
    isLoggedIn, // pehle check hoga kya user logged in hai
    isOwner, // kya user listing ka owner hai
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(
    // delete route
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.deleteListing),
  );

// Edit route =>
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.editListing),
);

// category route =>
router.get(
  "/category/:category",
  wrapAsync(async (req, res) => {
    let { category } = req.params;

    const listings = await Listing.find({ category: category.toLowerCase() });

    res.render("listings/index.ejs", { allListings: listings });
  }),
);

module.exports = router;
