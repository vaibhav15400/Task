import React, { useState } from 'react';
import './TaskBody.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const TaskBody = () => {
  const [Data, setData] = useState({
    task: ' ',
    user: null,
    startTime: new Date(),
    startDate: new Date(),
  });
  const changeHandler = (field, newValue) => {
    setData(prev => {
      const old = { ...prev };
      old[field] = newValue;
      return old;
    });
  };

  function postData() {
    axios
      .post(`https://task-93a9a-default-rtdb.firebaseio.com/task.json`, Data)
      .then(res => {
        alert('sucess', res.data);
        console.log(Data);
      });
  }
  function reset(e) {
    e.preventDefault();
  }

  return (
    <>
      <form onChange={reset}>
        <div className="Task_Body">
          <div className="Task_Description">
            <p>Task Description</p>
            <input
              required={true}
              placeholder="Enter Task"
              className="Task_input"
              onChange={desp => {
                changeHandler('task', desp.target.value);
                console.log(desp.target.value);
              }}
            />
          </div>
          <div className="D_T">
            <div className="Date">
              <label>Date</label>
              <div className="date">
                <DatePicker
                  selected={Data.startDate}
                  onChange={date => {
                    changeHandler('startDate', date);
                    console.log(date);
                  }}
                  className="Date_set"
                />
              </div>
            </div>
            <div className="time">
              <label>Time</label>
              <div>
                <DatePicker
                  selected={Data.startTime}
                  onChange={time => {
                    changeHandler('startTime', time);
                    console.log(time);
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
              onChange={dep => {
                changeHandler('user', dep.target.value);
                console.log(dep.target.value);
              }}
            >
              <option defaultValue="Please Select a user" className="select">
                Please Select A Value
              </option>
              <option className="select" value="Banarasi">
                Banarasi
              </option>
              <option className="select" value="User1">
                user1
              </option>
            </select>
          </div>
          <div className="submit_buttons">
            <button type="button" className="SUBMIT" onClick={postData}>
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};
export default TaskBody;
