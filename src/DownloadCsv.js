var request = require('request-promise')
module.exports = function (sourceUrl) {
    return request(sourceUrl)
}

