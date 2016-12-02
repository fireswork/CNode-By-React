//cell
import React from 'react';

const tabsTitle={'ask':'问答','share':'分享','good':'精华','job':'招聘'};
const Cells=React.createClass({
    getInitialState(){
        return {data: [],tabTitle: this.props.tab};
    },
    componentWillReceiveProps(newProps){
        this.props=newProps;
        this.sendRequest(newProps.page,newProps.tab,newProps.limit);
    },
    sendRequest(page,tab,limit){      
        fetch('https://cnodejs.org/api/v1/topics?page='+page+'&tab='+tab+'&limit='+limit,{
            method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   this.setState({
                        data: resultData,
                        tabTitle: this.props.tab
                    })
                }
            })
        })
    },
    componentDidMount(){
        this.sendRequest(this.props.page,this.props.tab,this.props.limit);
    },
    timeFormat(time){
        const timeDiff=(new Date().getTime()-new Date(time).getTime())/3600000;
        if(timeDiff/24 >=1){
            return Math.floor(timeDiff/24)+' 天前';
        }else if(timeDiff >1){
            return Math.floor(timeDiff)+' 小时前';
        }else if(timeDiff < 1){
            return Math.floor(timeDiff*60)+' 分钟前';
        }       
    },
    render(){
        return (
            <div id="cell_list">
                {
                    this.state.data.map((cell,index)=>{
                        return (
                            <div className="cell" key={index}>
                                <img className="user-img" src={cell.author.avatar_url}/>
                                <span className="count-reply-visit">
                                    <span className="count-of-reply">{cell.reply_count}</span>
                                    <span className="character">/</span>
                                    <span className="count-of-visit">{cell.visit_count}</span>
                                </span>
                                <span className="pull-right">
                                    <span className="last-reply-time">{this.timeFormat(cell.last_reply_at)}</span>
                                </span>
                                <div className="topic-wrapper">
                                    <span className="cell-tab">{tabsTitle[cell.tab]}</span>
                                    <a className="cell-topic-title" href={'detail.html?id='+cell.id} title={cell.title}>{cell.title}</a>
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