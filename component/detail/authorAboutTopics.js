//abthor-about-topics
import React from 'react';

const AboutTopics=React.createClass({
    getInitialState(){
        return {authorData: []};
    },
    componentWillReceiveProps(newProps){
        this.sendRequest(newProps.url);        
    },
    showTopics(event){
        document.querySelector('.unstyled').querySelectorAll('li').forEach((_this,index)=>{
            _this.setAttribute('class',_this.getAttribute('class').replace('display-none'),'');
        })
        event.target.style.display='none';
    },
    sendRequest(url){
        fetch(url,{
            method: 'get',
        }).then((result)=>{
            return result.json().then((data)=>{
                const resultData=data.data;
                if(resultData){
                   this.setState({
                       authorData: resultData.recent_topics,
                   });
                }
            })
        })
    },
   render(){
       return <div className="panel">
                        <div className="header">
                            <span className="col_fade">
                                作者相关话题
                            </span>
                        </div>
                        <div className="inner">
                            <ul className="unstyled">
                                {
                                    this.state.authorData.map((_this,index)=>{
                                        return <li className={index>4?"display-none":''}>
                                                    <div>
                                                        <a className='dark topic_title' href={'detail.html?id='+_this.id} title={_this.title}>{_this.title}</a>
                                                    </div>
                                                </li>
                                    })
                                }
                                <li className={this.state.authorData.length>4?'more':'display-none'} onClick={this.showTopics}><div><a>查看更多</a></div></li>
                            </ul>
                        </div>
                    </div>
   }
});
module.exports=AboutTopics;