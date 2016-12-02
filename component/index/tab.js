//tab
import React from 'react';

const tabsTitle={'问答':'ask','分享':'share','精华':'good','招聘':'job'};
const Tab=React.createClass({
    //tab切换
    getTabs(event){     
        document.querySelectorAll('.tabOne').forEach((_this)=>{_this.setAttribute('class','tabOne')});
        event.target.setAttribute('class','tabOne active');      
        this.props.tabChange(event.target.getAttribute('title'));
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
