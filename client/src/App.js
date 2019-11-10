import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Main, Login, Register } from 'pages';
import { Topbar } from 'components';

class App extends React.Component {
    render(){
        return (
            <div>
                {/* 라우팅 */}
                <Route path="/" component={Topbar}/>
                <Route exact path="/" component={Main}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </div>
        );
    }
}

export default App;