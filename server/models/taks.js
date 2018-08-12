const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var taksSchema = new Schema({
    taksName: {
        type: String,
        require: [true, 'name taks is required']
    },
    dueDate: {
        type: Date,
        required: [true, 'due date is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
})

var Taks = mongoose.model('Taks', taksSchema)

module.exports = Taks