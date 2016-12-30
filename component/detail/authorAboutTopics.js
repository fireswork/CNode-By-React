//abthor-about-topics
import React from 'react';
import { Link } from 'react-router';

const AboutTopics=React.createClass({
    getInitialState(){
        return {authorData: []};
    },
    componentWillReceiveProps(newProps){
        if(newProps.url && this.props.url!=newProps.url){
            this.sendRequest('https://cnodejs.org/api/v1/user/'+newProps.url);  
        }         
    },
    showTopics(event){
        Array.from(document.querySelector('.unstyled').querySelectorAll('li')).forEach((_this,index)=>{
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
                                                        <Link className='dark topic_title' onClick={this.props.reload} to={'/detail/'+_this.id} title={_this.title}>{_this.title}</Link>
                                                    </div>
                                                </li>
                                    })
                                }
                                <li className={this.state.authorData.length>5?'more':'display-none'} onClick={this.showTopics}><div><a>查看更多</a></div></li>
                            </ul>
                        </div>
                    </div>
   }
});
module.exports=AboutTopics;