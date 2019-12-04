import React, {useState, useEffect} from 'react';
import { faTrashAlt, faCut, faCheckCircle, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/PlanItem.css';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/Toast.css';
import { toast } from 'react-toastify';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as planTypes from './PlannerTypes';

const PlanItem = (props) => {
  const [contents, setContents] = useState({title: props.title, exp: props.exp});
  const [isEditable, setEditable] = useState(props.editable);
  useEffect(() => {
    setContents({title: props.title, exp: props.exp});
  }, [props]);

  const getCanSetMaxEXP = (type) => {
    let canMaxExp;
    if(type === planTypes.DAILY_PLAN)
      canMaxExp = 500;
    if(type === planTypes.MONTHLY_PLAN)
      canMaxExp = 5000;
    if(type === planTypes.YEARLY_PLAN)
      canMaxExp = 50000;
    return canMaxExp;
  }
  const onEditCompleteClick = (title, exp, id, completed, type) => {
    let error = undefined;
    if(title === ""){
      error = "일정 제목을 입력해주세요.";
    }else if(exp === ""){
      error = "보상 경험치를 입력해주세요.";
    }else if(exp < 0 || (exp % 1) !== 0){
      error = "경험치는 0이상의 정수여야 합니다.";
    }else if(exp > getCanSetMaxEXP(type)){
      error = "경험치는 최대 " + getCanSetMaxEXP(type) + "까지 설정할 수 있습니다.";
    }
    if(error !== undefined)
      toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>{error}</div>);
    else{
      props.onEditComplete(title, exp, id, completed).then(() => {
        setEditable(false);
      });
    }
  }
  const onDeleteClick = (id) =>{
    props.onDelete(id);
  }
  const onCompleteClick = (title, exp, id) =>{
    props.onComplete(title, exp, id);
  }
  function onContentsChange(e) {
    e.persist();
    let copyContents = contents;
    setContents({
      ...copyContents,
      [e.target.name]: e.target.value,
    });
  }
  const planView = (
    <div className="plan_item">
      <div className="plan_item_row1">
        <div className="plan_title">{props.title}</div>
      </div>
      <div className="plan_item_row2">
        <div className="plan_exp"><FontAwesomeIcon icon={faTrophy} style={{color: "#F9A602", marginRight: "5px"}}/>{props.exp}</div>
        <div className="plan_btn_container">
          <div className="plan_btn complete_btn" onClick={() => onCompleteClick(props.title, props.exp, props.id, true, props.type)}>
            완료
            {props.completed}
          </div>
          <div className="plan_btn edit_btn" onClick={() => setEditable(true)}>
            <FontAwesomeIcon icon={faEdit}/>
          </div>
          {props.deleteStatus.id.filter(id => {return id === props.id}).length === 0 ? 
          <div className="plan_btn delete_btn" onClick={() => onDeleteClick(props.id)}>
            <FontAwesomeIcon icon={faTrashAlt}/>
          </div> : 
          <div className="plan_btn delete_btn">
            <CircularProgress size="2rem" style={{color:"#ffffff"}}/>
          </div>}
        </div>
      </div>
    </div>
  );
  const editableView = (
    <div className="plan_item">
      <form action="">
        <div className="plan_item_row1">
          <input type="text" className="edit_title" placeholder="일정 제목(설명)" name="title" value={contents.title} onChange={onContentsChange}/>
        </div>
        <div className="plan_item_row2">
          <input type="number" className="edit_exp" placeholder={"경험치(0~" + getCanSetMaxEXP(props.type) + ")"} name="exp" value={contents.exp} onChange={onContentsChange}/>
          <div className="plan_btn_container" style={{justifyContent: "flex-end"}}>
            {props.updateStatus.id.filter(id => {return id === props.id}).length === 0 ? 
              <div className="plan_btn complete_edit_btn" onClick={() => onEditCompleteClick(contents.title, contents.exp, props.id, false, props.type)}>
                확인
              </div>
              :
              <div className="plan_btn complete_edit_btn">
                <CircularProgress size="2rem" style={{color:"#ffffff"}}/>
              </div>
            }
          </div>
        </div>
      </form>
    </div>
  );
  const completedView = (
    <div className="plan_item_completed_layout">
      <div className="plan_item">
        <div className="plan_item_row1">
          <div className="plan_title" style={{opacity: "0.4"}}>{contents.title}</div>
        </div>
        <div className="plan_item_row2">
          <div className="plan_exp" style={{opacity: "0.4"}}><FontAwesomeIcon icon={faTrophy} style={{color: "#F9A602", marginRight: "5px"}}/>{contents.exp}</div>
          <div className="plan_btn_container" style={{justifyContent: "flex-end"}}>
            {props.deleteStatus.id.filter(id => {return id === props.id}).length === 0 ? 
            <div className="plan_btn delete_btn" onClick={() => onDeleteClick(props.id)}>
              <FontAwesomeIcon icon={faTrashAlt}/>
            </div> : 
            <div className="plan_btn delete_btn">
              <CircularProgress size="2rem" style={{color:"#ffffff"}}/>
            </div>}
          </div>
        </div>
      </div>
      <div className="plan_completed_view" style={{opacity: "1"}}>
          <FontAwesomeIcon icon={faCheckCircle}/>
      </div>
    </div>
  );
  return (
    <React.Fragment>
      {isEditable ? editableView: (props.completed ? completedView : planView)}
    </React.Fragment>
  );
}

export default PlanItem;
