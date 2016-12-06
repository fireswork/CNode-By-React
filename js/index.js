import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../component/header.js';
import Cell from '../component/index/cells.js';
import Tab from '../component/index/tab.js';
import Pagination from '../component/index/pagination.js';
import Login from '../component/index/login.js';


//top
const Content=React.createClass({
    getInitialState(){     
        return {tabTitle: 'ask',thisPage: 1,isLogin: localStorage.getItem('userToken')?true:false};
    },
    //tab-click
    getTabChange(newTab){
        this.setState({
            tabTitle: newTab,
        });
    },
    loginStatus(status){
        this.setState({
            isLogin: status
        })       
    },
    //pagination-click
    getPaninationChange(newPage){
        this.setState({
            thisPage: newPage,
        })
    },
    render(){
       return <div id="container">
                <Header isLogin={this.state.isLogin}/>
                <div id="main">
                    <Login isLogin={this.state.isLogin} loginStatus={this.loginStatus} />
                    <div id="content">
                        <Tab tabChange={this.getTabChange} />
                        <Cell page={this.state.thisPage} tab={this.state.tabTitle} limit="20" />
                        <Pagination pageChange={this.getPaninationChange} tab={this.state.tabTitle} />
                    </div>
                </div>  
              </div>                
    }
});
module.exports=Content;



