module.exports = app => {
    const records = require("../controllers/record.controller.js");
  
    var router = require("express").Router();
  
    router.post("/habits/:habitId/records", records.create);
  
    router.get("/habits/:habitId/records", records.findAll);
  
    router.get("/habits/:habitId/records/:recordId", records.findOne);
  
    router.put("/habits/:habitId/records/:recordId", records.update);
  
    router.delete("/habits/:habitId/records/:recordId", records.delete);
  
    app.use('/api', router);
};