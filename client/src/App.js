import React, { useState, useEffect } from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Main, Login, Register } from 'pages';
import { Topbar } from 'components';
import axios from 'axios';
import clsx from 'clsx';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent  from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { makeStyles } from '@material-ui/core/styles';

function App() {
    const useStyles = makeStyles(theme => ({
        icon: {
          fontSize: 20,
        },
        iconVariant: {
          opacity: 0.9,
          marginRight: theme.spacing(1),
        },
        error_toast: {
              backgroundColor: "teal",
              color: "#FF0000",
            },
        message: {
          display: 'flex',
          alignItems: 'center',
        },  
      }));

    // 새로 고침 시 쿠키 값이 유호한지 판단함.
    useEffect(() => {
        
        // 쿠키 값 가져옴
        function getCookie(name) {
            var value = "; " + document.cookie;
            var parts = value.split("; " + name + "=");
            if (parts.length == 2) return parts.pop().split(";").shift();
        }

        // 쿠키로 로그인 정보 가져옴
        let loginData = getCookie('key');
        // 로그인 정보가 없을 시 종료
        if(typeof loginData === "undefined") return;

        // 로그인 데이터를 base64로 디코딩하고 JSON으로 parse
        loginData = JSON.parse(atob(loginData));

        // 로그인 하지 않았다면 종료.
        if(!loginData.isLoggedIn) return;

        // 쿠키 값이 유효한지 판단함.
        axios.get('/api/account/getInfo')
        .then(() => {})
        .catch((err) => {
                createToast("세션이 만료되었습니다. 다시 로그인 해주세요.");
                console.log(err);
            }
        );
    }, []);
    const [toast, setOpen] = useState({
        open: false,
        message: ""
    });
    const createToast = (msg) => {
        setOpen({
          open: true,
          message: msg
        });
    };
    
    const handleClose = () => {
        setOpen({
            open: false,
            message: ""
        });
    };
    const classes = useStyles();
    return (
        <div>
            <Snackbar
            open={toast.open}
            onClose={handleClose}
            autoHideDuration={3000}
            >
            <SnackbarContent className={classes.error_toast}
            message={<span id="session_expired_error" className={classes.message}>
                <ErrorIcon className={clsx(classes.icon, classes.iconVariant)} />
                {toast.message}</span>}
            />
            </Snackbar>
            {/* 라우팅 */}
            <Route path="/" component={Topbar}/>
            <Route exact path="/" component={Main}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
        </div>
    );
}

export default App;