import React from 'react';
import * as planTypes from './PlannerTypes';
import {PlanList} from 'components';
import moment from 'moment';

const PlanListContainer = ({author, planList, type, date, addButton, cycleDays, turnOnTaskRatio, title}) => {
  if(addButton === undefined)
    addButton = true;
  const getDateFormat = (d) => {
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    if(month < 10)
      month = "0" + month;
    if(date < 10)
      date = "0" + date;
    return year + "-" + month + "-" + date;
  }
  const mapToComponents = (planList, date, type) => {
    try{
      let diff;
      switch(type){
        case planTypes.DAILY_PLAN:
          diff = moment(date[1], 'YYYY-MM-DD').diff(date[0], 'day');  
        break;
        case planTypes.MONTHLY_PLAN:
          diff = moment(date[1], 'YYYY-MM-DD').diff(date[0], 'month');
          break;
        case planTypes.YEARLY_PLAN:
          diff = moment(date[1], 'YYYY-MM-DD').diff(date[0], 'year');
          break;
        default:
          break;
      }
      let planListArr = [];
      if(type === planTypes.DAILY_PLAN || type === planTypes.MONTHLY_PLAN || type === planTypes.YEARLY_PLAN){
        for(let i = 0; i <= diff; i++){
          let newDate = new Date(date[0]);
          if(type === planTypes.DAILY_PLAN)
            newDate.setDate(date[0].getDate() + i);
          else if(type === planTypes.MONTHLY_PLAN)
            newDate.setMonth(date[0].getMonth() + i);
          else if(type === planTypes.YEARLY_PLAN)
            newDate.setFullYear(date[0].getFullYear() + i);
          let plans = planList.filter(plan => {return plan.type === type && plan.date === getDateFormat(newDate)});
          planListArr.push(<PlanList key={i} author={author} date={newDate} planList={plans} type={type} addButton={addButton} turnOnTaskRatio={turnOnTaskRatio}/>);
        }
      }else if(type === planTypes.LOOP_PLAN){
        // cycleDays 객체 property 순회 cycleDayOfWeek = 객체 Key값(cycleMonday, cycleTuesday...)
        let i = 0;
        for(let cycleDayOfWeek in cycleDays){
          if(cycleDays[cycleDayOfWeek] === false) continue;
          let plans = planList.filter(plan => {return plan[cycleDayOfWeek] === cycleDays[cycleDayOfWeek]});
          planListArr.push(<PlanList key={i} author={author} date={date[0]} cycleDay={cycleDayOfWeek} planList={plans} type={type} turnOnTaskRatio={turnOnTaskRatio}/>);
          i++;
        }
      }
      return planListArr;
    } catch(e){
      return;
    }
  };

  return (
    <div>
      {mapToComponents(planList, date, type)}
    </div>);
}

export default PlanListContainer;