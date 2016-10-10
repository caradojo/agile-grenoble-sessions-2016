"use strict";

var Application = require('./src/Application')
var downloadCsv = require('./src/DownloadCsv')


var csvUrl = 'https://docs.google.com/spreadsheets/d/1eNbJzyZOHES02YQaBHb5Ikxs6gPi5s8unVCkyIMJVUw/export?format=csv'
// var csvUrl = 'http://agile-grenoble.org/programmeCsvToJson/test.csv' // ici les noms de champs sont sur la 1ière ligne au lieu de la 2ième

var application = new Application()
let expressApp = application.buildRoutes()
refreshCsv()
expressApp.listen(process.env.PORT || 3000)
var twoMinutes = 120 * 1000
setInterval(refreshCsv, twoMinutes)


// XXXXXXXXXXXXXXX contournement particulièrement stupide d'un BUG: à chaque refresh, les premières lignes (après la ligne d'entête) sont supprimées lors de la conversion jquery-csv (une de plus à chaque appel)!!! Donc on rajoute des lignes vides (ce seront celles qui seront supprimées)
// ?? L'occupation mémoire va finir par augmenter...
var BUG = '\n';
function refreshCsv() {
    console.log('Refresh ' + new Date().toTimeString());
    downloadCsv(csvUrl).then(function (csvLoadedFromGoogleDocs) {
	csvLoadedFromGoogleDocs = csvLoadedFromGoogleDocs.slice(csvLoadedFromGoogleDocs.indexOf('\n')+1); // supprime la 1ère ligne car les noms de champs sur la 2ième ligne
	csvLoadedFromGoogleDocs = csvLoadedFromGoogleDocs.replace('\n', BUG);
        application.updateWith(csvLoadedFromGoogleDocs)
	BUG = BUG + '\n'
    })
}

