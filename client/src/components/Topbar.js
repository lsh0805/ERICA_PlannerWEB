import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import './css/Topbar.css'
import logo from '../img/logo.png'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    zIndex: theme.zIndex.drawer + 1000,
  },
  menuIcon: {
    verticalAlign: 'center',
    margin: theme.spacing(0, 4, 0, 0),
  },
  topBar: {
    justifyContent: `space-around`,
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down(1100)]: {
        justifyContent: `space-between`,
    }
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
const Topbar = () => {
    const classes = useStyles(); 
    const [loginInfo, setLoginInfo] = useState({
        isLoggedIn : false,
        userName: "",
    });
    const [isOpenedSideNav, setSideNavOpen] = useState(false);
    function offNav() {
      window.innerWidth > 860 && isOpenedSideNav && setSideNavOpen(false);
    }
    window.addEventListener('resize', offNav);
    useEffect(() => {
      axios.get('/api/account/getInfo').then((res) => {
          setLoginInfo({isLoggedIn: true, userName: res.username})
      });
    }, []);

    const handleLogout = () => {
      axios.get('/api/account/logout').then(() => {
        let loginData = {
            isLoggedIn: false,
            username: '',
        };
        document.cookie = 'key=' + btoa(JSON.stringify(loginData));
        setLoginInfo({isLoggedIn: false, userName: ""});
      }).catch((err) => {
          console.log(err);
      });
    }
    const toggleSideNav = (open) => event => {
      if (event.type === 'keydown' && (event.key ===  'Tab' || event.key === 'Shift'))
        return;
      setSideNavOpen(open);
    };
    const loginUI = (
      <div>
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
      <div>
        <Link to="/logout" className="">
          <Button color="primary" variant="outlined" className={classes.button} onClick={handleLogout}>
              로그아웃
          </Button>
        </Link>
      </div>
    );
    return (
    <React.Fragment>
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar id="top_bar" className={classes.topBar}>
          <div className="bar_left">
              <Link to="/" className="logo"><img src={logo} style={{width: 80}} alt="로고"/></Link>
              <a href="#" className="menu_button">
                {isOpenedSideNav ? <CloseIcon variant="text" color="primary" onClick={toggleSideNav(false)}/>: 
                <MenuIcon variant="text" color="primary" onClick={toggleSideNav(true)}/>}
              </a>
          </div>
          <nav className="bar_nav">
              <Link to="/" className="item">설명</Link>
              <Link to="/" className="item">사용법</Link>
              <Link to="/" className="item">공지사항</Link>
              <Link to="/" className="item">게시판</Link>
          </nav>
          <div className="bar_right">
              { loginInfo.isLoggedIn ? logoutUI : loginUI }
          </div>
        </Toolbar>
      </AppBar>
      <div id="bar_space"></div>
      
      <nav id="nav" style={{width: (isOpenedSideNav ? "170px" : "0px")}}>
        <Link to="/" className="item">설명</Link>
        <Link to="/" className="item">사용법</Link>
        <Link to="/" className="item">공지사항</Link>
        <Link to="/" className="item">게시판</Link>
      </nav>
    </React.Fragment>
  );
  }

export default Topbar;