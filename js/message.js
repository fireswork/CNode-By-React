import React from 'react';
import Header from '../component/public/header.js';
import Breadcrumbs from '../component/public/Breadcrumbs.js';
import Messages from '../component/public/messages.js';
import Author from '../component/detail/author.js';

const Message=React.createClass({
    getInitialState(){
        return {isLogin: localStorage.getItem('userToken')?true:false,data: {}};
    },
    componentDidMount(){
        this.sendRequest(' https://cnodejs.org/api/v1/messages?accesstoken='+localStorage.getItem('userToken'));
    },
    sendRequest(url){
        fetch(url,{method: 'get',}).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   this.setState({
                       data: resultData,
                   });
                }
            })
        });             
    },
    render(){
        return <div id="container">
                    <Header isLogin={this.state.isLogin}/>
                    <div id="main">
                        <div id="sidebar">
                            <Author url={localStorage.getItem('loginname')} isAuthor="false" />
                        </div>
                        <div id="content">
                            <div className="panel">
                                <Breadcrumbs active="新信息"/>
                                <Messages data={this.state.data.hasnot_read_messages} />
                            </div>
                            <div className="panel">
                                <div className="header">已读信息</div>
                                <Messages data={this.state.data.has_read_messages} />
                            </div>
                        </div>
                    </div>                   
                </div>
    }
});
module.exports=Message;