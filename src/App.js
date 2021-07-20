import React from 'react';
import TaskDetails from './Components/TaskDetails/TaskDetails';
import TaskHead from './Components/TaskHead/TaskHead';
import './App.css';

function App() {
  return (
    <>
      <div>
        <TaskHead />
      </div>
      <div className="details">
        <TaskDetails />
      </div>
    </>
  );
}

export default App;
