import React, {useState} from 'react';
import { faTrashAlt, faCut, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faCopy } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/PlanItem.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../components/css/Toast.css';
import axios from 'axios';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const PlanItem = (props) => {
  const [contents, setContents] = useState({
    title: props.title,
    exp: props.exp,
    id: props.id,
    cycleDays: props.cycleDays
  });
  const [isEditable, setEditable] = useState(props.editable);
  const onEditCompleteClick = () => {
    let error = undefined;
    if(contents.title === ""){
      error = "일정 제목을 입력해주세요.";
    }else if(contents.exp === ""){
      error = "경험치를 입력해주세요.";
    }else if(contents.exp < 0 || (contents.exp % 1) !== 0){
      error = "경험치는 0이상의 정수여야 합니다.";
    }else if(contents.exp > 500){
      error = "경험치는 최대 500까지 설정할 수 있습니다.";
    }
    if(error !== undefined){
      toast.info(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>{error}</div>);
      return;
    }
    axios.post('/api/plan/post', {
      id: contents.id,
      author: props.author,
      title: contents.title,
      exp: contents.exp,
      type: props.type,
      date: props.date,
      month: props.month,
      year: props.year,
      cycleDays: contents.cycleDays,
    }).then((res) => {
      setContents({...contents, id: res.data.row.id});
      props.onCreated(props.planKey, contents, res.data.row.id);
      setEditable(false);
    }).catch((err) => {
      console.log(err);
    });
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
        <div className="plan_btn complete_btn" onClick={() => props.onCompleteClick(props.planKey)}>
          완료
        </div>
        <div className="plan_btn edit_btn" onClick={() => setEditable(true)}>
          <FontAwesomeIcon icon={faEdit}/>
        </div>
        <div className="plan_btn delete_btn" onClick={() => props.onDeleteClick(props.planKey)}>
          <FontAwesomeIcon icon={faTrashAlt}/>
        </div>
      </div>
    </div>
  );
  const editableView = (
    <div className="plan_item">
      <input type="text" className="edit_title" placeholder="일정 제목(설명)" name="title" value={contents.title} onChange={onContentsChange}/>
      <input type="number" className="edit_exp" placeholder="경험치(0~500)" name="exp" value={contents.exp} onChange={onContentsChange}/>
      <div className="plan_btn_container" style={{justifyContent: "flex-end", marginRight: "2.5px"}}>
        <div className="plan_btn complete_edit_btn" onClick={() => onEditCompleteClick()}>확인</div>
      </div>
    </div>
  );
  return (
    <React.Fragment>
      {isEditable ? editableView: planView}
    </React.Fragment>
  );
}

export default PlanItem;
