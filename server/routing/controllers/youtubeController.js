const youtubeService = require("../../youtubeService")


const get = async (req, res) => {
    res.json(youtubeService.getCurrVideoList());
};

module.exports = {
    get,
};
