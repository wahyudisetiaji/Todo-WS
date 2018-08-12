const Taks = require('../models/taks')

class TaksController {

    //CREATE TAKS ------------------------>>>
    static createTaks(req, res) {
        
        Taks.create({
            taksName: req.body.taksName,
            dueDate: req.body.dueDate,
        })
        .then((task) => {
            res.status(200).json({
                message: 'task successfully created',
                task
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });
    }

    //DELETE TAKS ------------------------>>>
    static deleteTaks(req, res) {
        
        let id = req.params.id

        Taks.deleteOne({_id: id})
        .then(() => {
            res.status(200).json({
                message: 'task successfully deleted'
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });
    }

    //UPDATE TAKS ------------------------>>>
    static updateTaks(req, res) {
        
        let id = req.params.id

        Taks.updateOne({_id: id}, {
            $set: {
                taksName: req.body.taksName,
                dueDate: req.body.dueDate,
        }})
        .then(() => {
            res.status(200).json({
                message: 'task successfully updated',
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });
    }

    static findTask(req, res) {

        Taks.find({})
        .then((task) => {
            res.status(200).json({
                message: 'data all task',
                task
            })
        })
        .catch((err) => {
            res.status(400).json({
                message: err.message
            }) 
        });
    }
}

module.exports = TaksController