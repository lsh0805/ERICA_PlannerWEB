import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import { Main, Login, Register } from 'pages';

class App extends React.Component {
    render(){
        return (
            <div>
                <Route exact path="/" component={Main}/>
                <Route path="/register" component={Register}/>
                <Route path="/login" component={Login}/>
            </div>
        );
    }
}

export default App;