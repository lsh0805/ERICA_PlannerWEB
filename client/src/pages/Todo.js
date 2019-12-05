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
import moment from 'moment';


const POPERTY_MONDAY      = "cycleMonday";
const POPERTY_TUESDAY     = "cycleTuesday";
const POPERTY_WEDNESDAY   = "cycleWednesday";
const POPERTY_THURSDAY    = "cycleThursday";
const POPERTY_FRIDAY      = "cycleFriday";
const POPERTY_SATURDAY    = "cycleSaturday";
const POPERTY_SUNDAY      = "cycleSunday";


const Todo = (props) => {
  // Redux hooks
  const dispatch = useDispatch();
  const [planList, getStatus, postStatus, deleteStatus, updateStatus] = useSelector(state => [state.planner.toJS().planList, state.planner.toJS().get, state.planner.toJS().post, state.planner.toJS().delete, state.planner.toJS().update] , []);
  
  const onCompleteClick = (title, exp, id) => {
    dispatch(updatePlanRequest(title, exp, id, true));
    let [newLevel, newEXP] = getApplyLevel(parseInt(props.userInfo.level), parseInt(props.userInfo.exp) + parseInt(exp));
    dispatch(updateUserInfoRequest(props.userInfo.email, newLevel, newEXP));
  }
  const onEditCompleteClick = (title, exp, id, completed) => {
    return dispatch(updatePlanRequest(title, exp, id, completed));
  }
  const onDeleteClick = (id) => {
    dispatch(deletePlanRequest(id));
  }
  /* POST data = {title, exp, date, completed, month, year, ...} */
  const onCreateClick = (data) => {
    dispatch(postPlanRequest(data));
  }

  const getClearDate = (d) => {
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }
  // State
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState([getClearDate(new Date()), getClearDate(new Date())]);
  const [cycleDays, setCycleDays] = useState({
    cycleMonday: false,
    cycleTuesday: false,
    cycleWednesday: false,
    cycleThursday: false,
    cycleFriday: false,
    cycleSaturday: false,
    cycleSunday: false,
  });
  const [type, setType] = useState(planTypes.DAILY_PLAN);

  const onTypeChange = (type) => {
    setType(() => type);
    let newDate;
    if(type === planTypes.DAILY_PLAN)
      newDate = [getClearDate(new Date()), getClearDate(new Date())];
    else if(type === planTypes.MONTHLY_PLAN){
      let tempDate = new Date();
      let startDate = moment([tempDate.getFullYear(), tempDate.getMonth(), 1]).toDate();
      let endDate = moment([tempDate.getFullYear(), tempDate.getMonth(), 1]).toDate();
      endDate = moment(endDate).add(1, 'month').subtract(1, 'days').toDate();
      newDate = [startDate, endDate];
    }else if(type === planTypes.YEARLY_PLAN){
      let tempDate = new Date();
      let startDate = moment([tempDate.getFullYear(), 0, 1]).toDate();
      let endDate = moment([tempDate.getFullYear(), 0, 1]).toDate();
      endDate = moment(endDate).add(1, 'year').subtract(1, 'days').toDate();
      newDate = [startDate, endDate];
    }else if(type === planTypes.LOOP_PLAN){
      newDate = [getClearDate(new Date()), getClearDate(new Date())];
    }
    setDate(() => newDate);
  }
  const onDateChange = (date, type) => {
    try{
      switch(type){
        case planTypes.DAILY_PLAN:
          if(moment(date[1], 'YYYY-MM-DD').diff(date[0], 'days') >= 7){
            toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>
            기간은 최대 7일까지 선택할 수 있습니다.
            </div>);
            return;
          }
          break;
        case planTypes.MONTHLY_PLAN:
          if(moment(date[1], 'YYYY-MM-DD').diff(date[0], 'month') >= 12){
            toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>
            기간은 최대 12달까지 선택할 수 있습니다.
            </div>);
            return;
          }
          break;
        case planTypes.YEARLY_PLAN:
            if(moment(date[1], 'YYYY-MM-DD').diff(date[0], 'year') >= 5){
              toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>
              기간은 최대 5년까지 선택할 수 있습니다.
              </div>);
              return;
            }
            break;
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
  const handleToggleCycleDay = (dayProperty) => {
    console.log(cycleDays[dayProperty]);
    let copy_cycleDays = {...cycleDays};
    copy_cycleDays[dayProperty] = !copy_cycleDays[dayProperty];
    setCycleDays(copy_cycleDays);
  }
  useEffect(() => {
    setLoading(true);
    dispatch(getPlanListRequest(props.loginInfo.email, type,
      type === planTypes.LOOP_PLAN ? cycleDays : {
      dateStart: date[0],
      dateEnd: date[1],
    })).then(() => {
      setLoading(false);
    }).catch(err => {
      console.log(err);
    });
  }, [date, cycleDays]);

  const periodView = (
    <Paper className="section period_section">
      <div className="section_title">기간 일정</div>
      <div className="section_content">
        <div className="date_box">
          <div className="date_box_title">
            기간 설정
          </div>
          <DateRangePicker
            onChange={(date) => onDateChange(date, planTypes.DAILY_PLAN)}
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
          <div className="date_box_btn_container">
            <div className="btn_toggle_day btn_monday"
              style={cycleDays[POPERTY_MONDAY] === true ? {backgroundColor: "#BBB"} : {}}
              onClick={() => handleToggleCycleDay(POPERTY_MONDAY)}>
              월
            </div>
            <div className="btn_toggle_day btn_tuesday" 
              style={cycleDays[POPERTY_TUESDAY] === true ? {backgroundColor: "#BBB"} : {}} 
              onClick={() => handleToggleCycleDay(POPERTY_TUESDAY)}>
              화
            </div>
            <div className="btn_toggle_day btn_wednesday" 
            style={cycleDays[POPERTY_WEDNESDAY] === true ? {backgroundColor: "#BBB"} : {}} 
            onClick={() => handleToggleCycleDay(POPERTY_WEDNESDAY)}>
              수
            </div>
            <div className="btn_toggle_day btn_thursday" 
            style={cycleDays[POPERTY_THURSDAY] === true ? {backgroundColor: "#BBB"} : {}} 
            onClick={() => handleToggleCycleDay(POPERTY_THURSDAY)}>
              목
            </div>
            <div className="btn_toggle_day btn_friday" 
            style={cycleDays[POPERTY_FRIDAY] === true ? {backgroundColor: "#BBB"} : {}} 
            onClick={() => handleToggleCycleDay(POPERTY_FRIDAY)}>
              금
            </div>
            <div className="btn_toggle_day btn_saturday" 
            style={cycleDays[POPERTY_SATURDAY] === true ? {backgroundColor: "#BBB"} : {}} 
            onClick={() => handleToggleCycleDay(POPERTY_SATURDAY)}>
              토
            </div>
            <div className="btn_toggle_day btn_sunday" 
            style={cycleDays[POPERTY_SUNDAY] === true ? {backgroundColor: "#BBB"} : {}} 
            onClick={() => handleToggleCycleDay(POPERTY_SUNDAY)}>
              일
            </div>
          </div>
        </div>
        {loading ? <CircularProgress/> : 
          <PlanListContainer 
          author={props.loginInfo.email} 
          planList={planList} 
          type={planTypes.LOOP_PLAN}  
          date={date}
          cycleDays={cycleDays}
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
  const monthlyView = (
    <Paper className="section monthly_section">
      <div className="section_title">월 목표</div>
      <div className="section_content">
        <div className="date_box">
          <div className="date_box_title">
            월 설정
          </div>
          <DateRangePicker
            onChange={(date) => onDateChange(date, planTypes.MONTHLY_PLAN)}
            value={date}
            className="date_range_picker"
            maxDetail="year"
          />
        </div>
        {loading ? <CircularProgress/> : 
          <PlanListContainer 
          author={props.loginInfo.email} 
          planList={planList} 
          type={planTypes.MONTHLY_PLAN}  
          date={date}
          cycleDays={cycleDays}
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
  const yearlyView = (
    <Paper className="section yearly_section">
      <div className="section_title">연 목표</div>
      <div className="section_content">
        <div className="date_box">
          <div className="date_box_title">
            연 설정
          </div>
          <DateRangePicker
            onChange={(date) => onDateChange(date, planTypes.YEARLY_PLAN)}
            value={date}
            className="date_range_picker"
            maxDetail="decade"
          />
        </div>
        {loading ? <CircularProgress/> : 
          <PlanListContainer 
          author={props.loginInfo.email} 
          planList={planList} 
          type={planTypes.YEARLY_PLAN}  
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



  return (
  <React.Fragment>
    <div id="todo">
      <div className="container">
        <div className="wrapper">
          <Paper className="section type_section">
           <div className="section_title">타입 선택</div>
            <div className="section_content">
              <Button className="type_btn type1" onClick={() => onTypeChange(planTypes.DAILY_PLAN)}>기간 일정</Button>
              <Button className="type_btn type2" onClick={() => onTypeChange(planTypes.LOOP_PLAN)}>요일 반복 일정</Button>
              <Button className="type_btn type3" onClick={() => onTypeChange(planTypes.MONTHLY_PLAN)}>월 목표</Button>
              <Button className="type_btn type4" onClick={() => onTypeChange(planTypes.YEARLY_PLAN)}>연 목표</Button>
            </div>
          </Paper>
          {type === planTypes.DAILY_PLAN ? periodView :
          type === planTypes.LOOP_PLAN ? dayloopView :
          type === planTypes.MONTHLY_PLAN ? monthlyView :
          type === planTypes.YEARLY_PLAN ? yearlyView : undefined}
        </div>
      </div>
    </div>
  </React.Fragment>
  );
};

export default Todo;