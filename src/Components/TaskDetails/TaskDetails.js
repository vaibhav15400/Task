import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Remove';
import './TaskDetails.css';

const TaskDetails = () => {
  const [toggle, setToggle] = useState(false);
  function add_remove() {
    setToggle(p => !p);
  }
  const [getTasks, setGetTasks] = useState('');

  useEffect(() => {
    axios
      .get(`https://task-93a9a-default-rtdb.firebaseio.com/task.json`)
      .then(res => {
        if (res.data == null) {
          alert('novalue');
        } else {
          setGetTasks(res.data);
        }
      })
      .catch(err => console.error(err));
  }, [getTasks]);

  return (
    <>
      {Object.keys(getTasks).map((item, i) => (
        <div className="Task_display" key={i}>
          <div className="Task_Display_title">
            <div className="Task_title_primary">
              <div className="taskName">{getTasks[item].task} &nbsp;</div>
              <span style={{ color: ' rgb(205, 205, 205)' }}>
                {getTasks[item].user}
              </span>
            </div>
            <span onClick={add_remove} style={{ padding: '3%' }}>
              {toggle ? (
                <RemoveIcon fontSize="large" />
              ) : (
                <CreateIcon fontSize="large" />
              )}
            </span>
          </div>
          {toggle ? (
            <div>
              <div className="task_date">
                {getTasks[item].startTime.split('T')[0]}
              </div>
              <div className="task_time">
                {getTasks[item].startDate.split('T')[1].split('.')[0]}
              </div>
            </div>
          ) : (
            ' '
          )}
        </div>
      ))}
    </>
  );
};

export default TaskDetails;
