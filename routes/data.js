var express = require('express');
var router = express.Router();
let Data = require('../models/data');

// =================== browse =================== //

router.post('/search', (req, res, next) => {
    let keyword = {};
    if (req.query.letter) {
        keyword.letter = req.query.letter
    }
    if (req.query.frequency) {
        keyword.frequency = req.query.frequency
    }

    Data.find(keyword).then(dataSatu => {
        // console.log('aaaaaaaaaaaa', keyword);
        let data = [];
        dataSatu.forEach(item => {
            // console.log('difaaaaa', item);

            data.push({
                _id: item._id,
                letter: item.letter,
                frequency: item.frequency
            })
        })
        res.json(data);
    })
})

// =================== GET ALL DATA =================== //

router.get('/', (req, res, next) => {
    let dataList = []
    Data.find({}, (err, allData) => {
        if (err) {
            res.json(err)
        } else {
            for (let item of allData) {
                dataList.push({ _id: item._id, letter: item.letter, frequency: item.frequency })
            }
            res.json({ dataList })
        }
    })
})

// =================== edit =================== //

router.put('/:id', (req, res, next) => {

    let id = req.params.id;
    console.log(id);

    Data.findOneAndUpdate({ _id: req.params.id },
        { letter: req.body.letter, frequency: Number(req.body.frequency) }, (err, dataInfo) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    status: "success",
                    message: "data have been updated",
                    data: {
                        _id: dataInfo._id,
                        letter: req.body.letter,
                        frequency: req.body.frequency
                    }
                })
            }
        })
})

// =================== ADD =================== //

router.post('/', (req, res, next) => {
    Data.create({ letter: req.body.letter, frequency: Number(req.body.frequency) },
        function (err, result) {
            if (err)
                res.json(err)
            else
                res.json({
                    status: "success", message: "data have been added",
                    data: {
                        _id: result._id,
                        letter: result.letter,
                        frequency: result.frequency
                    }
                })
        })
})

// =================== delete =================== //

router.delete('/:id', (req, res, next) => {

    let id = req.params.dataId;

    Data.findOneAndDelete(id, (err, dataInfo) => {
        if (err) {
            res.json(err)
        } else {
            res.json({
                status: 'success', message: "data have been deleted", data: {
                    _id: dataInfo._id,
                    letter: dataInfo.letter,
                    frequency: dataInfo.frequency
                }
            })
        }
    })
})

// =================== find =================== //

router.get('/:id', (req, res, next) => {

    let id = req.params.dataId || req.body.id

    Data.findOne(id, (err, data) => {
        if (err) {
            res.json(err)
        } else {
            res.json({ status: "success", message: "data found", data: data })
        }
    })
})

module.exports = router;