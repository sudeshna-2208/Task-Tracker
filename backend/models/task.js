const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
        dueDate: { 
            type: Date, 
            required: true, 
            validate: {
                validator: function(value) {
                    return value >= new Date(); // Ensure dueDate is not in the past
                },
                message: 'Due date must be today or later.'
            }
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
