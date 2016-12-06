import React from 'react';
import { Link } from 'react-router';

const Messages=React.createClass({
     getInitialState(){
        return {data: {has_read_messages: [],hasnot_read_messages: []}}
    },
    componentWillMount(){
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
                   console.log(resultData);
                }
            })
        });             
    },
    render(){
        return <div className="inner message_inner">
                    <div className={(this.props.hasRead==='false'?this.state.data.hasnot_read_messages:this.state.data.has_read_messages).length?'display-none':'cell'}>暂无消息</div>
                    {
                         this.props.hasRead==='false'?this.state.data.hasnot_read_messages:this.state.data.has_read_messages.map((_this)=>{
                             return <div className="cell">                                      
                                        <a>{_this.author.loginname}</a> {_this.type==='at'?'在话题 ':'回复了你的话题'} <Link to={'/detail/'+_this.topic.id}>{_this.topic.title}</Link> {_this.type==='at'?'中@了你':''}
                                    </div>
                         })
                    }
                </div>
    }
});
module.exports=Messages;