import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../component/header.js';
import Breadcrumbs from '../component/Breadcrumbs.js';
import Messages from '../component/messages.js';
import Author from '../component/detail/author.js';

const Message=React.createClass({
    getInitialState(){
        return {isLogin: localStorage.getItem('userToken')?true:false};
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
                                <Breadcrumbs />
                                <Messages hasRead="false"/>
                            </div>
                            <div className="panel">
                                <div className="header">已读信息</div>
                                <Messages hasRead="true"/>
                            </div>
                        </div>
                    </div>                   
                </div>
    }
});
module.exports=Message;