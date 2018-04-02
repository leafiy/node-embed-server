const router = require('express').Router();
const mongoose = require('mongoose');
const EmbedModel = mongoose.model('Embed');
const urlEmbed = require('url-embed');
const EmbedEngine = urlEmbed.EmbedEngine;
const Embed = urlEmbed.Embed;
const engine = new EmbedEngine({
    timeoutMs: 20000,
    referrer: 'unicapsule.com'
});
engine.registerDefaultProviders();

const embedOptions = {
    maxHeight: 400
}
router.post('/', async(req, res, next) => {
    let url = req.body.url;
    let embed = new Embed(url, embedOptions);
    EmbedModel.findOne({ url: url }).then(e => {
        if (e) {
            return res.status(200).send({ result: e.data })
        }
        engine.getEmbed(embed, (embed) => {
            if (embed.error) {
                res.status(200).send({})
            }
            EmbedModel.createAsync({
                url: url,
                data: `<p>${embed.data.html}<br></p>`
            }).then(_ => {
                res.status(200).send({ result: embed.data.html })
            }).catch(_ => {})
        });
    })
});

module.exports = router;