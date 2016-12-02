require("../css/reset.min.css");
require("../css/main.scss");
require("../css/iconfont.css");
import React from 'react';
import ReactDOM from 'react-dom';
import Cell from '../component/index/cells.js';
import Tab from '../component/index/tab.js';
import Pagination from '../component/index/pagination.js'
import Login from '../component/index/login.js'

//top
const Content=React.createClass({
    getInitialState(){
        return {tabTitle: 'ask',thisPage: 1};
    },
    //tab-click
    getTabChange(newTab){
        this.setState({
            tabTitle: newTab,
        });
    },
    //pagination-click
    getPaninationChange(newPage){
        this.setState({
            thisPage: newPage,
        })
    },
    render(){
       return <div id="main">
                <Login />
                <div id="content">
                    <Tab tabChange={this.getTabChange} />
                    <Cell page={this.state.thisPage} tab={this.state.tabTitle} limit="12" />
                    <Pagination pageChange={this.getPaninationChange} tab={this.state.tabTitle} />
                </div>
              </div>                  
    }
});
ReactDOM.render(
    <Content></Content>,document.querySelector('#container')
);


