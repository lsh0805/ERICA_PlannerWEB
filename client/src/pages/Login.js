import React, { useState } from 'react';
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

const AUTH_LOGIN_SUCCESS = "AUTH_LOGIN_SUCCESS";
const AUTH_LOGIN_FAILURE = "AUTH_LOGIN_FAILURE";
const AUTH_LOGIN = "AUTH_LOGIN";

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
    let history = useHistory();
    let location = useLocation();
    const classes = useStyles();
    const [input_state, inputSetState] = useState({
        email: "",
        password: "",
        keepLogin: false,
    });
    // TODO: 서버에서 입력 데이터 올바른 것인지 DB에서 검색한 결과를 토대로
    // 인풋박스 아래에 오류메시지 출력하는 기능 추가.
    function handleChange(e) {
        inputSetState((prevStatus) => {
            console.log(e);
            if(e.target.name == "keepLogin")
                prevStatus[e.target.name] = e.target.checked;
            else
                prevStatus[e.target.name] = e.target.value;
            console.log(prevStatus);
            return prevStatus;
        });
    }
    // API REQUEST
    const handleLogin = () => {
        let { from } = location.state || { from: { pathname: "/" } };
        let data = input_state;
        axios.post('/api/account/login', data)
        .then((response) => {
            // create session data
            let loginData = {
                isLoggedIn: true,
                email: data.email
            };

            document.cookie = 'key=' + btoa(JSON.stringify(loginData));

            console.log("로그인 완료");
            history.push(from);
            return true;
        }).catch((error) => {
            console.log(error);
            return false;
        });
    }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          로그인
        </Typography>
        <div className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="이메일주소"
            name="email"
            autoComplete="email"
            onChange={ handleChange }
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="비밀번호"
            type="password"
            id="password"
            onChange={ handleChange }
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox name="keepLogin" color="primary" onChange={ handleChange } />}
            label="로그인 유지"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={ handleLogin }
            className={classes.submit}
          >
            로그인하기
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                비밀번호를 잊으셨나요?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                회원가입
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}