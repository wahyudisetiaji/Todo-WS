const Task = require("../models/task");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class TaskController {
  //CREATE Task ------------------------>>>
  static createTask(req, res) {
    let token = req.params.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    Task.create({
      taskName: req.body.taskName,
      dueDate: req.body.dueDate,
      priority: req.body.priority,
      userId: decode.id
    })
      .then(task => {
        res.status(200).json({
          message: "task successfully created",
          task
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //DELETE Task ------------------------>>>
  static deleteTask(req, res) {
    console.log(req.params.id);
    let id = req.params.id
    Task.deleteOne({ _id: id })
      .then(() => {
        res.status(200).json({
          message: "task successfully deleted"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

  //UPDATE Task ------------------------>>>
  static updateTask(req, res) {
    let id = req.params.id;
    Task.updateOne(
      { _id: id },
      {
        $set: {
          taskName: req.body.taskName,
          dueDate: req.body.dueDate,
          priority: req.body.priority,
          status: req.body.status
        }
      }
    )
      .then(() => {
        res.status(200).json({
          message: "task successfully updated"
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

    //UPDATE Status Task ------------------------>>>
    static updateStatusTask(req, res) {
      let id = req.params.id;
      console.log(id);
  
      Task.updateOne(
        { _id: id },
        {
          $set: {
            status: true,
          }
        }
      )
        .then(() => {
          res.status(200).json({
            message: "task successfully updated"
          });
        })
        .catch(err => {
          res.status(400).json({
            message: err.message
          });
        });
    }

  //Find All Task ------------------------>>>
  static findTask(req, res) {
    let token = req.params.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    console.log(decode.id);
    
    Task.find({userId: decode.id})
      .then(tasks => {
        res.status(200).json({
          message: "data all task",
          tasks
        });
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        });
      });
  }

    //Find One Task ------------------------>>>
    static findOneTask(req, res) {
      let id = req.params.id
      console.log(id);
      
      Task.findOne({_id: id})
        .then(task => {
          console.log(task);
          
          res.status(200).json({
            message: "data all task",
            task
          });
        })
        .catch(err => {
          res.status(400).json({
            message: err.message
          });
        });
    }

  //Find Task  Priority------------------------>>>
  static findTaskPriority(req, res){
    let token = req.params.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    Task.find({priority: 'Priority', userId: decode.id})
    .then(tasks => {
      console.log(tasks);
      
      res.status(200).json({
        message: "data all task priority",
        tasks
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
  }

  //Find Task  Done------------------------>>>
  static findTaskDone(req, res){
    let token = req.params.token
    let decode = jwt.verify(token, process.env.JWT_SECRET_KEY)
    Task.find({status: true, userId: decode.id})
    .then(tasks => {
      console.log(tasks);
      
      res.status(200).json({
        message: "data all task priority",
        tasks
      });
    })
    .catch(err => {
      res.status(400).json({
        message: err.message
      });
    });
  }
}

module.exports = TaskController;
