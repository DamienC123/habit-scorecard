const db = require("../models");
const Records = db.records;
const Habits = db.habits;
const Op = db.Sequelize.Op;

// Calculate stats
exports.calculate = (req, res) => {
    //temporary store the outputs
    let stats = {};

    // Count of Habits
    Habits.count()
    .then(numHabits => {
      stats.numHabits = numHabits;
      return Records.count();
    })
    // Count of records, sorted in descending order
    .then(numRecords => {
      stats.numRecords = numRecords;
      return Habits.findOne({
        order: [["createdAt", "DESC"]]
      }); 
    })
    // Find newest
    .then(newestHabit => {
      stats.newestHabit = newestHabit;
      return Habits.findOne({
        order: [["createdAt", "ASC"]]
      });
    })
    // find oldest
    .then(oldestHabit => {
        stats.oldestHabit = oldestHabit;
        res.json(stats);
    })
    .catch(err => {
      res.status(500).json({
        message: err.message || "Some error occurred"
      });
    });
};
 