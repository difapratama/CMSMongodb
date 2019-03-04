var express = require('express');
var router = express.Router();
let Maps = require('../models/maps');

// =================== ADD =================== //

router.post('/', (req, res, next) => {
    Maps.create({ title: req.body.title, lat: Number(req.body.lat), lng: Number(req.body.lng) },
        function (err, result) {
            if (err)
                res.json(err)
            else
                res.json({
                    status: "success", message: "data have been added",
                    data: {
                        _id: result._id,
                        title: result.title,
                        lat: result.lat,
                        lng: result.lng
                    }
                })
        })
})

// =================== GET ALL DATA =================== //

router.get('/', (req, res, next) => {
    let mapsList = []
    Maps.find({}, (err, allData) => {
        if (err) {
            res.json(err)
        } else {
            for (let item of allData) {
                mapsList.push({
                    _id: item._id,
                    title: item.title,
                    lat: item.lat,
                    lng: item.lng
                })
            }
            res.json({ mapsList })
        }
    })
})

// =================== BROWSE =================== //

router.post('/search', (req, res, next) => {
    let keyword = {};
    if (req.query.title) {
        keyword.title = req.query.title
    }
    if (req.query.lat) {
        keyword.lat = req.query.lat
    }
    if (req.query.lng) {
        keyword.lng = req.query.lng
    }

    Maps.find(keyword).then(mapsSearch => {
        let data = [];
        mapsSearch.forEach(item => {
            data.push({
                _id: item._id,
                title: item.title,
                lat: item.lat,
                lng: item.lng
            })
        })
        res.json(data);
    })
})

// =================== EDIT =================== //

router.put('/:id', (req, res, next) => {

    let id = req.params.id;

    Maps.findOneAndUpdate({ _id: req.params.id },
        { title: req.body.title, lat: Number(req.body.lat), lng: Number(req.body.lng) }, (err, dataEdit) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    status: "success",
                    message: "data have been updated",
                    data: {
                        _id: dataEdit._id,
                        title: req.body.title,
                        lat: Number(req.body.lat),
                        lng: Number(req.body.lng)
                    }
                })
            }
        })
})

// =================== DELETE =================== //

router.delete('/:id', (req, res) => {
    Maps.findOneAndDelete({ _id: req.params.id }).then((dataRemoved) => {
        res.status(201).json({
            success: true,
            message: 'data have been deleted',
            data: {
                _id: dataRemoved._id,
                title: dataRemoved.title,
                lat: Number(dataRemoved.lat),
                lng: Number(dataRemoved.lng)
            }
        })
    })
})

// =================== FIND =================== //

router.get('/:id', (req, res) => {
    Maps.findOne({ _id: req.params.id }).then((dataFind) => {
        res.status(200).json({
            success: true,
            message: 'data found',
            data: {
                _id: dataFind._id,
                title: dataFind.title,
                lat: Number(dataFind.lat),
                lng: Number(dataFind.lng)
            }
        })
    }).catch((err) => {
        res.json({
            success: false
        })
    })
})

module.exports = router;