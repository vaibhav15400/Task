/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Remove';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import './TaskDetails.css';
import DeleteIcon from '@material-ui/icons/Delete';

const TaskDetails = () => {
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
        <Component item={getTasks[item]} id={item} key={i} />
      ))}
    </>
  );
};

const Component = ({ item, id }) => {
  const [toggle, setToggle] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  const Editable = () => {
    setIsEditable(p => !p);
    console.log('clicked');
  };
  function add_remove() {
    setToggle(p => !p);
  }

  const deleteData = async () => {
    await axios
      .put(`https://task-93a9a-default-rtdb.firebaseio.com/task.json/${newId}`)
      .then(response => {
        console.log('Status: ', response.status);
        console.log('Data: ', response.data);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  let newId = id.split('-')[1];

  let taskTime = new Date(item.startTime);
  let taskDate = new Date(item.startDate);
  // console.log(taskTime);

  return (
    <div className="Task_display">
      <div className="Task_Display_title">
        <div className="Task_title_primary">
          <div className="taskName">
            {item.task}
            &nbsp;
          </div>
          <span style={{ color: ' rgb(205, 205, 205)' }}>
            {item.startTime?.split('T')[0]}
          </span>
        </div>
        <span onClick={add_remove} style={{ padding: '3%' }}>
          {toggle ? (
            <RemoveIcon fontSize="large" onClick={Editable} />
          ) : (
            <CreateIcon fontSize="large" onClick={Editable} />
          )}
        </span>
      </div>
      {toggle ? (
        <div>
          <div>
            <div className="Task_Body">
              <div className="Task_Description">
                <p>Task Description</p>
                <input
                  disabled
                  placeholder={item.task}
                  className="Task_input"
                />
              </div>
              <div className="D_T">
                <div className="Date">
                  <label>Date</label>
                  <div className="date">
                    <DateRangeIcon
                      className="date_icon"
                      style={{ color: ' rgb(205, 205, 205)' }}
                    />
                    <DatePicker selected={taskDate} className="Date_set" />
                  </div>
                </div>
                <div className="time">
                  <label>Time</label>
                  <div>
                    <ScheduleIcon
                      className="time_icon"
                      style={{ color: ' rgb(205, 205, 205)' }}
                    />
                    <DatePicker
                      selected={taskTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="Time_set"
                    />
                  </div>
                </div>
              </div>
              <div className="Task_Description">
                <p>Assign User:</p>
                <select name="Please Select a user" className="Task_input">
                  <option defaultValue={item.user} className="select">
                    {item.user}
                  </option>
                  <option className="select" value="Banarasi">
                    Banarasi
                  </option>
                  <option className="select" value="user1">
                    user1
                  </option>
                </select>
              </div>
              <DeleteIcon onClick={deleteData} className="delete_icon" />
            </div>
          </div>
        </div>
      ) : (
        ' '
      )}
    </div>
  );
};

/*


*/

export default TaskDetails;
