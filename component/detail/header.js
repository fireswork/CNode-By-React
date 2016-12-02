//detail-content
import React from 'react';
import highlight from 'highlight.js';

const tabsTitle={'ask':'问答','share':'分享','good':'精华','job':'招聘'};
const Header=React.createClass({
    componentDidUpdate(){
       highlight.initHighlighting();
    },
    timeFormat(time){
        const timeDiff=(new Date().getTime()-new Date(time).getTime())/3600000;
        if(timeDiff >1){
            return Math.floor(timeDiff)+' 小时前';
        }else if(timeDiff < 1){
            return Math.floor(timeDiff*60)+' 分钟前';
        }
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
                    </div>     
                 </div>
                <div className="inner topic">
                    <div className="topic_content" dangerouslySetInnerHTML={{__html: this.props.data.content}}></div>
                </div>
            </div>
    }
});
module.exports=Header;