/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import RemoveIcon from '@material-ui/icons/Remove';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ScheduleIcon from '@material-ui/icons/Schedule';

import './TaskDetails.css';
import transitions from '@material-ui/core/styles/transitions';

const U_R_L = `https://task-93a9a-default-rtdb.firebaseio.com`;
const TaskDetails = () => {
  const [getTasks, setGetTasks] = useState('');
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    axios
      .get(`${U_R_L}/task.json`)
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
        <Component
          item={getTasks[item]}
          id={item}
          key={i}
          active={toggle === item}
          setToggle={setToggle}
        />
      ))}
    </>
  );
};

const Component = ({ item, id, active, setToggle }) => {
  const [newData, setNewData] = useState({
    task: ' ',
    user: null,
    startTime: new Date(),
    startDate: new Date(),
  });
  const changeHandler = (field, newValue) => {
    setNewData(prev => {
      const old = { ...prev };
      old[field] = newValue;
      return old;
    });
  };

  const deleteData = async () => {
    await axios;
    axios
      .delete(`${U_R_L}/task/${id}.json`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  const postData = async () => {
    await axios.put(`${U_R_L}/task/${id}.json`, newData).then(res => {
      console.log(res.data);
    });
  };
  let taskTime = new Date(item.startTime);
  let taskDate = new Date(item.startDate);

  return (
    <div className="Task_display">
      <div className="Task_Display_title">
        <div className="Task_title_primary">
          <div className="taskName">
            {item.task}
            &nbsp;
          </div>
          <span style={{ color: ' rgb(205, 205, 205)' }}>
            {item.startDate?.split('T')[0]}
          </span>
        </div>
        <span style={{ padding: '3%' }} className={active ? transitions : ''}>
          {active ? (
            <RemoveIcon
              style={{ fontSize: 26 }}
              className="hover"
              onClick={() => {
                setToggle(null);
              }}
            />
          ) : (
            <EditIcon
              fontSize="large"
              style={{ fontSize: 28 }}
              className="hover"
              onClick={() => {
                setToggle(id);
              }}
            />
          )}
        </span>
      </div>
      {active ? (
        <>
          <div>
            <form className="Task_Body">
              <div className="Task_Description">
                <p>Task Description</p>
                <input
                  required
                  placeholder={item.task}
                  className="Task_input"
                  defaultValue={item.task}
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
                    <DateRangeIcon
                      style={{ fontSize: 20 }}
                      className="Date_icon"
                    />
                    <DatePicker
                      selected={taskDate}
                      className="Date_set"
                      onChange={date => {
                        changeHandler('startDate', date);
                        console.log(date);
                      }}
                    />
                  </div>
                </div>
                <div className="time">
                  <label>Time</label>
                  <div className="Time">
                    <ScheduleIcon
                      style={{ fontSize: 20 }}
                      className="Time_icon"
                    />
                    <DatePicker
                      selected={taskTime}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={30}
                      timeCaption="Time"
                      dateFormat="h:mm aa"
                      className="Time_set"
                      onChange={time => {
                        changeHandler('startTime', time);
                        console.log(time);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="Task_Description">
                <p>Assign User:</p>
                <select
                  name="Please Select a user"
                  className="Task_input"
                  onChange={dep => {
                    changeHandler('user', dep.target.value);
                    console.log(dep.target.value);
                  }}
                >
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
              <div className="hover">
                <div className="submit_buttons">
                  <button
                    type="button"
                    className="delete"
                    onClick={deleteData}
                    // disabled={
                    //   Data.task === ' ' && Data.user === null ? true : false
                    // }
                  >
                    Delete
                  </button>
                </div>
                <div className="submit_buttons">
                  <button
                    type="submit"
                    className="update"
                    onClick={postData}
                    // disabled={
                    //   Data.task === ' ' && Data.user === null ? true : false
                    // }
                  >
                    update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      ) : (
        ' '
      )}
    </div>
  );
};

/*


*/

export default TaskDetails;
