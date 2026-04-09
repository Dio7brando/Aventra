if(process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

//const mongo_url = "mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.MONGODB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

const sessionOptions = {
  secret: "mysupersecretcode",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

/*app.get("/", (req, res) => {
  res.send("Site working");
});*/

app.use(session(sessionOptions)); // session mtlb client or server ka interaction 
app.use(flash()); // flash cards

app.use(passport.initialize()); // passport authentication krta hai 
app.use(passport.session()); // ek session mai bas ek baar hi authentication hoga
passport.use(new LocalStrategy(User.authenticate())); // passport ke andar hamari localstrategy mai User par authentication krna hai 

// user se related info ko 1 session mai store karana serialisation hai or log out hone par info hatana deserialsation hai 

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});



// bas yeh ek line likhne se ham routes folder ko access krte hai jismai hamari sari listings hai
app.use("/listings", listingRouter);

// or yeh ek line hamare reviews folder ke liye
app.use("/listings/:id/reviews", reviewRouter);
  
// isse ham user folder mai jayenge
app.use("/", userRouter);

/* ek route bana rahe hai jismai agar client hamre diye gaye routes mai se kisi par nahi
 jata toh ispar by default jayega or page not found aajyega */
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found!"));
});

// error handler =>
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("listings/error.ejs", { message });
  //res.status(statusCode).send(message);
});

app.listen(8080, () => {
  console.log("Server is listening on port...");
});
