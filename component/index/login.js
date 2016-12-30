import React from 'react';
import Author from '../detail/author.js';
import { Link } from 'react-router';
import swal from 'sweetalert';

const Login=React.createClass({
    getInitialState(){
        return {success: false,data: {}};
    },
     componentWillMount(){
        if(localStorage.getItem("userToken")){
            this.sendRequest(localStorage.getItem("userToken"));
        }
    },
    getUserInfo(){
        const token=document.querySelector('.accesstoken-input').value;
        if(!token){
            swal('accessToken不能为空','','error');
            return ;
        }
        this.sendRequest(token);
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
                        success: true,
                        data: data
                    });
                    localStorage.setItem("userToken",token);
                    localStorage.setItem("loginname",this.state.data.loginname);
                    this.props.loginStatus(true);
                }else{
                    swal(data.error_msg,'','error');
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
                                <input type="text" className="accesstoken-input" placeholder="输入accesstoken"/>
                            </div>                          
                            <button type="button" className="login_button" onClick={this.getUserInfo}>通过 accesstoken 登录</button>
                        </div>
                    </div>
                    <div className={!this.state.success?"display-none":''}>
                        <Author data={this.state.data} isAuthor='false'/>
                        <div className="panel">
                            <div className="inner">
                                <button className="report common-btn"><Link to="/reportTopic">发布话题</Link></button>
                            </div>
                        </div>   
                    </div>                
                </div>
    }
});
module.exports=Login;