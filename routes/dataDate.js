var express = require('express');
var router = express.Router();
let Data = require('../models/dataDate');
let moment = require('moment');

// =================== ADD =================== //

router.post('/', (req, res, next) => {

    Data.create({ letter: req.body.letter, frequency: req.body.frequency },
        function (err, result) {
            if (err)
                res.json(err)
            else
                res.json({
                    status: "success", message: "data have been added",
                    data: {
                        _id: result._id,
                        letter: moment(result.letter).format('DD-MM-YYYY'),
                        frequency: Number(result.frequency)
                    }
                })
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
                dataList.push({
                    _id: item._id,
                    letter: moment(item.letter).format("DD-MM-YYYY"),
                    frequency: Number(item.frequency)
                })
            }
            res.json({ dataList })
        }
    })
})

// =================== browse =================== //

// router.post('/search', (req, res) => {
//     Data.find({ $or: [{ letter: req.body.letter, frequency: req.body.frequency }, { letter: req.body.letter }, { frequency: req.body.frequency }] }).then((item) => {
//         console.log(item);

//         res.status(201).json([{
//             _id: item[0]._id,
//             letter: moment(item[0].letter).format("DD-MM-YYYY"),
//             frequency: item[0].frequency
//         }]);

//     }).catch(err => console.log(err))
// });

// =================== BROWSE =================== //

router.post('/search', (req, res, next) => {
    let keyword = {};
    if (req.query.letter) {
        keyword.letter = req.query.letter
    }
    if (req.query.frequency) {
        keyword.frequency = req.query.frequency
    }

    Data.find(keyword).then(dataSearch => {
        let data = [];
        dataSearch.forEach(item => {
            data.push({
                _id: item._id,
                letter: moment(item.letter).format("DD-MM-YYYY"),
                frequency: Number(item.frequency)
            })
        })
        res.json(data);
    })
})

// =================== EDIT =================== //

router.put('/:id', (req, res, next) => {

    let id = req.params.id;

    Data.findOneAndUpdate({ _id: req.params.id },
        { letter: req.body.letter, frequency: Number(req.body.frequency) }, (err, dataEdit) => {
            if (err) {
                res.json(err);
            } else {
                res.json({
                    status: "success",
                    message: "data have been updated",
                    data: {
                        _id: dataEdit._id,
                        letter: moment(req.body.letter).format("DD-MM-YYYY"),
                        frequency: Number(req.body.frequency)
                    }
                })
            }
        })
})

// =================== DELETE =================== //

router.delete('/:id', (req, res, next) => {

    let id = req.params.id;

    Data.findOneAndDelete(id, (err, dataDelete) => {
        if (err) {
            res.json(err)
        } else {
            res.json({
                status: 'success', message: "data have been deleted", data: {
                    _id: dataDelete._id,
                    letter: moment(dataDelete.letter),
                    frequency: Number(dataDelete.frequency)
                }
            })
        }
    })
})

// =================== FIND =================== //

router.get('/:id', (req, res) => {
    Data.findOne({ _id: req.params.id }).then((dataFind) => {
        res.status(200).json({
            success: true,
            message: 'data found',
            data: {
                _id: dataFind._id,
                letter: dataFind.letter,
                frequency: dataFind.frequency
            }
        })
    }).catch((err) => {
        res.json({
            success: false
        })
    })
})


module.exports = router;