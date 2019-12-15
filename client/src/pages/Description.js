import React from 'react';
import './css/Description.css';
import mainpage from '../img/main_page.png';
import todopage from '../img/todo_page.png';
import infopage from '../img/info_page.png';
import { faTrashAlt, faCheckCircle, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { faEdit} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Description = () => {
  let titleList = ["메인화면", "일정", "내 정보", "경험치 공식"];
  let subTitleList =[[], ["일정 설정", "타입"], ["일정", "성장 그래프"], ["최대 경험치"]];

  let planBtnStyle = {
    background: "#3BFEBB", 
    minWidth: "auto",
    width: "40px", 
    margin: "0px 2px",
    height: "30px",
    lineHeight: "30px",
    borderRadius: "5px",
    color: "white",
    textAlign: "center",
    display: "inline-block"
  }

  return(
    <div className="container">
      <div className="wrapper">
        <div className="sectionContainer">
          <div className="sectionTitle title1">
            {titleList[0]}
          </div>
          <div className="sectionContents contents1">
            <div className="imgContainer">
              <img className="descImg"src={mainpage} alt="메인화면"/>
              <p className="descImgExplain"><strong>메인 화면</strong>에서 <strong>상단 바</strong>에 있는 메뉴를 통해 <strong>내 정보 페이지</strong>와 
              <strong>일정 관리 페이지</strong>로 이동이 가능합니다.<br/>
              또한 현재 자신의 정보를 UI를 통해 간단하게 확인할 수 있습니다.</p>
            </div>
          </div>
        </div>
        <div className="sectionContainer">
          <div className="sectionTitle title2">
            {titleList[1]}
          </div>
          <div className="sectionContents contents2">
            <div className="imgContainer">
              <img className="descImg"src={todopage} alt="일정화면"/>
              <p className="descImgExplain"><strong>일정페이지</strong>에서는 <strong>일정을 등록</strong>하고<br/><strong>일정을 수행했을 경우, 완료하여 경험치를 획득</strong>할 수 있습니다.<br/>
              </p>
            </div>
            <div className="subSection">
              <div className="subSectionTitle subtitle2-1">
                {subTitleList[1][0]}
              </div>
                <p className="contentsExplaination">
                  기간 설정에있는 UI에 달력 아이콘을 클릭하면 기간을 설정할 수 있는 뷰가 나옵니다.<br/>
                  기간을 설정하면 일정 설정 뷰들이 나오게 됩니다.<br/>
                  일정 설정 뷰에있는 <strong>+</strong> 버튼을 누르면 일정이 생성됩니다.<br/>
                  생성된 일정을 수정할 때에는 <div style={planBtnStyle}><FontAwesomeIcon icon={faEdit}/></div> 버튼을 눌러서 일정 제목과 경험치를 수정할 수 있습니다.<br/>
                  일정을 수행했을 경우 <div style={planBtnStyle}>완료</div> 버튼을 눌러서 설정한 경험치를 얻을 수 있습니다.<br/>
                  일정을 삭제하고 싶다면 <div style={planBtnStyle}><FontAwesomeIcon icon={faTrashAlt}/></div> 버튼을 눌러서 삭제할 수 있습니다.
                </p>
            </div>
            <div className="subSection">
              <div className="subSectionTitle subtitle2-2">
                {subTitleList[1][1]}
              </div>
                <p className="contentsExplaination">
                  <p><strong>기간 일정</strong>에서는 날짜 기간을 선택해서 각 날짜에 해당하는 일정을 설정할 수 있습니다.<br/>
                  또한 날짜 기간을 최대 7일까지 선택할 수 있고 일정당 최대 경험치 500까지 설정 가능합니다.</p>
                  <p><strong>요일 반복 일정</strong>에서는 요일 별로 선택해서 각 요일에 해당하는 일정을 설정할 수 있습니다.<br/>
                  요일 반복 일정에 등록된 일정을 수행했을 경우에는 수행한 다음 날 다시 수행할 수 있도록 초기화됩니다.<br/>
                  일정당 경험치는 500까지 설정 가능합니다.
                  </p>
                  <p><strong>월 목표, 연 목표</strong>에서는 월, 연 기간을 선택해서 각 월, 연에 해당하는 목표를 설정할 수 있습니다.<br/>
                  월 목표에서 목표당 경험치는 5000까지 설정 가능하고 연 목표에서는 50000까지 설정할 수 있습니다.
                  </p>
                </p>
            </div>
          </div>
        </div>
        <div className="sectionContainer">
          <div className="sectionTitle title3">
            {titleList[2]}
          </div>
          <div className="sectionContents contents3">
            <div className="imgContainer">
              <img className="descImg"src={infopage} alt="내 정보 화면"/>
              <p className="descImgExplain"><strong>내 정보 화면</strong>에서는 <strong>자신의 세부 경험치 상태</strong>, 
              <strong>일정 현황</strong>, <strong>경험치 성장 그래프</strong>를 확인할 수 있습니다.</p>
            </div>
            <div className="subSection">
              <div className="subSectionTitle subtitle3-1">
                {subTitleList[2][0]}
              </div>
                <p className="contentsExplaination">
                  <p>내 정보에 있는 일정 현황에서는 새로운 일정을 등록할 수 없습니다. 일정 페이지에서 등록해주세요.<br/></p>
                </p>
            </div>
            <div className="subSection">
              <div className="subSectionTitle subtitle3-2">
                {subTitleList[2][1]}
              </div>
                <p className="contentsExplaination">
                  <p><strong>성장 그래프</strong>에서 기간을 선택해 해당 기간에 해당하는 자신의 경험치 성장 그래프를 확인할 수 있습니다.<br/></p>
                </p>
            </div>
          </div>
        </div>
        <div className="sectionContainer">
          <div className="sectionTitle title4">
            {titleList[3]}
          </div>
          <div className="sectionContents contents4">
            <div className="subSection">
              <div className="subSectionTitle subtitle4-1">
                {subTitleList[3][0]}
              </div>
                <p className="contentsExplaination">
                  <p><strong>각 레벨별 최대 경험치</strong>는 다음 공식을 통해 설정됩니다.<br/>
                  <strong>500 + (150 * (레벨 - 1))</strong>
                  </p>
                </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Description;