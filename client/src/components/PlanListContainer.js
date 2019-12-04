import React, {useState} from 'react';
import * as planTypes from './PlannerTypes';
import {PlanList} from 'components';
import moment from 'moment';

const PlanListContainer = ({author, planList, type, date, onEditComplete, onDelete, onCreate, onComplete, postStatus, deleteStatus, updateStatus}) => {
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
      if(type === planTypes.DAILY_PLAN || type === planTypes.MONTHLY_PLAN || type === planTypes.YEARLY_PLAN){
        let arr = new Array(diff);
        for(let i = 0; i <= diff; i++){
          let newDate = new Date(date[0]);
          if(type === planTypes.DAILY_PLAN)
            newDate.setDate(date[0].getDate() + i);
          else if(type === planTypes.MONTHLY_PLAN)
            newDate.setMonth(date[0].getMonth() + i);
          else if(type === planTypes.YEARLY_PLAN)
            newDate.setFullYear(date[0].getFullYear() + i);
          let plans = planList.filter(plan => {return plan.date === getDateFormat(newDate)});
          arr[i] = <PlanList key={i} author={author} date={newDate} planList={plans} type={type} 
          onEditComplete={onEditComplete}
          onComplete={onComplete}
          onDelete={onDelete} onCreate={onCreate}
          postStatus={postStatus}
          deleteStatus={deleteStatus}
          updateStatus={updateStatus}/>;
        }
        console.log(arr);
        return arr;
      }else if(type === planTypes.LOOP_PLAN){
        return undefined;
      }
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