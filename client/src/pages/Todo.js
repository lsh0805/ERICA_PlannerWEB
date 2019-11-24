import React, {useState, useEffect} from 'react';
import './css/Todo.css'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Paper from '@material-ui/core/Paper';
import {PlanList} from 'components';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as planTypes from '../components/PlannerTypes';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/Toast.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const Todo = (props) => {
  const getClearDate = (d) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  const [date, setDate] = useState([getClearDate(new Date()), getClearDate(new Date())]);
  const onDateChange = (date) => {
    if((date[1] - date[0])  / (60 * 60 * 24) / 1000 >= 7){
      toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>
      기간은 최대 7일까지 선택할 수 있습니다.
      </div>);
      return;
    }
    setDate(() => {
      return [getClearDate(date[0]), getClearDate(date[1])];
    });
  }
  const getDateFormat = (d) => {
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    return year + "-" + month + "-" + date;
  }
  const mapToComponents = (date) => {
    let diff = (date[1] - date[0])  / (60 * 60 * 24) / 1000;
    var arr = new Array(diff);
    for(let i = 0; i <= diff; i++){
      let newDate = new Date(date[0]);
      newDate.setDate(date[0].getDate() + i);
      arr[i] = <PlanList key={i} author={props.loginInfo.email} date={getDateFormat(newDate)} type={planTypes.DAILY_PLAN}/>;
    }
    return arr;
  };
  const periodView = (
    <Paper className="section period_section">
      <div className="section_title">기간 일정</div>
      <div className="section_content">
        <div className="date_box">
          <div className="date_box_title">
            기간 설정
          </div>
          <DateRangePicker
            onChange={onDateChange}
            value={date}
            className="date_range_picker"
          />
        </div>
          {mapToComponents(date)}
      </div>
    </Paper>
  );
  const dayloopView = (
    <Paper className="section day_loop_section">
      <div className="section_title">요일 반복 일정</div>
      <div className="section_content">
        <div className="date_box">
          <div className="date_box_title">
            요일 설정
          </div>
        </div>
        <div className="planner_box">
          
        </div>
      </div>
    </Paper>
  );
  const monthlyView = (
    <Paper className="section monthly_section">
      <div className="section_title">월 목표</div>
      <div className="section_content">
        <div className="date_box">
          <div className="date_box_title">
            월 설정
          </div>
        </div>
      </div>
    </Paper>
  );
  const yearlyView = (
    <Paper className="section yearly_section">
      <div className="section_title">연 목표</div>
      <div className="section_content">
        <div className="date_box">
          <div className="date_box_title">
            연 설정
          </div>
        </div>
      </div>
    </Paper>
  );



  return (
  <React.Fragment>
    <div id="todo">
      <div className="container">
        <div className="wrapper">
          <Paper className="section type_section">
           <div className="section_title">타입 선택</div>
            <div className="section_content">
              <Button className="type_btn type1">기간 일정</Button>
              <Button className="type_btn type2">요일 반복 일정</Button>
              <Button className="type_btn type3">월 목표</Button>
              <Button className="type_btn type4">연 목표</Button>
            </div>
          </Paper>
          {periodView}
        </div>
      </div>
    </div>
  </React.Fragment>
  );
};

export default Todo;