var child_process = require('child_process')
var request = require('request-promise')
var summaryUrl = "http://agile-grenoble-2016.herokuapp.com/summary"

child_process.execSync('git push heroku master')
request(summaryUrl)
    .then((body) => {
        console.log("deployment successful!")})
    .catch((e) => {
        console.error("Deployment done but the server does not respond correctly")
        console.error(`please check out the server : curl ${summaryUrl}`)
        process.exit(1)
    })
