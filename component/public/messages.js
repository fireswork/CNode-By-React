import React from 'react';
import { Link } from 'react-router';

const Messages=React.createClass({
     getInitialState(){
        return {data: []}
    },
    componentWillReceiveProps(newProps){
        if(newProps.data){
            this.setState({
                data:newProps.data
            })
        }
    },
    render(){
        return <div className="inner message_inner">
                    <div className={this.state.data.length?'display-none':'cell'}>暂无消息</div>
                    {
                         this.state.data.map((_this)=>{
                             return <div className="cell">                                      
                                        <a>{_this.author.loginname}</a> {_this.type==='at'?'在话题 ':'回复了你的话题'} <Link to={'/detail/'+_this.topic.id}>{_this.topic.title}</Link> {_this.type==='at'?'中@了你':''}
                                    </div>
                         })
                    }
                </div>
    }
});
module.exports=Messages;