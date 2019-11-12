import React, {Component, useState, useEffect}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useHistory, useLocation } from 'react-router-dom';
// ERROR TPYES

const ERR_ALREADY_USED_EMAIL = 1;
const ERR_TOO_SHORT_EMAIL = 2;
const ERR_INVALID_EMAIL = 3;
const ERR_ALREADY_USED_NICKNAME = 4;
const ERR_TOO_SHORT_NICKNAME = 5;
const ERR_INVALID_NICKNAME = 6;
const ERR_TOO_SHORT_PASSWORD = 7;
const ERR_INVALID_PASSWORD = 8;
const ERR_NOT_EQUAL_PASSWORD = 9;
const DATA_EMAIL = 1;
const DATA_NICKNAME = 2;
const DATA_PASSWORD = 3;
const DATA_PASSWORD_CHECK = 4;
const AUTH_REGISTER_SUCCESS = "AUTH_REGISTER_SUCCESS";
const AUTH_REGISTER_FAILURE = "AUTH_REGISTER_FAILURE";
const AUTH_REGISTER = "AUTH_REGISTER";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
    let history = useHistory();
    let location = useLocation();
    const [register_state, regSetState] = useState({
        loginFailed: false,
        err: ""
    });
    const [input_state, inputSetState] = useState({
        email: "",
        password: "",
        password_check: "",
        nickname: "",
        alarm: false,
    });
    // TODO: 서버에서 입력 데이터 올바른 것인지 DB에서 검색한 결과를 토대로
    // 인풋박스 아래에 오류메시지 출력하는 기능 추가.
    function handleChange(e) {
        inputSetState((prevStatus) => {
            console.log(e.target);
            if(e.target.name == "alarm")
                prevStatus[e.target.name] = e.target.checked;
            else
                prevStatus[e.target.name] = e.target.value;
            console.log(prevStatus);
            return prevStatus;
        });
    }
    // API REQUEST
    const handleRegister = () => {
        let { from } = location.state || { from: { pathname: "/" } };
        let data = input_state;
        axios.post('/api/account/register', data)
        .then((response) => {
            // create session data
            let loginData = {
                isLoggedIn: true,
                email: data.email
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));

            console.log("회원가입 완료");
            history.push('/');
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }
    
    const classes = useStyles();
    return(
    <Container component="main" xs={20} maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          회원가입
        </Typography>
        <div className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="nickname"
                label="닉네임"
                name="nickname"
                onChange={ handleChange }
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="이메일 주소"
                name="email"
                onChange={ handleChange }
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="비밀번호"
                type="password"
                id="password"
                onChange={ handleChange }
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password_check"
                label="비밀번호 (확인)"
                type="password"
                id="password_check"
                onChange={ handleChange }
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="alarm" color="primary" onChange={ handleChange } />}
                label="기타 안내 및 광고 이메일 받기"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            variant="contained"
            onClick={handleRegister}
            className={classes.submit}
          >
            가입하기
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                이미 가입을 하셨나요? 로그인 하기
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    );
}