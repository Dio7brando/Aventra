/* yeh ek wrapper function hai jo async functions ke errors ko (next) mai bhej deta hai,
next kya hai? next mtlb aage wala function jo ki express ka default error handler hai
woh sambhal lega baki */

module.exports = (fn) => { // ek fucntion(fn) banaya route wala 
  return (req, res, next) => { // yeh actual middleware ban gaya 
    fn(req, res, next).catch(next); // function(fn) ko run kara or agar error aya to usse catch krke next mai bhej diya
  };
};
 