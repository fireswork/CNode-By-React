//cell
import React from 'react';
import { Link }  from 'react-router'

const Cells=React.createClass({
    getInitialState(){
        return {data: [],tabTitle: {'ask':'问答','share':'分享','good':'精华','job':'招聘'}};
    },
    componentWillReceiveProps(newProps){
        if(newProps.data){
            this.setState({
                data:newProps.data
            });
        }       
    },
    timeFormat(time){
        const timeDiff=(new Date().getTime()-new Date(time).getTime())/3600000;
        if(timeDiff/24 >=1){
            return Math.floor(timeDiff/24)+' 天前';
        }else if(timeDiff >1){
            return Math.floor(timeDiff)+' 小时前';
        }else if(timeDiff < 1){
            return Math.ceil(timeDiff*60)+' 分钟前';
        }       
    },
    render(){
        return (
            <div id="cell_list">
                {
                    this.state.data.map((cell,index)=>{
                        return (
                            <div className="cell" key={index}>
                                <Link to={'/user/'+cell.author.loginname}>
                                    <img className="user-img" src={cell.author.avatar_url} title={cell.author.loginname} />
                                </Link>
                                <span className={cell.visit_count>=0?'count-reply-visit':'display-none'}>
                                    <span className="count-of-reply">{cell.reply_count}</span>
                                    <span className="character">/</span>
                                    <span className="count-of-visit">{cell.visit_count}</span>
                                </span>
                                <span className="pull-right">
                                    <span className="last-reply-time">{this.timeFormat(cell.last_reply_at)}</span>
                                </span>
                                <div className="topic-wrapper">
                                    <span className={cell.tab?'cell-tab':'display-none'}>{cell.good?this.state.tabTitle['good']:this.state.tabTitle[cell.tab]}</span>
                                   <Link to={'/detail/'+cell.id} className="cell-topic-title" title={cell.title}>{cell.title}</Link>
                                </div> 
                            </div>
                        )
                    })                               
                }
            </div>
        )
    }
})
module.exports=Cells;