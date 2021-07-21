import React, { useState } from 'react';
import './TaskHead.css';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import TaskBody from '../TaskBody/TaskBody';

const TaskHead = ({ i }) => {
  const [toggle, setToggle] = useState(false);
  function add_remove() {
    setToggle(p => !p);
  }

  return (
    <div className="TaskHead">
      <div className="Task_title">
        <p className="Task_title_primary">
          TASK &nbsp;
          <span style={{ color: ' rgb(205, 205, 205)' }} className="animate">
            {console.log(i)}
          </span>
          {console.log()}
        </p>
        <span onClick={add_remove} style={{ padding: '3%' }}>
          {toggle ? (
            <AddIcon fontSize="large" className="hover" />
          ) : (
            <RemoveIcon fontSize="large" className="hover" />
          )}
        </span>
      </div>
      {toggle ? (
        <div className="transistions">
          <TaskBody />
        </div>
      ) : (
        <div className="transistions_x">
          <TaskBody />
        </div>
      )}
    </div>
  );
};

export default TaskHead;
