var express = require('express');
var router = express.Router();

var faker = require('Faker');

var mongoose = require('mongoose');
var User = require('../models/User.js');


/* --------- GET home instruction page (/) --------- */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'REST service' });
});
/* --------- GET home instruction page (/) --------- */


/* --------- GET genetator page (/:number) --------- */
router.get('/generate/:number', function(req, res, next) {
  // params to int
  var number = parseInt(req.params.number, 10);

  // bad request
  if (!Number.isInteger(number) || number > 10 || number < 1) {
    var err = new Error('Invalid number');
    err.status = 400;
    return next(err);
  }

  // good request
  for (var i = 0; i < req.params.number; i++) {
    // create some new users
    User.create(
      {
        firstName: faker.Name.firstName(),
        lastName: faker.Name.lastName(),
        email: faker.Internet.email(),
        password: faker.Lorem.words(1)[0]
      },
      function(err, user){
        if(err) return next(err);
      }
    );
  }
  res.json({title: `${req.params.number} users was succesfuly created`});
});
/* --------- GET home instruction page (/:number) --------- */


module.exports = router;


/* --------------------------------------------------------- */
/* ---------------- Inctruction to mongoose ---------------- */
/* --------------------------------------------------------- */

// ----------------------------------
/*  Create and save instances (v1) */
// ----------------------------------
// create instances:
// var user = new User(
//   {
//     firstName: 'Some name',
//     lastName: 'Some lastname',
//     email: 'Some email',
//     password: 'Some pass',
//   }
// );
// ----------------------------------
// save instance
// user.save(function(err){
//   if(err)
//     console.log(err);
//   else
//     console.log(user);
// });

// ----------------------------------
/*  Create and save instances (v2) */
// ----------------------------------
// create and save instance one operation:
// User.create(
//   {
//     firstName: 'Some name',
//     lastName: 'Some lastname',
//     email: 'Some email',
//     password: 'Some pass',
//   },
//   function(err, todo){
//     if(err) console.log(err);
//     else console.log(todo);
//   }
// );

// ----------------------------------
/*  Query all */
// ----------------------------------
// User.find(function (err, users) {
//   if (err) return console.log(err);
//   console.log(users);
// })
// ----------------------------------
/*  Query some */
// ----------------------------------
// common callback for query examples:
// var callback = function (err, data) {
//   if (err) { return console.error(err); }
//   else { console.log(data); }
// }
// ----------------------------------
// Getting by firstName
// User.find({firstName: 'Other name' }, callback);
// ----------------------------------
// Getting by using RegExp
// User.find({firstName: /^Some/ }, callback);
// ----------------------------------
// Getting by complex query
// User.find({lastName: 'Other lastname', email: 'Other email'}, callback);
// ----------------------------------
// Getting by supercomplex query
// User.find({email: 'Some email' }).where('password').equals('Some pass').exec(callback);
// ----------------------------------
// There are also:
// - Model.findById(id, [fields], [options], [callback])
// - Model.findOne(conditions, [fields], [options], [callback])

// ----------------------------------
/*  Update some or multi with { multi: true } option */
// ----------------------------------
// - Model.update(conditions, update, [options], [callback])
// - Model.findByIdAndUpdate(id, [update], [options], [callback])
// - Model.findOneAndUpdate([conditions], [update], [options], [callback])

// ----------------------------------
/*  Delete */
// ----------------------------------
// - Model.remove(conditions, [callback])
// - Model.findByIdAndRemove(id, [options], [callback])
// - Model.findOneAndRemove(conditions, [options], [callback])
