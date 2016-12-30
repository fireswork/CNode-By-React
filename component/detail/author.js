//detail-author
import React from 'react';
import { Link } from 'react-router';

const Author=React.createClass({
    getInitialState(){
        return {authorData: '', score:''};
    },
    componentWillMount(){
        if(!this.props.isAuthor && localStorage.getItem('loginname')){
            this.sendRequest('https://cnodejs.org/api/v1/user/'+localStorage.getItem('loginname'),this.setData);
        }       
    },
    componentWillReceiveProps(newProps){
        if(this.props.isAuthor==='true' && newProps.url){
            this.sendRequest('https://cnodejs.org/api/v1/user/'+newProps.url,this.setData);
        }else if(this.props.isAuthor==='false' && localStorage.getItem('loginname')){
            this.sendRequest('https://cnodejs.org/api/v1/user/'+localStorage.getItem('loginname'),this.setData);
        }
    },
    setData(resultData){
        this.setState({
            authorData: resultData,
            score: resultData.score
        });
    },
    sendRequest(url,callback){
        fetch(url,{method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   callback(resultData);
                }
            })
        });             
    },
    render(){
        return <div className="panel">
                        <div className="header">
                            <span className="col_fade">{this.props.isAuthor==='true'?'ta的信息':'个人信息'}</span>
                        </div>
                        <div className="inner">
                            <div className="user_card">
                                <div>
                                    <Link className="user_avatar" to={'/user/'+this.state.authorData.loginname}>
                                        <img src={this.state.authorData.avatar_url} title={this.state.authorData.loginname}/>
                                    </Link>
                                    <span className="user_name">
                                        <Link className="dark" to={'/user/'+this.state.authorData.loginname}>{this.state.authorData.loginname}</Link>
                                    </span>
                                    <div className="floor">
                                        <span className="big">积分: {this.state.score}</span>
                                    </div>
                                    <div className="signature">
                                        "斯人若彩虹，遇上方知有"
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
    }
});
module.exports=Author;