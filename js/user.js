import React from 'react';
import Header from '../component/public/header.js';
import Breadcrumbs from '../component/public/Breadcrumbs.js';
import Author from '../component/detail/author.js';
import Cell from '../component/index/cells.js';

const User=React.createClass({
    getInitialState(){
        return {isLogin: localStorage.getItem('userToken')?true:false,data: '',collect_topic:''};
    },
    componentWillMount(){
        const name=window.location.href.split('/user/')[1];
        this.sendRequest('https://cnodejs.org/api/v1/user/'+name,this.setUserInfo);
        this.sendRequest('https://cnodejs.org/api/v1/topic_collect/'+name,this.getTopicCollect);
    },
    setUserInfo(data){
        this.setState({
            data:data
        });
    },
    getTopicCollect(data){
        this.setState({
            collect_topic:data
        });
    },
    timeFormat(time){
        const timeDiff=(new Date().getTime()-new Date(time).getTime())/3600000;
        if(timeDiff/(24*30*12) >=1){
            return Math.floor(timeDiff/(24*30*12) >=1)+' 年前';
        }else if(timeDiff/(24*30) >=1){
            return Math.floor(timeDiff/(24*30) >=1)+' 月前';
        }else if(timeDiff/24 >=1){
            return Math.floor(timeDiff/24)+' 天前';
        }else if(timeDiff >1){
            return Math.floor(timeDiff)+' 小时前';
        }else if(timeDiff < 1){
            return Math.ceil(timeDiff*60)+' 分钟前';
        }       
    },
    sendRequest(url,callback){
        fetch(url,{
            method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   callback(resultData);
                }
            })
        })
    },
    render(){
        return <div id="container" className="user-container">
                    <Header isLogin={this.state.isLogin}/>
                    <div id="main">
                        <div id="sidebar">
                            <Author url={window.location.href.split('/user/')[1]} isAuthor="true" />
                        </div>
                        <div id="content">
                            <div className="panel">
                                <Breadcrumbs />
                                <div className="inner userinfo">
                                    <div className="user_big_avatar">
                                        <img src={this.state.data.avatar_url} className="user_avatar" title={this.state.data.loginname} />
                                    </div>
                                    <a className="dark">{this.state.data.loginname}</a>
                                    <div className="user_profile">
                                        <ul className="unstyled">
                                            <li>{this.state.data.score} 积分</li>
                                            <li><a className="dark">{this.state.collect_topic.length}个话题收藏</a></li>
                                        </ul>
                                    </div>
                                    <p className="col_fade">注册时间 {this.timeFormat(this.state.data.create_at)}</p>
                                </div>
                            </div>
                            <div className="panel">
                                <div className="header">
                                    最近创建的话题
                                </div>
                                <Cell data={this.state.data.recent_topics}/>
                            </div>
                            <div className="panel">
                                <div className="header">
                                    最近参与的话题
                                </div>
                                <Cell data={this.state.data.recent_replies}/>
                            </div>
                        </div>
                    </div>
               </div>
    }
});
module.exports=User;