//detail-content
import React from 'react';
import highlight from 'highlight.js';

const tabsTitle={'ask':'问答','share':'分享','good':'精华','job':'招聘'};
const Header=React.createClass({
    getInitialState(){
        return {is_collect: this.props.is_collect};
    },
    componentDidUpdate(){
       highlight.initHighlighting();
    },
    isCollect(event){
        let is_collect='';
        event.target.innerText==='收藏'?is_collect='collect':is_collect='de_collect';
        this.sendRequest(is_collect,localStorage.getItem('userToken'),this.props.data.id);
    },
    sendRequest(is_collect,token,id){
        fetch('https://cnodejs.org/api/v1/topic_collect/'+is_collect,{
         method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
             },
            body: 'accesstoken='+token+'&topic_id='+id
        }).then((result)=>{
            return result.json().then((data)=>{
                if(data.success){
                    const btn=document.querySelector('.collect');
                    btn.innerText==="收藏"?btn.innerText='取消收藏':btn.innerText='收藏'
                }
            })
        })
    },
    render(){
        return <div className="panel">
                <div className="header topic_header">
                    <span className="topic_full_title">{this.props.data.title}</span>
                    <div className="changes">
                        <span>发布于 {this.props.timeFormat(this.props.data.create_at)}</span>
                        <span>作者 <a href="/user/jkiss" >{this.props.data.author?this.props.data.author.loginname:''}</a></span>
                        <span>{this.props.data.visit_count} 次浏览</span>               
                        <span>来自 {tabsTitle[this.props.data.tab]}</span>
                        <button type="button" onClick={this.isCollect} className="collect common-btn">{this.props.is_collect?'取消收藏':'收藏'}</button>
                    </div>     
                 </div>
                <div className="inner topic">
                    <div className="topic_content" dangerouslySetInnerHTML={{__html: this.props.data.content}}></div>
                </div>
            </div>
    }
});
module.exports=Header;