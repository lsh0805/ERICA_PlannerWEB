import React from 'react';
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
import { Link } from 'react-router-dom';
import './css/Topbar.css'

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
    const classes = useStyles();
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key ===  'Tab' || event.key === 'Shift')) {
          return;
        }
        setState({ ...state, [side]: open });
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
    return (
      <React.Fragment>
        <AppBar color="default" elevation={0} className={classes.appBar}>
          <Toolbar id="top_bar" className={classes.topBar}>
            <div className="bar_left">
                <Link to="/" className="logo">로고</Link>
                <MenuIcon  onClick={toggleDrawer('left', true)}></MenuIcon>
            </div>
            <nav className="bar_nav">
                <Link to="/" className="item">설명</Link>
                <Link to="/" className="item">사용법</Link>
                <Link to="/" className="item">공지사항</Link>
                <Link to="/" className="item">게시판</Link>
            </nav>
            <div className="bar_right">
                <Button href="" color="primary" variant="outlined" className={classes.button}>
                    <Link to="/login" className="">로그인</Link>
                </Button>
                <Button color="primary" variant="outlined" className={classes.button}>
                    <Link to="/register" className="">회원가입</Link>
                </Button>
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