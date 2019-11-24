import React, {useState, useEffect} from 'react';
import './css/PlanList.css';
import { PlanItem } from 'components';
import { faPlus, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {faWindowMinimize} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as planTypes from './PlannerTypes';
import Button from '@material-ui/core/Button';
import axiso from 'axios';

const PlanList = (props) => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenedItemBox, setOpenedItemBox] = useState(true);
  const dateClass = new Date(props.date);
  const handleOnClickSizingBox = () => {
    if(isOpenedItemBox)
      setOpenedItemBox(false);
    else
      setOpenedItemBox(true);
  }
  useEffect(() => {
    setLoading(true);
    if(props.type === planTypes.DAILY_PLAN)
      axios.post('/api/plan/getDailyPlans', {author: props.author, date: dateClass})
      .then(res => {
        setAllPlans(res.data.row);
        setLoading(false);
      }).catch(err => {
        console.log(err);
      });
  }, [props.date]);
  const setAllPlans = (planList) => {
    let copy_planList = planList.slice(0);
    copy_planList.map((plan, i) => {
      copy_planList[i] = {...plan, planKey: i};
    });
    setPlans(copy_planList);
  } 
  const mapToComponents = data => {
    if(data !== undefined)
      return data.map((plan) => {
        return (<PlanItem planKey={plan.planKey} author={plan.author} title={plan.title} exp={plan.exp} 
          editable={plan.editable} id={plan.id} type={props.type} date={props.date}
          onDeleteClick={onDeletePlan} onCreated={onCreated}/>);
      });
    else
      return undefined;
  };
  const findPlanByKey = (planKey) => {
    let ret = -1;
    for(let i = 0; i < plans.length; i++){
      if(plans[i].planKey === planKey){
        ret = i;
        break;
      }
    }
    return ret;
  }
  const onDeletePlan = (planKey) =>{
    let idx = findPlanByKey(planKey);
    console.log(planKey, idx);
    let new_plans = plans.slice(0);
    new_plans.splice(idx, 1);
    console.log(new_plans);
    axios.post('/api/plan/delete', {id: plans[idx].id}).then(() => {
      setAllPlans(new_plans);
    }).catch(err => {
      console.log(err);
    });
  }
  const onCreated = (planKey, contents, id) =>{
    let idx = findPlanByKey(planKey);
    let new_plans = plans.slice(0);
    console.log(id);
    new_plans[idx] = {...new_plans[idx], id: id, title: contents.title, exp: contents.exp};
    setAllPlans(new_plans);
  }
  const createNewPlan = () => {
    if(isOpenedItemBox === false)
      setOpenedItemBox(true);
    setAllPlans([...plans, {author: props.author, title: undefined, exp: undefined, editable: true, type: props.type}]);
  }
  return (
    <div className="plan_box">
      <div className="plan_header">
        <div className="date">{dateClass.getFullYear() + "-" + (dateClass.getMonth() + 1) + "-" + dateClass.getDate()}</div>
        <div className="right_toolbox">
          <Button className="tool plan_add_btn" onClick={createNewPlan}><FontAwesomeIcon icon={faPlus}/></Button>
        </div>
      </div>
      <Button className="plan_box_sizing_row" onClick={handleOnClickSizingBox}>
        <FontAwesomeIcon icon={isOpenedItemBox ? faWindowMinimize : faChevronDown} className="tool plan_box_sizing_btn"/>
      </Button>
      <ul className="plan_item_container" style={{maxHeight: isOpenedItemBox ? "1000px" : "0px"}}>
        {loading === true ? <CircularProgress/> : mapToComponents(plans)}
      </ul>
    </div>
  );
}

export default PlanList;
