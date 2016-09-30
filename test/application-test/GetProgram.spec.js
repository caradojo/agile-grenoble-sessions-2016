"use strict"
var expect = require('chai').expect
var request = require('supertest-as-promised')
var express = require('express')
describe('given it has loaded the csv', function() {
    class Application {

        constructor() {
            this.app = express()
            this.app.get('/summary', function (req, res, next) {
                res.send({rooms: []})
            })
        }

        loadCsv() {

        }

        expressApp() {
            return this.app
        }
        getSummary() {

            return request(this.app).get('/summary')

        }

    }

    describe('serves the roomlist', function() {

        it('where every room has a name and a sequential id', function() {
            let application = new Application()
            application.loadCsv()
            return application.getSummary()
                .set('Accept', 'application/json')
                .expect(200)
                .expect(function (res) {
                    expect(res.body.rooms).not.to.be.undefined
                })



        })

    })
    describe('with sessins', function() {
        it('', function() {

        })
    })
})
