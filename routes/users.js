var express = require('express');
var router = express.Router();


/* --- mongoose getting user model --- */
var mongoose = require('mongoose');
var User = require('../models/User.js');
/* --- /mongoose getting user model --- */


/* ---------- GET users (/users) ---------- */
router.get('/', function(req, res, next) {
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});
/* ---------- /GET users (/users) ---------- */


/* ---------- POST users (/users) ---------- */
router.post('/', function(req, res, next) {
  User.create(req.body, function (err, user) {
    if (err) return next(err);
    res.json(user);
  });
});
/* ---------- /POST users (/users) ---------- */


/* ----------------- GET /users/:id ----------------- */
router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      if (err.name == 'CastError') return next();
      return next(err)
    };
    if (!user) return next();
    res.json(user);
  });
});
/* ----------------- /GET /users/:id ----------------- */


/* ------------------------- PATCH /users/:id ------------------------- */
router.patch('/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) {
      if (err.name == 'CastError') return next();
      return next(err)
    };
    if (!user) return next();
    res.json(user); //it returns OLD VERSION NOT NEW
  });
});
/* ------------------------- /PATCH /users/:id ------------------------- */


/* ------------------------ DELETE /users/:id ------------------------ */
router.delete('/:id', function(req, res, next) {
  User.findByIdAndRemove(req.params.id, function (err, user) {
    if (err) {
      if (err.name == 'CastError') return next();
      return next(err)
    };
    if (!user) return next();
    res.json(user);
  });
});
/* ------------------------ /DELETE /users/:id ------------------------ */


module.exports = router;
