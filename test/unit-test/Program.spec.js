"use strict"

var Program = require('../../src/Program')
var expect = require('chai').expect

describe('Program', function() {

    it('does something', function() {
        let program = new Program()
        var rawProgram
        var rooms
        var session
        expect(program.sessionToSlots(rawProgram, rooms, session)).to.deep.equal('toto')
    })
})