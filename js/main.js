require("../css/reset.min.css");
require("../css/main.scss");
require("../css/iconfont.css");
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Content from './index.js';
import Detail from './detail.js';
import Message from './message.js';

//top
const Main=React.createClass({
    render(){
        return <div />
    }
});
ReactDOM.render(
    (<Router history={hashHistory}>
        <Route path="/" component={Content}/>
        <Route path="/detail/:id" component={Detail}/>
        <Route path="/message" component={Message}/>
    </Router>),document.querySelector('body')
);
