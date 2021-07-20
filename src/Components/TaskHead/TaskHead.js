import React, { useState } from 'react';
import './TaskHead.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TaskBody from '../TaskBody/TaskBody';

const TaskHead = () => {
  const [toggle, setToggle] = useState(false);
  function add_remove() {
    setToggle(p => !p);
  }

  return (
    <div className="TaskHead">
      <div className="Task_title">
        <p className="Task_title_primary">
          TASK &nbsp;
          <span style={{ color: ' rgb(205, 205, 205)' }}>3</span>
        </p>
        <span onClick={add_remove} style={{ padding: '3%' }}>
          {toggle ? (
            <RemoveIcon fontSize="large" />
          ) : (
            <AddIcon fontSize="large" />
          )}
        </span>
      </div>
      {toggle ? <TaskBody /> : ' '}
    </div>
  );
};

export default TaskHead;
