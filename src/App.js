import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import './App.css'

const useStyles = theme => ({
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
    position: 'fixed',
    top: 0,
  },
  topBar: {
    justifyContent: `space-around`,
    flexWrap: 'wrap',
    [theme.breakpoints.down(1100)]: {
        justifyContent: `space-between`,
    }
  },
  topBarLogo: {
  },
  nav_link: {
    fontSize: 18,
    margin: theme.spacing(1, 4),
    color: '#000000',
    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#50BCDF',
        textDecoration: 'none',
    },
  },
  button: {
    fontWeight: 800,
    fontSize: 18,
    margin: theme.spacing(1, 1.5),
    transition: 'all 0.3s ease',
    '&:hover': {
        color: '#0000FF',
    },
  },
});


class App extends React.Component {
    render(){
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar color="default" elevation={0} className={classes.appBar}>
          <Toolbar id="top_bar" className={classes.topBar}>
            <div class="bar_left">
                <Link variant="h6" color="inherit" href="/" noWrap className={classes.topBarLogo} underline="none">
                    로고
                </Link>
            </div>
            <nav class="bar_nav">
                <Link color="textPrimary" href="#" className={classes.nav_link} underline="none">
                    설명
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.nav_link}>
                    사용법
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.nav_link}>
                    공지사항
                </Link>
                <Link variant="button" color="textPrimary" href="#" className={classes.nav_link}>
                    게시판
                </Link>
            </nav>
            <div class="bar_right">
                <Button href="#" color="primary" variant="outlined" className={classes.button}>
                로그인
                </Button>
                <Button href="#" color="primary" variant="outlined" className={classes.button}>
                회원가입
                </Button>
            </div>
          </Toolbar>
        </AppBar>
        
      </React.Fragment>
    );
    }
  }

export default withStyles(useStyles)(App);