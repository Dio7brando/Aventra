/* Ham ab MVC = model, view, controller framework use krenge bas likhne ka tarikha hai yeh
controllers mai hamare sare callbacks ayenge */

const Listing = require("../models/listing");
const axios = require("axios");

// index route =>
module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

// new route =>
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// Show route =>
module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("Error", "The listing you requested for does not exist!");
    res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

// Create route =>
module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  // Geocoding start
  let location = req.body.listing.location;

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: location,
        format: "json",
      },
      headers: {
        "User-Agent": "wanderlust-app(your_email@exapmle.com)",
      },
    },
  );

  if (response.data.length > 0) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;

    newListing.geometry = {
      type: "Point",
      coordinates: [lon, lat], // important
    };
  } else {
    // fallback
    newListing.geometry = {
      type: "Point",
      coordinates: [77.209, 28.6139],
    };
  }
  // Geocoding end
  await newListing.save();
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

// Edit route =>
module.exports.editListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

// Update route =>
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findByIdAndUpdate(
    id,
    { ...req.body.listing },
    { new: true },
  );

  // Image update
  if (req.file) {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { url, filename };
    await listing.save();
  }

  // Geocoding added here
  let location = req.body.listing.location;

  const response = await axios.get(
    "https://nominatim.openstreetmap.org/search",
    {
      params: {
        q: location,
        format: "json",
      },
       headers: {
        "User-Agent": "wanderlust-app(your_email@exapmle.com)"
      }
    },
  );

  if (response.data.length > 0) {
    let lat = response.data[0].lat;
    let lon = response.data[0].lon;

    listing.geometry = {
      type: "Point",
      coordinates: [lon, lat],
    };

    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

// Delete route =>
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
