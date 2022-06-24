module.exports = (err, req, res, next) => {
  try {
    console.log("congrats you hit the error middleware");
    // res.send(err);
    if (err.name === "ValidationError") return (err = handleValidationError(err, res));
    if (err.code && err.code == 11000) return (err = handleDuplicateKeyError(err, res));
  } catch (err) {
    res.status(500).send("An unknown error occurred.");
  }
};
