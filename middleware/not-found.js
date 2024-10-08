const notFound = (req, res) =>
  res.status(404).send("This route does not exits");

module.exports = notFound;
