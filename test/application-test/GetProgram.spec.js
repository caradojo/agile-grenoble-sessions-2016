"use strict"
var expect = require('chai').expect
var request = require('supertest-as-promised')

var Application = require('../../src/Application')


describe('given it has loaded the csv', function() {
    class TestApplication {

        constructor() {
            var application = new Application()
            this.application = application
            this.server = application.buildRoutes()
        }

        updateWith(csv) {
            return request(this.server)
                .put('/program')
                .set('Content-Type', 'text/csv')
                .send(csv)
        }

        getSummary() {
            return request(this.server).get('/summary')
        }

        getProgram() {
            return request(this.server).get('/program')
        }

    }

    describe('/summary serves the roomlist', function() {

        it('where every room has a name and a sequential id', function() {
            let application = new TestApplication()
            let csv = "Titre,room;titre-session,Auditorium"
            return application.updateWith(csv)
                .then(() => {
                    return application.getSummary()
                        .set('Accept', 'application/json')
                        .expect(200)
                        .expect(bodyToHaveRoomsAndSlots)

                })


            function bodyToHaveRoomsAndSlots(res) {
                var body = res.body
                expect(body.rooms).not.to.be.undefined
                expect(body.rooms).to.have.property("Auditorium").to.deep.equal({capacity: 530, id:0})
                expect(body.slots[0]).to.deep.equal({all: {
                    "width": 12,
                    "length": 1,
                    "title": "Accueil des participants autour d'un café",
                    "type": "non-session"
                }})
            }

        })

    })
    describe('/program serves both summary and all sessino details', function () {
        it('', function() {
            let application = new TestApplication()
            let csv = "Titre,room;titre-session,Auditorium"
            return application.updateWith(csv)
                .then(() => {
                    return application.getProgram()
                        .set('Accept', 'application/json')
                        .expect(200)
                        .expect(bodyToHaveRoomsSlotsAndSessionList)
                })


            function bodyToHaveRoomsSlotsAndSessionList(res) {
                var body = res.body
                expect(body).to.have.property("sessionDetails")
                expect(body).to.have.property("programSummary")
                // expect(body).to.have.property("sessionList")
            }


        })
    })
    
    describe('with sessins', function() {
        it('', function() {

        })
    })

})
