import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './css/Toast.css';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import * as AuthenticationTypes from './AuthenticationTypes';

const useStyles = makeStyles(theme => ({
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
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    error_toast: {
      backgroundColor:'#D32F2F',
      color: '#FFFFFF'
    },
    message: {
      display: 'flex',
      alignItems: 'center',
      fontWeight: 900,
    },  
  }));

const Authentication = (props) => {
  const [input_state, inputSetState] = useState({
    email: "",
    password: "",
    keepLogin: false,
    password_check: "",
    nickname: "",
    alarm: false,
  });
  useEffect(() => {
    return () => {
      toast.dismiss();
    }
  }, []);
  const [ERROR_LOGIN, ERROR_REGISTER, ERROR_FORGET_PASSWORD] = [1, 2, 3];
  const getToastAttr = (type) => {
    return {
      toastId: type,
      position: toast.POSITION.BOTTOM_CENTER,
    }
  }
  const handleLogin = () => {
    props.onLogin(input_state.email, input_state.password, input_state.keepLogin).then((response) => {
      if(!toast.isActive(ERROR_LOGIN) && !response.success){
      toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>{response.error}</div>, {
          ...getToastAttr(ERROR_LOGIN)
        });
      }
    });
  };
  const handleRegister = () => {
    props.onRegister(input_state.email, input_state.nickname, input_state.password, input_state.password_check, input_state.alarm).then((response) => {
      if(!toast.isActive(ERROR_REGISTER) && !response.success){
        toast.info(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>{response.error}</div>, {
          ...getToastAttr(ERROR_REGISTER)
        });
      }
    });
  };
  function handleChange(e) {
    inputSetState((prevStatus) => {
      if(e.target.name === "keepLogin" || e.target.name === "alarm")
        prevStatus[e.target.name] = e.target.checked;
      else
        prevStatus[e.target.name] = e.target.value;
      return prevStatus;
    });
  }
  const enterKey = (key) =>{
    if(key.keyCode === 13)
        props.mode ? handleLogin() : handleRegister();
  }
  const sendMail = () => {
    if(input_state.password !== input_state.password_check){
      toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>{"비밀번호가 일치하지 않습니다."}</div>, {
        ...getToastAttr(ERROR_FORGET_PASSWORD)
      });
      return;
    }
    props.onSendMail(input_state.email, input_state.password).then((response) => {
      if(!toast.isActive(ERROR_FORGET_PASSWORD) && !response.success){
      toast.error(<div className="toast_wrapper"><ErrorOutlineIcon className="toast"/>{response.error}</div>, {
          ...getToastAttr(ERROR_FORGET_PASSWORD)
        });
      }
    });
  };
  const classes = useStyles();
  const loginView = (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일주소"
        name="email"
        autoComplete="true"
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
        autoComplete="true"
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
        onClick={handleLogin}
        className={classes.submit}
      >
        로그인하기
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to="/forget">
            비밀번호를 잊으셨나요?
          </Link>
        </Grid>
        <Grid item>
          <Link to="/register">
            회원가입
          </Link>
        </Grid>
      </Grid>
    </div>
  );

  const registerView = (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="nickname"
            label="닉네임"
            name="nickname"
            autoCapitalize="off"
            autoComplete="nope"
            onChange={ handleChange }
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
            autoCapitalize="off"
            onChange={ handleChange }
            autoComplete="nope"
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
            autoCapitalize="off"
            onChange={ handleChange }
            autoComplete="new-password"
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
            autoCapitalize="off"
            onChange={ handleChange }
            autoComplete="new-password"
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
        onClick={handleRegister}
        className={classes.submit}
      >
        가입하기
      </Button>
      <Grid container justify="flex-end">
        <Grid item>
          <Link to="/login">
            이미 가입을 하셨나요? 로그인 하기
          </Link>
        </Grid>
      </Grid>
    </div>
  );

  const findView = (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="email"
        label="이메일주소"
        name="email"
        autoComplete="true"
        onChange={ handleChange }
        autoFocus
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password"
        label="새로운 비밀번호"
        type="password"
        id="password"
        onChange={ handleChange }
        autoComplete="true"
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password_check"
        label="새로운 비밀번호 (확인)"
        type="password"
        id="password"
        onChange={ handleChange }
        autoComplete="true"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        onClick={sendMail}
        className={classes.submit}
      >
        인증메일 발송
      </Button>
    </div>
  );

  return (
    <div>
      <Container component="main" xs={20} maxWidth="xs">
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          { props.mode === AuthenticationTypes.LOGIN ? "로그인" : 
          props.mode === AuthenticationTypes.REGISTER ? "회원가입" :
          "비밀번호 초기화" }
          </Typography>
          <div className={classes.form} onKeyDown={enterKey}>
            { props.mode === AuthenticationTypes.LOGIN ? loginView : 
            props.mode === AuthenticationTypes.REGISTER ? registerView :
            findView }
          </div>
        </div>
      </Container>
    </div>
    );
}
export default Authentication;