//tab
import React from 'react';

const tabsTitle={'问答':'ask','分享':'share','精华':'good','招聘':'job'};
const Tab=React.createClass({
    getInitialState(){     
        return {tab:''};
    },
    //tab切换
    getTabs(event){     
        Array.from(document.querySelectorAll('.tabOne')).forEach((_this)=>{_this.setAttribute('class','tabOne')});
        event.target.setAttribute('class','tabOne active');
        const thisTab=event.target.getAttribute('title');
        if(this.state.tab!=thisTab){
            this.setState({
                tab: thisTab
            });
            this.props.sendRequest('https://cnodejs.org/api/v1/topics?page='+1+'&tab='+thisTab+'&limit='+20,thisTab);
        }
    },
    render(){
       return <div className="panel-header">
                    {
                            Object.keys(tabsTitle).map((tab,index)=>{
                            return <a href="#" key={index} title={tabsTitle[tab]} className={index===0?'tabOne active':'tabOne'} onClick={this.getTabs}>{tab}</a>
                        })
                    }
             </div>
    }
    
});
module.exports=Tab;
