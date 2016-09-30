

var Application = require('./src/Application')

var application = new Application()
let expressApp = application.buildRoutes()
var csv = ""
application.updateWith(csv)

expressApp.listen(3000)


