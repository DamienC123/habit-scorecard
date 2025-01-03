module.exports = app => {
    const habits = require("../controllers/habit.controller.js");
  
    var router = require("express").Router();
  
    router.post("/habits/", habits.create);
  
    router.get("/habits/", habits.findAll);
  
    router.get("/habits/:habitId", habits.findOne);
  
    router.put("/habits/:habitId", habits.update);
  
    router.delete("/habits/:habitId", habits.delete);
  
    app.use('/api', router);
};