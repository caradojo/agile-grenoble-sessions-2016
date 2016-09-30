"use strict"
var expect = require('chai').expect
var request = require('supertest-as-promised')

var Application = require('../../src/Application')


describe('given it has loaded the csv', function() {
    class TestApplication {

        constructor() {
            var application = new Application()
            this.application = application
            application.buildRoutes()
        }

        updateWith(csv) {
            this.application.updateWith(csv)

        }

        getSummary() {

            let server = this.application.getRoutes()

            return request(server).get('/summary')

        }

    }

    describe('serves the roomlist', function() {

        it('where every room has a name and a sequential id', function() {
            let application = new TestApplication()
            let csv = "Titre,room;titre-session,Auditorium"
            application.updateWith(csv)
            return application.getSummary()
                .set('Accept', 'application/json')
                .expect(200)
                .expect(bodyToHaveRoomsAndSlots)


            function bodyToHaveRoomsAndSlots(res) {
                var body = res.body
                expect(body.rooms).not.to.be.undefined
                expect(body.rooms).to.deep.equal({Auditorium: {capacity: 530, id:0}})
                expect(body.slots[0]).to.deep.equal({all: {
                    "width": 12,
                    "length": 1,
                    "title": "Accueil des participants autour d'un café",
                    "type": "non-session"
                }})
            }

        })

    })
    describe('with sessins', function() {
        it('', function() {

        })
    })
})
