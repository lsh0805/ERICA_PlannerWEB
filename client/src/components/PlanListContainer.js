import React, {useState} from 'react';
import * as planTypes from './PlannerTypes';
import {PlanList} from 'components';

const PlanListContainer = ({author, planList, type, date, onEditComplete, onDelete, onCreate}) => {
  const getDateFormat = (d) => {
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let date = d.getDate();
    return year + "-" + month + "-" + date;
  }
  const mapToComponents = (planList, date) => {
    let diff = (date[1] - date[0])  / (60 * 60 * 24) / 1000;
    let arr = new Array(diff);
    for(let i = 0; i <= diff; i++){
      let newDate = new Date(date[0]);
      newDate.setDate(date[0].getDate() + i);
      let plans = planList.filter(plan => {return plan.date === getDateFormat(newDate)});
      arr[i] = <PlanList author={author} date={newDate} planList={plans} type={type} onEditComplete={onEditComplete} onDelete={onDelete} onCreate={onCreate}/>;
    }
    return arr;
  };

  return (
    <div>
      {mapToComponents(planList, date)}
    </div>);
}

export default PlanListContainer;