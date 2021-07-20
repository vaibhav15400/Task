import React, { useState } from 'react';
import './TaskBody.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';
import axios from 'axios';

const TaskBody = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [user, setUser] = useState();
  const [task, setTask] = useState(null);

  function postData() {
    const Data = { task, startDate, startTime, user };
    axios
      .post(`https://task-93a9a-default-rtdb.firebaseio.com/task.json`, Data)
      .then(res => {
        console.log(res);
        alert('sucess');
      });
  }

  return (
    <>
      <div>
        <div className="Task_Body">
          <div className="Task_Description">
            <p>Task Description</p>
            <input
              required
              placeholder="Enter Task"
              className="Task_input"
              onChange={desp => {
                setTask(desp.target.value);
                console.log(desp.target.value);
              }}
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
                <DatePicker
                  selected={startDate}
                  onChange={date => {
                    setStartDate(date);
                    console.log(date);
                  }}
                  className="Date_set"
                />
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
                  selected={startTime}
                  onChange={time => {
                    setStartTime(time);
                    console.log(time.toTimeString());
                  }}
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
            <select
              required
              name="Please Select a user"
              className="Task_input"
              onChange={users => {
                setUser(users.target.value);
              }}
            >
              <option defaultValue="Please Select a user" className="select">
                Please Select A Value
              </option>
              <option className="select" value="banarasi">
                Banarasi
              </option>
              <option className="select" value="user1">
                user1
              </option>
            </select>
          </div>
          <div className="submit_buttons">
            <button type="reset" className="RESET">
              Cancel
            </button>
            <button type="submit" className="SUBMIT" onClick={postData}>
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskBody;
