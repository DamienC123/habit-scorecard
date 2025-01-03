import { useState, useEffect } from 'react';  // import useEffect
import './App.css';
import Statistics from './components/Stats';

function App() {
    const [habits, setHabits] = useState([]);

    // load habits from database
    useEffect(()=> {
        fetch('http://localhost/api/habits')
            .then(response => response.json())
            .then(data => setHabits(data))
            .catch((error) => {
                console.error('Error: ', error);
            });
    }, []);
    
    return (
        <div>
            <h1> Habit Scorecard</h1>

                <List
                    habits = {habits} 
                    setHabits = {setHabits}
                />
                
                <Statistics/> 
        </div>
    );
}

function Habits(props) {
    console.log(props);
    
    function onClick() {
        // Find the habit we want to delete and remove it
        fetch(`http://localhost/api/habits/${props.habitId}`, {
            method: 'DELETE',
        })
        .then(() => {
            // remove it from the state
            props.setHabits(habits => habits.filter(habit => habit.id !== props.habitId));
        })
        .catch((error) => {
            console.error('Error: ', error);
        });
    }
    
    // Set up for associated details to not show until clicked on Habit
    const [recordDetails, setRecordDetails] = useState(false); // State to toggle record inputs
    
    function onClick2() {
            setRecordDetails(true); // Update state to now appear after click
    }

    const [detailInput, setDetailInput] = useState(''); // State for the first input field (detail of habit)
    const [dateInput, setDateInput] = useState(''); // State for the second input field (date of habit)

    const [inputValues, setInputValues] = useState([]); // State to store input values

    useEffect(()=> {
        fetch(`http://localhost/api/habits/${props.habitId}/records`)
            .then(response => response.json())
            .then(data => setInputValues(data))
            .catch((error) => {
                console.error('Error: ', error);
            });
    }, []);

    // record detail
    function onChange2(event) {
        setDetailInput(event.target.value);   
    }

    // record date
    function onChange3(event) {
        setDateInput(event.target.value);
    }

    function addRecord() {
        //add record, with detail, date and associated habitId
        fetch(`http://localhost/api/habits/${props.habitId}/records`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({ detail: detailInput, date: dateInput, habitId: props.habitId})
        })
        .then(response => response.json())
        .then(data => {
            setInputValues(records=> [...records, data]);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
        
        // Clear the input fields
        setDetailInput("");
        setDateInput("");
    }

    return (
        <div>
            <span onClick={onClick2}>
                <span className = "habitName">{props.name}</span>
            </span>

            <button className = "redButton" type="button" onClick ={onClick}>Delete</button>
            
            {recordDetails && ( //shows up when clicked (true)
                <div>
                    <input type="text" placeholder = "Details" 
                            value = {detailInput}
                            onChange = {onChange2}
                    />
                    <input type="date" placeholder = "Date"
                            value = {dateInput}
                            onChange = {onChange3} 
                    />
                    <button className = "greenButton" type="button" onClick={addRecord}>Add</button>
                </div>
            )} 
                
            {inputValues.map(inputValue => { 
                // make sure the record details only show up for the correct habit, if not return nothing as expected
                if (inputValue.habitId === props.habitId) {
                    return (
                        <div key={inputValue.id} >
                            <table className="recordDetails">
                                <thead>
                                    <tr>
                                        <th>Iteration</th>
                                        <th>Details</th>
                                        <th>Date</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{inputValue.id}</td>
                                        <td>{inputValue.detail}</td>
                                        <td>{inputValue.date}</td>
                                        <td>
                                            <button className="redButton" type="button" onClick={onClick3}>Delete</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table> 
                        </div>
                    );
                    }
                return null;
                    
                function onClick3() {
                    console.log(inputValue.id);
                    // Find the record we want to delete and remove it
                    fetch(`http://localhost/api/habits/${props.habitId}/records/${inputValue.id}`, {
                        method: 'DELETE',
                    })
                    .then(() => {
                        // remove it from the state (plural for the filter so not delete all)
                        setInputValues(inputValues => inputValues.filter(inputValues => inputValues.id !== inputValue.id));
                    })
                    .catch((error) => {
                        console.error('Error: ', error);
                    }); 
                }
                })}
        </div>
    );   
}

function List(props) {
    const [newHabit, setNewHabit] = useState("");

    function onChange(event) {
        setNewHabit(event.target.value);
    }
    // add new habit
    function onClick()  {
        fetch('http://localhost/api/habits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:newHabit})
        })
            .then(response => response.json())
            .then(data => {
                props.setHabits(habits => [...habits, data]);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        // clear the habit name input field
        setNewHabit("");
    }

    return (
        <div>
            <div className = "topBlock">
            
            <h3>
                <input type = "text"
                    placeholder= "Please Enter a Habit"
                        value={newHabit}
                        onChange={onChange}
                /> 
                <button className= "greenButton" type = "button" onClick ={onClick} >Create Habit</button>
            </h3>
            </div>
            
            <div className = "habits">
                { props.habits.map(habit => 
                    <div key = {habit.id} className = "eachHabit">
                        <Habits
                            setHabits = {props.setHabits}
                            habitId = {habit.id}
                            name = {habit.name}        
                        />
                    </div>             
                )}
            </div>               
        </div>
    );
}

export default App;