const mongoose = require("mongoose");
require("dotenv").config();
const mongoDBErrors = require("mongoose-mongodb-errors");

mongoose.Promise = global.Promise;
mongoose.plugin(mongoDBErrors);
mongoose.connect(' mongodb://ghumau123:ghumau123@ds115283.mlab.com:15283/ghumau',{ useNewUrlParser: true });
