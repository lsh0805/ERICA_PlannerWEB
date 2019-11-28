import React, {useState, useEffect} from 'react';
import './css/PlanList.css';
import { PlanItem } from 'components';
import { faPlus, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faWindowMinimize} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from '@material-ui/core/Button';
import { CircularProgress } from '@material-ui/core';

const PlanList = React.memo(({author, planList, type, date, completed, onEditComplete, onDelete, onCreate, onComplete, postStatus, deleteStatus, updateStatus}) => {

  const [isOpenedItemBox, setOpenedItemBox] = useState(true);

  const handleOnClickSizingBox = () => {
    if(isOpenedItemBox)
      setOpenedItemBox(false);
    else
      setOpenedItemBox(true);
  }
  const mapToComponents = planList => {
    return planList.map((plan, i) => {
      return (<PlanItem key={i} author={author} title={plan.title} exp={plan.exp} 
        id={plan.id} type={type} date={date} onDelete={onDelete} completed={completed}
        onEditComplete={onEditComplete} onCreate={onCreate} 
        onComplete={onComplete}
        deleteStatus={deleteStatus} updateStatus={updateStatus} />);
    });
  };
  const createNewPlan = () => {
    if(isOpenedItemBox === false)
      setOpenedItemBox(true);
    onCreate({author, type, date});
  }
  const getDayOfWeek = (date) => {
    const week = ['일', '월', '화', '수', '목', '금', '토'];
    return week[date.getDay()];
  }
  return (
    <div className="plan_box">
      <div className="plan_header">
        <div className="date">{date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " (" + getDayOfWeek(date) + ")" }</div>
        <div className="right_toolbox">
          {postStatus.date.filter(dateVal => { return dateVal.getTime() === date.getTime()}).length === 0 ? 
          <Button className="tool plan_add_btn" onClick={() => createNewPlan()}><FontAwesomeIcon icon={faPlus}/></Button>
          : 
          <Button className="tool plan_add_btn"><CircularProgress size="1rem" style={{color:"#000000"}}/></Button>}
        </div>
      </div>
      <Button className="plan_box_sizing_row" onClick={handleOnClickSizingBox}>
        <FontAwesomeIcon icon={isOpenedItemBox ? faWindowMinimize : faChevronDown} className="tool plan_box_sizing_btn"/>
      </Button>
      <ul className="plan_item_container" style={{maxHeight: isOpenedItemBox ? "1000px" : "0px"}}>
         {mapToComponents(planList)}
      </ul>
    </div>
  );
});

export default PlanList;
