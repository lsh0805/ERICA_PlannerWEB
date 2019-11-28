import React, {useState} from 'react';
import { faTrashAlt, faCut, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/PlanItem.css';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/Toast.css';
import { toast } from 'react-toastify';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';

const PlanItem = React.memo((props) => {
  const [contents, setContents] = useState({title: props.title, exp: props.exp, completed: props.completed});
  const [isEditable, setEditable] = useState(props.editable);

  const onEditCompleteClick = (title, exp, id, completed) => {
    let error = undefined;
    if(title === ""){
      error = "일정 제목을 입력해주세요.";
    }else if(exp === ""){
      error = "보상 경험치를 입력해주세요.";
    }else if(exp < 0 || (exp % 1) !== 0){
      error = "경험치는 0이상의 정수여야 합니다.";
    }else if(exp > 500){
      error = "경험치는 최대 500까지 설정할 수 있습니다.";
    }
    if(error !== undefined)
      toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>{error}</div>);
    else{
      props.onEditComplete(title, exp, id, completed);
      if(props.updateStatus.id.filter(id => {return id === props.id}).length === 0)
        setEditable(false);
    }
  }
  const onDeleteClick = (id) =>{
    props.onDelete(id);
  }
  const onCompleteClick = (title, exp, id, completed) =>{
    props.onComplete(title, exp, id, completed);
  }
  function onContentsChange(e) {
    e.persist();
    setContents({
      ...contents,
      [e.target.name]: e.target.value
    });
  }
  const planView = (
    <div className="plan_item">
      <div className="plan_title">{contents.title}</div>
      <div className="plan_exp"><FontAwesomeIcon icon={faTrophy} style={{color: "#F9A602", marginRight: "5px"}}/>{contents.exp}</div>
      <div className="plan_btn_container">
        <div className="plan_btn complete_btn" onClick={() => onCompleteClick(contents.title, contents.exp, props.id, 1)}>
          완료
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
  );
  const editableView = (
    <div className="plan_item">
      <form action="">
        <input type="text" className="edit_title" placeholder="일정 제목(설명)" name="title" value={contents.title} onChange={onContentsChange}/>
        <input type="number" className="edit_exp" placeholder="경험치(0~500)" name="exp" value={contents.exp} onChange={onContentsChange}/>
      </form>
      <div className="plan_btn_container" style={{justifyContent: "flex-end", marginRight: "2.5px"}}>
        {props.updateStatus.id.filter(id => {return id === props.id}).length === 0 ? 
          <div className="plan_btn complete_edit_btn" onClick={() => onEditCompleteClick(contents.title, contents.exp, props.id, contents.completed)}>
            확인
          </div>
          :
          <div className="plan_btn complete_edit_btn">
            <CircularProgress size="2rem" style={{color:"#ffffff"}}/>
          </div>
        }
      </div>
    </div>
  );
  return (
    <React.Fragment>
      {isEditable ? editableView: planView}
    </React.Fragment>
  );
});

export default PlanItem;
