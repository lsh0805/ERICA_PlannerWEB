import React, { useState, useEffect } from 'react';
import './App.css';
import Snackbar from '@material-ui/core/Snackbar';
import Fade from '@material-ui/core/Fade';
import { Route } from 'react-router-dom';
import { Main, Login, Register } from 'pages';
import { Topbar } from 'components';
import axios from 'axios';

function App() {
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
                createToast();
                console.log(err);
            }
        );
    }, []);
    const [open, setOpen] = useState(false);
    const createToast = () => {
        setOpen({
          open: true
        });
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div>
            <Snackbar
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                ContentProps={{
                'session_expired': 'session_expired_toast',
                }}
                message={<span id="session_expired_toast">세션이 만료되었습니다. 다시 로그인 해주세요.</span>}
            />
            {/* 라우팅 */}
            <Route path="/" component={Topbar}/>
            <Route exact path="/" component={Main}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
        </div>
    );
}

export default App;