import React from 'react';
import Author from '../detail/author.js'

const Login=React.createClass({
    getInitialState(){
        return {failed: false,success: false,data: {}};
    },
     componentWillMount(){
        if(localStorage.getItem("userToken")){
            this.sendRequest(localStorage.getItem("userToken"));
        }
    },
    getUserInfo(){
        this.sendRequest(document.querySelector('.accesstoken-input').value)
    },
    focus(){
        this.setState({
            failed: false,
        })         
    },
    sendRequest(token){   
        fetch('https://cnodejs.org/api/v1/accesstoken',{
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
             },
            body: 'accesstoken='+token
        }).then((result)=>{
            return result.json().then((data)=>{
                if(data.success){
                    this.setState({
                        failed: false,
                        success: true,
                        data: data
                    });
                    localStorage.setItem("userToken",token);
                    localStorage.setItem("loginname",this.state.data.loginname);
                    this.props.loginStatus(true);
                }else{
                    this.setState({
                        failed: true
                    })
                }
            })
        })
    },
    render(){
        return <div id="sidebar">
                    <div className={this.state.success?"panel display-none":'panel'}>
                        <div className="inner">
                            <p>CNode By React: @Link</p>                           
                            <div>
                                <input type="text" className="accesstoken-input" onFocus={this.focus} placeholder="输入accesstoken"/>
                            </div>                          
                            <button type="button" className="login_button" onClick={this.getUserInfo}>通过 accesstoken 登录</button>
                             <p className="tips">
                                <span className={this.state.failed?"failed":'failed display-none'}>无效的accesstoken</span>
                            </p>
                        </div>
                    </div>
                    <div className={!this.state.success?"display-none":''}>
                        <Author data={this.state.data} isAuthor='false'/>   
                    </div>                
                </div>
    }
});
module.exports=Login;