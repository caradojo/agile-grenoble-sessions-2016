"use strict"
var express = require('express')

function parseCsvToProgram(csv) {

}
class Application {
    constructor() {
        let app = express()
        this.app = app

    }

    buildRoutes() {
        let self = this
        this.app.get('/summary', function (req, res, next) {
            res.send({rooms: self.program.getRooms()})
        })
        return this.app
    }

    updateWith(csv) {
        this.program = new Program(csv)
    }

    getRoutes() {
        return this.app
    }


}

class Program {
    constructor(csv) {
        // TODO to some tranformation based on the csv
        this.data = {
            rooms: {
                Auditorium: {capacity: 530, id: 0}
            }
        }
    }

    getRooms() {
        return this.data.rooms
    }
}

module.exports = Application