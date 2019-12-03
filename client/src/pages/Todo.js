import React, {useState, useEffect} from 'react';
import './css/Todo.css'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import Paper from '@material-ui/core/Paper';
import {PlanListContainer} from 'components';
import * as planTypes from '../components/PlannerTypes';
import Button from '@material-ui/core/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/Toast.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useSelector, useDispatch } from 'react-redux';
import { getPlanListRequest, postPlanRequest, deletePlanRequest, updatePlanRequest } from 'actions/planner';
import { updateUserInfoRequest } from 'actions/user';
import { getApplyLevel } from '../module/level';
import CircularProgress from '@material-ui/core/CircularProgress';

const Todo = (props) => {
  // Redux hooks
  const dispatch = useDispatch();
  const [planList, getStatus, postStatus, deleteStatus, updateStatus] = useSelector(state => [state.planner.toJS().planList, state.planner.toJS().get, state.planner.toJS().post, state.planner.toJS().delete, state.planner.toJS().update] , []);
  
  const onCompleteClick = (title, exp, id, completed) => {
    dispatch(updatePlanRequest(title, exp, id, completed));
    let [newLevel, newEXP] = getApplyLevel(props.userInfo.level, props.userInfo.exp + exp);
    console.log(newEXP);
    dispatch(updateUserInfoRequest(props.userInfo.email, newLevel, newEXP));
  }
  const onEditCompleteClick = (title, exp, id, completed) => {
    dispatch(updatePlanRequest(title, exp, id, completed)).then(() => {
    });
  }
  const onDeleteClick = (id) => {
    dispatch(deletePlanRequest(id));
  }
  /* POST data = {title, exp, date, completed, month, year, ...} */
  const onCreateClick = (data) => {
    data = {...data, title: "일정 설명", exp: 10};
    dispatch(postPlanRequest(data));
  }

  const getClearDate = (d) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  // State
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState([getClearDate(new Date()), getClearDate(new Date())]);
  const [type, setType] = useState(planTypes.DAILY_PLAN);

  const onDateChange = (date) => {
    try{
      if((date[1] - date[0])  / (60 * 60 * 24) / 1000 >= 7){
        toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>
        기간은 최대 7일까지 선택할 수 있습니다.
        </div>);
        return;
      }
      setDate(() => {
        return [getClearDate(date[0]), getClearDate(date[1])];
      });
    }catch(e){
      setDate(() => {
        return [undefined, undefined];
      });
    }
  }
  useEffect(() => {
    setLoading(true);
    dispatch(getPlanListRequest(props.loginInfo.email, type, {
      dateStart: date[0],
      dateEnd: date[1],
    })).then(() => {
      setLoading(false);
    }).catch(err => {
      console.log(err);
    });
  }, [date]);
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
          {loading ? <CircularProgress/> : 
          <PlanListContainer 
          author={props.loginInfo.email} 
          planList={planList} 
          type={planTypes.DAILY_PLAN}  
          date={date}
          onEditComplete={onEditCompleteClick} 
          onDelete={onDeleteClick}
          onCreate={onCreateClick}
          onComplete={onCompleteClick}
          getStatus={getStatus}
          postStatus={postStatus}
          deleteStatus={deleteStatus}
          updateStatus={updateStatus}

          />}
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