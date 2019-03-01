'use strict'

const chai = require('chai');
const chaiHTTP = require('chai-http');

const server = require('../app');
const User = require("../models/user");

const should = chai.should();
chai.use(chaiHTTP);

describe('users', function () {
    User.collection.drop();

    // beforeEach(function (done) {
    //     let user = new User({
    //         email: "masfuddifapratama@gmail.com"
    //     });

    //     user.save(function (err) {
    //         done();
    //     })
    // })

    // afterEach(function (err) {
    //     User.collection.drop();
    //     done;
    // })

    it('authentifikasi email jika email tidak ditemukan di database dengan metode POST', function (done) {
        chai.request(server)
            .post('/api/users/register')
            .send({ 'email': 'masfuddifapratama@gmail.com', 'password': '12345', 'retypepassword': '12345' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                console.log('aaaaaaaaaaaaaaaa', res.body);

                res.body.data.should.have.property('email');
                res.body.should.have.property('token');
                res.body.data.email.should.equal('masfuddifapratama@gmail.com');
                res.body.token.should.equal(res.body.token)
                console.log('aaaaaaaaaaaaaaaa', res.body);

                done();
            })
    })

    it('authentifikasi email dan pasword sesuai dengan methode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ 'email': 'masfuddifapratama@gmail.com', 'password': '12345' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.data.should.have.property('email');
                res.body.should.have.property('token');
                res.body.data.email.should.equal('masfuddifapratama@gmail.com');
                res.body.token.should.equal(res.body.token);
                done();
            })
    })

    it('authentifikasi email dan pasword sesuai dengan methode POST', function (done) {
        chai.request(server)
            .post('/api/users/login')
            .send({ 'email': 'masfuddifapratama@gmail.com', 'password': '12345' })
            .end(function (err, res) {

                chai.request(server)
                    .post('/api/users/check')
                    .set({ 'authorization': res.body.token })
                    .end(function (err, res) {
                        res.should.have.status(201);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('token');
                        res.body.token.should.equal('masfuddifapratama@gmail.com');
                        res.body.should.have.property('valid');
                        res.body.valid.should.equal(true);
                        done();
                    })
            })
    })

    it('logout get', function (done) {
        chai.request(server)
            .get('/api/users/destroy')
            .send({ 'email': 'masfuddifapratama@gmail.com' })
            .end(function (err, res) {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('logout');
                res.body.logout.should.equal(true);
                done()
            })
    })
})