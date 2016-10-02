"use strict"
var express = require('express')

class Application {
    constructor() {
        let app = express()
        this.app = app

    }

    buildRoutes() {
        let self = this
        this.app.get('/summary', function (req, res) {
            res.send({
                rooms: self.program.getRooms(),
                slots: self.program.getSlots()
            })
        })
        this.app.get('/debug/rawcsv', function (req, res) {
            res.send(self.program.csv)
        })
        this.app.get('/debug/rawprogram', function (req, res) {
            res.send(self.program.data)
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
            sessions: [] // TODO array of all sessions where we can just get a session based on its index
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