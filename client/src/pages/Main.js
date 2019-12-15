import React from 'react';
import './css/Main.css'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
    <React.Fragment>
      <div className="banner">
        <div className="container">
          <div className="title">
            NEXT LEVEL
          </div>
          <div className="describe">
            일정 수행을 더욱 성취감있게!
          </div>
          <div className="item">
            <Link to="/planner/todo" className="link_btn">
              플래너 시작하기
            </Link>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="wrapper">
          <div className="introduceTitle">
            프로젝트 설명
          </div>
          <div className="introduceContainer">
            <div className="introduceSection section1">
              <div className="sectionTitle">
                소개
              </div>
              <div className="sectionContents">
                <p>RPG 게임을 하면 캐릭터가 성장하면서 레벨이나 공격력이 올라가게되어 성취감을 느끼게됩니다.
                  하지만 현실에서는 업무나 과제를 수행했을 때 자신이 얼마큼 성장했는 지가 추상적입니다.<br/>
                  이 프로젝트는 RPG 게임에서 퀘스트를 수행하듯,
                  자신의 일정이나 목표를 등록하고 그 일정을 수행하였을 때 레벨이 오르는 일정 관리 프로젝트입니다.
                  NEXT LEVEL을 통해 게임속의 캐릭터가 아닌 현실의 나를 성장시켜보세요!</p>
              </div>
            </div>
            <div className="introduceSection section2">
              <div className="sectionTitle">
                특징
              </div>
              <div className="sectionContents">
                <p>
                  자신이 해야 할 일들에 대해서 계획표를 작성하고, 일들을 마쳤을 때 경험치를 얻을 수 있습니다.
                  남들과 경쟁하는 것이 아니기 때문에 경험치량은 직접 설정할 수 있습니다. (최대 상한은 정해져있습니다.)<br/>
                  '내 정보'에서 기간별로 경험치 추이 그래프를 확인할 수 있어서 자신이 얼마나 성장했는지 시각적으로 확인할 수 있습니다.</p>
              </div>
            </div>
            <div className="introduceSection section3">
              <div className="sectionTitle">
                오픈소스
              </div>
              <div className="sectionContents">
                <p>본 프로젝트는 오픈소스 프로젝트입니다.<br/>
                <a href="https://github.com/lolmc00/ERICA_PlannerWEB">GITHUB</a>에 접속하시면 소스코드를 확인하실 수 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
};

export default Main;