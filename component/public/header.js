import React from 'react';
import { Link } from 'react-router';

const Header=React.createClass({
    getInitialState(){
        return {messages_count: 0,};
    },
    componentWillMount(){
        const token=localStorage.getItem('userToken');
        if(token){
            this.sendRequest('https://cnodejs.org/api/v1/message/count?accesstoken='+token); 
        }
    },
    sendRequest(url){
        fetch(url,{method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   this.setState({
                       messages_count:resultData
                   });
                }
            })
        });             
    },
    logOut(){
        localStorage.removeItem('userToken');
        localStorage.removeItem('loginname');
        window.location.reload();
    },
    render(){
        return <header className="header">
                   <div className="header_wrap">
                         <span className="logo"><Link to="/" /></span>
                            <nav className={this.props.isLogin?'navbar':'navbar display-none'}>
                                <ul>
                                    <li><Link to="/">首页</Link></li>
                                    <li><Link to="/message"><span className={this.state.messages_count?'messages_count':'display-none'}>{this.state.messages_count}</span>未读消息</Link></li>
                                    <li onClick={this.logOut}><Link to="/">退出</Link></li>
                                </ul>
                            </nav>
                   </div>
               </header>
    }
});
module.exports=Header;