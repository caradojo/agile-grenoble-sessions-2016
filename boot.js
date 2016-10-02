"use strict";

var Application = require('./src/Application')
var downloadCsv = require('./src/DownloadCsv')

var application = new Application()
let expressApp = application.buildRoutes()
refreshCsv()
expressApp.listen(3000)
var twoMinutes = 120 * 1000
setInterval(refreshCsv, twoMinutes)


function refreshCsv() {
    downloadCsv('https://docs.google.com/spreadsheets/d/1eNbJzyZOHES02YQaBHb5Ikxs6gPi5s8unVCkyIMJVUw/export?format=csv').then(function (csvLoadedFromGoogleDocs) {
        application.updateWith(csvLoadedFromGoogleDocs)
    })
}

