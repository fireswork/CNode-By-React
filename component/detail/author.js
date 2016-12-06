//detail-author
import React from 'react';

const Author=React.createClass({
    getInitialState(){
        return {authorData: '',score:''};
    },
    componentWillMount(){
        this.sendRequest('https://cnodejs.org/api/v1/user/'+localStorage.getItem('loginname'));
    },
    sendRequest(url){
        fetch(url,{method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   this.setState({
                       authorData: resultData,
                       score: resultData.score
                   });
                }
            })
        });             
    },
    render(){
        return <div className="panel">
                        <div className="header">
                            <span className="col_fade">{this.props.isAuthor==='true'?'作者':'个人信息'}</span>
                        </div>
                        <div className="inner">
                            <div className="user_card">
                                <div>
                                    <a className="user_avatar" href="#">
                                        <img src={this.state.authorData.avatar_url} title={this.state.authorData.loginname}/>
                                    </a>
                                    <span className="user_name">
                                        <a className="dark" href="#">{this.state.authorData.loginname}</a>
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