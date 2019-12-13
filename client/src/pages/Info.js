import React, {useState, useEffect} from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import { Chart } from 'components';
import './css/Info.css';
import { getMaxEXP, getRateEXP } from '../module/level';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import * as planTypes from '../components/PlannerTypes';
import { useSelector, useDispatch } from 'react-redux';
import { getPlanListRequest } from 'actions/planner';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from 'moment';
import {PlanListContainer} from 'components';
import axios from 'axios';

const Info = (props) => {
  // Redux hooks
  const dispatch = useDispatch();
  const [planList, getStatus] = useSelector(state => [state.planner.toJS().planList, state.planner.toJS().get, state.planner.toJS().post, state.planner.toJS().delete, state.planner.toJS().update] , []);

  const [chartPeriod, setChartPeriod] = useState([new Date(), new Date()]);
  const [logList, setLogList] = useState([]);

  const onPeriodChange = (date) => {
    setChartPeriod(date);
  }

  useEffect(() => {
    getListLog(chartPeriod[0], chartPeriod[1]);
  }, [logList, chartPeriod]);
  
  useEffect(() => {
    dispatch(getPlanListRequest(props.loginInfo.email,
    {
      dateStart: todayDate[0],
      dateEnd: todayDate[1],
    }));
    axios.post('/api/explog/getLog/', {email: props.loginInfo.email}).then(explog => {
      console.log(explog.data.row);
      setLogList(explog.data.row);
    }).catch(error => {
      console.log(error);
    });
  }, []);

  // 해당 날짜에 플레이어의 경험치 값을 가져오는 함수
  const getLogExp = (currentDate) => {
    let resultExp = 0;
    let closestDiff = 100000000000;
    for(let i = 0; i < logList.length; i++){
      let diff = moment(currentDate).diff(logList[i].date, 'days');
      if(diff < 0)
        return resultExp;
      if(diff < closestDiff){
        closestDiff = diff;
        resultExp = logList[i].totalExp;
      }
    }
    return resultExp;
  }

  // 사용자가 설정한 기간에 해당하는 로그값들을 가져오는 함수
  const getListLog = (startDate, endDate) => {
    let retListLog = [];
    
    // 리스트값은 최대 30개까지 표현할 수 있도록 구현
    
    let diffDate = moment(endDate, 'YYYY-MM-DD').diff(startDate, 'date');
    
    // 로그 날짜 수열 공차
    let diff = diffDate / 30; 
    let tempDate = moment(startDate).toDate();


    for(let i = 0; i < diffDate; i+=diff){
      tempDate = moment(tempDate).add(diff, 'days').toDate();
      retListLog.push({date: tempDate, exp: getLogExp(tempDate)});
    }
    retListLog.push({date: endDate, exp: getLogExp(endDate)});

    console.log(retListLog);

    return retListLog;
  };



  let tempDate = new Date();
  let startDate = moment([tempDate.getFullYear(), tempDate.getMonth(), 1]).toDate();
  let endDate = moment([tempDate.getFullYear(), tempDate.getMonth(), 1]).toDate();
  endDate = moment(endDate).add(1, 'month').subtract(1, 'days').toDate();
  let todayDate = [moment().toDate(), moment().toDate()];
  let monthDate = [startDate, endDate];
  startDate = moment([tempDate.getFullYear(), 0, 1]).toDate();
  endDate = moment([tempDate.getFullYear(), 0, 1]).toDate();
  endDate = moment(endDate).add(1, 'year').subtract(1, 'days').toDate();
  let yearDate = [startDate, endDate];

  return (
    <React.Fragment>
      <div className="infoContainer">
        <div className="infoContents">
          <Paper className="userInfoSection userLevelSection">
            <div className="row_container1">
              <div className="userLevel">
                Lv.{props.userInfo.level}
              </div>
              <div className="userName">
                {props.userInfo.nickname}
              </div>
            </div>
            <div className="row_container2">
              <div className="userExp">
                EXP: {getRateEXP(props.userInfo.level, props.userInfo.exp)}%  ( {props.userInfo.exp} / {getMaxEXP(props.userInfo.level)} ) 
              </div>
            </div>
            <div className="row_container3">
              <div>
                <LinearProgress variant="determinate" value={getRateEXP(props.userInfo.level, props.userInfo.exp)} className="userInfoExpBar"/>
              </div>
            </div>
          </Paper>
          <Paper className="userInfoSection userPlanSection">
            <div className="planInfoContainer todayPlanContainer">
              <div className="containerTitle">오늘 일정</div>
              <PlanListContainer 
              author={props.loginInfo.email} 
              planList={planList} 
              type={planTypes.DAILY_PLAN}  
              date={todayDate}
              addButton={false}
              turnOnTaskRatio={true}
              />
            </div>
            <div className="planInfoContainer monthPlanContainer">
              <div className="containerTitle">이번 달 목표</div>
              <PlanListContainer 
              author={props.loginInfo.email} 
              planList={planList} 
              type={planTypes.MONTHLY_PLAN}  
              date={monthDate}
              addButton={false}
              turnOnTaskRatio={true}
              />
            </div>
            <div className="planInfoContainer yearPlanContainer">
              <div className="containerTitle">올해 목표</div>
              <PlanListContainer 
              author={props.loginInfo.email} 
              planList={planList} 
              type={planTypes.YEARLY_PLAN}  
              date={yearDate}
              addButton={false}
              turnOnTaskRatio={true}
              />
            </div>
          </Paper>
          <Paper className="userInfoSection userExpChartSection">
            <div>
              <DateRangePicker
                onChange={onPeriodChange}
                value={chartPeriod}
              />
            </div>
            <div className="userExpChartContainer">
              <Chart/>
            </div>
          </Paper>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Info;
