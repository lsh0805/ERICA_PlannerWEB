import React from 'react';
import './css/Main.css'
import { Link } from 'react-router-dom';

const Main = () => {
    return (
    <React.Fragment>
      <div className="banner">
        <div className="container">
          <div className="title">
            Next Level
          </div>
          <div className="describe">
            설명
          </div>
          <div className="item">
            <Link to="/planner/todo" className="link_btn">
              플래너 시작하기
            </Link>
          </div>
        </div>
      </div>
    </React.Fragment>
    );
};

export default Main;