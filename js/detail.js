require("../css/reset.min.css");
require("../css/main.scss");
require("../css/iconfont.css");
import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../component/detail/header.js';
import Reply from '../component/detail/reply.js';
import Author from '../component/detail/author.js';
import AboutTopics from '../component/detail/authorAboutTopics.js';

//top
const Container=React.createClass({
    getInitialState(){
        return {data: [],loginname: '',is_collect: false};
    },
    componentDidMount(){
        this.sendRequest('https://cnodejs.org/api/v1/topic/'+window.location.href.split('=')[1],this.setData);
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
    is_collect(){
        this.sendRequest('https://cnodejs.org/api/v1/topic_collect/'+this.state.loginname,this.setCollect)
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
        return <div className="detail-container">
                    <div id="sidebar">
                        <Author data={this.state.data.author} url={'https://cnodejs.org/api/v1/user/'+this.state.loginname} isAuthor='true' />
                        <AboutTopics data={this.state.data} url={'https://cnodejs.org/api/v1/user/'+this.state.loginname} />   
                    </div>                   
                    <div id="content">
                        <Header data={this.state.data} timeFormat={this.timeFormat} is_collect={this.state.is_collect}/>
                        <Reply data={this.state.data.replies?this.state.data.replies:[]} timeFormat={this.timeFormat} topicID={this.state.data.id} />                                                           
                    </div>                   
               </div>
    }
});
ReactDOM.render(
    <Container id="detail-content"></Container>,document.querySelector('#main')
)


