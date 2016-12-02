//detail-author
import React from 'react';

const Author=React.createClass({
    getInitialState(){
        return {authorData: [],score:''};
    },
    componentWillReceiveProps(newProps){
        this.sendRequest(newProps.url);       
    }, 
    sendRequest(url){
        if(url){
            fetch(url,{
            method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   this.setState({
                       authorData: resultData.recent_topics,
                       score: resultData.score
                   });
                }
            })
        });
        }      
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
                                        <img src={this.props.data?this.props.data.avatar_url:''} title={this.props.data?this.props.data.loginname:''}/>
                                    </a>
                                    <span className="user_name">
                                        <a className="dark" href="#">{this.props.data?this.props.data.loginname:''}</a>
                                    </span>
                                    <div className="floor">
                                        <span className="big">积分: {this.state.score?this.state.score:'xxx'}</span>
                                    </div>
                                    <div className="signature">
                                        斯人若彩虹，遇上方知有
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
    }
});
module.exports=Author;