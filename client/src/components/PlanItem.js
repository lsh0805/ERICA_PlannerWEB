import React from 'react';


const PlanItem = (props) => {
  return (
    <React.Fragment>
      <div className="planBox">
        <input type="checkbox" className="checkBox" name="select" value={props.planId}/>
        <div className="planName">{props.planName}</div>
        <div className="exp">EXP: {props.exp}</div>
        {/* 버튼 이모지로 바꾸기 */}
        <div className="completeBtn" onClick={() => props.onCompleteClick(props.planId)}>완료하기</div>
        <div className="deleteBtn" onClick={() => props.onDeleteClick(props.planId)}>삭제하기</div>
        <div className="editBtn" onClick={() => props.onEditClick(props.planId)}>수정하기</div>
        <input type="text" className="editPlanName" value={props.planName} />
        <input type="text" className="editExp" value={props.planName}/>
        <div className="completeBtn" onClick={() => props.onEditCompleteClick(props.planId)}>완료</div>
      </div>
    </React.Fragment>
  );
}

export default PlanItem;
