var Schema = require('mongoose').Schema;
var DeviceInfoSchema = Schema({
    name: String,
    connect: String,
});

/* global db */
module.exports = db.model('DeviceInfo', DeviceInfoSchema);

