import React, {useState} from 'react';
import './css/Todo.css'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Paper from '@material-ui/core/Paper';
import { PlanItemBox, PlanItem } from 'components';

const Todo = (props) => {
  const [date, setDate] = useState([new Date(), new Date()]);
  const onDateChange = (date) => {
    setDate(date);
  }
  return (
  <React.Fragment>
    <div id="todo">
      <div className="container">
        <Paper className="wrapper">
          <div className="row row1">
            <div className="row_title">
              기간
            </div>
            <DateRangePicker
              onChange={onDateChange}
              value={date}
              minDate={new Date()}
              maxDate={new Date(2019, new Date().getMonth(), new Date().getDate() + 7)}
            />
          </div>
          <div className="row row2">
            <div className="row_title">
              일정
            </div>
            <div className="planner">
              <div className="title">
                일정
              </div>
              <PlanItem/>
            </div>
          </div>
        </Paper>
      </div>
    </div>
  </React.Fragment>
  );
};

export default Todo;