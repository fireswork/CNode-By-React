require("../css/reset.min.css");
require("../css/main.scss");
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../component/detail/header.js';
import Reply from '../component/detail/reply.js';
import Author from '../component/detail/author.js';
import AboutTopics from '../component/detail/authorAboutTopics.js';
import ReplyTopic from '../component/detail/replyTopic.js';

//top
const Container=React.createClass({
    getInitialState(){
        return {data: [],loginname: ''};
    },
    componentDidMount(){
        this.sendRequest();
    },
    timeFormat(time){
        const timeDiff=(new Date().getTime()-new Date(time).getTime())/3600000;
        if(timeDiff/24 >=1){
            return Math.floor(timeDiff/24)+' 天前';
        }else if(timeDiff >1){
            return Math.floor(timeDiff)+' 小时前';
        }else if(timeDiff < 1){
            return Math.floor(timeDiff*60)+' 分钟前';
        }       
    },
    sendRequest(){
        fetch('https://cnodejs.org/api/v1/topic/'+window.location.href.split('=')[1],{
            method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                    console.log(resultData);
                   this.setState({
                       data: resultData,
                       loginname: resultData.author.loginname
                   });
                }
            })
        })
    },
    render(){
        return <div className="detail-container">
                    <div id="sidebar">
                        <Author data={this.state.data.author} url={'https://cnodejs.org/api/v1/user/'+this.state.loginname} isAuthor='true' />
                        <AboutTopics data={this.state.data} url={'https://cnodejs.org/api/v1/user/'+this.state.loginname} />   
                    </div>                   
                    <div id="content">
                        <Header data={this.state.data} timeFormat={this.timeFormat} />
                        <Reply data={this.state.data.replies?this.state.data.replies:[]} timeFormat={this.timeFormat} />   
                        <ReplyTopic topicID={this.state.data.id}/>                                   
                    </div>                   
               </div>
    }
});
ReactDOM.render(
    <Container id="detail-content"></Container>,document.querySelector('#main')
)


