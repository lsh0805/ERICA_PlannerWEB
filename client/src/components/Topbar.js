import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './css/Topbar.css'
import logo from '../img/logo.png'
import { getRateEXP } from '../module/level';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1000,
  },
  button: {
    width: 65,
    height: 40,
    fontWeight: 800,
    fontSize: 13,
    margin: theme.spacing(0, 0.5),
    padding: theme.spacing(0, 0.5),
    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#0000FF',
    },
  },
}));
const Topbar = (props) => {
    const classes = useStyles(); 
    
    const [isOpenedSideNav, setSideNavOpen] = useState(false);
    function offNav() {
      window.innerWidth > 860 && isOpenedSideNav && setSideNavOpen(false);
    }
    window.addEventListener('resize', offNav);
    

    const handleLogout = () => {
      props.handleLogout();
    }
    const toggleSideNav = (open) => event => {
      if (event.type === 'keydown' && (event.key ===  'Tab' || event.key === 'Shift'))
        return;
      setSideNavOpen(open);
    };
    const loginUI = (
      <div className="loginUI">
        <Link to="/login" className="">
          <Button color="primary" variant="outlined" className={classes.button}>
              로그인
          </Button>
        </Link>
        <Link to="/register" className="">
          <Button color="primary" variant="outlined" className={classes.button}>
              회원가입
          </Button>
        </Link>
      </div>
    );
    const logoutUI = (
      <div className="logoutUI">
        <Link to="/planner/info" className="userUI">
          <div className="row1">
            <div className="user_name">
              {props.loginInfo.username}
            </div>
            <div className="user_stat">
              <div className="level">
                Lv.{props.userInfo.level}
              </div>
              <div className="exp">
                EXP: {getRateEXP(props.userInfo.level, props.userInfo.exp)}%
              </div>
            </div>
          </div>
          <div className="row2">
            <LinearProgress variant="determinate" value={getRateEXP(props.userInfo.level, props.userInfo.exp)} className="exp_bar"/>
          </div>
        </Link>
        <div className="logout_btn">
          <Button color="primary" variant="outlined" className={classes.button} onClick={handleLogout}>
              로그아웃
          </Button>
        </div>
      </div>
    );
    return (
    <React.Fragment>
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar id="topBar">
          <div className="bar_left">
              <Link to="/" className="logo"><img src={logo} style={{width: 80}} alt="로고"/></Link>
              <div style={{cursor:"pointer"}} className="menu_button">
                {isOpenedSideNav ? <CloseIcon variant="text" color="primary" onClick={toggleSideNav(false)}/>: 
                <MenuIcon variant="text" color="primary" onClick={toggleSideNav(true)}/>}
              </div>
          </div>
          <nav className="bar_nav">
              <Link to="/description" className="item">사용법</Link>
              <Link to="/planner/info" className="item">내 정보</Link>
              <Link to="/planner/todo" className="item">일정</Link>
          </nav>
          <div className="bar_right">
              { props.loginInfo.isLoggedIn ? logoutUI : loginUI }
          </div>
        </Toolbar>
      </AppBar>
      <div id="bar_space"></div>
      
      <nav id="nav" style={{width: (isOpenedSideNav ? "170px" : "0px")}}>
        <Link to="/" className="item">홈</Link>
        <Link to="/description" className="item">사용법</Link>
        <Link to="/planner/info" className="item">내 정보</Link>
        <Link to="/planner/todo" className="item">일정</Link>
      </nav>
    </React.Fragment>
  );
}

export default Topbar;