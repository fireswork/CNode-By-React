require("../css/reset.min.css");
require("../css/main.scss");
require("../css/iconfont.css");
require("../css/sweetalert.css");
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
//import Load from '../component/public/load.js';
import Index from './index.js';
import Detail from './detail.js';
import Message from './message.js';
import User from './user.js';
import ReportTopic from './reportTopic.js';

//top
const Main=React.createClass({
    render(){
        return <div>
                    {this.props.children}
               </div>
    }
});
ReactDOM.render(
    (
        <Router history={hashHistory}>
                <Route path="/" component={Main}>
                    <IndexRoute component={Index}/>
                    <Route path="/detail/:id" component={Detail}/>
                    <Route path="/message" component={Message}/>
                    <Route path="/user/:name" component={User}/>
                    <Route path="/reportTopic" component={ReportTopic}/> 
                </Route>                           
        </Router>
    ),document.querySelector('body')
);
