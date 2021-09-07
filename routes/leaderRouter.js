const express = require('express');
const bodyParser = require('body-parser');
const { raw } = require('body-parser');
const authenticate = require('../authenticate');

const leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

const mongoose = require('mongoose');
const Leader = require('../models/leader');

leaderRouter.route('/')
    .get((req, res, next) => {
        Leader.find({})
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyAdmin, (req, res, next) => {
        Leader.create(req.body)
            .then((leader) => {
                console.log('promotion created', leader);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put(authenticate.verifyAdmin,(req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported');
    })
    .delete(authenticate.verifyAdmin,(req, res, next) => {
        Leader.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

leaderRouter.route('/:leaderId')

    .get((req, res, next) => {
        Leader.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(authenticate.verifyAdmin,(req, res, next) => {
        res.statusCode = 403;
        res.end("Post operation not supported on /leader/" + req.params.leaderId);
    })
    .put(authenticate.verifyAdmin,(req, res, next) => {
        Leader.findByIdAndUpdate(req.params.leaderId, {
            $set: req.body
        },
            { new: true }
        )
            .find({})
            .then((leader) => {
                res.statusCode200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(authenticate.verifyAdmin,(req, res, next) => {
        Leader.findByIdAndRemove(req.params.id)
            .then((resp) => {
                res.statusCode(200);
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = leaderRouter;