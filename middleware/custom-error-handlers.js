const { CustomApiError } = require("../errors/custom-error");

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log("errorHandlerMiddleware", err);
  if (err instanceof CustomApiError)
    return res.status(err.status).send({
      status: "failed",
      message: err.message,
      task: {},
    });
  res.status(500).send("Someting went wrong");
};

module.exports = errorHandlerMiddleware;
