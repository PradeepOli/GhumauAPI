const mongoose = require("mongoose");
require("dotenv").config();
const mongoDBErrors = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connect(MONGOURI,{ useNewUrlParser: true });
