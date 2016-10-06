"use strict"
var express = require('express')

class Application {
    constructor() {
        let app = express()
        this.app = app

    }

    buildRoutes() {
        let self = this
        var app = this.app
        app.get('/summary', function (req, res) {
            res.jsonp({
                rooms: self.program.getRooms(),
                slots: self.program.getSlots()
            })
        })
        app.put('/program', (req, res) => {
            self.updateWith(req.body)
            res.send(self.program)
        })
        app.get('/program', function (req, res) {
            res.send(self.program.data)
        })
        app.get('/debug/rawcsv', function (req, res) {
            res.send(self.program.csv)
        })

        return app
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
        // TODO here
        this.csv = csv
        this.data = this.todoCompileObjectFromCsv(csv)
    }

    todoCompileObjectFromCsv(csv) {
        return {
            rooms: {
                Auditorium: {capacity: 530, id: 0}
            },
            slots: [{
                all: {
                    "width": 12,
                    "length": 1,
                    "title": "Accueil des participants autour d'un café",
                    "type": "non-session"
                }
            }],
            sessionList: [] // TODO array of all sessions where we can just get a session based on its index
        }
    }

    getRooms() {
        return this.data.rooms
    }

    getSlots() {
        return this.data.slots
    }


}

module.exports = Application