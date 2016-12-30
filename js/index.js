import React from 'react';
import Header from '../component/public/header.js';
import Cell from '../component/index/cells.js';
import Tab from '../component/index/tab.js';
import Pagination from '../component/index/pagination.js';
import Login from '../component/index/login.js';
import { Link } from 'react-router';
import Load from '../component/public/load.js';

//top
const Content=React.createClass({
    getInitialState(){     
        return {tabTitle: 'ask',isLogin: localStorage.getItem('userToken')?true:false,data: ''};
    },
    loginStatus(status){
        this.setState({
            isLogin: status
        })       
    },
    componentWillMount(){
        this.sendRequest('https://cnodejs.org/api/v1/topics?page='+1+'&tab='+this.state.tabTitle+'&limit='+20);
    },
    sendRequest(url,tab){
        if(tab){
            this.setState({
                tabTitle: tab
            }); 
        }   
        fetch(url,{
            method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   this.setState({
                       data:resultData
                   });
                }
            })
        })
    },
    render(){
       return <div id="container">
                <Header isLogin={this.state.isLogin}/>
                <div id="main">
                    <Login isLogin={this.state.isLogin} loginStatus={this.loginStatus} />
                    <div id="content">
                        <Tab sendRequest={this.sendRequest} />
                        <Cell data={this.state.data} />
                        <Pagination sendRequest={this.sendRequest} tab={this.state.tabTitle} />
                    </div>
                </div>
              </div>                
    }
});
module.exports=Content;



