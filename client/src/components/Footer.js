import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { faGithub, faGooglePlay, faBlogger } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './css/Footer.css'
import { makeStyles } from '@material-ui/core/styles';
import logo from '../img/logo2.png'

const useStyles = makeStyles(theme => ({
  link: {
    color: '#777',
    transition: '0.45s ease all',
    '&:hover': {
        color: '#DDD',
        textDecoration: 'none'
    },
  },
}));
function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" align="center" className="copyright" style={{fontWeight:"bold", marginBottom: "10px"}}>
      {'Copyright © '}
      <Link className={classes.link} href="https://github.com/lolmc00/ERICA_PlannerWEB">
        lolmc
      </Link>{' '}
      {'All Rights Reserved '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
const Footer = () => {
  return(
    <div id="footer">
      <div className="logo"><img src={logo} style={{width: 130}} alt="로고"/></div>
      <ul className="other_link">
        <li><a href="https://github.com/lolmc00/ERICA_PlannerWEB"><FontAwesomeIcon icon={faGithub} /><span>Github</span></a></li>
        <li><a href="https://blog.naver.com/lkaiou2226"><FontAwesomeIcon icon={faBlogger} /><span>Blog</span></a></li>
        <li><a href="#"><FontAwesomeIcon icon={faGooglePlay} /><span>Playstore</span></a></li>
      </ul>
      <ul className="author_info">
        <li>이름: 임승현</li>
        <li>학번: 2019044211</li>
        <li>이메일: lkaiou2226@naver.com</li>
      </ul>
      <Copyright/>
    </div>);
}

export default Footer;