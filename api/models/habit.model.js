module.exports = (sequelize, Sequelize) => {
    const Habit = sequelize.define("habit", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        
        // DEFINE YOUR MODEL HERE
        name: {
            type: Sequelize.STRING,
            allowNull: false
        }
        
    });
  
    return Habit;
};