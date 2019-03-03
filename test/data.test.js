'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const Data = require("../models/data");

const should = chai.should();
chai.use(chaiHTTP);

describe('datas', function () {

    // Data.collection.drop();

    it('1. Add data with post method', (done) => {
        chai.request(server)
            .post('/api/data')
            .send({ 'letter': 'A', 'frequency': '1.1' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('_id');
                res.body.data.should.have.property('letter');
                res.body.data.should.have.property('frequency');
                res.body.should.have.property('status');
                res.body.should.have.property('message');
                res.body.status.should.equal('success');
                res.body.message.should.equal('data have been added');
                res.body.data._id.should.equal(res.body.data._id);
                res.body.data.frequency.should.equal(res.body.data.frequency);
                done();
            })
    })

    // it('2. Read All Data with GET Method', function (done) {
    //     chai.request(server)
    //         .get('/api/data/')
    //         .send({ 'letter': 'A', 'frequency': '1.1' })
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             res.body.should.be.a('array');
    //             res.body[0].should.have.property('_id');
    //             res.body[0].should.have.property('letter');
    //             res.body[0].should.have.property('frequency');
    //             res.body[0]._id.should.equal(res.body[0]._id);
    //             res.body[0].letter.should.equal(res.body[0].letter);
    //             res.body[0].frequency.should.equal(res.body[0].frequency);
    //             done();
    //         })
    // })

    it('3. Search data in database', (done) => {
        chai.request(server)
            .post('/api/data/search')
            .send({ 'letter': 'A', 'frequency': '1.1' })
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('letter');
                res.body[0].should.have.property('frequency');
                res.body[0]._id.should.equal(res.body[0]._id);
                res.body[0].letter.should.equal(res.body[0].letter);
                res.body[0].frequency.should.equal(res.body[0].frequency);
                done();
            });
    })

    it('4. Edit Data', (done) => {
        chai.request(server)
            .post('/api/data/search')
            .send({ 'letter': 'A', 'frequency': '1.1' })
            .end((err, res) => {
                chai.request(server)
                    .put('/api/data/' + res.body[0]._id)
                    .send({ 'letter': res.body[0].letter, 'frequency': '1.25' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('letter');
                        res.body.data.should.have.property('frequency');
                        res.body.status.should.equal('success');
                        res.body.message.should.equal('data have been updated');
                        res.body.data._id.should.equal(res.body.data._id);
                        res.body.data.letter.should.equal(res.body.data.letter);
                        res.body.data.frequency.should.equal(res.body.data.frequency);
                        done();
                    })
            });
    });

    it('5. Find Data in database', (done) => {
        chai.request(server)
            .post('/api/data')
            .send({ 'letter': 'A', 'frequency': '1.1' })
            .end((err, res) => {
                chai.request(server)
                    .get('/api/data/' + res.body.data._id)
                    .send({ 'letter': res.body.data.letter, 'frequency': '1.25' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                        res.body.data.should.have.property('_id');
                        res.body.data.should.have.property('letter');
                        res.body.data.should.have.property('frequency');
                        res.body.status.should.equal('success');
                        res.body.message.should.equal('data found');
                        res.body.data._id.should.equal(res.body.data._id);
                        res.body.data.letter.should.equal(res.body.data.letter);
                        res.body.data.frequency.should.equal(res.body.data.frequency);
                        done();
                    })
            })
    })

    it('5. Delete Data From Database', (done) => {
        chai.request(server)
            .post('/api/data/search')
            .send({ 'letter': 'A', 'frequency': '1.1' })
            .end((err, res) => {
                chai.request(server)
                    .delete('/api/data/' + res.body[0]._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('message');
                        res.body.data.should.have.property('_id')
                        res.body.data.should.have.property('letter');
                        res.body.data.should.have.property('frequency');
                        res.body.status.should.equal('success');
                        res.body.message.should.equal('data have been deleted');
                        res.body.data._id.should.equal(res.body.data._id);
                        res.body.data.letter.should.equal(res.body.data.letter);
                        res.body.data.frequency.should.equal(res.body.data.frequency);
                        done();
                    })
            });
    })


})