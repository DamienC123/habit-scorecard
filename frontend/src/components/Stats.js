import { useState, useEffect } from 'react';  // import useEffect

function Statistics() {
    // Set up for when there is nothing yet
    const [statistics, setStatistics] = useState({
        numberOfHabits: 0,
        numberOfRecords: 0,
        newestHabit: '',
        oldestHabit: '' });


        // Function to fetch statistics
        // Seperate function in order to object the Rules of Hooks - Used for Refresh button
        const fetchStats = () => {
              fetch('http://localhost/api/stats')
                .then((response) => response.json())
                .then((data) => {
                  // Update the state with the received data
                  setStatistics({
                    numberOfHabits: data.numHabits,
                    numberOfRecords: data.numRecords,
                    newestHabit: data.newestHabit.createdAt,
                    oldestHabit: data.oldestHabit.createdAt,
                  });
                })
                .catch((error) => {
                  console.error('Error:', error);
                });
            };

        // Fetch stats on initial render automatically
        useEffect(() => {
          fetchStats();
        }, []);           

        // Set up for Stats details to not show until clicked
        const [showStats, setShowStats] = useState(false); // State to toggle stats
        
        function onClick() {
                setShowStats(true); // Update the state, so it now appears
        }
        
        // hide stats 
        function onClick2() {
            setShowStats(false); // reverse it back to false so stats don't appear
        }
        
        
        return (
            
            <div className = "showStats">
              <p>Click a Habit to view associated detail</p>

              <button className = "greenButton" type="button" onClick={onClick}>Show Stats</button>

              {showStats && (

                <div className = "stats">
                    <button className = "redButton" type="button" onClick={onClick2}>Hide Stats</button>

                    <p> <b>Number of Habits</b>: {statistics.numberOfHabits}</p>
                    <p> <b>Number of Records</b>: {statistics.numberOfRecords}</p>
                    <p> <b>Newest Habit Timestamp</b>: {statistics.newestHabit}</p>
                    <p> <b>Oldest Habit Timestamp</b>: {statistics.oldestHabit}</p>
                    
                    <button className = "greenButton" type="button" onClick={fetchStats}>Refresh</button>

                </div>
              )}
            </div>
            
          );
          }

export default Statistics;