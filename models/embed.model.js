var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmbedSchema = new Schema({
    url: String,
    data: String,
    status: { type: Number, default: 1 },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

var Embed = mongoose.model('Embed', EmbedSchema);

var Promise = require('bluebird');
Promise.promisifyAll(Embed);
Promise.promisifyAll(Embed.prototype);

module.exports = Embed;