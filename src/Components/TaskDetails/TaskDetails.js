/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EditIcon from '@material-ui/icons/Edit';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import CheckIcon from '@material-ui/icons/Check';
import './TaskDetails.css';
import DeleteIcon from '@material-ui/icons/Delete';

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
  const newId = id.substring(1);
  const deleteData = async () => {
    await axios;
    axios
      .delete(`${U_R_L}/task/${newId}.json`)
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err.message);
      });
  };
  const postData = async () => {
    await axios.put(`${U_R_L}/task/${newId}.json`).then(res => {
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
        <span style={{ padding: '3%' }}>
          {active ? (
            <CheckIcon
              fontSize="large"
              onClick={() => {
                setToggle(null);
                postData();
              }}
            />
          ) : (
            <EditIcon
              fontSize="large"
              onClick={() => {
                setToggle(id);
              }}
            />
          )}
        </span>
      </div>
      {active ? (
        <div>
          <div>
            <div className="Task_Body">
              <div className="Task_Description">
                <p>Task Description</p>
                <input
                  disabled={active ? false : true}
                  placeholder={item.task}
                  className="Task_input"
                  defaultValue={item.task}
                />
              </div>
              <div className="D_T">
                <div className="Date">
                  <label>Date</label>
                  <div className="date">
                    <DatePicker
                      disabled={active ? false : true}
                      selected={taskDate}
                      className="Date_set"
                    />
                  </div>
                </div>
                <div className="time">
                  <label>Time</label>
                  <div>
                    <DatePicker
                      disabled={true}
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
                <select
                  disabled={active ? false : true}
                  name="Please Select a user"
                  className="Task_input"
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
                <DeleteIcon onClick={deleteData} className="delete_icon" />
              </div>
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
