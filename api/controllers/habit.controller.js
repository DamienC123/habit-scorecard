const db = require("../models");
const Habits = db.habits;
const Records = db.records;
const Op = db.Sequelize.Op;

// Create habit
exports.create = (req, res) => {
    const habit = {
        name: req.body.name
    };

    Habits.create(habit)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occured"
            });
        });
};

// Get all habits
exports.findAll = (req, res) => {
    Habits.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred"
            });
        });
};

// Get one habit by id
exports.findOne = (req, res) => {
  
};

// Update one habit by id
exports.update = (req, res) => {
    
};

// Delete one habit by id
exports.delete = (req, res) => {
    const id = req.params.habitId;

    Habits.destroy({
        where: { id: id }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Habit was deleted successfully!"
            });
        } else {
            res.send({
                message: "Cannot delete Habit"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Habit with id=" + id
        });
    });
};
