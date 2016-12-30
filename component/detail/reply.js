//detail-reply
import React from 'react';
import swal from 'sweetalert';

const Reply=React.createClass({
    getInitialState(){
        return {node: '',agree_count: '',reply_id:''};
    },
    //回复
    sendReply(){
        if(this.props.loginTips('回复')){
            const token=localStorage.getItem('userToken');
            const content=document.querySelector('.content_area').value;
            let format;
            content.indexOf('@')!=-1?format='accesstoken='+token+'&content='+content+'&reply_id='+this.state.reply_id:
            format='accesstoken='+token+'&content='+content;
            this.sendRequest('https://cnodejs.org/api/v1/topic/'+this.props.topicID+'/replies',      
            format,this.replyCallBack);
        }  
    },
    //回复某人
    replyThis(event){ 
        document.querySelector('.content_area').value='@'+event.target.getAttribute('name')+' ';    
        this.toBottom();   
        document.querySelector('.content_area').focus();
        this.setState({
            reply_id: event.target.getAttribute('id')
        })
    },
    replyCallBack(data){
        if(data.success===true){
            swal({
                title: "回复成功",
                type: "success",
                }, function(){
                    window.location.reload();
                });
        }else{
            swal(data.error_msg+'','','error');
        }
    },
    toBottom(){
        document.querySelector('BODY').scrollTop=document.querySelector('BODY').scrollHeight;
    },
    //点赞或者取消点赞
    clickAgree(event){
        if(this.props.loginTips('点赞')){
            this.setState({
                node: event.target
            })
            this.sendRequest('https://cnodejs.org/api/v1/reply/'+event.target.getAttribute('id')+'/ups',
            'accesstoken='+localStorage.getItem('userToken'),
            this.agreeCallBack);
        }
    },
    agreeCallBack(data){
        let agree_num=Number(this.state.node.nextSibling.innerText);
            if(data.success){
                this.state.node.setAttribute('class','already_agree iconfont');
                data.action==='up'?agree_num++:agree_num--;
                this.state.node.nextSibling.innerText=agree_num;
            }else{
                swal(data.error_msg+',你咋这么自恋捏','','error');
            }
    },
    sendRequest(url,format,callback){   
        fetch(url,{
            method: 'post',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
             },
            body: format
        }).then((result)=>{
            return result.json().then((data)=>{
                callback(data);
            })
        })
    },
    render(){
        return <div>
                    <div className="panel">
                        <div className="header"> 
                            <span className="col_fade">{this.props.data.length} 回复</span>
                        </div>                       
                        {
                            this.props.data.map((_this,index)=>{
                                return <div className="cell reply_area reply_item">
                                            <a id={_this.id} className="reply_id"></a>
                                            <div className="author_content">
                                                <a href="#" className="user_avatar">
                                                    <img src={_this.author.avatar_url}/>
                                                </a>
                                                <div className="user_info">
                                                    <a className="dark reply_author" href="/user/captainblue2013">{_this.author.loginname}</a>
                                                    <a className="reply_time" href={'#'+_this.id}>{index+1}楼 • {this.props.timeFormat(_this.create_at)}</a>
                                                </div>
                                                <div className="icons">
                                                     <span>
                                                         <i className={_this.ups.length?"already_agree iconfont":'agree iconfont'} onClick={this.clickAgree} title="喜欢" id={_this.id}>&#xe708;</i>
                                                         <span className="agree_count">{_this.ups.length?_this.ups.length:''}</span>
                                                     </span>                                        
                                                     <i className="iconfont reply_this" title="回复ta" id={_this.id} name={_this.author.loginname} onClick={this.replyThis}>&#xe709;</i>
                                                </div>
                                            </div>
                                            <div className="reply_content" dangerouslySetInnerHTML={{__html: _this.content}}></div>
                                        </div>
                            })
                        }             
                </div>
                <div className="panel" id="bottom">
                    <a href="#bottom" className="toBottom"></a>
                    <div className="replyTopic">
                        <div className="header">
                            添加回复
                        </div>
                        <div className="inner">
                            <textarea className="content_area"></textarea>
                            <button type="button" onClick={this.sendReply} className="reply_btn common-btn">回复</button>
                        </div>
                    </div>
                </div>
            </div>
    }
});
module.exports=Reply;