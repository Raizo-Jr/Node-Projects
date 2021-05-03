const winston = require("winston");
require("express-async-errors");

module.exports = function () {
  winston.configure({
    transports: [
      new winston.transports.File({ filename: "./logs/combined.log" }),
    ],
    exceptionHandlers: [
      new winston.transports.File({ filename: "./logs/exceptions.log" }),
    ],
    rejectionHandlers: [
      new winston.transports.File({ filename: "./logs/rejections.log" }),
    ],
  });
};
