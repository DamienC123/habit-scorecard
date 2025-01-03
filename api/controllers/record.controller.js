const db = require("../models");
const Records = db.records;
const Op = db.Sequelize.Op;

// Create records
exports.create = (req, res) => {
    const inputValues = {
        detail: req.body.detail,
        date: req.body.date,
        habitId: req.params.habitId,
    };

    Records.create(inputValues)
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

// Get all records
exports.findAll = (req, res) => {
    Records.findAll()
        .then(data => {
            res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message: err.message || "Some error occurred"
        });
    });
};

// Get one record by id
exports.findOne = (req, res) => {
  
};

// Update one record by id
exports.update = (req, res) => {
    
};

// Delete one record by id
exports.delete = (req, res) => {
    //const contactId = req.params.contactId;
    const recordId = req.params.recordId;
    // id: contactId, 
    Records.destroy({
        where: { id: recordId }
    })
    .then(num => {
        if (num == 1) {
            res.send({
                message: "Contact was deleted successfully!"
            });
        } else {
            res.send({
                message: "Cannot delete Contact"
            });
        }
    })
    .catch(err => {
        res.status(500).send({
            message: "Could not delete Contact with id=" + recordId
        });
    });
};