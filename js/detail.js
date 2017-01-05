import React from 'react';
import Header from '../component/public/header.js';
import DetailHeader from '../component/detail/detailHeader.js';
import Reply from '../component/detail/reply.js';
import Author from '../component/detail/author.js';
import AboutTopics from '../component/detail/authorAboutTopics.js';
import swal from 'sweetalert';

//top
const Detail=React.createClass({
    getInitialState(){
        return {data: [],loginname: '',is_collect: false,isLogin: localStorage.getItem('userToken')?true:false};
    },
    componentDidMount(){
        this.sendRequest('https://cnodejs.org/api/v1/topic/'+window.location.href.split('/detail/')[1],this.setData);
    },
    reload(){
        window.location.reload();
    },
    loginTips(tips){
        if(!localStorage.getItem('userToken')){
            swal('登录后才能'+tips,'','error');
            return false;
        }else{
            return true;
        }
    },
    timeFormat(time){
        const timeDiff=(new Date().getTime()-new Date(time).getTime())/3600000;
        if(timeDiff/24 >=1){
            return Math.floor(timeDiff/24)+' 天前';
        }else if(timeDiff >1){
            return Math.floor(timeDiff)+' 小时前';
        }else if(timeDiff < 1){
            return Math.ceil(timeDiff*60)+' 分钟前';
        }       
    },
    //是否收藏
    is_collect(){
        const loginname=localStorage.getItem('loginname');
        if(loginname) this.sendRequest('https://cnodejs.org/api/v1/topic_collect/'+loginname,this.setCollect);
    },
    setData(data){
        this.setState({
            data: data,
            loginname: data.author.loginname
        });
        this.is_collect();
    },
    setCollect(data){
        data.map((_this)=>{
            if(_this.id===this.state.data.id){
                this.setState({
                    is_collect: true
                })
            }
        })
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
        return <div id="container">
                    <Header isLogin={this.state.isLogin}/>
                    <div id="main">
                        <div className="detail-container">
                            <div id="sidebar">
                                <Author data={this.state.data.author} sendRequest={this.sendRequest} url={this.state.loginname} isAuthor='true'/>
                                <AboutTopics data={this.state.data} url={this.state.loginname} reload={this.reload} />   
                            </div>                   
                            <div id="content">
                                <DetailHeader data={this.state.data} timeFormat={this.timeFormat} is_collect={this.state.is_collect} loginTips={this.loginTips} />
                                <Reply data={this.state.data.replies?this.state.data.replies:[]} timeFormat={this.timeFormat} topicID={this.state.data.id} loginTips={this.loginTips} />                                                           
                            </div>                   
                        </div>
                    </div>
               </div>
    }
});
module.exports=Detail;


