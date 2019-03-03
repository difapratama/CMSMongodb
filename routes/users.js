var express = require('express');
var router = express.Router();
let User = require('../models/user')
let jwt = require('jsonwebtoken');
let config = require('../config/config');
let bcrypt = require('bcrypt');
let helpers = require('../helpers/util')
let Data = require('../models/data');


/* GET users listing. */
router.post('/api/users/register', function (req, res, next) {

  if (req.body.password == req.body.retypepassword) {

    let token = jwt.sign(req.body.email, config.secret)
    // hash user password before saving into database
    let hash = bcrypt.hashSync(req.body.password, 10)

    let user = new User
      ({
        email: req.body.email,
        password: hash,
        token: token
      })

    user.save().then(users => {
      res.status(201).json({
        data: {
          email: users.email
        },
        token
      });
    }).catch(err => {
      res.json({
        error: true,
        message: err.message
      })
    })
  } else {
    res.json({
      error: true,
      message: 'password and retypepassword are not match'
    })
  }
});

router.post('/api/users/login', function (req, res, next) {
  User.findOne({ email: req.body.email }).then(user => {
    if (!user) {
      res.json({
        err: true,
        message: "Email Not Found"
      })
    } else {
      if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.json({
          error: true,
          message: 'Password Invalid'
        });
      } else {
        let token = jwt.sign(user.email, 'this is secret');

        User.updateOne({ email: req.params.email }, { $set: { token: token } }, (err) => {
          if (err) return res.send(err);
          res.status(201).json({
            error: false,
            data: {
              email: user.email
            },
            token: token
          })
        })
      }
    }
  }).catch(err => console.log(err))
})

router.post('/api/users/check', helpers.token, (req, res, next) => {
  res.status(201).json({
    token: req.decoded,
    valid: true
  })
})

router.get('/api/users/destroy', (req, res, next) => {
  User.findOne({ email: req.query.email }, (err, user) => {
    User.updateOne({ email: req.query.email }, { $set: { token: null } }, (err) => {
      if (err) return res.send(err);
      res.status(201).json({
        logout: true
      })
    })
  })
})

module.exports = router;