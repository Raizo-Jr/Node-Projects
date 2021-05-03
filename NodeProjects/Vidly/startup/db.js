const winston = require("winston");
const mongoose = require("mongoose");

const logger = winston.createLogger({
  transports: [new winston.transports.Console()],
});

module.exports = function () {
  mongoose.set("useCreateIndex", true);

  mongoose
    .connect("mongodb://localhost/vidly", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => logger.info("Connected to MongoDB..."));
};
