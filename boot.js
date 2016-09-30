

var Application = require('./src/Application')

var application = new Application()
let expressApp = application.buildRoutes()
var csv = ""
application.updateWith(csv)

expressApp.listen(3000)
var twoMinutes = 120 * 1000
setInterval(refreshCsv, twoMinutes)


function refreshCsv() {
    function loadCsvFromGoogleSheets() {
        // TODO implement
        return Promise.resolve()
    }

    loadCsvFromGoogleSheets().then(function (res) {
        let csvLoadedFromGoogleDocs = res.body
        application.updateWith(csvLoadedFromGoogleDocs)

    })
}

