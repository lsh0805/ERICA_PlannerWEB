import React, { useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useHistory, useLocation } from 'react-router-dom';
import './css/Topbar.css'
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
    },
    li: {
      listStyle: 'none',
    },
    a: {
        textDecoration: 'none'
    },
    body:{
        height: 2000,
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  menuIcon: {
    verticalAlign: 'center',
    margin: theme.spacing(0, 4, 0, 0),
  },
  topBar: {
    justifyContent: `space-around`,
    flexWrap: 'wrap',
    [theme.breakpoints.down(1100)]: {
        justifyContent: `space-between`,
    }
  },
  button: {
    fontWeight: 800,
    fontSize: 18,
    margin: theme.spacing(0, 1.5),
    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#0000FF',
    },
  },
}));


const Topbar = () => {
    let history = useHistory();
    let location = useLocation();
    const classes = useStyles(); 
    const [loginInfo, setLoginInfo] = React.useState({
        isLoggedIn : false,
        userName: "",
    });
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    useEffect(() => {
        
        axios.get('/api/account/getInfo').then((res) => {
            setLoginInfo({isLoggedIn: true, userName: res.username})
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    const handleLogout = () => {
        let { from } = location.state || { from: { pathname: "/" } };
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
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key ===  'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [side]: open }); //TODO: state 객체의 property로 side: open값을 추가하는 것인가? 알아보기 (ES6문법 공부)
    };
    
    const sideList = side => (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
          <List>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
    </div>
    );
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
        <AppBar color="default" elevation={0} className={classes.appBar}>
          <Toolbar id="top_bar" className={classes.topBar}>
            <div className="bar_left">
                <Link to="/" className="logo">로고</Link>
                <Button>
                    <MenuIcon onClick={toggleDrawer('left', true)}></MenuIcon>
                </Button>
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
        <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
            {sideList('left')}
        </Drawer>
      </React.Fragment>
    );
  }

export default Topbar;