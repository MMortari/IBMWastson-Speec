const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const youch = require("youch");

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.error();
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(morgan("dev"));
    this.express.use((req, res, next) => {
      // console.log("Access");
      console.log(process.env.TEXT_TO_SPEECH_IAM_APIKEY);
      return next();
    });
  }

  error() {
    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === "development") {
        const youchs = new youch(err, req);

        return res.json(await youchs.toJson());
      }
      return res.status(err.status || 500).json(err);
    });
  }
}

module.exports = new App().express;
